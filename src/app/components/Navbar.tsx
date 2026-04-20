"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar" id="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link href="/" className="navbar__logo">
          <span className="navbar__logo-icon">✦</span>
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">POOJA</span>
            <span className="navbar__logo-sub">BEAUTY SALON</span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="navbar__link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#book" className="navbar__cta">
          Book Now
        </a>

        {/* Mobile toggle */}
        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`navbar__hamburger ${mobileOpen ? "navbar__hamburger--open" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`navbar__mobile-menu ${mobileOpen ? "navbar__mobile-menu--open" : ""}`}
      >
        <ul className="navbar__mobile-links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="navbar__mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#book"
              className="navbar__mobile-cta"
              onClick={() => setMobileOpen(false)}
            >
              Book Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
