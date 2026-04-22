import TopBar from "../components/TopBar";
export const dynamic = 'force-dynamic';
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Footer from "../components/Footer";
import dbConnect from "../../lib/db";
import Service from "../../models/Service";

export default async function ServicesPage() {
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

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="pt-20 pb-10 bg-white">
        <Services initialServices={serializedServices} isHome={false} />
      </main>
      <Footer />
    </>
  );
}
