---
id: release-notes
title: "Release Notes: Ingest Platform 2.4"
sidebar_label: Release Notes
---

<div className="sample-note">

**Sample type:** Customer-facing release notes · **Audience:** customers and support staff · **Fictional company**

</div>

**Released:** October 6, 2026

Version 2.4 adds partial-batch acceptance, raises payload limits, and retires the v1 Events API.

## Action required

:::danger Breaking change: v1 Events API retired on January 15, 2027
Requests to `https://api.meridian-analytics.example/v1/` will return `410 Gone` after that date. Move to v2 before then.

**To migrate:**
1. Change the base URL from `/v1` to `/v2`.
2. Rename the request field `data` to `events`.
3. Handle the new `207` response (see below).

Most integrations take under an hour. See the [API reference](api-reference.md) for full details.
:::

## New

- **Partial-batch acceptance.** A batch with some invalid events is no longer rejected in full. Valid events are accepted, and the response (`207 Multi-Status`) lists each rejected event with its index and reason.
- **Idempotency keys.** Send an `Idempotency-Key` header to make retries safe. A batch retried with the same key within 24 hours is not counted twice.
- **Rejection reasons in the console.** **Sources → Rejected events** now shows the 100 most recent rejections with the original payload.

## Improved

- Maximum request size raised from 512 KB to **1 MB**.
- Median time from submission to queryable data reduced from 4 minutes to **90 seconds**.

## Fixed

- Events with timestamps exactly at midnight UTC were sometimes assigned to the previous day.
- The **Sources** page no longer times out for accounts with more than 200 sources.

## Known issues

- The rejected-events view does not yet support filtering by error code. A fix is planned for 2.4.1.
