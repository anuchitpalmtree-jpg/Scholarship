# GovFund Match App Specification

## Business Goal

Help Thai citizens and SMEs find suitable government innovation and research funds faster, reduce repeated form entry, and track application progress in one place.

## People And Permissions

| People using the app | What they can do in this prototype | Future pilot need |
| --- | --- | --- |
| SME applicant | Sign in with mock NDID, describe a project, view matched funds, draft and submit an application | Real sign-in, saved drafts, upload history |
| Government program officer | Represented through status labels only | Review queue, status updates, document requests |
| Leadership or fund owner | View summary numbers and application status | Portfolio reporting, filters, exports |
| Platform administrator | Not implemented | User access, data setup, audit and support tools |

## Main Screens And Workflows

| Screen | Purpose | Key actions |
| --- | --- | --- |
| Landing and Login | Explain the service and start secure access | Mock NDID login |
| Dashboard and AI Smart Match | Capture a project idea and recommend funds | Enter idea, run Smart Match, choose a fund |
| Application Form | Submit a one-stop funding request | Review auto-filled profile, add project title, budget, PDF upload, save draft, submit |
| Application Status | Track submitted funding requests | View status, progress, submitted date, action-needed items |

## Information Tracked

- Applicant profile: name, company, business registration number, address.
- Funds: title, agency, match score, tags.
- Application: project title, fund, status, status color, submitted date, progress.
- Draft state: prototype-only confirmation when the draft button is clicked.

## Reporting

The dashboard shows:

- Number of funds available for matching.
- Highest match score.
- Number of applications requiring action.
- Status list with progress indicators.

Future leadership reports should include agency filters, application volume, approval cycle time, requested budget, and document-completion rates.

## Workflow Rules

- Login is a mock NDID handoff and does not validate a real identity.
- Smart Match reveals starter fund recommendations; it does not call a live AI service yet.
- Auto-filled applicant fields are read-only in the application form.
- Submit moves the person to the status screen and shows a success dialog.
- File upload is visual only in this prototype and does not store files.

## Open Decisions

- Which real agencies and fund programs launch first.
- Whether the first pilot uses public sign-in, invited SME accounts, or agency-managed access.
- Whether shared data should use Postgres, Cloudflare D1, or an existing government data platform.
- Who owns review status changes and applicant support after launch.
