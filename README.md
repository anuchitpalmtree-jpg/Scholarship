# GovFund Match

GovFund Match is a frontend business-app prototype for a Thai government funding one-stop service. It helps Thai citizens and SMEs sign in with a mock NDID flow, describe an innovation project, receive suggested government funds, submit a pre-filled application, and track application status.

## Current Scope

- Frontend demo with realistic starter data.
- NDID mock login, AI Smart Match, auto-filled application form, success dialog, and status dashboard.
- Business-app structure under `src/` with docs for owners and future maintainers.
- Private Sites deployment metadata in `.openai/hosting.json`.

## Useful Commands

```bash
npm install
npm run dev
npm run build
npm test
```

## Project Shape

- `src/app`: page, layout, and global styles.
- `src/components/govfund`: GovFund Match screens and workflow pieces.
- `src/components/ui`: shared accessible interface pieces.
- `src/data`: demo and starter data.
- `src/types`: business record shapes.
- `src/lib`: display rules and shared calculations.
- `src/db`: database connection and schema placeholders.
- `db/migrations`: generated database migrations when persistence is added.
- `docs`: business specification, operating details, launch notes, and change log.

## Demo Notes

The app currently uses local component state and starter data. A production pilot should add a shared database, real identity/access rules, upload storage, exportable reports, and agency review workflows before handling real applicant information.
