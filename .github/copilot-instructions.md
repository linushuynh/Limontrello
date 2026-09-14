# Copilot instructions for Limontrello

## Project context
- This repo is a Trello-inspired productivity app with a Flask backend and a React/Redux frontend.
- Backend code lives in `app/` and frontend code lives in `react-app/src/`.
- Keep backend API, model, and form conventions aligned with the existing structure.

## Stack and architecture
- Python + Flask + SQLAlchemy for the backend.
- React 17, Redux, React Router, and CSS Modules for the frontend.
- Database models and routes should match the patterns already used in `app/models`, `app/api`, and `app/forms`.
- Frontend components and state logic should follow the existing pattern under `react-app/src/components` and `react-app/src/store`.

## Editing expectations
- Be surgical: make the smallest change that fits the existing architecture.
- Read the nearby files before editing so you match the established style and naming conventions.
- Prefer reusable patterns already used in the codebase instead of introducing ad hoc abstractions.
- Do not add dependencies unless the project clearly already expects them.
- If database schema changes are needed, keep them deliberate and migration-aware.

## Local commands
- Backend setup: `pipenv install -r requirements.txt`
- Frontend setup: `cd react-app && npm install`
- Run migrations: `pipenv run flask db upgrade`
- Seed data: `pipenv run flask seed all`
- Start backend: `pipenv run flask run`
- Start frontend: `cd react-app && npm start`
- Production build: `cd react-app && npm run build`
- If using a recent Node version with this older CRA/Webpack stack, build with: `cd react-app && NODE_OPTIONS=--openssl-legacy-provider npm run build`

## Validation
- Check the affected route or component behavior after edits.
- Keep frontend and backend contracts in sync when API payloads change.
- If environment variables change, update `.env.example` and document any new requirements.
