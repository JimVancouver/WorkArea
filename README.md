# ReadAloud (readaloud.si)

Any page, read out loud. A reading companion for children learning to read and for anyone who finds small print hard.

- **Read a page**: take a photo (or paste text). Claude reads the text, writes a plain-language explanation and lists hard words. The browser reads it aloud while each word is highlighted.
- **Make a story**: Claude writes a short story at the child's reading level, with three questions to talk about afterwards.

Speech uses the visitor's own browser voices (Web Speech API), so it costs nothing. Claude is only called for reading photos and writing stories.

## Stack

Next.js (App Router), TypeScript, plain CSS, `@anthropic-ai/sdk`. Fonts: Atkinson Hyperlegible (UI, designed for low vision) and Andika (reading text, designed for early readers).

## Environment variables (Vercel > Settings > Environment Variables)

| Name | Required | Notes |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | yes | Without it the demo shows "The reading service isn't switched on yet." |
| `ANTHROPIC_MODEL` | no | Defaults to `claude-haiku-4-5-20251001` (cheap, reads images). |
| `RATE_LIMIT_PER_10_MIN` | no | Per-visitor requests per feature, default 8. |

## Protecting your API bill

The built-in rate limit is per server instance only. On Vercel Pro, add a Firewall rule: rate limit `/api/*` to about 20 requests per 10 minutes per IP. Also set a monthly spend limit in the Anthropic Console.

## Local development

```bash
npm install
cp .env.example .env.local   # add your key
npm run dev
```

## Privacy

Photos and text are sent to Anthropic to be read and are not stored by the site. Story requests take a first name only. No accounts, no cookies, no analytics.
