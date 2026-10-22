# Grant+ Deployment Notes

## Current Launch State

| Path | Status | Notes |
| --- | --- | --- |
| Local demo | Ready | Run `npm run dev` with a development database URL |
| Vercel prototype | Ready | Next.js app and Neon database are connected; data-entry persistence and remembered-device cookie work |
| Private hosted demo | Prepared | Sites build metadata remains in `.openai/hosting.json`; provide a compatible database binding before using API routes there |
| Internal pilot | Not ready | Needs real identity/access, file storage, audit trail, privacy review, backup policy, and review ownership |
| Production | Not ready | Needs security, privacy, monitoring, backups, real agency workflows |

## Required Environment Values

โหมดกรอกข้อมูลต้องมีค่าฐานข้อมูลฝั่งเซิร์ฟเวอร์ โดย Vercel/Neon integration จัดการค่า production และ `.env.local` ใช้เฉพาะเครื่องพัฒนา ห้าม commit secret

| Value | Purpose |
| --- | --- |
| `DATABASE_URL` หรือ `POSTGRES_URL` | การเชื่อมต่อ PostgreSQL/Neon; ต้องมีอย่างน้อยหนึ่งค่า |
| `GOOGLE_CLIENT_ID` and server-side OAuth values | Google sign-in and approved domains |
| File storage bucket binding or URL | Proposal and pitch deck storage |
| AI service key or managed matching endpoint | Smart Match recommendations |
| Notification service values | Researcher, coordinator, and officer notifications |

Never commit real secrets.

## Database Setup

The current app uses Neon PostgreSQL for data-entry persistence. Schema lives in `src/db/schema.ts` and versioned migrations live in `db/migrations`.

1. Copy `.env.example` to an ignored local env file and provide a Neon URL.
2. Run `npm run db:generate` after schema changes.
3. Review the generated SQL before running `npm run db:migrate`.
4. Ensure the Vercel project has the same database environment values before deploy.
5. For a real pilot, add approved fund, application event, uploaded file, audit, retention, and recovery records.

## Access Setup

The remembered-device cookie is a prototype convenience flow, not proof of identity. A real launch needs:

- Applicant sign-in policy.
- Delegated-submission policy, researcher consent, and audit history separating the researcher from the registrant.
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
