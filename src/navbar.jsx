import { useState } from "react";
import { contact } from "./contact-info";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Contact us", href: "/contact" },
];

export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}

export function Header({ activePage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`site-header ${isMenuOpen ? "menu-open" : ""}`}>
      <a className="brand" href="/" aria-label="People Seva Foundation home">
        <span className="brand-mark">PSF</span>
        <span className="brand-name">
          People Seva
          <br />
          <em>Foundation</em>
        </span>
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
        {navItems.map((item) => (
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
      <a className="header-cta" href="/#donate">
        Donate <Arrow />
      </a>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand-mark">PSF</span>
        <p>
          People Seva Foundation
          <br />
          <span>Stronger together, brighter forever.</span>
        </p>
      </div>
      <div className="footer-links">
        <p className="eyebrow">Explore</p>
        <a href="/about">About us</a>
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
