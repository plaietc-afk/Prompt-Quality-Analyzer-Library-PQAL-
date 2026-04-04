# PQAL — Prompt Quality Analyzer & Library

A web-based tool that analyzes AI prompt quality using professional prompt engineering frameworks (CRISPE, COSTAR, and Anthropic Prompt Engineering Guidelines), provides dimension-level scoring, actionable feedback, improved prompt suggestions, and a persistent personal prompt library.

## Features

- **AI-Powered Analysis** — Scores prompts across 6 dimensions: Clarity, Specificity, Context, Output Format, Role Assignment, Conciseness
- **Animated Score Display** — SVG progress ring and color-coded dimension bars
- **Improved Prompt Generation** — AI-rewritten best-practice version with one-click copy
- **Prompt Library** — Save, search, filter, and manage your best prompts (localStorage)
- **Dark Theme** — Full dark UI with accessible contrast ratios
- **Thai + English** — Full Unicode support for Thai and English prompts; Buddhist Era date formatting
- **Responsive** — Works from 375px mobile to 1440px desktop

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/plaietc-afk/Prompt-Quality-Analyzer-Library-PQAL-.git
cd Prompt-Quality-Analyzer-Library-PQAL-

# 2. Install dependencies
npm install

# 3. Set your API key
cp .env.example .env
# Edit .env and add your Anthropic API key

# 4. Start the server
npm start
# Open http://localhost:3000
```

## Tech Stack

- **Frontend**: React 18 (CDN) + Tailwind CSS (CDN) — single-file component, no build step
- **Backend**: Express.js — serves static files and proxies Anthropic API calls
- **Storage**: Browser localStorage with `promptlib:` key prefix
- **API**: Anthropic Claude API (claude-sonnet-4-20250514)

## Architecture

```
index.html   — Full React app (single-file component with all UI/logic)
server.js    — Express server (static files + /api/analyze proxy)
.env         — ANTHROPIC_API_KEY (never committed)
```

The server acts as a secure proxy so the API key stays server-side and is never exposed to the browser.

## Scoring Frameworks

| Framework | Scope |
|-----------|-------|
| CRISPE | Capacity/Role, Request, Insight/Context, Statement, Personality/Format, Experiment |
| COSTAR | Context, Objective, Style, Tone, Audience, Response Format |
| Anthropic Guidelines | Clarity, specificity, role prompting, output structure, conciseness |
