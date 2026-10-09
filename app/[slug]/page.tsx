import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../components/Site";

const UPDATED = "October 8, 2026";
const MAIL = "contact@readaloud.si";

type Page = { title: string; description: string; body: React.ReactNode };

const PAGES: Record<string, Page> = {
  pricing: {
    title: "Pricing",
    description: "ReadAloud is free to use. A Family plan with natural voices and saved stories is coming soon.",
    body: (
      <>
        <header className="doc-head">
          <h1>Free to use. No account needed.</h1>
          <p className="lede">
            Read pages and make stories right in your browser. A Family plan with extra features is on the way.
          </p>
        </header>

        <div className="plans">
          <section className="plan plan-now" aria-labelledby="plan-free">
            <h2 id="plan-free">Free</h2>
            <p className="price">
              <strong>$0</strong> <span>forever</span>
            </p>
            <ul>
              <li>Read any page from a photo or pasted text</li>
              <li>Plain-language explanations and hard words</li>
              <li>Stories at three reading levels, with questions</li>
              <li>Word-by-word highlighting, adjustable speed</li>
              <li>Works on phones, tablets and computers</li>
            </ul>
            <p className="plan-note">Fair-use limits keep it free for everyone.</p>
            <Link className="go" href="/#try">Start reading</Link>
          </section>

          <section className="plan" aria-labelledby="plan-family">
            <h2 id="plan-family">Family</h2>
            <p className="price">
              <strong>Coming soon</strong>
            </p>
            <ul>
              <li>Everything in Free</li>
              <li>Natural, human-sounding voices</li>
              <li>Save stories and pages to read again</li>
              <li>Reading profiles for up to four readers</li>
              <li>Higher daily limits</li>
            </ul>
            <p className="plan-note">Want to know when it's ready?</p>
            <a className="quiet" href={`mailto:${MAIL}?subject=Tell%20me%20when%20the%20Family%20plan%20is%20ready`}>
              Tell me when it's ready
            </a>
          </section>

          <section className="plan" aria-labelledby="plan-schools">
            <h2 id="plan-schools">Schools and care homes</h2>
            <p className="price">
              <strong>Let's talk</strong>
            </p>
            <ul>
              <li>Classroom and group use</li>
              <li>Stories matched to your reading program</li>
              <li>Large-print and slow-speed defaults</li>
              <li>Help getting set up</li>
            </ul>
            <p className="plan-note">For teachers, librarians and care staff.</p>
            <a className="quiet" href={`mailto:${MAIL}?subject=ReadAloud%20for%20our%20school%20or%20care%20home`}>
              Email us
            </a>
          </section>
        </div>

        <section className="faq" aria-labelledby="faq-title">
          <h2 id="faq-title">Questions</h2>
          <dl>
            <div>
              <dt>Is it really free?</dt>
              <dd>
                Yes. The voice comes from your own device, so reading aloud costs nothing. We pay for the AI that reads
                photos and writes stories, and keep fair-use limits so it stays free.
              </dd>
            </div>
            <div>
              <dt>Do I need to sign up?</dt>
              <dd>No. There are no accounts, and nothing to install.</dd>
            </div>
            <div>
              <dt>Which devices work?</dt>
              <dd>
                Any recent phone, tablet or computer with Chrome, Safari or Edge. The voices you can choose depend on
                your device.
              </dd>
            </div>
            <div>
              <dt>Is it safe for children?</dt>
              <dd>
                Stories are written to be gentle and age-appropriate, and we only ask for a first name. See our{" "}
                <Link href="/privacy">privacy page</Link> for details.
              </dd>
            </div>
          </dl>
        </section>
      </>
    ),
  },

  about: {
    title: "About",
    description: "Two readers, one letter: the story of why ReadAloud exists.",
    body: (
      <article className="doc">
        <h1>Two readers, one letter.</h1>
        <p className="lede">A short story about why ReadAloud exists.</p>

        <div
          style={{
            fontFamily: "var(--font-read), var(--font-ui), sans-serif",
            fontSize: "clamp(1.2rem, 1.9vw, 1.35rem)",
            lineHeight: 1.75,
            marginTop: "2.25rem",
            paddingLeft: "1.5rem",
            borderLeft: "5px solid var(--marker)",
          }}
        >
          <p style={{ color: "var(--ink)" }}>
            Every Tuesday, a letter arrives for Rosa. It comes from her grandmother, who lives two hours away and still
            believes the best things are written by hand.
          </p>
          <p style={{ color: "var(--ink)" }}>
            Rosa is seven. She knows her letters and a good number of her words, but Grandma's handwriting loops and
            leans, and the long words hide inside it. So the letter waits on the kitchen table until a grown-up has
            time. Some weeks, that's Thursday.
          </p>
          <p style={{ color: "var(--ink)" }}>
            Two hours away, Grandma has her own pile on the table. The print on her pill bottles seems to shrink every
            year. The bank sends letters full of words like <em>adjustment</em> and <em>effective immediately</em>. She
            keeps her glasses on a chain now, and still she holds the page at arm's length and guesses.
          </p>
          <p style={{ color: "var(--ink)" }}>
            Both of them love to read. Both of them are waiting for someone to read to them.
          </p>
          <p style={{ color: "var(--ink)" }}>
            One Tuesday, Rosa holds the letter up to the phone. A voice begins: <em>Dear Rosa, the tomatoes came in
            early this year.</em> The words light up one at a time, and she follows them with her finger. When it gets
            to the dog who steals a tomato every morning, she laughs out loud, then reads that line again by herself.
            Then once more, just to be sure.
          </p>
          <p style={{ color: "var(--ink)" }}>
            That evening, Grandma does the same with the letter from the bank. In two minutes she knows what it says,
            and that there's nothing to worry about. She puts the kettle on, and starts writing to Rosa.
          </p>
          <p style={{ color: "var(--ink)" }}>
            Nobody had to hurry home. The letters were always theirs. They just needed a voice.
          </p>
        </div>
        <p style={{ fontSize: "0.95rem", fontStyle: "italic" }}>
          Rosa and her grandmother are characters in a story. The kitchen tables are real, in homes everywhere.
        </p>

        <h2>Why we built ReadAloud</h2>
        <p>
          Somewhere right now, someone is waiting for a page to be read to them: a child who is nearly there, a parent
          at the end of a long day, a grandparent whose eyes have changed. The words are right in front of them, just
          out of reach.
        </p>
        <p>
          We built ReadAloud so nobody has to wait. Point your phone at a page and hear it, word by word, at your own
          pace, with the hard words explained in plain language. For young readers, it can also write a story at just
          the right level, so the next page feels a little easier than the last.
        </p>

        <h2>How it works</h2>
        <p>
          When you add a photo or text, ReadAloud uses Claude, an AI model made by Anthropic, to read the words and
          explain them. The reading voice is your own device's built-in voice, so it works on almost any phone or
          computer and costs nothing to play.
        </p>
        <p>
          AI can make mistakes. For medicine, money and legal letters, always check with a pharmacist, your bank or the
          sender.
        </p>

        <h2>Who we are</h2>
        <p>
          ReadAloud is made by Read Aloud SI Ltd. We're building it one reader at a time.
        </p>
        <p>
          If ReadAloud has helped someone you love read something that mattered, we'd love to hear about it. Write to{" "}
          <a href={`mailto:${MAIL}`}>{MAIL}</a>. We read every message.
        </p>
      </article>
    ),
  },

  privacy: {
    title: "Privacy",
    description: "What ReadAloud does with your photos and text: it reads them, then forgets them.",
    body: (
      <article className="doc">
        <h1>Privacy</h1>
        <p className="updated">Last updated {UPDATED}</p>
        <p className="lede">Short version: ReadAloud reads your page, then forgets it. No accounts, no tracking.</p>

        <h2>What happens to your photos and text</h2>
        <p>
          When you press <em>Read it to me</em> or <em>Write my story</em>, what you added is sent to Anthropic, the
          company that makes the Claude AI model, so it can read the text or write the story. The answer comes back to
          your screen. ReadAloud does not save your photos, text or stories.
        </p>
        <p>
          Anthropic processes this data under its commercial terms and may keep it for a limited time for safety and
          abuse monitoring. You can read{" "}
          <a href="https://www.anthropic.com/legal/privacy" rel="noopener">Anthropic's privacy policy</a>.
        </p>

        <h2>Reading aloud</h2>
        <p>The voice is your device's own. The words being read stay on your device.</p>

        <h2>What we don't collect</h2>
        <p>
          We don't ask for your name, email or age, and there are no accounts. We don't use advertising or tracking
          cookies, and we don't sell data.
        </p>

        <h2>Technical logs</h2>
        <p>
          Like most websites, our hosting provider (Vercel) keeps short-lived server logs, which include IP addresses.
          We use them only to keep the service working and to stop abuse, such as automated overuse.
        </p>

        <h2>Children</h2>
        <p>
          ReadAloud is designed to be used by children with a grown-up nearby. The story feature asks for a first name
          only, which is used to write that one story and isn't stored. Please don't upload photos that show personal
          details such as addresses or account numbers.
        </p>

        <h2>Questions</h2>
        <p>
          Write to <a href={`mailto:${MAIL}`}>{MAIL}</a>. If this policy changes, we'll update the date at the top of
          this page.
        </p>
      </article>
    ),
  },

  terms: {
    title: "Terms",
    description: "The simple rules for using ReadAloud.",
    body: (
      <article className="doc">
        <h1>Terms of use</h1>
        <p className="updated">Last updated {UPDATED}</p>
        <p className="lede">By using ReadAloud, you agree to these terms.</p>

        <h2>The service</h2>
        <p>
          ReadAloud reads text aloud, explains it in plain language and writes short stories for children. It is
          provided as is, free of charge, and may change or pause at any time.
        </p>

        <h2>AI can make mistakes</h2>
        <p>
          Explanations and stories are written by an AI model and can be wrong or incomplete. ReadAloud is not
          medical, legal or financial advice. For medicine, money and legal matters, check with a qualified person.
        </p>

        <h2>Fair use</h2>
        <p>
          Please use ReadAloud for personal, classroom or care purposes. Don't use automated tools to send large
          numbers of requests, try to get around usage limits, or upload content that is illegal or that you don't
          have the right to use. We may limit or block use that harms the service or other people.
        </p>

        <h2>Your content</h2>
        <p>
          You keep the rights to anything you upload. You can use the stories ReadAloud writes for you however you
          like.
        </p>

        <h2>Liability</h2>
        <p>
          To the extent the law allows, Read Aloud SI Ltd. is not liable for losses that come from using
          ReadAloud or relying on its output.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms: <a href={`mailto:${MAIL}`}>{MAIL}</a>.
        </p>
      </article>
    ),
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) return {};
  return {
    title: `${page.title} | ReadAloud`,
    description: page.description,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();
  return (
    <>
      <SiteHeader current={`/${slug}`} />
      <main className="info">{page.body}</main>
      <SiteFooter />
    </>
  );
}
