import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email} = reqBody;

        const user = await User.findOne({email: email});
        if(!user){
            return NextResponse.json({error:"User not found"},{status:404});
        }
        console.log("Forgot password request for user:", user);
        // Send reset password email
        const mailResponse = await sendEmail({
            email: user.email,
            emailType: "RESET",
            userId: user._id
        });
        // console.log("Mail response:", mailResponse);
        return NextResponse.json({message:"Password reset link sent to your email"},{status:200});
    } catch (error:any) {
        console.log("Error in forgot password API:", error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
}