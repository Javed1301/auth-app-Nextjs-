import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    

    const validUser = await User.findOne({ email });
    
    if (!validUser) {
       
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    
    const validPassword = await bcryptjs.compare(password, validUser.password);

    if (!validPassword) {
      return NextResponse.json({ message: "Invalid password" }, { status: 400 });
    }

    const tokenData = {
      id: validUser._id,
      username: validUser.username,
      email: validUser.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Cannot load the request" },
      { status: 500 }
    );
  }
}
