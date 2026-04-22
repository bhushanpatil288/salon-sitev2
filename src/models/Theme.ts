import mongoose from "mongoose";

const CustomThemeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  imagePreview: { type: String, required: true },
  primaryColor: { type: String, default: "#2a9d8f" },
  primaryDarkColor: { type: String, default: "#1a7a6d" },
  primaryLightColor: { type: String, default: "#3dbdad" },
  accentColor: { type: String, default: "#3b82c4" },
  accentDarkColor: { type: String, default: "#2a6ba8" },
  backgroundColor: { type: String, default: "#ffffff" },
  textColor: { type: String, default: "#1a2332" },
});

const ThemeSchema = new mongoose.Schema({
  activeFestival: { type: String, default: "default" }, // e.g. "default", "diwali", "christmas", "holi", or custom id
  primaryColor: { type: String, default: "#2a9d8f" },
  primaryDarkColor: { type: String, default: "#1a7a6d" },
  primaryLightColor: { type: String, default: "#3dbdad" },
  accentColor: { type: String, default: "#3b82c4" },
  accentDarkColor: { type: String, default: "#2a6ba8" },
  backgroundColor: { type: String, default: "#ffffff" },
  textColor: { type: String, default: "#1a2332" },
  customThemes: [CustomThemeSchema],
}, { timestamps: true });

if (mongoose.models.Theme) {
  delete mongoose.models.Theme;
}

export default mongoose.model("Theme", ThemeSchema);
