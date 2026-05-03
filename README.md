# Election Guide Assistant 🗳️

An interactive, AI-powered assistant that helps users understand the election process, voting timelines, and democratic steps — powered by the **Google Gemini API (free)**.

---

## Features

- **Smart context switching** — 5 topic modes (General, Voter Registration, Running for Office, Timelines, Understanding Results)
- **AI-powered responses** — real answers from Google Gemini (free tier)
- **Dynamic quick chips** — suggested questions update per context
- **Neutral & nonpartisan** — explains processes factually
- **Responsive design** — works on mobile and desktop
- **Dark mode support** — follows system preference
- **No build tools required** — pure HTML, CSS, JS

---

## Project Structure

```
election-guide-assistant/
├── index.html          # Main HTML shell
├── public/
│   └── favicon.svg     # App icon
├── src/
│   ├── style.css       # All styles (dark mode included)
│   ├── config.js       # API key, model config & system prompts
│   ├── chips.js        # Quick chip data & renderer
│   ├── assistant.js    # Gemini API calls & message rendering
│   └── main.js         # App bootstrap & event wiring
└── README.md
```

---

## Setup

### 1. Get a free Gemini API key

1. Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Create API key**
4. Copy the key (starts with `AIza...`)

### 2. Add the key to config.js

Open `src/config.js` and replace the placeholder:

```js
const CONFIG = {
  API_KEY: "AIzaSy...",   // ← your key here
  ...
};
```

### 3. Run locally

No build step needed. Open `index.html` directly, or use a local server:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Visit `http://localhost:8080`.

---

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from branch → main → / (root)**
4. Save — live in ~60 seconds at:
   ```
   https://YOUR_USERNAME.github.io/election-guide-assistant/
   ```

```bash
git init
git add .
git commit -m "Initial commit: Election Guide Assistant (Gemini)"
git remote add origin https://github.com/YOUR_USERNAME/election-guide-assistant.git
git push -u origin main
```

---

## Deploy to Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
3. Connect your repo, leave build command blank, publish directory `.`
4. Deploy

---

## Gemini API — Free Tier Limits

| Model | Free RPM | Free RPD | Notes |
|---|---|---|---|
| gemini-1.5-flash | 15 | 1,500 | Used in this app |
| gemini-1.5-pro | 2 | 50 | More capable, lower limits |

For most demo and personal projects, the free tier is more than enough.

---

## Extending the App

### Add a new context tab

1. `src/config.js` — add to `CTX_MAP`:
   ```js
   international: "The user is asking about elections in other countries.",
   ```

2. `src/chips.js` — add to `CHIP_SETS`:
   ```js
   international: [
     { label: "UK elections", question: "How do UK general elections work?" },
   ],
   ```

3. `index.html` — add button:
   ```html
   <button class="ctx-btn" data-ctx="international">International</button>
   ```

### Add conversation memory (multi-turn)

Store messages and pass full history to Gemini:

```js
contents: [
  { role: "user",  parts: [{ text: "First question" }] },
  { role: "model", parts: [{ text: "First answer" }] },
  { role: "user",  parts: [{ text: userText }] },
]
```

---

## Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **AI**: Google Gemini API — `gemini-1.5-flash` (free)
- **Hosting**: GitHub Pages / Netlify / Vercel
- **No frameworks, no build tools**

---

## License

MIT — free to use, modify, and deploy.
