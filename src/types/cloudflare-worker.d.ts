type D1Database = unknown;
type Fetcher = {
  fetch: typeof fetch;
};

declare module "cloudflare:workers" {
  export const env: {
    DB?: D1Database;
  };
}
