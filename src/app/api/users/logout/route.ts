import { NextResponse } from "next/server";

export async function POST() {
  try {
    //creating response
    const response = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });
    // set cookies empty on logout
    response.cookies.set("authToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    // return response
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
