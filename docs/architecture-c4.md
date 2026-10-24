---
id: architecture-c4
title: "Meridian Ingest Platform: Architecture Overview"
sidebar_label: C4 Architecture Overview
---

<div className="sample-note">

**Sample type:** Architecture overview using the [C4 model](https://c4model.com) · **Audience:** engineers joining the platform team · **Fictional company**

</div>

The Ingest Platform collects event data from customer applications, validates it, and makes it queryable within five minutes. This page describes the system at two levels: how it fits into Meridian's wider environment (Context), and the services it is built from (Containers).

## Level 1: System context

```mermaid
flowchart LR
    dev["Customer developer<br/>[Person]"]
    app["Customer application<br/>[External system]"]
    ingest["Ingest Platform<br/>[Software system]"]
    wh["Analytics Warehouse<br/>[Software system]"]
    idp["Okta<br/>[External system]"]
    pd["PagerDuty<br/>[External system]"]

    dev -- "Configures sources, views status" --> ingest
    app -- "Sends events over HTTPS" --> ingest
    ingest -- "Writes validated events" --> wh
    ingest -- "Authenticates users via OIDC" --> idp
    ingest -- "Sends alerts" --> pd
```

| Element | Responsibility | Owner |
| --- | --- | --- |
| Ingest Platform | Receive, validate, and route events | Platform team |
| Analytics Warehouse | Store events and serve queries | Data team |
| Okta | User sign-in for the console | IT |
| PagerDuty | On-call alerting | SRE |

## Level 2: Containers

```mermaid
flowchart TB
    app["Customer application"]
    subgraph platform["Ingest Platform (AWS us-east-1)"]
        gw["API Gateway<br/>[Amazon API Gateway]<br/>Auth, rate limiting"]
        col["Collector Service<br/>[Go, EKS]<br/>Schema validation"]
        q["Event Queue<br/>[Amazon MSK / Kafka]<br/>Buffering, replay"]
        proc["Stream Processor<br/>[Python, EKS]<br/>Enrichment, dedupe"]
        dlq["Dead-letter Store<br/>[Amazon S3]"]
        console["Admin Console<br/>[React, CloudFront]"]
        meta["Config Database<br/>[Amazon RDS PostgreSQL]"]
    end
    wh["Analytics Warehouse"]

    app -- "POST /v2/events (HTTPS)" --> gw
    gw --> col
    col -- "Valid events" --> q
    col -- "Invalid events" --> dlq
    q --> proc
    proc -- "Batched writes" --> wh
    console -- "Reads and writes source config" --> meta
    col -- "Reads schemas" --> meta
```

## Key design decisions

| Decision | Reason | Trade-off accepted |
| --- | --- | --- |
| Validate in the Collector, before the queue | Bad data never reaches the warehouse, and customers get errors immediately | Collector latency rises slightly under heavy schema checks |
| Kafka between collection and processing | Absorbs traffic spikes; events can be replayed after a processor bug | One more system to operate and monitor |
| Invalid events go to S3, not dropped | Support can show customers exactly what was rejected and why | Storage cost, managed with a 30-day lifecycle rule |

## Where to go next

- On-call: [High CPU runbook](runbook-high-cpu.md)
- Integrators: [REST API reference](api-reference.md)
