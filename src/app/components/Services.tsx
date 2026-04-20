const SERVICES = [
  {
    name: "Hair + Color",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="30" cy="18" rx="8" ry="12" />
        <line x1="30" y1="30" x2="30" y2="65" />
        <line x1="24" y1="14" x2="24" y2="22" />
        <line x1="30" y1="10" x2="30" y2="18" />
        <line x1="36" y1="14" x2="36" y2="22" />
        <circle cx="30" cy="68" r="3" />
      </svg>
    ),
  },
  {
    name: "Makeup",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="30" y="10" width="16" height="30" rx="3" />
        <rect x="32" y="40" width="12" height="25" rx="2" />
        <line x1="32" y1="40" x2="44" y2="40" />
        <path d="M33 15 L43 15" />
        <circle cx="38" cy="70" r="3" />
      </svg>
    ),
  },
  {
    name: "Wax",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 35 Q20 25, 40 20 Q60 25, 60 35" />
        <rect x="20" y="35" width="40" height="25" rx="5" />
        <path d="M28 35 L28 28" />
        <path d="M52 35 L52 28" />
        <line x1="25" y1="47" x2="55" y2="47" />
      </svg>
    ),
  },
  {
    name: "Spa",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="25" cy="45" rx="8" ry="15" />
        <path d="M25 30 Q50 28, 62 35 Q65 40, 62 55 Q50 62, 25 60" />
        <path d="M30 33 Q45 31, 55 36" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="services__container">
        <p className="services__overline">Explore The</p>
        <h2 className="services__heading">Services We Offer</h2>

        <div className="services__grid">
          {SERVICES.map((service) => (
            <div key={service.name} className="services__card">
              <div className="services__icon">{service.icon}</div>
              <h3 className="services__label">{service.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
