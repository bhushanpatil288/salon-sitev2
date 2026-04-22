"use client";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { setServices } from "../store/servicesSlice";
import Link from "next/link";
import Image from "next/image";

/** Icons are JSX (non-serialisable) so we keep them in the component keyed by service name */
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "Hair + Color": (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="30" cy="18" rx="8" ry="12" />
      <line x1="30" y1="30" x2="30" y2="65" />
      <line x1="24" y1="14" x2="24" y2="22" />
      <line x1="30" y1="10" x2="30" y2="18" />
      <line x1="36" y1="14" x2="36" y2="22" />
      <circle cx="30" cy="68" r="3" />
    </svg>
  ),
  Makeup: (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="30" y="10" width="16" height="30" rx="3" />
      <rect x="32" y="40" width="12" height="25" rx="2" />
      <line x1="32" y1="40" x2="44" y2="40" />
      <path d="M33 15 L43 15" />
      <circle cx="38" cy="70" r="3" />
    </svg>
  ),
  Wax: (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 35 Q20 25, 40 20 Q60 25, 60 35" />
      <rect x="20" y="35" width="40" height="25" rx="5" />
      <path d="M28 35 L28 28" />
      <path d="M52 35 L52 28" />
      <line x1="25" y1="47" x2="55" y2="47" />
    </svg>
  ),
  Spa: (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="25" cy="45" rx="8" ry="15" />
      <path d="M25 30 Q50 28, 62 35 Q65 40, 62 55 Q50 62, 25 60" />
      <path d="M30 33 Q45 31, 55 36" />
    </svg>
  ),
};

export default function Services({ initialServices, isHome = false }: { initialServices?: { name: string; imageUrl?: string }[], isHome?: boolean }) {
  const dispatch = useAppDispatch();
  const services = useAppSelector((state) => state.services.items);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialServices && initialServices.length > 0) {
      dispatch(setServices(initialServices));
    }
  }, [initialServices, dispatch]);

  const displayServices = isHome ? services.slice(0, 4) : services;

  const openModal = (index: number) => setActiveIndex(index);
  const closeModal = () => setActiveIndex(null);

  const active = activeIndex !== null ? displayServices[activeIndex] : null;

  return (
    <section className="services" id="services">
      <div className="services__container">
        <p className="services__overline">Explore The</p>
        <h2 className="services__heading">Services We Offer</h2>

        <div className="services__grid">
          {displayServices.map((service, i) => (
            <div
              key={service.name}
              className="services__card"
              onClick={() => openModal(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal(i);
                }
              }}
            >
              <div className="services__icon overflow-hidden rounded-full border border-gray-100 bg-white">
                {(service as { imageUrl?: string }).imageUrl ? (
                  <div className="relative w-full h-full">
                    <Image src={(service as { imageUrl?: string }).imageUrl!} alt={service.name} fill className="object-cover" />
                  </div>
                ) : (
                  SERVICE_ICONS[service.name]
                )}
              </div>
              <h3 className="services__label">{service.name}</h3>
            </div>
          ))}
        </div>

        {isHome && services.length > 4 && (
          <div className="mt-12 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 px-8 py-3 bg-[#2a9d8f] hover:bg-[#1a7a6d] text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm">
              More Services →
            </Link>
          </div>
        )}
      </div>

      {/* ── Service Detail Modal ── */}
      {active && (
        <div
          className="service-modal__backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} details`}
        >
          <div
            className="service-modal__panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="service-modal__close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </button>

            {/* Icon */}
            <div className="service-modal__icon">
              {SERVICE_ICONS[active.name]}
            </div>

            {/* Title */}
            <h3 className="service-modal__title">{active.name}</h3>

            {/* Description */}
            <p className="service-modal__description">{active.description}</p>

            {/* Meta badges */}
            <div className="service-modal__meta">
              <span className="service-modal__badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {active.duration}
              </span>
              <span className="service-modal__badge">
                ₹ {active.startingPrice}
              </span>
            </div>

            {/* Features list */}
            <ul className="service-modal__features">
              {active.features.map((f) => (
                <li key={f} className="service-modal__feature">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a href="#contact" className="service-modal__cta" onClick={closeModal}>
              Book Now
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
