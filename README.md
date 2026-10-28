# Shem Ndaro Portfolio

A full-stack portfolio website with a public-facing profile, a content-management dashboard, and a REST API. Portfolio data is stored in MongoDB and managed through the admin interface.

## Features

- Public portfolio sections for about, experience, projects, education, certifications, skills, services, and contact.
- Admin sign-in and dashboard for managing portfolio content and viewing contact messages.
- Image uploads for portfolio content.
- Contact message storage, with optional email delivery through SMTP.
- API documentation served by Swagger UI.
- Separate CI checks for the client and server, with production deployment to Vercel after successful CI.

## Technology

- **Client:** React, TypeScript, Vite, Tailwind CSS
- **Server:** Node.js, Express, TypeScript
- **Database:** MongoDB with Mongoose
- **Package manager:** pnpm
- **Deployment:** Vercel

## Requirements

- Node.js 22 or later
- pnpm 11.0.9 (the version used by CI)
- A MongoDB connection string

## Local development

Install dependencies and configure the server first:

```bash
cd server
pnpm install
cp .env.example .env.local
```

Edit `server/.env.local` and set at least:

| Variable | Purpose |
| --- | --- |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign authentication tokens |
| `CLIENT_URL` | Client origin allowed by the API; use `http://localhost:5173` locally |
| `ADMIN_USERNAME` | Username used when creating the initial admin account |
| `ADMIN_PASSWORD` | Password used when creating the initial admin account |
| `PORT` | API port; defaults to `8000` |

Contact email delivery is optional. Configure `CONTACT_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, and `SMTP_PASS` to enable it. Contact messages are stored in MongoDB even when SMTP is not configured.

Start the API in one terminal:

```bash
cd server
pnpm dev
```

In another terminal, create `client/.env.local` with the local API URL:

```dotenv
VITE_API_URL=http://localhost:8000/api/v1
```

Then install dependencies and start the client:

```bash
cd client
pnpm install
pnpm dev
```

Open the Vite URL shown in the terminal (normally <http://localhost:5173>). The API is available at <http://localhost:8000>.

### Create the initial admin account

Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `server/.env.local`, then run this once:

```bash
cd server
pnpm create-admin
```

Sign in at <http://localhost:5173/admin/login>. Keep the admin password and `JWT_SECRET` private; do not commit environment files or credentials.

## Useful URLs

| Path | Description |
| --- | --- |
| `/` | Public portfolio |
| `/admin/login` | Admin sign-in |
| `/admin` | Admin dashboard |
| `/api/health` | API health check |
| `/api-docs` | Interactive Swagger documentation |
| `/api-docs.json` | OpenAPI document |

The versioned API is mounted at `/api/v1`. It provides endpoints for authentication, projects, experience, education, skills, certifications, services, contact messages, and uploads.

## Checks

Run commands from the relevant package directory:

```bash
# Client
cd client
pnpm lint
pnpm build

# Server
cd ../server
pnpm typecheck
pnpm test
pnpm build
```

## Deployment

The root `vercel.json` configures the client and server services for Vercel. Set the required server environment variables (`MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL`) in the Vercel project. Add the SMTP variables if contact email delivery is required.

The GitHub Actions deployment workflow runs after successful CI on `main` or `master`. Configure these GitHub Actions repository secrets for deployment:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

The server stores uploaded images on local disk during development. On Vercel, uploads are written to temporary storage and are not durable between function instances. Use persistent object storage if uploaded images must remain available in production.

## Project layout

```text
.
├── .github/workflows/   # CI and Vercel deployment workflows
├── client/              # React frontend and admin dashboard
├── server/              # Express API, MongoDB models, and tests
└── vercel.json          # Vercel client/server service configuration
```
