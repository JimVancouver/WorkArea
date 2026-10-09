import type Anthropic from "@anthropic-ai/sdk";
import { callTool, client, errors, json } from "@/lib/claude";
import { allow, clientIp } from "@/lib/limit";

export const runtime = "nodejs";
export const maxDuration = 60;

type Audience = "kid" | "adult";

export type ReadResult = {
  found: boolean;
  text: string;
  simple: string;
  words: { word: string; meaning: string }[];
  notice: string | null;
};

const TOOL: Anthropic.Tool = {
  name: "page_reading",
  description: "Return the text on the page and a plain-language explanation of it.",
  input_schema: {
    type: "object",
    properties: {
      found: { type: "boolean", description: "False if there is no readable text." },
      text: {
        type: "string",
        description:
          "The readable text in natural reading order, exactly as written. Leave out page numbers, barcodes and repeated headers. Empty if none.",
      },
      simple: {
        type: "string",
        description: "What the text says, in plain language for the reader. At most 120 words.",
      },
      words: {
        type: "array",
        maxItems: 6,
        description: "Up to 6 harder words from the text, each with a short, plain meaning.",
        items: {
          type: "object",
          properties: { word: { type: "string" }, meaning: { type: "string" } },
          required: ["word", "meaning"],
        },
      },
      notice: {
        type: ["string", "null"],
        description:
          "One short, calm sentence if the text is about medicine, money, a deadline or a legal matter, suggesting who to check with. Null otherwise.",
      },
    },
    required: ["found", "text", "simple", "words", "notice"],
  },
};

const AUDIENCE: Record<Audience, string> = {
  kid: "The reader is a child aged about 6 to 10. Use short sentences and everyday words. Be warm and encouraging.",
  adult:
    "The reader is an adult, often an older person who finds small print hard to read. Be clear, plain and respectful. Never talk down to them.",
};

export async function POST(req: Request) {
  const anthropic = client();
  if (!anthropic) return errors.noKey();
  if (!allow(`read:${clientIp(req)}`)) return errors.limited();

  let body: { image?: string; text?: string; audience?: Audience };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Send a photo or some text to read." }, 400);
  }
  const audience: Audience = body.audience === "kid" ? "kid" : "adult";
  const text = (body.text || "").trim();
  const image = body.image || "";

  const content: Anthropic.ContentBlockParam[] = [];
  if (image) {
    const m = image.match(/^data:(image\/(?:jpeg|png|webp|gif));base64,(.+)$/);
    if (!m) return json({ error: "That photo format isn't supported. Use a JPG or PNG." }, 400);
    if (m[2].length > 4_000_000) return json({ error: "That photo is too large. Try a smaller one." }, 413);
    content.push({
      type: "image",
      source: { type: "base64", media_type: m[1] as "image/jpeg", data: m[2] },
    });
    content.push({ type: "text", text: "Read the text in this photo." });
  } else if (text) {
    if (text.length > 6000) return json({ error: "That's a lot of text. Paste up to about a page at a time." }, 413);
    content.push({ type: "text", text: `Here is the text to read:\n\n${text}` });
  } else {
    return json({ error: "Add a photo or paste some text first." }, 400);
  }

  try {
    const result = await callTool<ReadResult>(anthropic, {
      system: `You help people read printed text and understand it. ${AUDIENCE[audience]} Only describe what is actually written; never invent text you cannot see. If the photo has no readable text, set found to false and say so kindly in simple.`,
      content,
      tool: TOOL,
      maxTokens: 2500,
    });
    if (!result) return errors.failed();
    return json(result);
  } catch (e) {
    console.error("read failed", e);
    return errors.failed();
  }
}
