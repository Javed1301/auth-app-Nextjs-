import {connect} from "@/dbConfig/dbConfig";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest){
    try {
        const { token,password } = await request.json();
        const user = await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}});
        if(!user){
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password,salt);
        user.password = hashPassword;

        
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
    } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({ error: errMsg }, { status: 500 });
    }
}