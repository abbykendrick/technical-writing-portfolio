---
id: quickstart
title: "Quickstart: Send Your First Event"
sidebar_label: Developer Quickstart
---

<div className="sample-note">

**Sample type:** Developer quickstart · **Audience:** developers new to the Events API · **Fictional company**

</div>

In about five minutes, you'll send an event from your application to Meridian and see it arrive. This guide uses a sandbox key, so nothing reaches your production data.

## Before you begin

You need:

- A Meridian account with access to the Admin Console
- Either `curl` (installed on macOS and most Linux systems) or Python 3.9 or later

## 1. Create a sandbox key

1. In the Admin Console, go to **Sources → Keys**.
2. Select **Create key**, choose **Sandbox**, and name it `quickstart`.
3. Copy the key. It starts with `mk_test_`.

:::warning
The key is shown only once. If you lose it, delete it and create a new one.
:::

Store the key in an environment variable so it stays out of your code:

```bash
export MERIDIAN_KEY="mk_test_your_key_here"
```

## 2. Send an event

Send one `signup_completed` event using either curl or Python.

**Using curl**

```bash
curl -X POST https://api.meridian-analytics.example/v2/events \
  -H "Authorization: Bearer $MERIDIAN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "events": [
      {
        "name": "signup_completed",
        "timestamp": "2026-11-02T14:30:00Z",
        "user_id": "u_quickstart",
        "properties": {"plan": "trial"}
      }
    ]
  }'
```

**Using Python**

Install the `requests` library if you don't have it:

```bash
pip install requests
```

Then save this as `send_event.py` and run `python send_event.py`:

```python
import os
from datetime import datetime, timezone

import requests

response = requests.post(
    "https://api.meridian-analytics.example/v2/events",
    headers={"Authorization": f"Bearer {os.environ['MERIDIAN_KEY']}"},
    json={
        "events": [
            {
                "name": "signup_completed",
                "timestamp": datetime.now(timezone.utc).isoformat(timespec="seconds"),
                "user_id": "u_quickstart",
                "properties": {"plan": "trial"},
            }
        ]
    },
    timeout=10,
)

print(response.status_code, response.json())
```

## 3. Check the response

A successful request returns `202 Accepted`:

```json
{
  "accepted": 1,
  "rejected": 0,
  "request_id": "req_01J9X4Q7Z3"
}
```

If you see something else, check this table:

| You see | Likely cause | Fix |
| --- | --- | --- |
| `401` with `invalid_key` | The key is missing or mistyped | Run `echo $MERIDIAN_KEY` and confirm it starts with `mk_test_` |
| `207` with `invalid_timestamp` | The timestamp isn't ISO 8601 in UTC | Use the format `2026-11-02T14:30:00Z` |
| `KeyError: 'MERIDIAN_KEY'` in Python | The environment variable isn't set in this terminal | Run the `export` command from step 1 again |

## 4. See it in the console

1. In the Admin Console, go to **Sources → Sandbox → Live events**.
2. Your `signup_completed` event appears within about 90 seconds.

That's it: your application can now send events to Meridian.

## Next steps

- **Send events in batches.** Up to 500 events per request. See [Send events](api-reference.md#send-events).
- **Make retries safe.** Add an `Idempotency-Key` header so a retried batch isn't counted twice.
- **Go to production.** Create a key with **Production** selected and swap it into `MERIDIAN_KEY`. Nothing else in your code changes.
