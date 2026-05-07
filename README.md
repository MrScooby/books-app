Next.js frontend for the books project.

## Running locally

```bash
npm install
npm run dev   # http://localhost:8080
```

The API URL is read from `NEXT_PUBLIC_API_URL` (in `.env.local`). Defaults to `http://localhost:3000`.

## Clear the fetch cache when switching API backends

`lib/api/client.ts` uses `cache: 'force-cache'`, so server-side fetch responses are persisted on disk by Next.js. If the API at the same URL has changed what it returns (e.g. you switched it from prod to a local Docker DB, or vice versa), the dev server keeps replaying the old responses.

Before running locally after such a switch, delete the cache:

```bash
rm -rf .next/dev/cache/fetch-cache
# or, to be thorough
rm -rf .next
```

Note: the cache lives at `.next/dev/cache/fetch-cache/` in Next 16 — not `.next/cache/` like older Next versions.
