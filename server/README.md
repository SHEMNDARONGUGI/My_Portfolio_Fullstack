# Portfolio API

## Run locally

Start the API from the `server` directory with `pnpm dev`. Swagger UI is
available at <http://localhost:8000/api-docs>, and the OpenAPI JSON document is
available at <http://localhost:8000/api-docs.json>.

The contact form uses `CONTACT_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`,
`SMTP_USER`, and `SMTP_PASS` from the server environment. Contact messages are
stored in MongoDB and can be listed by an administrator at
`GET /api/v1/contact`.

## Deploy to Vercel

The repository root `vercel.json` defines the public `client` and `server`
services. Configure `MONGO_URI` and `JWT_SECRET` as Vercel environment
variables for the server; configure the SMTP variables above if contact email
delivery is needed. The client calls the API through the same-origin
`/api/v1` path.

Image uploads use `/tmp` when running on Vercel. Vercel Functions do not
provide durable local storage, so uploaded images may disappear or be
unavailable across function instances. Use object storage before relying on
persistent uploads in production.

## Tests and checks

- `pnpm test` runs schema validation tests and API smoke tests.
- `pnpm typecheck` checks TypeScript without emitting files.
- `pnpm build` compiles the server.
