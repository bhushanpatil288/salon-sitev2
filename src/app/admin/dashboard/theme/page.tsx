"use client";

import { useState, useEffect } from "react";

const FESTIVALS = [
  { id: "default", name: "Default (Standard Theme)", imagePreview: "/hero-bg.png" },
  { id: "diwali", name: "Diwali", imagePreview: "https://res.cloudinary.com/dsyxsipwf/image/upload/v1776778840/diwali_zqijlv.jpg" },
  { id: "christmas", name: "Christmas", imagePreview: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=2000" },
  { id: "holi", name: "Holi", imagePreview: "https://res.cloudinary.com/dsyxsipwf/image/upload/v1776779056/holi_kradyt.jpg" },
];

export default function ManageThemePage() {
  const [activeFestival, setActiveFestival] = useState("default");

  const [primaryColor, setPrimaryColor] = useState("#2a9d8f");
  const [primaryDarkColor, setPrimaryDarkColor] = useState("#1a7a6d");
  const [primaryLightColor, setPrimaryLightColor] = useState("#3dbdad");

  const [accentColor, setAccentColor] = useState("#3b82c4");
  const [accentDarkColor, setAccentDarkColor] = useState("#2a6ba8");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await fetch("/api/theme");
        const data = await res.json();
        if (data.success && data.data) {
          setActiveFestival(data.data.activeFestival || "default");
          setPrimaryColor(data.data.primaryColor || "#2a9d8f");
          setPrimaryDarkColor(data.data.primaryDarkColor || "#1a7a6d");
          setPrimaryLightColor(data.data.primaryLightColor || "#3dbdad");
          setAccentColor(data.data.accentColor || "#3b82c4");
          setAccentDarkColor(data.data.accentDarkColor || "#2a6ba8");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTheme();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activeFestival,
          primaryColor,
          primaryDarkColor,
          primaryLightColor,
          accentColor,
          accentDarkColor
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Theme updated successfully!");
        window.location.reload(); // Reload to apply changes immediately across admin
      } else {
        alert("Failed to update theme");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving theme");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset to the default theme colors?")) {
      setActiveFestival("default");
      setPrimaryColor("#2a9d8f");
      setPrimaryDarkColor("#1a7a6d");
      setPrimaryLightColor("#3dbdad");
      setAccentColor("#3b82c4");
      setAccentDarkColor("#2a6ba8");
    }
  };

  if (loading) return <div className="p-4 text-gray-500">Loading theme configuration...</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wider text-sm" style={{ fontFamily: "var(--font-heading)" }}>Festive Season Config</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {FESTIVALS.map((fest) => (
            <div
              key={fest.id}
              onClick={() => setActiveFestival(fest.id)}
              className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${activeFestival === fest.id ? "border-[#2a9d8f] ring-2 ring-[#2a9d8f] ring-opacity-50" : "border-gray-200 hover:border-gray-300"
                }`}
            >
              <div className="h-24 bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url(${fest.imagePreview})` }}></div>
              <div className="p-3 text-center bg-white">
                <span className={`text-xs font-semibold uppercase tracking-wider ${activeFestival === fest.id ? "text-[#2a9d8f]" : "text-gray-600"}`}>
                  {fest.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wider text-sm border-t pt-6 mt-6" style={{ fontFamily: "var(--font-heading)" }}>Site Colors</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Primary Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
              <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="flex-1 p-2 border rounded outline-none font-mono text-sm uppercase" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Primary Dark</label>
            <div className="flex items-center gap-3">
              <input type="color" value={primaryDarkColor} onChange={(e) => setPrimaryDarkColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
              <input type="text" value={primaryDarkColor} onChange={(e) => setPrimaryDarkColor(e.target.value)} className="flex-1 p-2 border rounded outline-none font-mono text-sm uppercase" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Primary Light</label>
            <div className="flex items-center gap-3">
              <input type="color" value={primaryLightColor} onChange={(e) => setPrimaryLightColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
              <input type="text" value={primaryLightColor} onChange={(e) => setPrimaryLightColor(e.target.value)} className="flex-1 p-2 border rounded outline-none font-mono text-sm uppercase" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Accent Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
              <input type="text" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="flex-1 p-2 border rounded outline-none font-mono text-sm uppercase" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Accent Dark</label>
            <div className="flex items-center gap-3">
              <input type="color" value={accentDarkColor} onChange={(e) => setAccentDarkColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
              <input type="text" value={accentDarkColor} onChange={(e) => setAccentDarkColor(e.target.value)} className="flex-1 p-2 border rounded outline-none font-mono text-sm uppercase" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#2a9d8f] hover:bg-[#1a7a6d] text-white px-8 py-3 rounded text-sm font-semibold uppercase tracking-widest disabled:opacity-50 transition-colors shadow-sm"
          >
            {saving ? "Saving..." : "Save Theme Configuration"}
          </button>

          <button
            onClick={handleReset}
            disabled={saving}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded text-sm font-semibold uppercase tracking-widest disabled:opacity-50 transition-colors shadow-sm"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
}
