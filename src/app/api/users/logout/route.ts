import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message:"Logout Successfull",
            success:true,
        })
        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        });
        return response;
     } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : "Internal server error";
        return NextResponse.json({ error: errMsg }, { status: 500 });
    }
}