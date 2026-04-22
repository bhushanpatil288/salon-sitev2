import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  duration: { type: String, required: true },
  startingPrice: { type: String, required: true },
  imageUrl: { type: String, required: true }, // URL from cloudinary
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
