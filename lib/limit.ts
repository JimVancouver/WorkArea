// Best-effort per-visitor rate limit. Serverless instances don't share memory,
// so this only slows abuse down; add a Vercel Firewall rate-limit rule for a hard cap.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim();
}

export function allow(key: string): boolean {
  const max = Number(process.env.RATE_LIMIT_PER_10_MIN || 8);
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return true;
}
