import Image from "next/image";

export default function Hero({ heroImage = "/hero-bg.png" }: { heroImage?: string }) {
  return (
    <section className="hero" id="hero">
      <div className="hero__image-wrapper">
        {heroImage.startsWith('http') ? (
          <img
            src={heroImage}
            alt="Pooja Beauty Salon interior"
            className="hero__image w-full h-full object-cover"
          />
        ) : (
          <Image
            src={heroImage}
            alt="Pooja Beauty Salon interior"
            fill
            priority
            className="hero__image"
            sizes="100vw"
          />
        )}
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <p className="hero__tagline">
          Experience the art of beauty
          <br />
          and self-care at its finest
        </p>
        <h1 className="hero__heading">
          Pooja Beauty <br /> Salon + Spa
        </h1>
      </div>
    </section>
  );
}
