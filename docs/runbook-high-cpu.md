---
id: runbook-high-cpu
title: "Runbook: Sustained High CPU on the Collector Service"
sidebar_label: Incident Runbook
---

<div className="sample-note">

**Sample type:** Operational runbook · **Audience:** on-call engineers · **Fictional company**

</div>

| | |
| --- | --- |
| **Alert** | `collector-cpu-high`: average CPU above 85% for 10 minutes |
| **Severity** | SEV-2 (SEV-1 if event acceptance rate drops below 95%) |
| **Service owner** | Platform team, `#platform-oncall` |
| **Escalation** | Platform secondary on-call, then Engineering Manager |
| **Last reviewed** | 2026-09-14 |

## Impact

When Collector pods are CPU-starved, request latency rises and the API Gateway begins returning `503` errors. Customers see failed event submissions. Events are not lost on the server side, but clients without retry logic may drop them.

## Before you start

- Access to the `prod-ingest` EKS cluster (`kubectl` context `prod-ingest`)
- The **Collector Overview** dashboard in Grafana
- Write access to the `ingest-config` repository

## 1. Confirm the impact

1. Open the **Collector Overview** dashboard and check the **Acceptance rate** panel.
   - **At or above 99%:** the service is coping. Continue diagnosing, but treat it as SEV-3.
   - **Below 95%:** declare SEV-1 in `#incidents` before continuing.
2. Check the number of running pods:

   ```bash
   kubectl -n ingest get hpa collector
   ```

   If `REPLICAS` equals `MAXPODS`, autoscaling has hit its ceiling. Go to [Step 3](#3-add-capacity).

## 2. Find the cause

Check these in order. Each is ranked by how often it has caused this alert.

| Check | How | If true |
| --- | --- | --- |
| Traffic spike from one customer | Dashboard → **Requests by source** | Go to [4A](#4a-traffic-spike-from-one-source) |
| New or changed schema | `git log --since="6 hours ago"` in `ingest-config` | Go to [4B](#4b-recent-schema-change) |
| Recent Collector deploy | `kubectl -n ingest rollout history deploy/collector` | Go to [4C](#4c-recent-deploy) |

If none of these apply, go to [Step 3](#3-add-capacity) and escalate.

## 3. Add capacity

Raise the autoscaler ceiling temporarily to buy time:

```bash
kubectl -n ingest patch hpa collector \
  -p '{"spec":{"maxReplicas":40}}'
```

**Verify:** within 5 minutes, CPU per pod should fall below 70% on the dashboard.

:::warning
This patch is overwritten on the next deploy. Open a ticket to make any lasting change in the `ingest-config` repository.
:::

## 4. Resolve

### 4A. Traffic spike from one source

1. Note the `source_id` from the **Requests by source** panel.
2. Apply a temporary rate limit through the Admin Console: **Sources → *source* → Limits → 500 req/s**.
3. Notify the account owner in `#customer-escalations` with the `source_id` and time window.

### 4B. Recent schema change

1. Identify the commit that changed the schema.
2. Revert it:

   ```bash
   git revert <commit-sha>
   git push origin main
   ```

3. **Verify:** the config sync job completes (about 2 minutes), and CPU falls.

### 4C. Recent deploy

Roll back to the previous version:

```bash
kubectl -n ingest rollout undo deploy/collector
kubectl -n ingest rollout status deploy/collector
```

## 5. Close out

- Return `maxReplicas` to its configured value if you changed it.
- Post a summary in the incident channel: cause, action taken, and time resolved.
- For SEV-1 or SEV-2, schedule a postmortem within five business days.
