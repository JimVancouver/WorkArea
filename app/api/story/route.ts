import type Anthropic from "@anthropic-ai/sdk";
import { callTool, client, errors, json } from "@/lib/claude";
import { allow, clientIp } from "@/lib/limit";

export const runtime = "nodejs";
export const maxDuration = 60;

export type StoryResult = { title: string; story: string; questions: string[] };

const LEVELS = {
  starting: { label: "ages 5–6, just starting to read", words: "80 to 120 words, very short sentences, mostly one- and two-syllable words" },
  growing: { label: "ages 7–8", words: "150 to 220 words, short paragraphs" },
  confident: { label: "ages 9–11, confident readers", words: "250 to 350 words, richer vocabulary" },
} as const;
type Level = keyof typeof LEVELS;

const TOOL: Anthropic.Tool = {
  name: "story",
  description: "Return a short story for a child to read along with, plus questions.",
  input_schema: {
    type: "object",
    properties: {
      title: { type: "string" },
      story: { type: "string", description: "The story. Separate paragraphs with a blank line." },
      questions: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: { type: "string" },
        description: "Three questions about the story, from easy recall to one that asks what the child thinks.",
      },
    },
    required: ["title", "story", "questions"],
  },
};

export async function POST(req: Request) {
  const anthropic = client();
  if (!anthropic) return errors.noKey();
  if (!allow(`story:${clientIp(req)}`)) return errors.limited();

  let body: { topic?: string; level?: Level; name?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Tell ReadAloud what the story should be about." }, 400);
  }
  const topic = (body.topic || "").trim().slice(0, 120);
  const name = (body.name || "").trim().replace(/[^\p{L}\p{M}' -]/gu, "").slice(0, 24);
  const level: Level = body.level && body.level in LEVELS ? body.level : "growing";
  if (!topic) return json({ error: "Tell ReadAloud what the story should be about." }, 400);

  const lv = LEVELS[level];
  try {
    const result = await callTool<StoryResult>(anthropic, {
      system:
        "You write gentle, original stories for children to read aloud with a grown-up. Stories are kind, safe and age-appropriate, with no violence, romance, brand names or real public figures. If the requested topic isn't suitable for a young child, write a cheerful story on a nearby suitable theme instead. Never ask for or include personal details beyond the first name given.",
      content: [
        {
          type: "text",
          text: `Write a story about: ${topic}\nReader: ${lv.label}. Length: ${lv.words}.${
            name ? `\nThe main character is named ${name}.` : ""
          }`,
        },
      ],
      tool: TOOL,
      maxTokens: 1500,
    });
    if (!result) return errors.failed();
    return json(result);
  } catch (e) {
    console.error("story failed", e);
    return errors.failed();
  }
}
