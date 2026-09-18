import { Arrow } from "./navbar";
import Hero from "./assets/women.png";
import { BlogPreview } from "./blogs";
import { FaqPreview } from "./faqs";
import { useEffect, useRef, useState } from "react";

const impactStats = [
  { label: "Women supported", value: 2500 },
  { label: "Care sessions", value: 1200 },
  { label: "Skill programs", value: 40 },
  { label: "Partner volunteers", value: 500 },
];

const programs = [
  {
    title: "Education & confidence",
    text: "Mentoring, literacy support, and personal development that help women begin again with courage.",
    accent: "orange",
  },
  {
    title: "Livelihood pathways",
    text: "Hands-on guidance in employability, enterprise learning, and income-generating opportunities.",
    accent: "navy",
  },
  {
    title: "Community care",
    text: "Compassion-led outreach and safety networks that make support feel close and consistent.",
    accent: "light",
  },
];

function AnimatedStat({ value }) {
  const [count, setCount] = useState(0);
  const statRef = useRef(null);

  useEffect(() => {
    const element = statRef.current;
    if (!element) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let animationFrame;
    let hasStarted = false;

    const startCounting = () => {
      if (hasStarted) return;
      hasStarted = true;

      if (prefersReducedMotion) {
        setCount(value);
        return;
      }

      const duration = 1500;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(value * easedProgress));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };

      animationFrame = requestAnimationFrame(updateCount);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startCounting();
      },
      { threshold: 0.45 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <strong ref={statRef} aria-label={`${value}+`}>
      {count}+
    </strong>
  );
}

export default function Home({ onDonateClick }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">People Seva Foundation · Care for life</p>
          <h1>
            Every life deserves
            <span> care, dignity, and a future full of possibility.</span>
          </h1>
          <p className="hero-intro">
            We work alongside children, women, families, and communities through
            care, education, wellbeing, and opportunity.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="button button-orange"
              onClick={onDonateClick}
            >
              Donate now <Arrow />
            </button>
            <a className="text-link" href="/about">
              Discover our work <Arrow />
            </a>
          </div>
          <div
            className="hero-proof"
            aria-label="People Seva Foundation values"
          >
            <span>
              <strong>01</strong> Care first
            </span>
            <span>
              <strong>02</strong> Local action
            </span>
            <span>
              <strong>03</strong> Lasting change
            </span>
          </div>
        </div>

        <div className="hero-visual">
          <span className="hero-frame-label">A future built together</span>
          <img
            src={Hero}
            alt="Women smiling together in a community outreach program"
          />
          <div className="hero-panel panel-one">
            <span className="panel-label">OUR REACH</span>
            <strong>2,500+</strong>
            <small>
              People reached through care, learning, and community support.
            </small>
          </div>
          <div className="hero-panel panel-two">
            <strong>01</strong>
            <span>Small acts. Lasting change.</span>
          </div>
        </div>
      </section>

      <section className="impact-strip">
        {impactStats.map((item) => (
          <div className="impact-item" key={item.label}>
            <AnimatedStat value={item.value} />
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="story-section section-shell">
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85"
            alt="Women participating in community work together"
          />
        </div>
        <div className="story-copy">
          <p className="eyebrow">Integrated care</p>
          <h2>A safe beginning can change the whole journey.</h2>
          <p>
            People Seva Foundation is a purpose-driven organisation supporting
            vulnerable people with compassion, practical care, education, and
            opportunities to build a stronger future.
          </p>
          <ul className="feature-list">
            <li>Protection, nutrition, and emotional wellbeing</li>
            <li>Education, skills, and livelihood pathways</li>
            <li>Community-led support that lasts</li>
          </ul>
          <a className="text-link" href="/about">
            Know more about us <Arrow />
          </a>
        </div>
      </section>

      <section className="programs section-shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">Our programmes</p>
            <h2>Care that grows with every stage of life.</h2>
          </div>
          <p>
            Our initiatives are designed around real needs, with continuity,
            dignity, and measurable impact at the centre of every effort.
          </p>
        </div>

        <div className="program-grid">
          {programs.map((program, index) => (
            <article
              key={program.title}
              className={
                program.accent === "navy"
                  ? "program-card navy"
                  : program.accent === "light"
                    ? "program-card light"
                    : "program-card"
              }
            >
              <span className="program-number">0{index + 1}</span>
              <div className="program-icon" aria-hidden="true">
                {index === 0 ? "✦" : index === 1 ? "↗" : "♡"}
              </div>
              <h3>{program.title}</h3>
              <p>{program.text}</p>
              <a href="/about">
                Learn more <Arrow />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="highlight-section section-shell">
        <div className="highlight-copy">
          <p className="eyebrow">Why it matters</p>
          <h2>Care. Educate. Empower. Lead.</h2>
          <p>
            We walk with people through the whole journey, from safety and
            learning to confidence, independence, and leadership.
          </p>
        </div>
        <div className="highlight-points">
          <div>
            <strong>Care</strong>
            <span>Protection, health, nutrition, and emotional security.</span>
          </div>
          <div>
            <strong>Educate</strong>
            <span>Learning support, digital confidence, and wellbeing.</span>
          </div>
          <div>
            <strong>Empower</strong>
            <span>Skills, livelihoods, identity, and the courage to lead.</span>
          </div>
        </div>
      </section>

      <section className="donation-section" id="donate">
        <div>
          <p className="eyebrow">Support a life · Sustain a journey</p>
          <h2>Your support can make care possible.</h2>
          <p>
            Every contribution helps provide care, learning opportunities,
            healthcare, and community support where it matters most.
          </p>
        </div>
        <button
          type="button"
          className="button button-orange"
          onClick={onDonateClick}
        >
          Donate now <Arrow />
        </button>
      </section>

      <BlogPreview />

      <FaqPreview />

      <section className="volunteer-callout">
        <div>
          <p className="eyebrow">Become a People Seva friend</p>
          <h2>
            Bring your time.
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
