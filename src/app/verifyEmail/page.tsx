"use client"
import axios from "axios"
import { set } from "mongoose"
import Link from "next/link"
import React , { useEffect,useState} from "react"

export default function verifyEmailPage() {

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyEmail", { token });
            setVerified(true);

        } catch (error:any) {
            console.error("Error verifying email:", error.response.data);
            setError(true);
            
        }
    }

    // whenever the page loads we set the token from the URL
    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        console.log("Token from URL:", urlToken);
        setToken(urlToken || "");

    },[])

    //if there is a change in token lrngth, call the verifyUserEmail function
    //this is to ensure that the token is verified only once when the component mounts
    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail()
        }
    },[token])

    return(
        <div className="flex flex-col items-center justify-center h-screen">
            {verified ? (
                <div className="text-green-500 text-2xl">
                    Email verified successfully! You can now <Link href="/login" className="text-blue-500">login</Link>.
                </div>
            ) : error ? (
                <div className="text-red-500 text-2xl">
                    Error verifying email. Please try again later.
                </div>
            ) : (
                <div className="text-gray-500 text-2xl">
                    Verifying your email...
                </div>
            )}
        </div>
    )
}