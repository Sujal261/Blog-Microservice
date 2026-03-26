# Microservices Blog Platform

A full-stack blog application built with a microservices architecture:
- Auth service (Django + DRF + JWT in cookies)
- Blog service (Django + DRF)
- Frontend (React + Vite + Tailwind)
- Nginx reverse proxy
- PostgreSQL for each backend service
- Docker Compose orchestration

## Features

- User registration and login
- Cookie-based authentication with access/refresh token flow
- Protected routes in frontend
- Create, read, update, and delete blog posts
- Per-user post filtering for authenticated users

## Project Structure

- `auth-service/`: user registration, login, refresh, logout, current-user endpoint
- `blog-service/`: post CRUD endpoints with auth-protected access
- `frontend/`: React client for auth and post management
- `nginx.conf`: reverse proxy for frontend and API services
- `docker-compose.yml`: starts all containers and databases

## Architecture

Request flow:
1. Frontend sends auth requests to `/account/*` through Nginx.
2. Auth service issues JWT tokens as HTTP-only cookies.
3. Frontend sends blog requests to `/blog/*` with cookies.
4. Blog service validates JWT and serves only authorized data.

## Tech Stack

- Backend: Django, Django REST Framework, SimpleJWT, PyJWT
- Frontend: React, Vite, Axios, Tailwind CSS
- Infra: Docker, Docker Compose, Nginx
- Databases: PostgreSQL (auth-db, blog-db)

## Prerequisites

- Docker
- Docker Compose

## Setup and Run

From repository root:

```bash
docker compose up --build
```

Services:
- App entrypoint (Nginx): `http://localhost`
- Frontend direct: `http://localhost:5173`
- Auth service internal route prefix: `/account/`
- Blog service internal route prefix: `/blog/`

## Environment Variables

Both services load environment variables from:
- `auth-service/app/app/.env`
- `blog-service/app/app/.env`

Recommended minimum variables:

```env
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
SECRET_KEY=
```

Do not commit real `.env` files to GitHub.

## API Overview

Auth service:
- `POST /account/register/`
- `POST /account/login/`
- `POST /account/refresh/`
- `POST /account/logout/`
- `GET /account/me/`

Blog service:
- `POST /blog/create/`
- `GET /blog/all/`
- `GET /blog/<id>/`
- `PATCH /blog/update/<id>/`
- `DELETE /blog/delete/<id>/`

## Development Notes

- Authentication is cookie-based, so `withCredentials: true` is required on frontend requests.
- If model fields change, run migrations inside the corresponding service container.
- Keep `SECRET_KEY` consistent if one service verifies tokens issued by another.

## Common Commands

```bash
# Start
docker compose up --build

# Stop
docker compose down

# View logs
docker compose logs -f

# Run Django migrations (service examples)
docker compose exec auth-service python app/manage.py migrate
docker compose exec blog-service python app/manage.py migrate
```

## Preparing for GitHub Push

1. Ensure secrets are not tracked:
   - `.env`
   - database files
   - virtualenv directories
2. Commit source code and docs only.
3. Add a license if required.

## License

Add your preferred license (MIT, Apache-2.0, etc.) before publishing.
