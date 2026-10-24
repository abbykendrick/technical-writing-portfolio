---
id: api-reference
title: "Events API Reference (v2)"
sidebar_label: REST API Reference
---

<div className="sample-note">

**Sample type:** REST API reference, written from an OpenAPI 3.0 specification · **Audience:** developers integrating with the API · **Fictional company**

</div>

The Events API accepts event data from your applications. All requests use HTTPS and JSON.

**Base URL:** `https://api.meridian-analytics.example/v2`

## Authentication

Send your source key in the `Authorization` header:

```http
Authorization: Bearer mk_live_8f2c...
```

Create keys in the Admin Console under **Sources → Keys**. Keys starting with `mk_test_` write to a sandbox and never reach your production warehouse.

## Rate limits

Each source can send **1,000 requests per second**. Responses include these headers:

| Header | Meaning |
| --- | --- |
| `X-RateLimit-Limit` | Requests allowed per second |
| `X-RateLimit-Remaining` | Requests left in the current window |
| `Retry-After` | Seconds to wait (only on `429` responses) |

---

## Send events

`POST /events`

Submits up to 500 events in one request. Events are validated against the source's schema before they are accepted.

### Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `events` | array | Yes | 1–500 event objects |
| `events[].name` | string | Yes | Event name, 1–64 characters, letters, numbers, and underscores |
| `events[].timestamp` | string | Yes | ISO 8601 time the event occurred, in UTC |
| `events[].user_id` | string | No | Your identifier for the user |
| `events[].properties` | object | No | Event attributes; up to 100 keys |

### Example request

```bash
curl -X POST https://api.meridian-analytics.example/v2/events \
  -H "Authorization: Bearer $MERIDIAN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "events": [
      {
        "name": "order_completed",
        "timestamp": "2026-10-24T15:04:05Z",
        "user_id": "u_1842",
        "properties": {"order_total": 84.50, "currency": "USD"}
      }
    ]
  }'
```

### Responses

**`202 Accepted`:** all events passed validation and were queued.

```json
{
  "accepted": 1,
  "rejected": 0,
  "request_id": "req_01J9X4Q7Z3"
}
```

**`207 Multi-Status`:** some events were rejected. Accepted events are still processed.

```json
{
  "accepted": 1,
  "rejected": 1,
  "errors": [
    {
      "index": 1,
      "code": "invalid_timestamp",
      "message": "timestamp must be ISO 8601 in UTC"
    }
  ],
  "request_id": "req_01J9X4R2B8"
}
```

### Error codes

| Status | `code` | Cause | What to do |
| --- | --- | --- | --- |
| `400` | `batch_too_large` | More than 500 events | Split into smaller batches |
| `401` | `invalid_key` | Missing, revoked, or malformed key | Check the key in the Admin Console |
| `413` | `payload_too_large` | Request body over 1 MB | Send fewer or smaller events |
| `429` | `rate_limited` | Over 1,000 requests per second | Wait for `Retry-After` seconds, then retry |
| `503` | `service_unavailable` | Temporary capacity issue | Retry with exponential backoff |

:::tip Retries
Retry `429` and `503` responses with exponential backoff, starting at 1 second. Include an `Idempotency-Key` header with a unique value per batch, so a retried batch is never counted twice.
:::

---

## Get a source's status

`GET /sources/{source_id}/status`

Returns recent volume and error counts for one source.

### Path parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `source_id` | string | The source ID, shown in the Admin Console |

### Example response

```json
{
  "source_id": "src_web_prod",
  "window": "1h",
  "events_accepted": 1284003,
  "events_rejected": 412,
  "top_rejection_code": "invalid_timestamp"
}
```

## OpenAPI specification excerpt

The reference above is written from this specification:

```yaml
openapi: 3.0.3
info:
  title: Meridian Events API
  version: 2.0.0
servers:
  - url: https://api.meridian-analytics.example/v2
paths:
  /events:
    post:
      summary: Send events
      operationId: sendEvents
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/EventBatch'
      responses:
        '202':
          description: All events accepted
        '207':
          description: Some events rejected
        '429':
          description: Rate limited
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
  schemas:
    EventBatch:
      type: object
      required: [events]
      properties:
        events:
          type: array
          minItems: 1
          maxItems: 500
          items:
            $ref: '#/components/schemas/Event'
    Event:
      type: object
      required: [name, timestamp]
      properties:
        name:
          type: string
          pattern: '^[A-Za-z0-9_]{1,64}$'
        timestamp:
          type: string
          format: date-time
        user_id:
          type: string
        properties:
          type: object
          maxProperties: 100
```
