# Elegant Star — Stage 8 Complete

A static, database-free Next.js website for Elegant Star Invitations & Creation.

## Included experience

1. Interactive Envelope Hero
2. Seamless Brand Introduction
3. Interactive Featured Collections
4. Scroll-Driven Real Client Story
5. Visual Category Explorer
6. Interactive Craftsmanship Experience
7. Simple Ordering Process
8. Dynamic Albums and Gallery Preview
9. Privacy-Safe Client Confidence Section
10. Guided Enquiry Experience

## Public routes

- `/` — complete advanced homepage
- `/collections` — searchable and filterable library of 63 stationery directions
- `/designs/[slug]` — 63 static collection pages
- `/stories` — five privacy-safe real celebration stories
- `/stories/[slug]` — five editorial story pages
- `/gallery` — combined albums and visual library
- `/our-craft` — materials, finishing and coordinated details
- `/about` — brand and showroom story
- `/contact` — contact options, FAQ and guided-enquiry link

## Content rules

- No couples’ real names are used in generated titles, URLs, source text, metadata or filenames.
- Some names may remain naturally visible inside photographed physical stationery.
- Collection specifications are not invented. Exact materials, finishes, price, quantity and timing must be confirmed during enquiry.
- Review screenshots are not published until wording and identities are cleared.

## Editing

- Deployment/contact environment variables: copy `.env.example` to a local `.env` file and fill in the real public values before production.
- Contact details: `src/data/site.ts`
- Collection data: `src/data/collections.ts`
- Story data: `src/data/stories.ts`
- Homepage category/craft/process/gallery content: `src/data/home.ts`
- Media: `public/media`

## Commands

```bash
npm install
npm test
npm run typecheck
npm run lint
npm run smoke
npm run format:check
npm run build
npm run dev
```

No database, CMS, authentication or API keys are required.
