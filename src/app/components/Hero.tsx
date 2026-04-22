import Image from "next/image";

export default function Hero({ activeFestival = "default" }: { activeFestival?: string }) {
  // Map festivals to specific images (could be URLs or local images)
  const festivalImages: Record<string, string> = {
    default: "/hero-bg.png",
    diwali: "https://res.cloudinary.com/dsyxsipwf/image/upload/v1776778840/diwali_zqijlv.jpg",
    christmas: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=2000",
    holi: "https://res.cloudinary.com/dsyxsipwf/image/upload/v1776779056/holi_kradyt.jpg",
  };

  const heroImage = festivalImages[activeFestival] || festivalImages.default;

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
