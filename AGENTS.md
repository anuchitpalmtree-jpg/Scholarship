# GovFund Match Agent Notes

## App Purpose

GovFund Match is a Thai government funding one-stop service prototype for citizens and SMEs. Preserve the core flow: NDID mock login, AI Smart Match, recommended funds, auto-filled application form, success confirmation, and application status tracking.

## Business Rules To Preserve

- Keep the primary palette anchored on Trust Blue `#1E3A8A` with clean white and gray backgrounds.
- The first experience should be directly usable, not a marketing-only landing page.
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
