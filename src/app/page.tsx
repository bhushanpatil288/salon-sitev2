import TopBar from "./components/TopBar";
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

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Hero activeFestival={activeFestival} />
        <Services initialServices={serializedServices} isHome={true} />
        <About />
        <Team />
      </main>
      <Footer />
    </>
  );
}
