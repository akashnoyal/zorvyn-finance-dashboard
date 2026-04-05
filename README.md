# Zorvyn Finance Dashboard

A responsive finance dashboard built with Next.js, Tailwind CSS, and Recharts. Features role-based UI, transaction management, insights, and dark mode.

## Live Demo

[zorvyn-finance-dashboard.vercel.app](https://zorvyn-finance-dashboard.vercel.app)

## Setup
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Dashboard** — Summary cards, balance trend chart, spending breakdown donut chart
- **Transactions** — Search, filter by type and category, CSV export, add/edit/delete (admin only)
- **Insights** — Monthly comparison, cash flow timeline, top spending categories
- **Role Based UI** — Admin can add, edit, delete transactions. Viewer is read-only. Switch roles via dropdown.
- **Dark Mode** — Default dark theme with toggle
- **Responsive** — Works on mobile, tablet, and desktop
- **Mock API** — Simulated async data fetching

## Tech Stack

- [Next.js 15](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide React](https://lucide.dev)

## Project Structure

src/
├── app/          # Next.js app router
├── components/   # Reusable UI components
├── context/      # Theme context
└── lib/          # Mock API

## Role Based UI

| Feature              | Admin | Viewer |
|----------------------|-------|--------|
| View transactions    | ✅    | ✅     |
| Add transaction      | ✅    | ❌     |
| Edit transaction     | ✅    | ❌     |
| Delete transaction   | ✅    | ❌     |
| Export CSV           | ✅    | ❌     |