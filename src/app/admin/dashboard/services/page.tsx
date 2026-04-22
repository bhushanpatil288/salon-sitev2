"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Service {
  _id: string;
  name: string;
  description: string;
  duration: string;
  startingPrice: string;
  imageUrl: string;
  features: string[];
}

export default function ManageServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [features, setFeatures] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("startingPrice", startingPrice);

    const featuresList = features.split("\n").filter(f => f.trim() !== "");
    formData.append("features", JSON.stringify(featuresList));
    formData.append("image", image);

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        // Reset form
        setName("");
        setDescription("");
        setDuration("");
        setStartingPrice("");
        setFeatures("");
        setImage(null);
        // Refresh list
        fetchServices();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchServices();
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wider text-sm" style={{ fontFamily: "var(--font-heading)" }}>Add New Service</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Service Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border rounded focus:border-[#2a9d8f] outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Image (SVG/PNG/JPG)</label>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} required className="w-full p-2 border rounded focus:border-[#2a9d8f] outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Duration (e.g. &quot;30 min&quot;)</label>
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required className="w-full p-2 border rounded focus:border-[#2a9d8f] outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Starting Price (e.g. &quot;₹500&quot;)</label>
              <input type="text" value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)} required className="w-full p-2 border rounded focus:border-[#2a9d8f] outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full p-2 border rounded focus:border-[#2a9d8f] outline-none" rows={3}></textarea>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Features (One per line)</label>
            <textarea value={features} onChange={(e) => setFeatures(e.target.value)} className="w-full p-2 border rounded focus:border-[#2a9d8f] outline-none" rows={4} placeholder="Precision haircuts&#10;Balayage coloring"></textarea>
          </div>

          <button type="submit" disabled={isSubmitting} className="bg-[#2a9d8f] hover:bg-[#1a7a6d] text-white px-6 py-2 rounded text-sm font-semibold uppercase tracking-wider disabled:opacity-50">
            {isSubmitting ? "Adding..." : "Add Service"}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wider text-sm" style={{ fontFamily: "var(--font-heading)" }}>Existing Services</h3>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-gray-500 text-sm">No services found. Add one above.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service._id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
                <div className="relative h-48 bg-gray-100">
                  <Image src={service.imageUrl} alt={service.name} fill className="object-cover" />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-bold text-lg text-gray-800">{service.name}</h4>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{service.description}</p>
                  <div className="mt-4 flex justify-between items-center text-xs text-gray-600">
                    <span>⏱ {service.duration}</span>
                    <span>₹ {service.startingPrice}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="mt-4 w-full py-2 text-red-600 hover:bg-red-50 text-sm font-semibold uppercase tracking-wider rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
