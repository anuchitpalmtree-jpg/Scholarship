# GovFund Match Deployment Notes

## Current Launch State

| Path | Status | Notes |
| --- | --- | --- |
| Local demo | Ready | Run `npm run dev` and open the local URL |
| Private hosted demo | Prepared | Uses Sites metadata in `.openai/hosting.json` |
| Internal pilot | Not ready | Needs shared data, access setup, file storage, review ownership |
| Production | Not ready | Needs security, privacy, monitoring, backups, real agency workflows |

## Required Environment Values

No real environment values are required for the current frontend-only demo.

Future shared-data launch should add an ignored `.env` and a committed `.env.example` documenting:

| Value | Purpose |
| --- | --- |
| `DATABASE_URL` or `POSTGRES_URL` | Hosted database connection |
| File storage bucket binding or URL | Proposal and pitch deck storage |
| AI service key or managed matching endpoint | Smart Match recommendations |
| Notification service values | Applicant and officer notifications |

Never commit real secrets.

## Database Setup

The current app uses starter data and local component state. The database folder is prepared but contains no business tables yet.

For a pilot:

1. Confirm the shared database choice.
2. Add applicant, fund, application, application event, and uploaded file records.
3. Generate migrations into `db/migrations`.
4. Run migrations in the hosted environment.
5. Import approved starting fund data.

## Access Setup

Current access is a mock NDID button. A real launch needs:

- Applicant sign-in policy.
- Agency reviewer access.
- View-only leadership access.
- Administrator access for catalog and support changes.
- Audit history for status and document changes.

## Backup And Rollback Expectations

For production, define database backups, file retention, rollback ownership, and a plan for correcting bad status updates or duplicate applications.

## Go-Live Checklist

- Real fund catalog approved by agency owners.
- Real identity and access rules approved.
- Database and file storage provisioned.
- Proposal upload limits and safety checks defined.
- Agency review workflow tested.
- Applicant support owner assigned.
- Monitoring and backup expectations documented.
- Privacy notice and data retention policy approved.
