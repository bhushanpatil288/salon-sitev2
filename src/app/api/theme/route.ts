import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Theme from "../../../models/Theme";

export async function GET() {
  try {
    await dbConnect();
    let theme = await Theme.findOne();

    // Create default theme if not exists
    if (!theme) {
      theme = await Theme.create({});
    }

    return NextResponse.json({ success: true, data: theme }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch theme" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    let theme = await Theme.findOne();
    if (theme) {
      theme = await Theme.findByIdAndUpdate(theme._id, body, { new: true, runValidators: true });
    } else {
      theme = await Theme.create(body);
    }

    return NextResponse.json({ success: true, data: theme }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update theme" }, { status: 500 });
  }
}
