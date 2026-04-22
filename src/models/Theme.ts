import mongoose from "mongoose";

const ThemeSchema = new mongoose.Schema({
  activeFestival: { type: String, default: "default" }, // e.g. "default", "diwali", "christmas", "holi"
  primaryColor: { type: String, default: "#2a9d8f" },
  primaryDarkColor: { type: String, default: "#1a7a6d" },
  primaryLightColor: { type: String, default: "#3dbdad" },
  accentColor: { type: String, default: "#3b82c4" },
  accentDarkColor: { type: String, default: "#2a6ba8" },
}, { timestamps: true });

export default mongoose.models.Theme || mongoose.model("Theme", ThemeSchema);
