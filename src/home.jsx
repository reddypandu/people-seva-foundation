import { Arrow } from "./navbar";
import HeroImg from "./assets/hero-img5.png";
import EducationImg from "./assets/hero-img4.png";
import { BlogPreview } from "./blogs";
import { FaqPreview } from "./faqs";
import AboutImg from "./assets/hero-img3.png";
import AboutImgg from "./assets/home-about-img.png";
import CommunityImg from "./assets/hero-img2.png";
import CommunityVisitImg from "./assets/people-seva-foundation14.jpeg";
import NeighbourhoodVisitImg from "./assets/people-seva-foundation23.jpeg";
import CommunityConversationImg from "./assets/people-seva-foundation35.jpeg";
import CommunityGatheringImg from "./assets/people-seva-foundation48.jpeg";
import { useEffect, useState } from "react";

const foundationMoments = [
  {
    image: CommunityVisitImg,
    alt: "People Seva Foundation members meeting with local community representatives",
    category: "Community engagement",
    title: "Listening begins with a conversation",
    description:
      "Face-to-face visits create space to hear community perspectives and build stronger local connections.",
  },
  {
    image: NeighbourhoodVisitImg,
    alt: "People Seva Foundation volunteers visiting a neighbourhood shop",
    category: "Neighbourhood visits",
    title: "Getting to know the neighbourhood",
    description:
      "Spending time in local neighbourhoods helps our volunteers connect with people in the places they know.",
  },
  {
    image: CommunityConversationImg,
    alt: "Community members gathered around a table for a conversation",
    category: "Community gathering",
    title: "Making room for shared ideas",
    description:
      "Coming together gives people the opportunity to exchange perspectives and strengthen community ties.",
  },
  {
    image: CommunityGatheringImg,
    alt: "A large group of community members gathered at an event",
    category: "Together as a community",
    title: "Many voices, a shared purpose",
    description:
      "A community gathering reflects the people and shared commitment behind local initiatives.",
  },
];

const heroSlides = [
  {
    image: HeroImg,
    alt: "People Seva Foundation members at an award ceremony",
    eyebrow: "People Seva Foundation · Recognition & Service",
    heading: "Celebrating service,",
    emphasis: "honouring dedication, and inspiring change.",
    description:
      "We recognize the people who dedicate their time and efforts to building stronger, more caring communities.",
  },
  {
    image: EducationImg,
    alt: "Community members coming together for social welfare",
    eyebrow: "People Seva Foundation · United for Good",
    heading: "Stronger together,",
    emphasis: "building a brighter future for every community.",
    description:
      "We bring people together to promote unity, encourage participation, and create meaningful social change.",
  },
  {
    image: AboutImg,
    alt: "People Seva Foundation supporting community initiatives",
    eyebrow: "People Seva Foundation · People First",
    heading: "Every voice matters,",
    emphasis: "every contribution makes a difference.",
    description:
      "We support community initiatives that encourage dignity, equal opportunities, and active participation in social development.",
  },
  {
    image: CommunityImg,
    alt: "People Seva Foundation members working towards social development",
    eyebrow: "People Seva Foundation · Service with Purpose",
    heading: "Together we serve,",
    emphasis: "with compassion, commitment, and hope.",
    description:
      "We strive to create a caring society by encouraging volunteerism, recognizing dedicated individuals, and supporting community development.",
  },
];

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

function ImpactStat({ value }) {
  return (
    <strong aria-label={`${value.toLocaleString("en-IN")}+`}>
      {value.toLocaleString("en-IN")}+
    </strong>
  );
}

export default function Home() {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [activeFoundationMoment, setActiveFoundationMoment] = useState(0);
  const [isFoundationSliderPaused, setIsFoundationSliderPaused] =
    useState(false);
  const currentHeroSlide = heroSlides[activeHeroSlide];
  const currentFoundationMoment = foundationMoments[activeFoundationMoment];

  useEffect(() => {
    if (
      isHeroPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [isHeroPaused]);

  useEffect(() => {
    if (
      isFoundationSliderPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveFoundationMoment(
        (current) => (current + 1) % foundationMoments.length,
      );
    }, 5500);

    return () => window.clearInterval(intervalId);
  }, [isFoundationSliderPaused]);

  const showPreviousHeroSlide = () => {
    setActiveHeroSlide(
      (current) => (current - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  const showNextHeroSlide = () => {
    setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
  };

  const showPreviousFoundationMoment = () => {
    setActiveFoundationMoment(
      (current) =>
        (current - 1 + foundationMoments.length) % foundationMoments.length,
    );
  };

  const showNextFoundationMoment = () => {
    setActiveFoundationMoment(
      (current) => (current + 1) % foundationMoments.length,
    );
  };

  return (
    <>
      <section
        className="hero hero-full-bg"
        aria-roledescription="carousel"
        aria-label="People Seva Foundation highlights"
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
        onFocusCapture={() => setIsHeroPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsHeroPaused(false);
          }
        }}
      >
        <div className="hero-bg-media">
          <img
            key={currentHeroSlide.image}
            src={currentHeroSlide.image}
            alt={currentHeroSlide.alt}
            className="hero-bg-img"
          />
          <div className="hero-bg-overlay" />
        </div>

        <div className="hero-container">
          <div
            className="hero-copy"
            key={`hero-copy-${activeHeroSlide}`}
            aria-live="polite"
          >
            <p className="eyebrow">{currentHeroSlide.eyebrow}</p>
            <h1>
              {currentHeroSlide.heading}
              <span> {currentHeroSlide.emphasis}</span>
            </h1>
            <p className="hero-intro">{currentHeroSlide.description}</p>
            <div className="hero-actions">
              <a className="hero-btn-donate" href="/donate">
                Donate Now <span className="btn-icon">♥</span>
              </a>
              <a className="hero-btn-outline" href="/about">
                About Us
              </a>
            </div>
          </div>
        </div>
        <div className="hero-carousel-controls">
          <button
            type="button"
            className="hero-carousel-arrow"
            aria-label="Previous slide"
            onClick={showPreviousHeroSlide}
          >
            ‹
          </button>
          <div className="hero-carousel-dots" aria-label="Choose a slide">
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.eyebrow}
                className={`hero-carousel-dot ${
                  index === activeHeroSlide ? "active" : ""
                }`}
                aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`}
                aria-current={index === activeHeroSlide ? "true" : undefined}
                onClick={() => setActiveHeroSlide(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="hero-carousel-arrow"
            aria-label="Next slide"
            onClick={showNextHeroSlide}
          >
            ›
          </button>
        </div>
      </section>

      <section className="impact-strip">
        {impactStats.map((item) => (
          <div className="impact-item" key={item.label}>
            <ImpactStat value={item.value} />
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="story-section section-shell">
        <div className="story-image">
          <img
            src={AboutImgg}
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
      <section
        className="foundation-gallery section-shell"
        aria-roledescription="carousel"
        aria-label="People Seva Foundation moments"
        onMouseEnter={() => setIsFoundationSliderPaused(true)}
        onMouseLeave={() => setIsFoundationSliderPaused(false)}
        onFocusCapture={() => setIsFoundationSliderPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsFoundationSliderPaused(false);
          }
        }}
      >
        <div className="foundation-gallery-heading">
          <div>
            <p className="eyebrow">
              People Seva Foundation · Across the community
            </p>
            <h2>Everyday moments, shared purpose.</h2>
          </div>
          <p>
            From neighbourhood visits to community gatherings, these moments
            capture the connections behind our work.
          </p>
        </div>

        <div
          className="foundation-gallery-slide"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="foundation-gallery-image-wrap">
            <img
              key={currentFoundationMoment.image}
              src={currentFoundationMoment.image}
              alt={currentFoundationMoment.alt}
              className="foundation-gallery-image"
            />
            <span className="foundation-gallery-category">
              {currentFoundationMoment.category}
            </span>
          </div>
          <div className="foundation-gallery-caption">
            <span className="foundation-gallery-index">
              {String(activeFoundationMoment + 1).padStart(2, "0")} /{" "}
              {String(foundationMoments.length).padStart(2, "0")}
            </span>
            <h3>{currentFoundationMoment.title}</h3>
            <p>{currentFoundationMoment.description}</p>
            <a className="text-link" href="/about">
              Learn about our work <Arrow />
            </a>
          </div>
        </div>

        <div className="foundation-gallery-controls">
          <div className="foundation-gallery-dots" aria-label="Choose a photo">
            {foundationMoments.map((moment, index) => (
              <button
                type="button"
                key={moment.title}
                className={`foundation-gallery-dot ${
                  index === activeFoundationMoment ? "active" : ""
                }`}
                aria-label={`Show photo ${index + 1}: ${moment.title}`}
                aria-current={
                  index === activeFoundationMoment ? "true" : undefined
                }
                onClick={() => setActiveFoundationMoment(index)}
              />
            ))}
          </div>
          <div className="foundation-gallery-arrows">
            <button
              type="button"
              className="foundation-gallery-arrow"
              aria-label="Previous photo"
              onClick={showPreviousFoundationMoment}
            >
              ‹
            </button>
            <button
              type="button"
              className="foundation-gallery-arrow"
              aria-label="Next photo"
              onClick={showNextFoundationMoment}
            >
              ›
            </button>
          </div>
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
        <a className="button button-orange" href="/donate">
          Donate now <Arrow />
        </a>
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
