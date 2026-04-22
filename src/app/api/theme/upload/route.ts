import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No image file provided" }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "pooja-salon/themes",
    });

    return NextResponse.json({ success: true, url: uploadResponse.secure_url }, { status: 201 });
  } catch (error) {
    console.error("Error uploading theme image:", error);
    return NextResponse.json({ success: false, error: "Failed to upload image" }, { status: 500 });
  }
}
