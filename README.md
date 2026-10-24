# Technical Writing Portfolio

Documentation samples by **Abby Kendrick**, senior technical writer for engineering, cloud, and security documentation.

**Live site:** https://abbykendrick.github.io/technical-writing-portfolio/

## Samples

| Sample | Shows |
| --- | --- |
| [C4 Architecture Overview](docs/architecture-c4.md) | System explained at two zoom levels, with Mermaid diagrams |
| [Incident Runbook](docs/runbook-high-cpu.md) | On-call steps with checks, decision points, and escalation |
| [REST API Reference](docs/api-reference.md) | Endpoint reference built from an OpenAPI 3.0 spec |
| [Release Notes](docs/release-notes.md) | Customer-facing changes, including a breaking change |
| [SSP Excerpt](docs/ssp-excerpt.md) | NIST SP 800-171 control statements for CMMC Level 2 |
| [Change Control SOP](docs/sop-change-control.md) | Roles, steps, and approval gates |
| [Style Guide](docs/style-guide.md) | Contributor rules for a docs-as-code repository |

All samples describe a fictional company, Meridian Analytics. No client material is included.

## Built with

- [Docusaurus](https://docusaurus.io) and Markdown
- Mermaid diagrams as code
- GitHub Actions: builds every pull request, fails on broken links, and deploys `main` to GitHub Pages

## Run locally

```bash
npm install
npm start
```
