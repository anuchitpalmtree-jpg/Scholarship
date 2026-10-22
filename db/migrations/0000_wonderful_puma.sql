CREATE TABLE "grant_applications" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"form" jsonb NOT NULL,
	"fund_name" text NOT NULL,
	"receipt_code" text,
	"review_stage" integer DEFAULT 1 NOT NULL,
	"saved_at" timestamp with time zone NOT NULL,
	"submitted_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grant_sessions" (
	"token_hash" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grant_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"role" text NOT NULL,
	"registrant_name" text NOT NULL,
	"registrant_email" text NOT NULL,
	"researcher_name" text NOT NULL,
	"researcher_email" text NOT NULL,
	"institution" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "grant_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "grant_applications" ADD CONSTRAINT "grant_applications_user_id_grant_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."grant_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grant_sessions" ADD CONSTRAINT "grant_sessions_user_id_grant_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."grant_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "grant_applications_user_id_idx" ON "grant_applications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "grant_sessions_user_id_idx" ON "grant_sessions" USING btree ("user_id");