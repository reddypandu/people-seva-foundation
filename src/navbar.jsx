import { useEffect, useState } from "react";
import { contact } from "./contact-info";
import logo from "./assets/logoo.png";
import logoo from "./assets/logo.png";

const languageLabels = {
  en: {
    home: "Home",
    work: "Our work",
    stories: "Stories",
    volunteer: "Volunteer",
    contact: "Contact",
    faqs: "FAQs",
    donate: "Donate",
    explore: "Explore",
    about: "About us",
    contactUs: "Contact us",
    language: "Language",
  },
  hi: {
    home: "होम",
    work: "हमारा काम",
    stories: "कहानियाँ",
    volunteer: "स्वयंसेवा",
    contact: "संपर्क",
    faqs: "सवाल",
    donate: "दान करें",
    explore: "जानें",
    about: "हमारे बारे में",
    contactUs: "संपर्क करें",
    language: "भाषा",
  },
  te: {
    home: "హోమ్",
    work: "మా పని",
    stories: "కథలు",
    volunteer: "స్వచ్ఛంద సేవ",
    contact: "సంప్రదించండి",
    faqs: "ప్రశ్నలు",
    donate: "విరాళం",
    explore: "తెలుసుకోండి",
    about: "మా గురించి",
    contactUs: "సంప్రదించండి",
    language: "భాష",
  },
  ta: {
    home: "முகப்பு",
    work: "எங்கள் பணி",
    stories: "கதைகள்",
    volunteer: "தன்னார்வம்",
    contact: "தொடர்பு",
    faqs: "கேள்விகள்",
    donate: "நன்கொடை",
    explore: "ஆராயுங்கள்",
    about: "எங்களைப் பற்றி",
    contactUs: "தொடர்பு கொள்ளுங்கள்",
    language: "மொழி",
  },
  kn: {
    home: "ಮುಖಪುಟ",
    work: "ನಮ್ಮ ಕೆಲಸ",
    stories: "ಕಥೆಗಳು",
    volunteer: "ಸ್ವಯಂಸೇವೆ",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    faqs: "ಪ್ರಶ್ನೆಗಳು",
    donate: "ದೇಣಿಗೆ ನೀಡಿ",
    explore: "ಅನ್ವೇಷಿಸಿ",
    about: "ನಮ್ಮ ಬಗ್ಗೆ",
    contactUs: "ಸಂಪರ್ಕಿಸಿ",
    language: "ಭಾಷೆ",
  },
};

const languageCodes = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "te", label: "తెలుగు" },
  { code: "ta", label: "தமிழ்" },
  { code: "kn", label: "ಕನ್ನಡ" },
];

export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}

export function Header({ activePage, onDonateClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState(
    () => window.localStorage.getItem("people-seva-language") || "en",
  );
  const labels = languageLabels[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;

      const translateRoot = document.getElementById("google_translate_element");
      if (translateRoot?.querySelector(".goog-te-combo")) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,te,ta,kn",
          autoDisplay: false,
        },
        "google_translate_element",
      );

      const savedLanguage =
        window.localStorage.getItem("people-seva-language") || "en";
      if (savedLanguage !== "en") {
        window.setTimeout(() => setGoogleWidgetLanguage(savedLanguage), 300);
      }
    };

    if (!document.querySelector("script[data-google-translate]")) {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.dataset.googleTranslate = "true";
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    }
  }, []);

  const translatedNavItems = [
    { label: labels.home, href: "/" },
    { label: labels.work, href: "/about" },
    { label: labels.stories, href: "/blogs" },
    { label: labels.volunteer, href: "/volunteer" },
    { label: labels.contact, href: "/contact" },
    { label: labels.faqs, href: "/faqs" },
  ];

  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("people-seva-language", nextLanguage);
    applyGoogleLanguage(nextLanguage);
  };

  return (
    <header
      className={`site-header notranslate ${isMenuOpen ? "menu-open" : ""}`}
    >
      <a className="brand" href="/" aria-label="People Seva Foundation home">
        <img className="brand-logo" src={logo} alt="People Seva Foundation" />
      </a>
      <button
        className="mobile-toggle"
        type="button"
        aria-label={
          isMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className="main-nav" aria-label="Main navigation">
        {translatedNavItems.map((item) => (
          <a
            className={activePage === item.href ? "active" : ""}
            href={item.href}
            key={item.href}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <div id="google_translate_element" aria-hidden="true" />
        <label className="language-switcher" aria-label={labels.language}>
          <span aria-hidden="true">文</span>
          <select
            value={language}
            onChange={(event) => changeLanguage(event.target.value)}
          >
            {languageCodes.map((item) => (
              <option value={item.code} key={item.code}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="header-cta" onClick={onDonateClick}>
          {labels.donate} <Arrow />
        </button>
      </div>
    </header>
  );
}

function applyGoogleLanguage(language) {
  const cookieValue = language === "en" ? "" : `/en/${language}`;
  document.cookie = `googtrans=${cookieValue}; path=/`;
  window.location.reload();
}

function setGoogleWidgetLanguage(language) {
  const googleSelect = document.querySelector(".goog-te-combo");
  if (!googleSelect) return;

  googleSelect.value = language === "en" ? "" : `en|${language}`;
  googleSelect.dispatchEvent(new Event("change"));
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img
          className="brand-logo footer-logo"
          src={logoo}
          alt="People Seva Foundation"
        />
        <p>
          People Seva Foundation
          <br />
          <span>Stronger together, brighter forever.</span>
        </p>
      </div>

      <div className="footer-links">
        <p className="eyebrow">{languageLabels.en.explore}</p>
        <a href="/about">{languageLabels.en.about}</a>
        <a href="/blogs">Stories</a>
        <a href="/faqs">FAQs</a>
        <a href="/volunteer">Volunteer</a>
        <a href="/contact">Contact us</a>
      </div>

      <div className="footer-contact">
        <p className="eyebrow">Reach us</p>
        <a href={`tel:${contact.phone.replaceAll(" ", "")}`}>{contact.phone}</a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <p>{contact.address}</p>
      </div>

      <div className="footer-social">
        <p className="eyebrow">Follow us</p>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          Instagram <span aria-hidden="true">↗</span>
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          Facebook <span aria-hidden="true">↗</span>
        </a>
        <a href="https://x.com/" target="_blank" rel="noreferrer">
          Twitter / X <span aria-hidden="true">↗</span>
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
          YouTube <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="footer-bottom">
        <span>© 2026 People Seva Foundation</span>
        <span>Built with care in Hyderabad</span>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  const phoneNumber = contact.phone.replaceAll(" ", "");

  return (
    <aside className="floating-actions" aria-label="Quick contact actions">
      <a
        className="floating-action floating-whatsapp"
        href={`https://wa.me/${phoneNumber.replace("+", "")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with People Seva Foundation on WhatsApp"
      >
        <span className="floating-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="presentation">
            <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.5-8.3Zm-8.4 18.1h-.1c-1.7 0-3.4-.5-4.9-1.3l-.4-.2-3.9 1 1-3.8-.2-.4a9.8 9.8 0 0 1-1.5-5.2C2.1 6.4 6.5 2 12.1 2c2.6 0 5.1 1 6.9 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.7-9.8 9.7Zm5.4-7.3c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.6-1.4-3.6-3.2-.3-.5.3-.4.8-1.3.1-.2.1-.4 0-.6l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.1 4.6 1.9.8 2.6.9 3.5.8.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.7-.4Z" />
          </svg>
        </span>
        <span>WhatsApp</span>
      </a>
      <a
        className="floating-action floating-call"
        href={`tel:${phoneNumber}`}
        aria-label={`Call People Seva Foundation at ${contact.phone}`}
      >
        <span className="floating-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="presentation">
            <path d="M21.7 16.7 17 14.7a1.8 1.8 0 0 0-2 .4l-1.3 1.3a14.2 14.2 0 0 1-6.1-6.1l1.3-1.3a1.8 1.8 0 0 0 .4-2L7.3 2.3a1.8 1.8 0 0 0-2.1-1L2.5 2.4A2.5 2.5 0 0 0 1 4.8C1.5 14.9 9.1 22.5 19.2 23a2.5 2.5 0 0 0 2.4-1.5l1.1-2.7a1.8 1.8 0 0 0-1-2.1Z" />
          </svg>
        </span>
        <span>Call us</span>
      </a>
    </aside>
  );
}
