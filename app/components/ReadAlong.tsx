"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Word = { text: string; start: number; end: number };
type Sentence = { start: number; end: number; text: string };

function tokenize(text: string) {
  const words: Word[] = [];
  for (const m of text.matchAll(/\S+/g)) {
    words.push({ text: m[0], start: m.index!, end: m.index! + m[0].length });
  }
  const sentences: Sentence[] = [];
  for (const m of text.matchAll(/[^.!?\n]+[.!?]*["'”’)]*\s*|\n+/g)) {
    if (m[0].trim()) sentences.push({ start: m.index!, end: m.index! + m[0].length, text: m[0] });
  }
  return { words, sentences };
}

function useVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const load = () =>
      setVoices(window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en")));
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);
  return voices;
}

function pickDefault(voices: SpeechSynthesisVoice[]) {
  const prefs = [/natural/i, /google us english/i, /samantha/i, /aria|jenny|guy/i, /en-us/i];
  for (const p of prefs) {
    const v = voices.find((x) => p.test(x.name) || p.test(x.lang));
    if (v) return v.name;
  }
  return voices[0]?.name || "";
}

export default function ReadAlong({
  text,
  size = "large",
  defaultRate = 0.9,
  autoFocus = false,
  intro = 0,
}: {
  text: string;
  size?: "large" | "xlarge";
  defaultRate?: number;
  autoFocus?: boolean;
  /** Number of leading words to sweep with the highlighter once on load. */
  intro?: number;
}) {
  const { words, sentences } = useMemo(() => tokenize(text), [text]);
  const voices = useVoices();
  const [voiceName, setVoiceName] = useState("");
  const [rate, setRate] = useState(defaultRate);
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [wordIdx, setWordIdx] = useState(-1);
  const [sentIdx, setSentIdx] = useState(-1);
  const [supported, setSupported] = useState(true);
  const run = useRef(0); // invalidates callbacks from a previous run
  const sawBoundary = useRef(false);
  const playBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => setSupported(typeof window !== "undefined" && "speechSynthesis" in window), []);
  useEffect(() => {
    if (!voiceName && voices.length) setVoiceName(pickDefault(voices));
  }, [voices, voiceName]);
  useEffect(() => {
    if (autoFocus) playBtn.current?.focus();
  }, [autoFocus, text]);

  const stop = useCallback(() => {
    run.current++;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setState("idle");
    setWordIdx(-1);
    setSentIdx(-1);
  }, []);

  useEffect(() => stop, [text, stop]);

  const speakFrom = useCallback(
    (si: number, id: number) => {
      const synth = window.speechSynthesis;
      if (id !== run.current) return;
      if (si >= sentences.length) {
        setState("idle");
        setWordIdx(-1);
        setSentIdx(-1);
        return;
      }
      const s = sentences[si];
      const u = new SpeechSynthesisUtterance(s.text);
      const v = voices.find((x) => x.name === voiceName);
      if (v) u.voice = v;
      u.lang = v?.lang || "en-US";
      u.rate = rate;
      setSentIdx(si);
      // Until a boundary event arrives, light the first word of the sentence.
      const first = words.findIndex((w) => w.end > s.start);
      setWordIdx(first);
      u.onboundary = (e) => {
        if (id !== run.current || e.name !== "word") return;
        sawBoundary.current = true;
        const at = s.start + e.charIndex;
        const i = words.findIndex((w) => w.start <= at && at < w.end + 1);
        if (i >= 0) setWordIdx(i);
      };
      u.onend = () => speakFrom(si + 1, id);
      u.onerror = (e) => {
        if (e.error === "interrupted" || e.error === "canceled") return;
        speakFrom(si + 1, id);
      };
      synth.speak(u);
    },
    [sentences, words, voices, voiceName, rate],
  );

  const play = (fromSentence = 0) => {
    if (!supported || !sentences.length) return;
    window.speechSynthesis.cancel();
    const id = ++run.current;
    sawBoundary.current = false;
    setState("playing");
    speakFrom(fromSentence, id);
  };

  const toggle = () => {
    const synth = window.speechSynthesis;
    if (state === "idle") play(0);
    else if (state === "playing") {
      synth.pause();
      setState("paused");
    } else {
      synth.resume();
      setState("playing");
    }
  };

  const fromWord = (wi: number) => {
    const at = words[wi].start;
    const si = sentences.findIndex((s) => s.start <= at && at < s.end);
    play(Math.max(0, si));
  };

  // When the voice gives no word timing, highlight the whole sentence instead.
  const sentenceMode = state !== "idle" && !sawBoundary.current;
  const activeSentence = sentences[sentIdx];

  // Rebuild the text with spans, keeping original spacing and line breaks.
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  words.forEach((w, i) => {
    if (w.start > cursor) parts.push(text.slice(cursor, w.start));
    const inSentence = activeSentence && w.start >= activeSentence.start && w.start < activeSentence.end;
    const lit = sentenceMode ? inSentence : i === wordIdx;
    parts.push(
      <span
        key={i}
        className={`w${lit ? " lit" : ""}${inSentence ? " now" : ""}${i < intro && state === "idle" ? " intro" : ""}`}
        style={i < intro ? ({ "--i": i } as React.CSSProperties) : undefined}
        onClick={() => fromWord(i)}
      >
        {w.text}
      </span>,
    );
    cursor = w.end;
  });
  if (cursor < text.length) parts.push(text.slice(cursor));

  return (
    <div className={`readalong ${size}`}>
      <p className="readalong-text" aria-live="off">
        {parts}
      </p>
      {supported ? (
        <div className="controls">
          <button ref={playBtn} type="button" className="play" onClick={toggle} aria-label={state === "playing" ? "Pause" : "Read aloud"}>
            <span aria-hidden className={`glyph ${state === "playing" ? "pause" : "tri"}`} />
            {state === "playing" ? "Pause" : state === "paused" ? "Keep reading" : "Read aloud"}
          </button>
          {state !== "idle" && (
            <button type="button" className="quiet" onClick={stop}>
              Stop
            </button>
          )}
          <label className="speed">
            Speed
            <input
              type="range"
              min={0.6}
              max={1.3}
              step={0.05}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              disabled={state !== "idle"}
            />
            <span>{rate < 0.8 ? "Slow" : rate > 1.05 ? "Quick" : "Steady"}</span>
          </label>
          {voices.length > 1 && (
            <label className="voice">
              Voice
              <select value={voiceName} onChange={(e) => setVoiceName(e.target.value)} disabled={state !== "idle"}>
                {voices.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name.replace(/^(Microsoft|Google)\s+/, "").replace(/\s*\(.*\)$/, "")}
                  </option>
                ))}
              </select>
            </label>
          )}
          <p className="hint">Tap any word to start reading from there.</p>
        </div>
      ) : (
        <p className="hint">This browser can't read aloud. Try Chrome, Safari or Edge.</p>
      )}
    </div>
  );
}
