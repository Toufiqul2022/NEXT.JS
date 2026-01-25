# Mini Store (Next.js 16 + Express)

A simple full-stack demo application built with **Next.js 16 (App Router)** and an **Express.js API**.

## Features

- Landing page with **7 sections** (Hero, Features, How it Works, Categories, Testimonials, Pricing, CTA)
- Mock authentication using **hardcoded credentials** + **HTTP-only cookies**
- Route protection via **Next.js middleware**
- Public **Items list** and **Item details** pages (fetched from Express API)
- Protected **Add Item** page (also accessible via admin **Dashboard**) that stores data in a JSON “database”
- Toast notifications on login/logout and on successful item creation

## Mock Login

- Email: `admin@example.com`
- Password: `123456`

## Routes

Public:

- `/` Landing
- `/items` Items list
- `/items/[id]` Item details
- `/login` Login

Protected:

- `/items/new` Add item
- `/dashboard` Admin dashboard
- `/dashboard/add-product` Add item (alias)

## Setup & Run

```bash
npm install
npm run dev
```

- Next.js: https://first-app-two-tawny.vercel.app
- Express API: http://localhost:4000

## Notes

- Express data storage: `server/data/items.json`
- API base URL can be changed with `NEXT_PUBLIC_API_BASE` (defaults to `http://localhost:4000`)
