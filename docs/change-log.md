# GovFund Match Change Log

## 2026-08-27

- Reworked authentication to offer mock ThaiD, ทางรัฐ, and NDID sign-in.
- Added a responsive sidebar workspace, notification dropdown, PMU funding timeline, and interactive AI funding assistant.
- Added Smart Match loading, suggested-fund selection, company Auto-fill, and the One-contract application flow.
- Added a semantic anti-double-funding check that blocks applications matching a previous PMU-B project by 80%.
- Consolidated prototype state and inline mock records in the GovFund workflow component.

## 2026-08-20

- Created the GovFund Match frontend prototype with NDID mock login, AI Smart Match, recommended funds, auto-filled application form, success dialog, and status dashboard.
- Published the first private Sites demo.
- Refactored the established app to the business-app structure under `src/`.
- Split starter data, record types, display rules, and GovFund workflow screens into dedicated folders.
- Added Base UI-backed success dialog behavior.
- Added business-facing specification, operating details, deployment notes, and future-agent instructions.
