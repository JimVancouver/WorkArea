import Anthropic from "@anthropic-ai/sdk";

export const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";

export function client(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export const errors = {
  noKey: () =>
    json({ error: "The reading service isn't switched on yet. Try again soon." }, 503),
  limited: () =>
    json({ error: "You've used ReadAloud a lot in the last few minutes. Wait a little, then try again." }, 429),
  failed: () =>
    json({ error: "ReadAloud couldn't finish that just now. Try again in a moment." }, 502),
};

/** Run one forced tool call and return the tool input as the structured result. */
export async function callTool<T>(
  anthropic: Anthropic,
  opts: {
    system: string;
    content: Anthropic.MessageParam["content"];
    tool: Anthropic.Tool;
    maxTokens: number;
  },
): Promise<T | null> {
  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: opts.maxTokens,
    system: opts.system,
    tools: [opts.tool],
    tool_choice: { type: "tool", name: opts.tool.name },
    messages: [{ role: "user", content: opts.content }],
  });
  const block = msg.content.find((b) => b.type === "tool_use");
  return block && block.type === "tool_use" ? (block.input as T) : null;
}
