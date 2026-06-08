# Porsche Website

A full-stack Porsche showroom and ordering application built with React,
Express, and MongoDB. It includes vehicle browsing, interactive 3D models,
authentication with email verification, ordering, user profiles, and an admin
dashboard.

## Requirements

- Node.js 20 or newer
- npm
- MongoDB
- An SMTP account for login and registration verification emails

## Installation

Install the backend and frontend dependencies:

```powershell
npm install
cd views
npm install
cd ..
```

## Environment

Create a `.env` file in the project root:

```env
PORT=5000
DB_URI=mongodb+srv://username:password@cluster.example.mongodb.net/porsche
SESSION_SECRET=replace-with-a-long-random-value
CORS_ORIGIN=http://localhost:5173

SEED_ADMIN_NAME=Admin
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=replace-with-a-strong-password

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
MAIL_FROM=Porsche <orders@example.com>
```

`DB_URI`, `SESSION_SECRET`, and `CORS_ORIGIN` are required. The seed admin
values are optional, but all three must be provided together. SMTP is required
for the verification-code login and registration flow.

Use `SMTP_SECURE=true` with port `465`. Port `587` normally uses
`SMTP_SECURE=false` and upgrades the connection with STARTTLS.

## Development

Run the backend from the project root:

```powershell
npm run dev
```

In another terminal, run the frontend:

```powershell
cd views
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` requests to the backend at
`http://localhost:5000`.

## Production

Build the React frontend and start Express:

```powershell
npm run build
npm start
```

Express serves the production frontend from `views/dist`. Set `CORS_ORIGIN` to
the public application URL in production.

## Available Scripts

From the project root:

- `npm run dev` starts the Express API with Nodemon.
- `npm run build` builds the React frontend.
- `npm start` starts the production Express server.

From `views`:

- `npm run dev` starts the Vite development server.
- `npm run build` creates the production frontend bundle.
- `npm run lint` runs ESLint.
- `npm run preview` previews the frontend build.

## Email and Admin Behavior

Login and registration require a six-digit email code. Codes expire after 10
minutes, allow five attempts, and can be resent after 60 seconds.

The configured seed administrator is created or updated when the backend
starts. Order confirmation and order-status emails use the same SMTP
configuration. Order operations still succeed if an optional notification
email cannot be delivered.

## Health Check

The backend health endpoint is:

```text
GET /api/health
```
