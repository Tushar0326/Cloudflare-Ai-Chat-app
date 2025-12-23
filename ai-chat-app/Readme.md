# 🚀 AI Chat Application on Cloudflare

An AI-powered chat application built using **Cloudflare Workers**, **Workers AI**, and **SQLite-backed Durable Objects** to support persistent, multi-turn conversations.  
The project is fully implemented in **JavaScript** and developed using **VS Code**.

---

## 📌 Overview

This application demonstrates how to build a **stateful AI-powered application on Cloudflare**.  
Users interact with an LLM through a web-based chat interface, while conversation memory is stored using Durable Objects to maintain context across requests.

The app is deployed on a Cloudflare-managed `*.workers.dev` subdomain and is fully compatible with the **Cloudflare Free Plan**.

---

## ✨ Features

- 💬 Chat-based AI interaction
- 🧠 Persistent conversational memory
- 🔁 Multi-turn, context-aware responses
- ⚡ Edge deployment using Cloudflare Workers
- 🆓 Free-plan compatible (SQLite-backed Durable Objects)
- 🧩 Clean, modular JavaScript codebase

---

## 🏗 Architecture


---

## 🛠 Tech Stack

### Core
- **Cloudflare Workers** – Application logic
- **Workers AI** – LLM inference
- **Durable Objects (SQLite-backed)** – Persistent memory/state
- **HTML, CSS, JavaScript** – Frontend UI
- **Wrangler CLI** – Development & deployment

### LLM
- `@cf/meta/llama-3.1-8b-instruct`

---

## 🧩 Cloudflare Requirement Mapping

| Requirement | Implementation |
|------------|----------------|
| LLM | Workers AI (Llama 3.1) |
| Workflow / Coordination | Cloudflare Workers |
| User Input | Static Web UI |
| Memory / State | SQLite-backed Durable Objects |
| Deployment | `*.workers.dev` subdomain |

---

## 🧠 Memory / State Design

- Each user session maps to a **Durable Object instance**
- Conversation history is stored in **SQLite-backed storage**
- Memory is fetched on every request and injected into the LLM prompt
- Old messages are trimmed to manage token usage

This enables:
- Multi-turn conversations
- Context retention
- Personalized responses

---

## 📂 Project Structure


---

## ▶️ Run Locally

### Prerequisites
- Node.js (v18+)
- Cloudflare account
- Wrangler CLI

### Install Wrangler
```bash
npm install -g wrangler
