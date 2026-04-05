# PQAL — Prompt Quality Analyzer & Library

A web-based tool that analyzes AI prompt quality using professional prompt engineering frameworks (CRISPE, COSTAR, and Anthropic Prompt Engineering Guidelines), provides dimension-level scoring, actionable feedback, improved prompt suggestions, and a persistent personal prompt library.

## Features

- **AI-Powered Analysis** — Scores prompts across 6 dimensions: Clarity, Specificity, Context, Output Format, Role Assignment, Conciseness
- **Google Sign-In** — OAuth authentication via Supabase for multi-user support
- **Cloud Library** — Save, search, filter, and manage prompts per user (Supabase PostgreSQL)
- **Animated Score Display** — SVG progress ring and color-coded dimension bars
- **Improved Prompt Generation** — AI-rewritten best-practice version with one-click copy
- **Dark Theme** — Full dark UI with accessible contrast ratios
- **Thai + English** — Full Unicode support; Buddhist Era date formatting
- **Responsive** — 375px mobile to 1440px desktop

## API Keys

### Groq API (for AI analysis)
1. Sign up at [console.groq.com](https://console.groq.com) (free, no credit card)
2. Go to **API Keys** > **Create API Key**
3. Users enter their own key via the key icon in the app header

### Supabase (for auth + database)
1. Create a project at [supabase.com](https://supabase.com) (free tier)
2. Go to **Settings** > **API** and copy the **Project URL** and **anon/public key**
3. Enable **Google OAuth** in **Authentication** > **Providers** > **Google**
4. Run the SQL migration in **SQL Editor** (see `supabase-migration.sql`)
5. Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` to your `.env` file

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create an OAuth 2.0 Client ID (Web application)
3. Add your Supabase callback URL: `https://<your-project>.supabase.co/auth/v1/callback`
4. Copy the **Client ID** and **Client Secret** into Supabase Google provider settings

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/plaietc-afk/Prompt-Quality-Analyzer-Library-PQAL-.git
cd Prompt-Quality-Analyzer-Library-PQAL-

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your Supabase URL and anon key

# 4. Run the database migration
# Copy contents of supabase-migration.sql into Supabase SQL Editor and run

# 5. Start the server
npm start
# Open http://localhost:3000
```

## Tech Stack

- **Frontend**: React 18 (CDN) + Tailwind CSS (CDN) + Supabase JS (CDN)
- **Backend**: Express.js — serves static files + proxies Groq API
- **Auth**: Supabase Auth (Google OAuth)
- **Database**: Supabase PostgreSQL with Row Level Security
- **AI**: Groq (Llama 3.3 70B) — free tier

## Architecture

```
index.html              — Full React app (auth, analyze, cloud library)
server.js               — Express server (/api/config, /api/analyze proxy)
supabase-migration.sql  — Database table + RLS policies
.env                    — SUPABASE_URL, SUPABASE_ANON_KEY, GROQ_API_KEY (never committed)
```

## Scoring Frameworks

| Framework | Scope |
|-----------|-------|
| CRISPE | Capacity/Role, Request, Insight/Context, Statement, Personality/Format, Experiment |
| COSTAR | Context, Objective, Style, Tone, Audience, Response Format |
| Anthropic Guidelines | Clarity, specificity, role prompting, output structure, conciseness |
