import ReadAlong from "./components/ReadAlong";
import Studio from "./components/Studio";
import { SiteFooter, SiteHeader } from "./components/Site";
import { GrownupsIllustration, KidsIllustration } from "./components/Illustrations";

const SAMPLE =
  "Dear Rosa, the tomatoes came in early this year. The dog still steals one every morning and looks very pleased with himself. Come and visit soon. Love, Grandma.";

export default function Home() {
  return (
    <>
      <a className="skip" href="#try">Skip to the reader</a>
      <SiteHeader />

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

        <section className="why" aria-labelledby="why-title">
          <h2 id="why-title">Reading is hard for more people than you'd think.</h2>
          <div className="why-grid">
            <figure>
              <p className="why-num">40%</p>
              <figcaption>
                of US fourth graders read below the basic level for their grade.
                <a href="https://www.nationsreportcard.gov/reports/reading/2024/g4_8/national-trends" rel="noopener">
                  NAEP, 2024
                </a>
              </figcaption>
            </figure>
            <figure>
              <p className="why-num">826 million</p>
              <figcaption>
                people worldwide struggle to see things up close because of age-related long-sightedness.
                <a href="https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment" rel="noopener">
                  World Health Organization
                </a>
              </figcaption>
            </figure>
            <figure>
              <p className="why-num">1.4 million</p>
              <figcaption>
                more words heard by kindergarten when children are read five books a day, compared with children who
                aren't read to.
                <a href="https://news.osu.edu/a-million-word-gap-for-children-who-arent-read-to-at-home/" rel="noopener">
                  Ohio State University, 2019
                </a>
              </figcaption>
            </figure>
          </div>
          <div className="uses">
            <h3>What people read with ReadAloud</h3>
            <ul>
              {[
                "Picture books",
                "Homework sheets",
                "Letters from the bank",
                "Medicine labels",
                "School forms",
                "Recipes",
                "Restaurant menus",
                "Instructions",
                "Bills",
                "Notes from the doctor",
              ].map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>
        </section>

        <Studio />

        <section className="who" aria-labelledby="who-title">
          <h2 id="who-title">Who it's for</h2>
          <div className="who-grid">
            <div>
              <KidsIllustration />
              <h3>Children learning to read</h3>
              <p>
                The highlight moves word by word, so a child can follow along and join in. Tap a word to hear it again.
                Ask for a story about anything, at their level, with three questions to talk about afterwards.
              </p>
            </div>
            <div>
              <GrownupsIllustration />
              <h3>Grown-ups who find small print hard</h3>
              <p>
                Letters, bills, menus, instructions and the back of a medicine box. Hear the words, then hear what they
                mean in plain language. Large text, slow speed, nothing to install.
              </p>
            </div>
          </div>
        </section>

        <section className="how" id="how" aria-labelledby="how-title">
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

      <SiteFooter />
    </>
  );
}
