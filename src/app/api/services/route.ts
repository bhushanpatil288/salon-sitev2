import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import dbConnect from "../../../lib/db";
import Service from "../../../models/Service";
import cloudinary from "../../../lib/cloudinary";

export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: services }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const duration = formData.get("duration") as string;
    const startingPrice = formData.get("startingPrice") as string;
    const featuresStr = formData.get("features") as string;
    const file = formData.get("image") as File;

    if (!name || !description || !duration || !startingPrice || !file) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const features = featuresStr ? JSON.parse(featuresStr) : [];

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "pooja-salon/services",
    });

    const newService = await Service.create({
      name,
      description,
      features,
      duration,
      startingPrice,
      imageUrl: uploadResponse.secure_url,
    });

    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ success: false, error: "Failed to create service" }, { status: 500 });
  }
}
