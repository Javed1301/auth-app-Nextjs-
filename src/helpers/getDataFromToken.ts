import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        // Use jwt.JwtPayload for decoded token type
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as jwt.JwtPayload;
        return decodedToken.id;
    } catch (error) {
        // error is unknown, so handle accordingly
        throw new Error("Error extracting data from token");
    }
}