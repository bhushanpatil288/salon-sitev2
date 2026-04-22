import TopBar from "./components/TopBar";
export const dynamic = 'force-dynamic';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Team from "./components/Team";
import Footer from "./components/Footer";
import dbConnect from "../lib/db";
import Service from "../models/Service";
import Theme from "../models/Theme";

export default async function Home() {
  await dbConnect();

  // Fetch services
  const servicesData = await Service.find({}).sort({ createdAt: -1 }).lean();
  const serializedServices = servicesData.map((s: { _id: { toString: () => string }; name: string; description: string; duration: string; startingPrice: string; imageUrl: string; features: string[] }) => ({
    _id: s._id.toString(),
    name: s.name,
    description: s.description,
    duration: s.duration,
    startingPrice: s.startingPrice,
    imageUrl: s.imageUrl,
    features: s.features,
  }));

  // Fetch theme
  const themeConfig = await Theme.findOne().lean();
  const activeFestival = themeConfig?.activeFestival || "default";

  const STANDARD_FESTIVALS: Record<string, string> = {
    default: "/hero-bg.png",
    diwali: "https://res.cloudinary.com/dsyxsipwf/image/upload/v1776778840/diwali_zqijlv.jpg",
    christmas: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=2000",
    holi: "https://res.cloudinary.com/dsyxsipwf/image/upload/v1776779056/holi_kradyt.jpg",
  };

  let heroImage = STANDARD_FESTIVALS[activeFestival];
  if (!heroImage && themeConfig?.customThemes) {
    const customTheme = themeConfig.customThemes.find((t: any) => t.id === activeFestival);
    if (customTheme) heroImage = customTheme.imagePreview;
  }
  if (!heroImage) heroImage = STANDARD_FESTIVALS.default;

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Hero heroImage={heroImage} />
        <Services initialServices={serializedServices} isHome={true} />
        <About />
        <Team />
      </main>
      <Footer />
    </>
  );
}
