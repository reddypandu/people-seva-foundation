import { Arrow } from "./navbar";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A community for every woman</p>
          <h1>
            When women rise,
            <br />
            <span>communities rise.</span>
          </h1>
          <p className="hero-intro">
            People Seva Foundation creates pathways for women to find their
            voice, build their independence, and shape a future with dignity.
          </p>
          <div className="hero-actions">
            <a className="button button-orange" href="/#donate">
              Support her journey <Arrow />
            </a>
            <a className="text-link" href="/about">
              Our story <Arrow />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1200&q=85"
            alt="An Indian woman smiling confidently outdoors"
          />
          <div className="hero-note">
            <strong>01</strong>
            <span>
              Small acts.
              <br />
              Lasting change.
            </span>
          </div>
          <div className="sun-stamp">
            SEVA
            <br />
            <span>सेवा</span>
          </div>
        </div>
      </section>
      <section className="impact-strip">
        <p>Our work is rooted in</p>
        <div>
          <span>01</span> education <span>02</span> livelihood <span>03</span>{" "}
          confidence <span>04</span> community
        </div>
      </section>
      <section className="mission section-grid">
        <div>
          <p className="eyebrow">Why we exist</p>
          <h2>Every woman deserves the chance to choose her own tomorrow.</h2>
        </div>
        <div className="mission-copy">
          <p>
            We believe empowerment begins when someone feels seen, heard, and
            supported. Through conversations, practical guidance, and a growing
            circle of allies, we help women take the next step on their own
            terms.
          </p>
          <a className="text-link" href="/about">
            Discover People Seva <Arrow />
          </a>
        </div>
      </section>
      <section className="community-photo">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=85"
          alt="A group of women friends standing together outdoors"
        />
        <div className="community-photo-caption">
          <p className="eyebrow">The power of together</p>
          <h2>We do more when we do it together.</h2>
        </div>
      </section>
      <section className="programs">
        <div className="section-heading">
          <div>
            <p className="eyebrow">What we do</p>
            <h2>
              Support that moves
              <br />
              with you.
            </h2>
          </div>
          <p>
            From a first conversation to a fresh start, our programs meet women
            where they are and walk alongside them.
          </p>
        </div>
        <div className="program-grid">
          <article>
            <div className="program-icon" aria-hidden="true">
              ✦
            </div>
            <span className="program-number">01</span>
            <h3>Learn &amp; lead</h3>
            <p>Workshops and mentorship that turn curiosity into confidence.</p>
            <a href="/about">
              Learn more <Arrow />
            </a>
          </article>
          <article className="program-feature">
            <div className="program-icon" aria-hidden="true">
              ↗
            </div>
            <span className="program-number">02</span>
            <h3>Earn with dignity</h3>
            <p>
              Practical pathways to skills, livelihood, and lasting
              independence.
            </p>
            <a href="/about">
              Learn more <Arrow />
            </a>
          </article>
          <article>
            <div className="program-icon" aria-hidden="true">
              ♡
            </div>
            <span className="program-number">03</span>
            <h3>Stand together</h3>
            <p>A warm, responsive community when life feels difficult.</p>
            <a href="/contact">
              Talk to us <Arrow />
            </a>
          </article>
        </div>
      </section>
      <section className="donation-section" id="donate">
        <div>
          <p className="eyebrow">Make an impact today</p>
          <h2>Your kindness can open a door.</h2>
          <p>
            Every contribution helps us create more opportunities for women to
            learn, earn, and lead with confidence.
          </p>
        </div>
        <a
          className="button button-orange"
          href="mailto:psrnewschannel@gmail.com?subject=Donation to People Seva Foundation"
        >
          Donate Now <Arrow />
        </a>
      </section>
      <section className="volunteer-callout">
        <div>
          <p className="eyebrow">Your time can change a life</p>
          <h2>
            Bring your skills.
            <br />
            <i>Make room for hope.</i>
          </h2>
        </div>
        <a className="button button-light" href="/volunteer">
          Become a volunteer <Arrow />
        </a>
      </section>
    </>
  );
}
