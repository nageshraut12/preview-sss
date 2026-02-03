# Smart Situation Support System

This project is a lightweight prototype for the Smart Situation Support System (S4). It includes a
front-end experience inspired by the provided design reference and a small Node/Express backend that
returns an AI-style response for submitted situations.

## Run locally

Install dependencies and start the server:

```bash
npm install
npm run dev
```

Then visit `http://127.0.0.1:8000`.

## API

`POST /api/analyze`

```json
{
  "category": "Technical",
  "situation": "Login errors are impacting multiple users."
}
```

The API responds with a structured response plan used by the UI.
