# Sheet Assistant — Standalone App Setup (Free Version, using Groq)

This turns the chatbot into a real app that works outside claude.ai, completely
free, using Groq's free API (a fast, free-tier AI provider — different company
from Anthropic/Claude, but works the same way for this app).

## 1. Get a free Groq API key (2 minutes, no card needed)

1. Go to https://console.groq.com and sign up (Google/GitHub login works).
2. Go to "API Keys" in the left sidebar → "Create API Key".
3. Copy the key (starts with `gsk_...`). Save it somewhere safe — you won't
   see it again.
4. No billing setup needed — Groq's free tier doesn't require a card.

Note: Groq's free tier has rate limits (a generous number of requests per day/minute,
fine for personal use). If you ever hit a limit, just wait a bit and try again.

## 2. Install Node.js (if you don't have it)

Download from https://nodejs.org (LTS version). Check it worked:
```
node --version
```

## 3. Set up the project

1. Unzip this folder (`sheet-assistant-app`) somewhere on your computer.
2. Open a terminal in that folder.
3. Install dependencies:
   ```
   npm install
   ```
4. Set your API key as an environment variable:

   **Mac/Linux:**
   ```
   export GROQ_API_KEY=gsk_your-key-here
   ```
   **Windows (PowerShell):**
   ```
   $env:GROQ_API_KEY="gsk_your-key-here"
   ```

5. Start the server:
   ```
   npm start
   ```
6. Open your browser to **http://localhost:3000** — the chat should now work,
   completely free.

## 4. Put it on your phone (optional, for real standalone use)

Running it on your laptop only works on that laptop. To use it from your phone
like a real app, deploy it online — still free:

### Render.com (recommended, free tier)
1. Push this folder to a GitHub repository (create a free account if needed).
2. Go to https://render.com → New → Web Service → connect your GitHub repo.
3. Build Command: `npm install`, Start Command: `npm start`.
4. Under "Environment", add `GROQ_API_KEY` with your key as the value.
5. Deploy — Render gives you a public URL (like `yourapp.onrender.com`) you
   can open from your phone's browser, from anywhere.
6. On your phone, open that URL in Chrome → menu (⋮) → "Add to Home screen" —
   now it behaves like a real app icon.

Render's free tier sleeps after inactivity and takes ~30 seconds to wake up
on first use after idling — that's normal for free hosting, not a bug.

## Notes

- **Never put your API key directly in the HTML/frontend code.** It must stay
  on the server (in the environment variable) — otherwise anyone visiting your
  site could see and steal it from the page source.
- **Model quality**: Groq runs Llama 3.3 70B, a strong open-source model — very
  capable for spreadsheet tasks like sorting, summarizing, and writing the small
  code snippets this app needs, though it may occasionally reason a bit
  differently than Claude would on tricky or ambiguous requests.
- **.env file (optional convenience)**: create a file named `.env` containing:
  ```
  GROQ_API_KEY=gsk_your-key-here
  ```
  Then run `npm install dotenv` and add `require('dotenv').config();` as the
  first line of `server.js`. Add `.env` to `.gitignore` (already done) so it's
  never pushed to a public GitHub repo.
