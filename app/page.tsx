import ReadAlong from "./components/ReadAlong";
import Studio from "./components/Studio";

const SAMPLE =
  "Dear Rosa, the tomatoes came in early this year. The dog still steals one every morning and looks very pleased with himself. Come and visit soon. Love, Grandma.";

export default function Home() {
  return (
    <>
      <a className="skip" href="#try">Skip to the reader</a>
      <header className="top">
        <a href="/" className="mark" aria-label="ReadAloud home">
          <svg viewBox="0 0 32 32" aria-hidden width="28" height="28">
            <rect x="3" y="6" width="17" height="20" rx="2" fill="#FFE14D" stroke="currentColor" strokeWidth="2" />
            <path d="M7 12h9M7 16h9M7 20h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M24 11c2 1.6 2 8.4 0 10M27.5 8c3.4 3 3.4 13 0 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          ReadAloud
        </a>
        <a className="toplink" href="mailto:contact@readaloud.si">Contact</a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <h1>Any page,<br />read out&nbsp;loud.</h1>
            <p className="lede">
              Snap a photo of a book, a letter or a label. ReadAloud reads it to you, explains the hard words, and
              goes at your pace.
            </p>
            <p className="lede">Made for children learning to read, and for anyone who finds small print hard.</p>
            <div className="cta">
              <a className="go" href="#try">Read a page</a>
              <a className="quiet" href="#story">Make a story</a>
            </div>
          </div>
          <figure className="viewfinder">
            <span className="corner tl" aria-hidden />
            <span className="corner tr" aria-hidden />
            <span className="corner bl" aria-hidden />
            <span className="corner br" aria-hidden />
            <div className="sheet">
              <ReadAlong text={SAMPLE} intro={8} />
            </div>
            <figcaption>Press Read aloud and follow the yellow.</figcaption>
          </figure>
        </section>

        <Studio />

        <section className="who" aria-labelledby="who-title">
          <h2 id="who-title">Who it's for</h2>
          <div className="who-grid">
            <div>
              <h3>Children learning to read</h3>
              <p>
                The highlight moves word by word, so a child can follow along and join in. Tap a word to hear it again.
                Ask for a story about anything, at their level, with three questions to talk about afterwards.
              </p>
            </div>
            <div>
              <h3>Grown-ups who find small print hard</h3>
              <p>
                Letters, bills, menus, instructions and the back of a medicine box. Hear the words, then hear what they
                mean in plain language. Large text, slow speed, nothing to install.
              </p>
            </div>
          </div>
        </section>

        <section className="how" aria-labelledby="how-title">
          <h2 id="how-title">How it works</h2>
          <ol>
            <li>
              <h3>Snap or paste</h3>
              <p>Take a photo with your phone, or paste words from an email or website.</p>
            </li>
            <li>
              <h3>ReadAloud reads it</h3>
              <p>It picks out the words in the right order and writes a short, plain explanation.</p>
            </li>
            <li>
              <h3>Listen and follow</h3>
              <p>Your phone or computer reads it out while each word lights up. Slow it down any time.</p>
            </li>
          </ol>
        </section>
      </main>

      <footer className="foot">
        <p>
          Questions or ideas? Write to <a href="mailto:contact@readaloud.si">contact@readaloud.si</a>.
        </p>
        <p className="fine">
          ReadAloud uses Claude by Anthropic to read and explain text, and your device's own voice to speak it. Photos
          and text aren't stored.
        </p>
      </footer>
    </>
  );
}
