import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import type { ApplicationFormData, LoginRole } from "@/src/types/govfund";

export const grantUsers = pgTable("grant_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  role: text("role").$type<LoginRole>().notNull(),
  registrantName: text("registrant_name").notNull(),
  registrantEmail: text("registrant_email").notNull(),
  researcherName: text("researcher_name").notNull(),
  researcherEmail: text("researcher_email").notNull(),
  institution: text("institution").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const grantSessions = pgTable(
  "grant_sessions",
  {
    tokenHash: text("token_hash").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => grantUsers.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("grant_sessions_user_id_idx").on(table.userId)],
);

export const grantApplications = pgTable(
  "grant_applications",
  {
    id: text("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => grantUsers.id, { onDelete: "cascade" }),
    form: jsonb("form").$type<ApplicationFormData>().notNull(),
    fundName: text("fund_name").notNull(),
    receiptCode: text("receipt_code"),
    reviewStage: integer("review_stage").default(1).notNull(),
    savedAt: timestamp("saved_at", { withTimezone: true }).notNull(),
    submittedAt: timestamp("submitted_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("grant_applications_user_id_idx").on(table.userId)],
);
