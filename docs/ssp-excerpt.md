---
id: ssp-excerpt
title: "System Security Plan Excerpt: Meridian Federal Enclave"
sidebar_label: SSP Excerpt (NIST SP 800-171)
---

<div className="sample-note">

**Sample type:** System Security Plan (SSP) excerpt for CMMC Level 2 · **Audience:** assessors and compliance staff · **Fictional company and system**

</div>

This excerpt shows the system description and four control implementation statements from the SSP for the Meridian Federal Enclave. The full plan covers all 110 security requirements in [NIST SP 800-171 Rev. 2](https://csrc.nist.gov/pubs/sp/800/171/r2/upd1/final).

## 1. System identification

| Field | Value |
| --- | --- |
| System name | Meridian Federal Enclave (MFE) |
| System owner | Director of Federal Programs |
| Authorizing official | Chief Information Security Officer |
| Information types | Controlled Unclassified Information (CUI): contract technical data |
| Hosting | AWS GovCloud (US-West), single account, dedicated VPC |
| Users | 42 U.S. persons on the Federal Programs team |
| Assessment target | CMMC Level 2, third-party (C3PAO) assessment |

## 2. System boundary

The enclave boundary includes the GovCloud VPC, its workloads, and the managed laptops used to reach it. Corporate email, the commercial data platform, and personal devices are **outside** the boundary and cannot reach enclave resources.

| In scope | Out of scope |
| --- | --- |
| GovCloud VPC and all workloads in it | Commercial AWS accounts |
| 42 managed laptops (Intune-enrolled) | Personal and unmanaged devices |
| Okta Federal tenant (enclave users only) | Corporate Okta tenant |
| Splunk Cloud for Government (enclave logs) | Corporate SIEM |

## 3. Control implementation statements

Each statement names who does what, with which tool, and where the evidence lives, so an assessor can verify it.

---

### 3.1.1: Limit system access to authorized users, processes, and devices

**Status:** Implemented

**Implementation:**
Access to MFE requires an account in the Okta Federal tenant. Accounts are created only after the Federal Programs Director approves an access request in ServiceNow (form *MFE-AR-01*) and HR confirms U.S.-person status. Device access is restricted by an Okta device-trust policy that admits only Intune-enrolled laptops in a compliant state. Service accounts are defined in Terraform and reviewed in pull requests before deployment.

**Responsible role:** Identity and Access Management lead
**Evidence:** ServiceNow access request records; Okta policy *MFE-DeviceTrust*; quarterly access review sign-offs (SharePoint: *MFE/Compliance/AccessReviews*)

---

### 3.3.1: Create and retain system audit logs

**Status:** Implemented

**Implementation:**
AWS CloudTrail, VPC Flow Logs, Okta System Log, and endpoint logs from Microsoft Defender forward to Splunk Cloud for Government. Logs are retained for 1 year in Splunk and 3 years in an S3 bucket with Object Lock in compliance mode, which prevents deletion or alteration during retention. The Security Operations team reviews high-priority alerts daily and generates a weekly log-health report confirming that every source is still reporting.

**Responsible role:** Security Operations lead
**Evidence:** Splunk data inventory; S3 Object Lock configuration; weekly log-health reports

---

### 3.5.3: Use multifactor authentication

**Status:** Implemented

**Implementation:**
All interactive access to MFE requires multifactor authentication through Okta, using FIDO2 security keys. SMS and voice factors are disabled tenant-wide. Privileged access to AWS uses the same Okta sign-in plus a separate role session limited to one hour.

**Responsible role:** Identity and Access Management lead
**Evidence:** Okta authenticator policy export; AWS IAM Identity Center session settings

---

### 3.13.11: Employ FIPS-validated cryptography to protect CUI

**Status:** Partially implemented. See POA&M item **MFE-2026-07**.

**Implementation:**
Data at rest is encrypted with AWS KMS in GovCloud, which uses FIPS 140-validated hardware security modules. Data in transit uses TLS 1.2 or higher through AWS FIPS endpoints. Laptops use BitLocker with FIPS mode enforced by Intune policy.

**Gap:** One legacy reporting job transfers files using a library that has not been confirmed as FIPS-validated.
**Remediation:** Replace the transfer with an S3 FIPS endpoint upload. Owner: Platform lead. Target date: 2026-12-15.

**Evidence:** KMS key policies; Intune BitLocker configuration profile; POA&M register
