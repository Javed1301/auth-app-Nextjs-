import {connect} from "@/dbConfig/dbConfig"
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(req: NextRequest) {
   try {
    const reqBody = await req.json();
    const {token} = reqBody;
    console.log(token); // for development in token there is only letters and numbers, no special characters.
    const user = await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}});

    if(!user){
        // console.log("user");
        return NextResponse.json({error:"Invalid or expired token"},{status:400});
    }
    console.log(user);

    
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

   

    return NextResponse.json({message:"Email verified successfully"},{status:200});

   } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500});
    
   }
}