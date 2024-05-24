import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connectToDB from "@/dbConfig/dbConfig";

connectToDB();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;
    console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    console.log("Userrr", user);
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}
