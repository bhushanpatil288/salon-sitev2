import Image from "next/image";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__container">
        {/* Image */}
        <div className="about__image-col">
          <div className="about__image-wrapper">
            <Image
              src="/about-salon.png"
              alt="Stylist working at Pooja Beauty Salon"
              fill
              className="about__image"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Content */}
        <div className="about__content">
          <h2 className="about__heading">About The Salon</h2>

          <p className="about__body">
            Pooja Beauty Salon is a haven of beauty and relaxation. Let our
            professionals pamper you with the finest product lines and services,
            delivered with warmth and care. It&apos;s a truly unique salon &amp;
            spa experience.
          </p>

          <p className="about__body">
            We&apos;re proud to have been recognized as one of the top salons in
            our community for multiple years. We&apos;re honored by your support
            and we&apos;re just getting started.
          </p>

          <p className="about__body">
            Come experience why we&apos;ve earned that reputation, from luxe
            custom color and signature cuts to spa services and bridal beauty.
          </p>

          <a href="#contact" className="about__cta">
            More About Us This Way →
          </a>
        </div>
      </div>
    </section>
  );
}
