# CLINOVA — Starter Project

Bilingual (Arabic/English) AI-powered medical learning platform.

## Included in this starter
- Responsive dashboard UI with Arabic/English toggle.
- Navigation placeholders for AI Tutor, Clinical Simulation, Question Bank, Medical Library, and Community.
- AI Tutor API route using the OpenAI Responses API (server-side key only).
- Initial Supabase/PostgreSQL schema with profiles, cases, attempts, progress, and AI conversations.
- Environment variable template.

## Requirements
- Node.js 20.9+
- npm
- Supabase project (for authentication/database)
- OpenAI API key (to activate AI Tutor)

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000.

The dashboard preview works without Supabase credentials. The AI endpoint returns a setup message until `OPENAI_API_KEY` is configured.

## Configure Supabase
1. Create a project in Supabase.
2. Copy Project URL and anon/public key into `.env.local`.
3. Open SQL Editor and run `supabase/schema.sql`.
4. Authentication UI and protected routes are the next implementation milestone.

## Configure AI
Add `OPENAI_API_KEY` and optionally `OPENAI_MODEL` to `.env.local`. Keep the API key server-side; never prefix it with `NEXT_PUBLIC_`.

## Important status
This is a working project scaffold, not a production-ready medical product. Registration, persistent sessions, real case engine, billing, admin tools, and content review workflows are not yet implemented. Clinical content must be reviewed against current authoritative guidelines before publication. Do not use patient-identifiable information in test cases.

## Suggested build order
1. Auth (signup, login, email verification, profile onboarding).
2. Database integration and role-based access.
3. AI Tutor chat UI with saved conversations and source-aware responses.
4. Case engine (structured patient state, investigations, decisions, scoring, deterioration rules).
5. Question bank, OSCE/AI Patient, library, admin content tools.
6. Testing, security review, accessibility, deployment.
