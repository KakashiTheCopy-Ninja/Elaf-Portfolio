# Elaf Muneeb: AI automation portfolio

Next.js 16, React 19, React Three Fiber, GSAP, Lenis.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Before launch (search for TODO)
- `lib/content.ts`: real email, LinkedIn, GitHub, WhatsApp, bio
- `public/elaf.jpg`: portrait
- `NEXT_PUBLIC_SITE_URL`: the real domain (sitemap, canonical and social tags use it)

## SEO
Metadata, Open Graph and Twitter images, JSON-LD (Person, Service, FAQ), sitemap, robots and manifest are set in `app/` and `lib/seo.ts`.
After deploying, add the site to Google Search Console and submit `/sitemap.xml`.
