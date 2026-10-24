---
id: sop-change-control
title: "SOP: Production Change Control"
sidebar_label: Change Control SOP
---

<div className="sample-note">

**Sample type:** Standard operating procedure · **Audience:** engineering and operations staff · **Fictional company**

</div>

| | |
| --- | --- |
| **Document ID** | SOP-ENG-014 |
| **Version** | 3.1 |
| **Owner** | Change Advisory Board (CAB) chair |
| **Effective** | 2026-08-01 |
| **Review cycle** | Annual |

## Purpose

This procedure makes sure every change to production is reviewed, approved, and reversible, so changes don't cause unplanned outages or compliance findings.

## Scope

Applies to any change to production infrastructure, application code, configuration, or access controls. Does **not** apply to development or staging environments.

## Change types

| Type | Definition | Approval | Example |
| --- | --- | --- | --- |
| **Standard** | Pre-approved, low-risk, repeatable | None per change; the template is approved annually | Adding a user to an existing role |
| **Normal** | Any change that isn't standard or emergency | CAB | New service deployment, database schema change |
| **Emergency** | Needed now to restore service or fix an active security issue | Incident commander, then CAB review afterward | Rolling back a failed deploy during an outage |

## Roles

| Role | Responsibility |
| --- | --- |
| **Requester** | Opens the change request and carries out the change |
| **Peer reviewer** | Checks the plan, test evidence, and rollback steps |
| **CAB** | Approves normal changes at the Tuesday and Thursday meetings |
| **Incident commander** | Approves emergency changes during an incident |

## Procedure: normal change

1. **Open a change request** in ServiceNow at least two business days before the planned change. Include:
   - What is changing and why
   - Systems affected
   - Planned date and time window
   - Test evidence from staging
   - Rollback steps, with expected time to roll back
2. **Get peer review.** A peer reviewer checks the request and marks it *Reviewed*. The reviewer cannot be the requester.
3. **Present at CAB.** The requester attends the next CAB meeting. CAB records one of:
   - **Approved:** proceed in the planned window.
   - **Approved with conditions:** proceed after meeting the listed conditions.
   - **Rejected:** revise and resubmit.
4. **Make the change** within the approved window only.
5. **Verify.** Confirm the change works and monitoring shows no new errors for 30 minutes.
   - If verification fails, roll back immediately and set the request to *Rolled back*.
6. **Close the request** with the result and any follow-up tickets.

## Procedure: emergency change

1. The incident commander approves the change in the incident channel.
2. Make the change and record the time and the commands run.
3. Within one business day, open a retroactive change request linked to the incident.
4. CAB reviews it at the next meeting.

## Records

ServiceNow keeps all change records for three years. They are evidence for SOX IT general controls and CMMC configuration management requirements.

## Revision history

| Version | Date | Change | Author |
| --- | --- | --- | --- |
| 3.1 | 2026-08-01 | Added 30-minute verification step | A. Kendrick |
| 3.0 | 2026-02-10 | Split emergency procedure into its own section | A. Kendrick |
