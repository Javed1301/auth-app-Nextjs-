"use client"
import axios from "axios"
import { set } from "mongoose"
import Link from "next/link"
import React , { useEffect,useState} from "react"
import { useRouter } from "next/navigation";

export default function verifyForgotPasswordToken() {

    const [token, setToken] = useState("")
    const [reset, setReset] = useState(false)
    const [error, setError] = useState(false)
    const router = useRouter();

    const resetUserPassword = async () => {
        try {
            await axios.post("/api/users/verifyForgotPasswordToken", { token });
            setReset(true);

        } catch (error:any) {
            console.error("Error resetting password:", error.response.data);
            setError(true);
            
        }
    }

    // whenever the page loads we set the token from the URL
    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        console.log("Token from URL:", urlToken);
        setToken(urlToken || "");

    },[])

    //if there is a change in token length, call the resetUserPassword function
    //this is to ensure that the token is reset only once when the component mounts
    useEffect(() => {
        if(token.length > 0) {
            resetUserPassword()
        }
    },[token])

    useEffect(() => {
        if (reset) {
            router.push("/resetPassword?token=" + token);
        }
    }, [reset, router]);

    return(
        <div className="flex flex-col items-center justify-center h-screen">
            {reset ? (
                <div className="text-green-500 text-2xl">
                    Redirecting to reset password page...
                </div>
            ) : error ? (
                <div className="text-red-500 text-2xl">
                    Error verifying Email for resetting password. Please try again later.
                </div>
            ) : (
                <div className="text-gray-500 text-2xl">
                    verifying your email...
                </div>
            )}
        </div>
    )
}