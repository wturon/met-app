# Met Museum Explorer — Privy Coding Interview

## Context
This is a 2.5-hour onsite coding exercise for Privy. The goal is to take a base Met Museum API app and expand it to showcase engineering strengths. We're playing the role of product manager/tech lead in deciding where to focus.

## The API
- **Base URL**: `https://met-interview-api.vercel.app/`
- **Search**: `GET /api/v1/search?q=<term>` — returns `{ total: number, objectIDs: number[] }`
- **Object detail**: `GET /api/v1/objects/:id` — returns full object metadata (title, artist, dates, medium, images, tags, dimensions, etc.)
- **Valid search terms**: monet, sun, sunflower(s), tesselation(s), vacuum(s)
- **Note**: Many objects have empty `primaryImage`/`primaryImageSmall` fields. Only public domain works have images.

## What We're Building
A polished Next.js web app to explore the Met Museum archives:
- Search page with query input (supporting the valid search terms)
- Results displayed as a grid with artwork images (graceful fallback for missing images)
- Detail pages (`/objects/[id]`) with rich metadata display
- Filtering and additional data display on search results
- Thoughtful design using the provided style guide

## Potential Expansion Areas (from prompt)
- Enable a user to query for other terms besides "vacuums"
- Expand on the UI
- Display additional data on the search results
- Filtering/alternative sorting
- More powerful data fetching

## Design System
- **Display Font**: Playfair Display (via `font-display` Tailwind class)
- **Body Font**: Mulish (default `font-sans`)
- **Primary Accent**: #E4002B
- **Accent (Accessible)**: #982932
- **Font Color**: #333333
- **Font Color Light**: #767676
- **Background**: #FFFFFF
- **Secondary Background**: #FAFAFA
- All colors are wired into shadcn CSS variables in `globals.css`

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
