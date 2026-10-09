"use client";

import { useEffect, useRef, useState } from "react";
import ReadAlong from "./ReadAlong";
import type { ReadResult } from "../api/read/route";
import type { StoryResult } from "../api/story/route";

type Mode = "page" | "story";
type Audience = "adult" | "kid";

async function shrink(file: File): Promise<string> {
  const bmp = await createImageBitmap(file);
  const max = 1600;
  const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.85);
}

async function post<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "ReadAloud couldn't finish that just now. Try again in a moment.");
  return data as T;
}

export default function Studio() {
  const [mode, setMode] = useState<Mode>("page");

  // The hero's "Make a story" link points at #story: open that tab and scroll here.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#story") {
        setMode("story");
        document.getElementById("try")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <section className="studio" id="try" aria-labelledby="try-title">
      <h2 id="try-title">Try it now</h2>
      <div className="tabs" role="tablist" aria-label="What would you like to do?">
        <button role="tab" aria-selected={mode === "page"} className="tab" onClick={() => setMode("page")}>
          Read a page
        </button>
        <button role="tab" aria-selected={mode === "story"} className="tab" onClick={() => setMode("story")}>
          Make a story
        </button>
      </div>
      {mode === "page" ? <PagePanel /> : <StoryPanel />}
    </section>
  );
}

function PagePanel() {
  const [audience, setAudience] = useState<Audience>("adult");
  const [photo, setPhoto] = useState<string>("");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ReadResult | null>(null);
  const [show, setShow] = useState<"text" | "simple">("text");
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = async (f?: File) => {
    if (!f) return;
    setError("");
    try {
      setPhoto(await shrink(f));
      setText("");
    } catch {
      setError("That photo couldn't be opened. Take a new photo or use a JPG or PNG.");
    }
  };

  const read = async () => {
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const r = await post<ReadResult>("/api/read", photo ? { image: photo, audience } : { text, audience });
      setResult(r);
      setShow(r.found && r.text ? "text" : "simple");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const ready = !!photo || text.trim().length > 0;
  const spoken = result ? (show === "text" ? result.text : result.simple) : "";

  return (
    <div className="panel" role="tabpanel">
      <div className="inputs">
        <fieldset className="audience">
          <legend>Who's reading?</legend>
          <label>
            <input type="radio" name="aud" checked={audience === "adult"} onChange={() => setAudience("adult")} />
            A grown-up
          </label>
          <label>
            <input type="radio" name="aud" checked={audience === "kid"} onChange={() => setAudience("kid")} />
            A child
          </label>
        </fieldset>

        <div className="drop">
          {photo ? (
            <div className="preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt="Your photo" />
              <button type="button" className="quiet" onClick={() => { setPhoto(""); if (fileRef.current) fileRef.current.value = ""; }}>
                Remove photo
              </button>
            </div>
          ) : (
            <>
              <button type="button" className="big" onClick={() => fileRef.current?.click()}>
                Take or choose a photo
              </button>
              <p className="or">or paste the words</p>
              <label className="sr" htmlFor="paste">Text to read</label>
              <textarea
                id="paste"
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste a letter, an email, a page from a book…"
              />
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </div>

        <button type="button" className="go" disabled={!ready || busy} onClick={read}>
          {busy ? "Reading…" : "Read it to me"}
        </button>
        {error && <p className="error" role="alert">{error}</p>}
        <p className="fine">
          Photos go to Claude, Anthropic's AI, to read the text. ReadAloud doesn't keep them.
        </p>
      </div>

      <div className="output" aria-live="polite">
        {!result && !busy && (
          <div className="empty">
            <p>Add a photo of a page, a letter or a label, then press <strong>Read it to me</strong>.</p>
          </div>
        )}
        {busy && <div className="empty"><p className="pulse">Reading your page…</p></div>}
        {result && (
          <>
            <div className="switch" role="group" aria-label="What to read aloud">
              <button type="button" aria-pressed={show === "text"} onClick={() => setShow("text")} disabled={!result.text}>
                The words on the page
              </button>
              <button type="button" aria-pressed={show === "simple"} onClick={() => setShow("simple")}>
                What it means
              </button>
            </div>
            {result.notice && <p className="notice">{result.notice}</p>}
            {spoken && <ReadAlong key={show + spoken.length} text={spoken} defaultRate={audience === "kid" ? 0.9 : 0.85} size="xlarge" autoFocus />}
            {result.words.length > 0 && (
              <dl className="glossary">
                <h3>Words to know</h3>
                {result.words.map((w) => (
                  <div key={w.word}>
                    <dt>{w.word}</dt>
                    <dd>{w.meaning}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="fine">ReadAloud can make mistakes. For medicine, money or legal letters, check with a pharmacist, your bank or the sender.</p>
          </>
        )}
      </div>
    </div>
  );
}

const LEVELS = [
  { id: "starting", label: "Just starting", ages: "5–6" },
  { id: "growing", label: "Growing reader", ages: "7–8" },
  { id: "confident", label: "Confident reader", ages: "9–11" },
] as const;

const IDEAS = ["a dragon who is afraid of the dark", "a bus that can swim", "my cat goes to the moon", "a shy robot at school"];

function StoryPanel() {
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState<(typeof LEVELS)[number]["id"]>("growing");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [story, setStory] = useState<StoryResult | null>(null);

  const make = async () => {
    setBusy(true);
    setError("");
    setStory(null);
    try {
      setStory(await post<StoryResult>("/api/story", { topic, name, level }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel" role="tabpanel">
      <div className="inputs">
        <label className="field">
          What should the story be about?
          <input value={topic} maxLength={120} onChange={(e) => setTopic(e.target.value)} placeholder="a dragon who is afraid of the dark" />
        </label>
        <div className="ideas">
          {IDEAS.map((i) => (
            <button key={i} type="button" className="chip" onClick={() => setTopic(i)}>
              {i}
            </button>
          ))}
        </div>
        <label className="field">
          <span>Hero's first name <span className="opt">(optional)</span></span>
          <input value={name} maxLength={24} onChange={(e) => setName(e.target.value)} placeholder="Maya" />
        </label>
        <fieldset className="levels">
          <legend>Reading level</legend>
          {LEVELS.map((l) => (
            <label key={l.id}>
              <input type="radio" name="lvl" checked={level === l.id} onChange={() => setLevel(l.id)} />
              <span>{l.label}</span> <small>ages {l.ages}</small>
            </label>
          ))}
        </fieldset>
        <button type="button" className="go" disabled={!topic.trim() || busy} onClick={make}>
          {busy ? "Writing…" : "Write my story"}
        </button>
        {error && <p className="error" role="alert">{error}</p>}
        <p className="fine">Use a first name only. Stories are written by Claude, Anthropic's AI, and aren't saved.</p>
      </div>

      <div className="output" aria-live="polite">
        {!story && !busy && (
          <div className="empty">
            <p>Pick an idea or type your own, then press <strong>Write my story</strong>.</p>
          </div>
        )}
        {busy && <div className="empty"><p className="pulse">Writing your story…</p></div>}
        {story && (
          <>
            <h3 className="story-title">{story.title}</h3>
            <div className="storybook">
              <ReadAlong key={story.title} text={story.story} defaultRate={0.85} size="xlarge" autoFocus />
            </div>
            <div className="questions">
              <h3>Talk about it</h3>
              <ol>
                {story.questions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
