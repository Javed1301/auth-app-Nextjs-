"use client"
import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export default function VerifyEmailPage() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    // Set token from URL on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");
        setToken(urlToken || "");
    }, []);

    // Verify email when token changes
    useEffect(() => {
        if (token.length > 0) {
            const verifyUserEmail = async () => {
                try {
                    await axios.post("/api/users/verifyEmail", { token });
                    setVerified(true);
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        console.error("Error verifying email:", error.response?.data);
                    } else {
                        console.error("Error verifying email:", error);
                    }
                    setError(true);
                }
            };
            verifyUserEmail();
        }
    }, [token]);

    return (
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