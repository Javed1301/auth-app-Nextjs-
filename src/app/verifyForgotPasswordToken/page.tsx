"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

export default function VerifyForgotPasswordToken() {
    const [token, setToken] = useState("");
    const [reset, setReset] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    // Set token from URL on mount
    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || "");
    }, []);

    // Call resetUserPassword when token changes
    useEffect(() => {
        if (token.length > 0) {
            const resetUserPassword = async () => {
                try {
                    await axios.post("/api/users/verifyForgotPasswordToken", { token });
                    setReset(true);
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        console.error("Error resetting password:", error.response?.data);
                    } else {
                        console.error("Error resetting password:", error);
                    }
                    setError(true);
                }
            };
            resetUserPassword();
        }
    }, [token]);

    // Redirect to resetPassword page if reset is true
    useEffect(() => {
        if (reset) {
            router.push("/resetPassword?token=" + token);
        }
    }, [reset, router, token]);

    return (
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
    );
}