# Limontrello Agent Instructions

## Project overview
- This repository is a full-stack productivity app inspired by Trello.
- The backend is a Flask application under `app/` with API routes in `app/api/`, models in `app/models/`, and forms in `app/forms/`.
- The frontend is a React + Redux app under `react-app/src/` with components, views, and store logic.
- Styling is mostly CSS modules and component-scoped styles rather than inline styles.
- The app uses PostgreSQL in production and a Flask/SQLAlchemy backend.

## Working conventions
- Keep changes small and consistent with existing patterns in the nearby files.
- Read the relevant route/component file and its sibling files before editing.
- Prefer matching the repository's existing naming, structure, and serialization patterns.
- For backend work, follow the conventions in `app/api/*.py`, `app/models/*.py`, and `app/forms/*.py`.
- For frontend work, follow the structure in `react-app/src/components`, `react-app/src/store`, and `react-app/src/views`.
- Use the existing CSS module approach for UI styling unless a global style is clearly required.
- Do not add new frontend or backend dependencies unless they are clearly necessary and already consistent with the project.
- When changing database models, consider whether a migration is needed and keep schema changes intentional.

## Local development commands
- Install Python dependencies:
  - `pipenv install -r requirements.txt`
- Install frontend dependencies:
  - `cd react-app && npm install`
- Run database migrations:
  - `pipenv run flask db upgrade`
- Seed demo data:
  - `pipenv run flask seed all`
- Start the backend:
  - `pipenv run flask run`
- Start the frontend in a second terminal:
  - `cd react-app && npm start`
- Build the frontend for production:
  - `cd react-app && npm run build`
- If using a recent Node version with this older CRA/Webpack stack, build with:
  - `cd react-app && NODE_OPTIONS=--openssl-legacy-provider npm run build`

## Validation guidance
- Prefer targeted validation after edits: run the relevant backend route tests or a focused frontend build if appropriate.
- If you add or change environment variables, keep `.env.example` aligned and document them where needed.
- When making API changes, verify the frontend still sends/handles the expected payload shape.
- When making UI changes, respect existing React/Redux patterns and keep user flows consistent.

## Priority
- Preserve the existing app behavior and architecture unless the task explicitly requires a refactor or a new feature.
- Favor correctness, clarity, and compatibility with the current Flask + React stack.
