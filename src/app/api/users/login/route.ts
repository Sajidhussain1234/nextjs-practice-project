import connectToDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Connect with DB
connectToDB();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    // check if user is exist
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // check if password is correct
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }
    // create token Data
    const tokenData = {
      email: user.email,
      id: user._id,
    };

    // create token
    const token = jwt.sign(tokenData, process.env.SECRET_KEY!, {
      expiresIn: "1d",
    });
    // prepared response
    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
      loggedInUser: user,
    });

    // set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    // return response
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
