"use client";

import { useState, useEffect } from "react";

const STANDARD_FESTIVALS = [
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
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#1a2332");
  
  const [customThemes, setCustomThemes] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // New Custom Theme Modal State
  const [showModal, setShowModal] = useState(false);
  const [newThemeName, setNewThemeName] = useState("");
  const [newThemeFile, setNewThemeFile] = useState<File | null>(null);
  const [uploadingTheme, setUploadingTheme] = useState(false);

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
          setBackgroundColor(data.data.backgroundColor || "#ffffff");
          setTextColor(data.data.textColor || "#1a2332");
          setCustomThemes(data.data.customThemes || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTheme();
  }, []);

  const handleSelectTheme = (festId: string) => {
    setActiveFestival(festId);
    
    // Auto-fill colors if we select a standard or custom theme that might have them
    const allThemes = [...STANDARD_FESTIVALS, ...customThemes];
    const selected = allThemes.find(t => t.id === festId);
    if (selected && 'primaryColor' in selected && selected.primaryColor) {
      setPrimaryColor(selected.primaryColor);
      setPrimaryDarkColor(selected.primaryDarkColor || "#1a7a6d");
      setPrimaryLightColor(selected.primaryLightColor || "#3dbdad");
      setAccentColor(selected.accentColor || "#3b82c4");
      setAccentDarkColor(selected.accentDarkColor || "#2a6ba8");
      setBackgroundColor(selected.backgroundColor || "#ffffff");
      setTextColor(selected.textColor || "#1a2332");
    } else if (festId === "default") {
      setPrimaryColor("#2a9d8f");
      setPrimaryDarkColor("#1a7a6d");
      setPrimaryLightColor("#3dbdad");
      setAccentColor("#3b82c4");
      setAccentDarkColor("#2a6ba8");
      setBackgroundColor("#ffffff");
      setTextColor("#1a2332");
    }
  };

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
          accentDarkColor,
          backgroundColor,
          textColor,
          customThemes
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
      setBackgroundColor("#ffffff");
      setTextColor("#1a2332");
    }
  };

  const handleDeleteCustomTheme = async (festId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this custom theme?")) return;

    setSaving(true);
    try {
      const updatedThemes = customThemes.filter(t => t.id !== festId);
      const updatedActiveFestival = activeFestival === festId ? "default" : activeFestival;

      const res = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activeFestival: updatedActiveFestival,
          primaryColor,
          primaryDarkColor,
          primaryLightColor,
          accentColor,
          accentDarkColor,
          backgroundColor,
          textColor,
          customThemes: updatedThemes
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCustomThemes(updatedThemes);
        if (activeFestival === festId) {
          setActiveFestival("default");
          setPrimaryColor("#2a9d8f");
          setPrimaryDarkColor("#1a7a6d");
          setPrimaryLightColor("#3dbdad");
          setAccentColor("#3b82c4");
          setAccentDarkColor("#2a6ba8");
          setBackgroundColor("#ffffff");
          setTextColor("#1a2332");
        }
        alert("Theme deleted successfully!");
      } else {
        alert("Failed to delete theme");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting theme");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateCustomTheme = async () => {
    if (!newThemeName || !newThemeFile) {
      alert("Please provide a name and a background image.");
      return;
    }
    
    setUploadingTheme(true);
    try {
      const formData = new FormData();
      formData.append("image", newThemeFile);
      
      const uploadRes = await fetch("/api/theme/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      
      if (!uploadData.success) {
        throw new Error(uploadData.error || "Upload failed");
      }
      
      const newTheme = {
        id: `custom_${Date.now()}`,
        name: newThemeName,
        imagePreview: uploadData.url,
        primaryColor,
        primaryDarkColor,
        primaryLightColor,
        accentColor,
        accentDarkColor,
        backgroundColor,
        textColor
      };
      
      setCustomThemes([...customThemes, newTheme]);
      setActiveFestival(newTheme.id);
      setShowModal(false);
      setNewThemeName("");
      setNewThemeFile(null);
    } catch (error) {
      console.error(error);
      alert("Error creating custom theme.");
    } finally {
      setUploadingTheme(false);
    }
  };

  if (loading) return <div className="p-4 text-gray-500">Loading theme configuration...</div>;

  const ALL_THEMES = [...STANDARD_FESTIVALS, ...customThemes];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Manage Themes</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded text-sm font-semibold uppercase tracking-wider transition-colors"
        >
          + Create Custom Theme
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wider text-sm" style={{ fontFamily: "var(--font-heading)" }}>Festive Season Config</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {ALL_THEMES.map((fest) => (
            <div
              key={fest.id}
              onClick={() => handleSelectTheme(fest.id)}
              className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${activeFestival === fest.id ? "border-[#2a9d8f] ring-2 ring-[#2a9d8f] ring-opacity-50" : "border-gray-200 hover:border-gray-300"
                }`}
            >
              <div className="h-24 bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url(${fest.imagePreview})` }}></div>
              <div className="p-3 text-center bg-white flex justify-between items-center">
                <span className={`text-xs font-semibold uppercase tracking-wider ${activeFestival === fest.id ? "text-[#2a9d8f]" : "text-gray-600"}`}>
                  {fest.name}
                </span>
                {fest.id.startsWith('custom_') && (
                  <button 
                    onClick={(e) => handleDeleteCustomTheme(fest.id, e)}
                    className="text-red-500 hover:text-red-700 text-xs font-bold"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wider text-sm border-t pt-6 mt-6" style={{ fontFamily: "var(--font-heading)" }}>Site Colors</h3>
        <p className="text-xs text-gray-500 mb-6 max-w-2xl">
          Adjust the colors below. When you select a custom theme, these colors are associated with it. Modifying them and saving will update the site's active appearance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Background and Text colors */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4 border-b border-gray-100 mb-2">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Site Background Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
                <input type="text" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="flex-1 p-2 border rounded outline-none font-mono text-sm uppercase" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Site Text Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
                <input type="text" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="flex-1 p-2 border rounded outline-none font-mono text-sm uppercase" />
              </div>
            </div>
          </div>

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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold mb-4">Create Custom Theme</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theme Name</label>
                <input 
                  type="text" 
                  value={newThemeName}
                  onChange={(e) => setNewThemeName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2a9d8f]"
                  placeholder="e.g. Summer Special"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Background Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setNewThemeFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
                <p className="text-xs text-gray-400 mt-1">This will replace the main hero background image.</p>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateCustomTheme}
                  disabled={uploadingTheme}
                  className="bg-[#2a9d8f] text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-50"
                >
                  {uploadingTheme ? "Uploading..." : "Create Theme"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
