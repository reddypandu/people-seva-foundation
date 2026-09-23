import "./App.css";
import { FloatingActions, Footer, Header } from "./navbar";
import Home from "./home";
import AboutUs from "./about-us";
import Volunteer from "./volunteer";
import Contact from "./contact";
import Blogs from "./blogs";
import Faqs from "./faqs";
import logoAnimation from "./assets/logo_animation.mp4";
import { useEffect, useState } from "react";

function BrandIntro({ onComplete }) {
  useEffect(() => {
    const fallback = window.setTimeout(onComplete, 6000);
    return () => window.clearTimeout(fallback);
  }, [onComplete]);

  return (
    <div
      className="brand-intro"
      role="status"
      aria-label="Loading People Seva Foundation"
    >
      <video
        className="brand-intro-video"
        src={logoAnimation}
        autoPlay
        preload="auto"
        muted
        playsInline
        onEnded={onComplete}
        onError={onComplete}
      />
      <button type="button" className="brand-intro-skip" onClick={onComplete}>
        Skip intro
      </button>
    </div>
  );
}

function DonationModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("Priya Sharma");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("priya@example.com");
  const [pan, setPan] = useState("ABCDE1234F");

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`donation-modal-overlay ${isOpen ? "open" : ""}`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        className="donation-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Donation form"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close donation form"
        >
          ×
        </button>

        <h2>Choose How You Want To Create Impact</h2>
        <p>
          Every contribution helps strengthen protection, education, nutrition,
          healthcare, and opportunities for every child.
        </p>

        <div className="donation-form">
          <label className="field-group">
            <span>CHOOSE AMOUNT</span>
            <div className="amount-box">
              <span className="currency">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Enter amount"
                aria-label="Donation amount"
              />
            </div>
          </label>

          <div className="detail-grid">
            <label className="field-group">
              <span>Full Name *</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label className="field-group">
              <span>Phone Number *</span>
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="10-digit Phone"
              />
            </label>

            <label className="field-group">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label className="field-group">
              <span>PAN (80G receipt)</span>
              <input
                type="text"
                value={pan}
                onChange={(event) => setPan(event.target.value)}
              />
            </label>
          </div>

          <p className="donation-note">
            Donations are eligible for 80G tax exemption. Your information is
            safe and secure.
          </p>

          <button type="button" className="donate-submit">
            Donate ₹{amount || 0}
          </button>
        </div>
      </div>
    </div>
  );
}

const seoByPage = {
  "/": {
    title: "People Seva Foundation | Empowering Women in Hyderabad",
    description:
      "People Seva Foundation works to empower women through education, skill development, employment opportunities and community initiatives, creating a stronger and more inclusive society.",
  },
  "/about": {
    title: "About Us | People Seva Foundation",
    description:
      "Learn how People Seva Foundation supports women through education, mentorship, skills, opportunity, and compassionate community initiatives.",
  },
  "/volunteer": {
    title: "Volunteer with Us | People Seva Foundation",
    description:
      "Join People Seva Foundation as a volunteer and help create education, skill development, employment, and support opportunities for women.",
  },
  "/contact": {
    title: "Contact Us | People Seva Foundation Hyderabad",
    description:
      "Contact People Seva Foundation in Ameerpet, Hyderabad to learn more, request support, volunteer, or collaborate on women empowerment initiatives.",
  },
  "/blogs": {
    title: "Stories and Insights | People Seva Foundation",
    description:
      "Read People Seva Foundation stories, field notes, community updates, and ideas from the people behind our work.",
  },
  "/faqs": {
    title: "FAQs | People Seva Foundation",
    description:
      "Find answers about People Seva Foundation programmes, donations, volunteering, and community support.",
  },
};

function updateMetaTag(attribute, value, content) {
  let tag = document.querySelector(`meta[${attribute}="${value}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function App() {
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const page =
    window.location.pathname === "/"
      ? "/"
      : `/${window.location.pathname.split("/")[1]}`;
  const [showBrandIntro, setShowBrandIntro] = useState(page === "/");

  useEffect(() => {
    const seo = seoByPage[page] || seoByPage["/"];
    document.title = seo.title;
    updateMetaTag("name", "description", seo.description);
    updateMetaTag("property", "og:title", seo.title);
    updateMetaTag("property", "og:description", seo.description);
  }, [page]);

  const completeBrandIntro = () => {
    setShowBrandIntro(false);
  };

  const pages = {
    "/": <Home onDonateClick={() => setIsDonationOpen(true)} />,
    "/about": <AboutUs />,
    "/volunteer": <Volunteer />,
    "/contact": <Contact />,
    "/blogs": <Blogs />,
    "/faqs": <Faqs />,
  };

  return (
    <>
      {page === "/" && showBrandIntro && (
        <BrandIntro onComplete={completeBrandIntro} />
      )}
      <Header activePage={page} onDonateClick={() => setIsDonationOpen(true)} />
      <main>
        {pages[page] || <Home onDonateClick={() => setIsDonationOpen(true)} />}
      </main>
      <Footer />
      <FloatingActions />
      <DonationModal
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
      />
    </>
  );
}

export default App;
