# GovFund Match Operating Details

## Record Definitions

| Record | Fields in current app | Notes |
| --- | --- | --- |
| Applicant profile | Name, company, registration number, address | Stored as starter data in `src/data/govfund-demo-data.ts` |
| Fund | ID, title, agency, match score, tags | Used to render recommendation cards |
| Application | Project title, fund, status, date, progress, tone | Used to render the status dashboard |
| Readiness assessment | Dimension, assumption question, base score, risk level, evidence checklist, note | Prototype state is local to the current browser session |
| Data dependency | Source, purpose, mock readiness state | Highlights integrations that need agency confirmation |

## Status Values

| Status | Meaning | Display |
| --- | --- | --- |
| กำลังพิจารณา (Under Review) | Agency is reviewing the application | Amber badge and progress bar |
| ขอเอกสารเพิ่มเติม (Action Required) | Applicant must provide more information | Red badge and progress bar |

Future status values should include draft, submitted, eligibility check, approved, rejected, paid, and closed.

## Calculations And Display Rules

- Highest match score is calculated from the available fund list.
- Action-required count is calculated from applications marked with the red status tone.
- Match badges are green at 90% or higher, blue at 70-89%, and gray below 70%.
- Progress bars are visual only and do not currently calculate from workflow timestamps.
- Overall readiness is the percentage of completed evidence items across all five dimensions.
- Dimension base scores communicate workshop prioritization; they do not change dynamically and are not government approval scores.
- Feasibility remains the highest-priority risk until cross-agency APIs, data quality, duplicate-funding detection, and maintenance ownership are validated.

## Seed And Demo Data

Starter data is intentionally realistic but not real personal data. Keep it in `src/data` until shared persistence is added.

## Imports, Exports, And Files

- PDF upload is a visual prototype only.
- No imports or exports are implemented yet.
- A pilot should add PDF storage, antivirus/content checks, file size limits, and downloadable review packets.

## Ownership And Support

| Area | Suggested owner for pilot |
| --- | --- |
| Fund catalog and eligibility wording | Government program owner |
| Applicant support | One-stop service operations team |
| Matching rules | Product owner with agency representatives |
| Data access and privacy | Security and compliance owner |
| Technical maintenance | Web app maintainer |

## Support Expectations

Before a real pilot, define who answers applicant questions, who corrects bad fund data, who handles document requests, and who can change status values.
