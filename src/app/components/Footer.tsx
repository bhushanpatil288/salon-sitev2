export default function Footer() {
  return (
    <footer className="footer" id="contact">
      {/* Main footer */}
      <div className="footer__main">
        <div className="footer__container">
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
      </div>

      {/* Search bar section */}
      <div className="footer__search-section">
        <div className="footer__container">
          <p className="footer__search-label">
            Looking for something in particular? Search below!
          </p>
          <div className="footer__search-wrapper">
            <svg
              className="footer__search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              placeholder="Search"
              className="footer__search-input"
              aria-label="Search the website"
              id="footer-search"
            />
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
