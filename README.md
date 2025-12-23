# AI Chat Application on Cloudflare

An AI-powered chat application built with Cloudflare Workers, Workers AI, and SQLite-backed Durable Objects to support persistent, multi-turn conversations. The project is implemented in JavaScript and developed using VS Code.

## Table of contents
- [Overview](#overview)
- [Features](#features)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [Memory / State Design](#memory--state-design)
- [Prerequisites](#prerequisites)
- [Run locally](#run-locally)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview
This app demonstrates how to build a stateful AI-powered application on Cloudflare. Users interact with a large language model (LLM) through a web-based chat interface while conversation memory is stored via Durable Objects (backed by SQLite) to maintain context across requests and sessions.

The app is compatible with Cloudflare's free Workers tier and is designed to be simple to run locally and to deploy.

## Features
- Chat-based AI interaction
- Persistent conversation memory across sessions
- Multi-turn, context-aware responses
- Edge deployment using Cloudflare Workers
- SQLite-backed Durable Objects for low-cost persistence
- Clean, modular JavaScript codebase

## Architecture & Tech Stack
Core components:
- Cloudflare Workers — application logic and HTTP endpoints
- Workers AI — LLM inference (configured to use an available Cloudflare model)
- Durable Objects (SQLite-backed) — persistent per-session memory/state
- Frontend — static HTML/CSS/JavaScript chat UI
- Wrangler CLI — development & deployment

LLM example used:
- `@cf/meta/llama-3.1-8b-instruct` (configured via Workers AI; changeable in code/config)

## Memory / State Design
- Each user session maps to a Durable Object instance.
- Conversation history is stored in SQLite-backed storage within the Durable Object.
- Memory is fetched on each request and injected into the LLM prompt.
- Older messages are trimmed to manage token usage and stay within model limits.

This design enables multi-turn conversations, context retention, and personalized responses.

## Prerequisites
- Node.js v18 or newer
- A Cloudflare account
- Wrangler CLI (Cloudflare's developer tool)

Install Wrangler globally (if needed):
```bash
npm install -g wrangler
```

## Run locally
1. Clone the repo:
```bash
git clone https://github.com/Tushar0326/Cloudflare-Ai-Chat-app.git
cd Cloudflare-Ai-Chat-app
```

2. Install dependencies:
```bash
npm install
```

3. Authenticate Wrangler with your Cloudflare account:
```bash
wrangler login
```

4. Run a local development server:
```bash
wrangler dev
```
Note: Local development can emulate much of Workers behavior, but Workers AI and Durable Objects behavior may differ from production. When testing Workers AI integration, prefer a deployed preview or follow Cloudflare docs for any required feature flags.

## Deployment
1. Ensure `wrangler.toml` is configured with your `account_id` and any necessary routes or bindings.
2. Publish to your workers.dev subdomain:
```bash
wrangler publish
```
After publish, your site will be available at the Cloudflare-managed `*.workers.dev` subdomain you configured.

## Configuration
Common configuration points:
- `wrangler.toml`: set `account_id`, routes, Durable Object bindings, and environment-specific settings.
- Environment variables / secrets: store API keys or model selection via Cloudflare dashboard or `wrangler secret put`.
- Model selection: change the Workers AI model reference in the application code if you want to use a different model.

Helpful links:
- Cloudflare Workers docs: https://developers.cloudflare.com/workers/
- Workers AI docs: https://developers.cloudflare.com/workers/runtime-apis/ai
- Durable Objects docs: https://developers.cloudflare.com/workers/platform/learning/using-durable-objects

(Always follow Cloudflare docs for the latest instructions and required permissions.)

## Contributing
Contributions are welcome. Open an issue for bugs or feature requests and submit pull requests for changes. Please follow standard GitHub contribution practices (describe your change, add tests if applicable, and keep commits focused).

## License
Specify or add a license file (e.g., MIT) if you want to make this project open source. If a license is already present, follow its terms.

## Acknowledgements
Built with Cloudflare Workers and Workers AI. Example model used: `@cf/meta/llama-3.1-8b-instruct`.

If you want, I can:
- Update this README further with exact `wrangler.toml` examples and recommended secrets.
- Add usage examples (sample conversations and screenshots).
- Create contributing guidelines and a license file.

