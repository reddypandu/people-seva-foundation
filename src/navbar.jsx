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
