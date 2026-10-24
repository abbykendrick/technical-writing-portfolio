---
id: style-guide
title: Documentation Style Guide
sidebar_label: Style Guide
---

<div className="sample-note">

**Sample type:** Contributor style guide for a docs-as-code repository · **Audience:** engineers and writers contributing docs · **Fictional company**

</div>

These rules keep Meridian's engineering docs consistent, whoever writes them. For anything not covered here, follow the [Google developer documentation style guide](https://developers.google.com/style).

## Voice

- **Write to the reader as "you."** "Run the command," not "The user should run the command."
- **Use active voice.** "The collector rejects invalid events," not "Invalid events are rejected."
- **Put the action first.** Start each step with a verb.
- **Keep sentences short.** Aim for under 25 words.

## Structure

- **Start with the point.** The first sentence of a page says what the page helps you do.
- **One task per procedure.** If a procedure branches, split it or use a decision table.
- **Number steps that must happen in order.** Use bullets for everything else.
- **Show the result.** After a step that changes something, say how to confirm it worked.

## Formatting

| Element | Format | Example |
| --- | --- | --- |
| UI labels | Bold | Select **Save** |
| Commands, file names, values | Code | Run `kubectl get pods` |
| Placeholders | Angle brackets in code | `<source-id>` |
| Menu paths | Bold with arrows | **Sources → Keys** |
| Warnings | Admonition, not bold text | `:::warning` |

## Terminology

| Use | Not |
| --- | --- |
| sign in | log in, login (as a verb) |
| select | click on, hit |
| allowlist, denylist | whitelist, blacklist |
| primary, replica | master, slave |

## Contributing

1. Create a branch from `main`.
2. Write or edit Markdown in `docs/`.
3. Run `npm run build` locally. The build fails on broken links.
4. Open a pull request. A docs owner and a subject matter expert review it.
5. After merge, GitHub Actions deploys the site automatically.
