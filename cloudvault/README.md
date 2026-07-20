# CloudVault AI

An AI-powered secure multi-cloud storage assistant — landing page, login, and dashboard, built with React + Vite + Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/   Reusable UI: Navbar, Hero, Features, Sidebar, AIAssistantPanel, etc.
  pages/        Landing.jsx, Login.jsx, Dashboard.jsx (routed in App.jsx)
  styles/       Tailwind entry point + custom tokens
  App.jsx       Route table
  main.jsx      React root + BrowserRouter
```

## Notes

- This is a front-end demo: login and cloud connections are stubbed (no backend calls), so the data on the dashboard and AI assistant panel is illustrative.
- Wire up `Login.jsx`'s `handleSubmit` and the "Connect" buttons in `CloudAccounts.jsx` to real auth/OAuth endpoints for production use.
