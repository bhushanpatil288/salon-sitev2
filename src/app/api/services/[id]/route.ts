import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import Service from "../../../../models/Service";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    const deletedService = await Service.findByIdAndDelete(id);
    
    if (!deletedService) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }

    // Ideally, we should also delete the image from Cloudinary here.
    // For simplicity, we are skipping Cloudinary deletion for now,
    // but in a production app, we would extract the public_id and call cloudinary.uploader.destroy()

    return NextResponse.json({ success: true, data: deletedService }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete service" }, { status: 500 });
  }
}
