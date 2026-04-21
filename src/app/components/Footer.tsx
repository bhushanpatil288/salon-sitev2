"use client";

import { useState } from "react";
import { useAppSelector } from "../store";

export default function Footer() {
  const serviceNames = useAppSelector((state) => state.services.names);
  const [selectedService, setSelectedService] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    if (!phone) return;

    const parts: string[] = [];
    if (selectedService) {
      parts.push(`Service: ${selectedService}`);
    }
    if (message.trim()) {
      parts.push(message.trim());
    }

    const text = parts.length
      ? parts.join("\n\n")
      : "Hi, I'd like to book an appointment.";

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const isDisabled = !selectedService && !message.trim();

  return (
    <footer className="footer" id="contact">
      {/* Main footer */}
      <div className="footer__main">
        <div className="footer__container">
          <div className="footer__main-grid">
            {/* Left — salon info */}
            <div className="footer__info">
              <h3 className="footer__salon-name">Salon &amp; Spa</h3>
              <address className="footer__address">
                <p>Ashirwad Township 2</p>
                <p>120-feet bamroli road, surat - 394210</p>
                <p className="footer__phone">+91 9426992424</p>
              </address>
              <p className="footer__tagline">
                <em>Serving our community with love, care, and beauty.</em>
              </p>
            </div>

            {/* Right — WhatsApp contact */}
            <div className="footer__whatsapp" id="footer-whatsapp">
              <div className="footer__wa-header">
                <svg
                  className="footer__wa-icon"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <h4 className="footer__wa-title">Message Us on WhatsApp</h4>
              </div>

              {/* Service selector */}
              <div className="footer__wa-field">
                <label htmlFor="wa-service" className="footer__wa-label">
                  Select a service
                </label>
                <select
                  id="wa-service"
                  className="footer__wa-select"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="">Choose a service…</option>
                  {serviceNames.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message textarea */}
              <div className="footer__wa-field">
                <label htmlFor="wa-message" className="footer__wa-label">
                  Your message
                </label>
                <textarea
                  id="wa-message"
                  className="footer__wa-textarea"
                  placeholder="E.g. I'd like to book for Saturday afternoon…"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Send button */}
              <button
                className="footer__wa-send"
                onClick={handleSend}
                disabled={isDisabled}
                aria-label="Send message via WhatsApp"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Send via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="footer__container">
          <p className="footer__copyright">
            © Pooja Beauty Salon, {new Date().getFullYear()} | All rights
            reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
