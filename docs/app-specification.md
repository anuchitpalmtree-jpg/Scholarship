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
| Authentication | Start secure access through a government identity channel | Mock ThaiD, ทางรัฐ, or NDID login |
| Dashboard | Monitor upcoming PMU funding windows | Review funding timeline, open AI assistant |
| AI Smart Match | Capture a project idea and recommend funds | Enter idea, wait for analysis, choose a fund |
| One-contract Application | Prepare a one-stop funding request | AI auto-fill company profile, add project details, attach proposal, submit |
| Application Status | Track submitted funding requests | View status, submitted date, action-needed items, and auto alerts |

## Information Tracked

- Applicant profile: name, company, business registration number, address.
- Funds: title, agency, match score, tags.
- Application: project title, fund, status, status color, submitted date, progress.
- Notifications and chatbot messages: local prototype state only.

## Reporting

The dashboard shows:

- Number of open funds, approaching deadlines, applications under review, and actions required.
- PMU funding timeline from September through December 2026.
- Status table with submitted dates and action-required badges.

Future leadership reports should include agency filters, application volume, approval cycle time, requested budget, and document-completion rates.

## Workflow Rules

- Login buttons are mock ThaiD, ทางรัฐ, and NDID handoffs and do not validate a real identity.
- Smart Match simulates analysis before revealing starter recommendations; it does not call a live AI service yet.
- AI Auto-fill populates demo applicant and company data locally.
- Submit simulates a semantic duplicate-funding check and blocks the request with an 80% PMU-B similarity warning.
- The notification bell and funding-rule chatbot use local mock messages.
- File upload is visual only in this prototype and does not store files.

## Open Decisions

- Which real agencies and fund programs launch first.
- Whether the first pilot uses public sign-in, invited SME accounts, or agency-managed access.
- Whether shared data should use Postgres, Cloudflare D1, or an existing government data platform.
- Who owns review status changes and applicant support after launch.
