# Portfolio API

## Run locally

Start the API from the `server` directory with `pnpm dev`. Swagger UI is
available at <http://localhost:8000/api-docs>, and the OpenAPI JSON document is
available at <http://localhost:8000/api-docs.json>.

The contact form uses `CONTACT_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`,
`SMTP_USER`, and `SMTP_PASS` from the server environment. Contact messages are
stored in MongoDB and can be listed by an administrator at
`GET /api/v1/contact`.

## Tests and checks

- `pnpm test` runs schema validation tests and API smoke tests.
- `pnpm typecheck` checks TypeScript without emitting files.
- `pnpm build` compiles the server.
