# Grant+ Agent Notes

## App Purpose

Grant+ — “ทุนที่ใช่ ไปได้ไกลกว่า” — is a Thai research-funding one-stop service prototype for researchers, research coordinators, citizens, and SMEs. Preserve the core flow: public funding news, mock Google/government login, researcher-versus-registrant identity, AI Smart Match, template-completeness check, auto-filled application form, overridable semantic warning, success confirmation, email preview, and application status tracking.

## Business Rules To Preserve

- Keep the primary palette anchored on Trust Blue `#1E3A8A` with clean white and gray backgrounds.
- The public first experience must show useful open-fund news and a clear route to login, not a marketing-only landing page.
- Readiness checks only content and document completeness against each fund template; it does not score Problem, Desirability, Usability, Feasibility, or Viability.
- Semantic similarity is an alert requiring acknowledgement, not an automatic submission block.
- Applicant details shown in the form are demo-only auto-filled data from NDID and business registration sources.
- Do not imply the app is production-ready for real personal data until real identity, storage, access, audit, and agency review workflows are added.

## Project Organization

- `src/app`: page, layout, and global CSS.
- `src/components/govfund`: business workflow screens and forms.
- `src/components/ui`: reusable accessible interface pieces. Use Base UI behavior for dialogs, menus, tabs, selects, and similar primitives.
- `src/data`: starter/demo data.
- `src/types`: business record types.
- `src/lib`: display rules, calculations, storage, permissions, and formatting helpers.
- `src/db`: database schema and connection helpers.
- `db/migrations`: generated migrations.
- `docs`: owner-facing app, operating, launch, and change records.

## Verification

Run these before calling a change ready:

```bash
npm run build
npm test
```

Use current official docs or installed package docs before changing App Router, metadata, Base UI, Tailwind, Drizzle, or Sites deployment behavior.

## Deployment Assumptions

This project uses the existing Sites-compatible vinext setup and `.openai/hosting.json`. Keep real secrets out of the repo. For hosted persistence, add environment examples and document the required real database/storage values before launch.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
