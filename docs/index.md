---
id: index
title: About These Samples
sidebar_label: About
slug: /
---

These samples show the kinds of documentation I write for engineering, cloud, and security teams. Each one is written for a specific reader and a specific job.

<div className="sample-note">

All samples describe **Meridian Analytics**, a fictional data-platform company. Systems, people, hostnames, and figures are invented. No client material appears anywhere on this site.

</div>

| Sample | Audience | What it shows |
| --- | --- | --- |
| [C4 Architecture Overview](architecture-c4.md) | Engineers, new hires | Explaining a system at two zoom levels, with the reasoning behind design choices |
| [Incident Runbook](runbook-high-cpu.md) | On-call engineers | Steps that work at 3 a.m.: checks before actions, clear exit points, escalation |
| [REST API Reference](api-reference.md) | Developers integrating with the API | Consistent endpoint reference built from an OpenAPI specification |
| [Release Notes](release-notes.md) | Customers and support | What changed, what breaks, and what to do about it |
| [System Security Plan Excerpt](ssp-excerpt.md) | Assessors, compliance staff | NIST SP 800-171 implementation statements that can be verified |
| [Change Control SOP](sop-change-control.md) | Engineering and operations | Roles, steps, and approval gates without ambiguity |
| [Documentation Style Guide](style-guide.md) | Contributors | The rules that keep a docs repository consistent |

## How this site is built

This portfolio is itself a docs-as-code project:

- **Markdown in Git.** Every page is a Markdown file in the [repository](https://github.com/abbykendrick/technical-writing-portfolio).
- **Pull-request review.** Changes go through branches and pull requests.
- **Automated builds.** GitHub Actions builds the site and fails on broken links, then deploys to GitHub Pages.
- **Diagrams as code.** Architecture diagrams are written in Mermaid, so they are versioned and reviewed like text.
