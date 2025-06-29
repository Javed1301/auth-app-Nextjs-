"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    // Forgot password state
    const [showForgot, setShowForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotLoading, setForgotLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onForgotPassword = async () => {
        try {
            setForgotLoading(true);
            // Call your forgot password API here
            const response = await axios.post("/api/users/forgotPassword", { email: forgotEmail });
            toast.success("Password reset link sent to your email");
            setShowForgot(false);
            setForgotEmail("");
        } catch (error: any) {
            toast.error(error.message || "Failed to send reset link");
        } finally {
            setForgotLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="bg-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center border border-gray-700">
                <h1 className="text-2xl font-bold mb-6 text-white">{loading ? "Processing..." : "Login"}</h1>
                <hr className="w-1/2 mb-6 border-gray-700" />

                {!showForgot ? (
                    <>
                        <label htmlFor="email" className="self-start text-gray-300 mb-1">Email</label>
                        <input
                            className="w-full p-2 mb-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                            id="email"
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Enter your email"
                            autoComplete="username"
                        />

                        <label htmlFor="password" className="self-start text-gray-300 mb-1">Password</label>
                        <input
                            className="w-full p-2 mb-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />

                        <button
                            onClick={onLogin}
                            disabled={buttonDisabled || loading}
                            className={`w-full py-2 rounded-lg font-semibold transition-all
                                ${buttonDisabled || loading
                                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-700 hover:brightness-110"}
                                mb-2`}
                        >
                            Login
                        </button>
                        <button
                            className="w-full text-sm text-blue-400 hover:underline hover:text-blue-300 mb-4"
                            onClick={() => setShowForgot(true)}
                        >
                            Forgot Password?
                        </button>
                        <Link href="/signup" className="text-blue-400 hover:underline hover:text-blue-300">
                            Visit Signup page
                        </Link>
                    </>
                ) : (
                    <>
                        <label htmlFor="forgot-email" className="self-start text-gray-300 mb-1">Enter your registered email</label>
                        <input
                            className="w-full p-2 mb-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                            id="forgot-email"
                            type="text"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="Enter your email"
                            autoComplete="username"
                        />
                        <button
                            onClick={onForgotPassword}
                            disabled={forgotLoading || forgotEmail.length === 0}
                            className={`w-full py-2 rounded-lg font-semibold transition-all
                                ${forgotLoading || forgotEmail.length === 0
                                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-700 hover:brightness-110"}
                                mb-2`}
                        >
                            {forgotLoading ? "Sending..." : "Send Reset Link"}
                        </button>
                        <button
                            className="w-full text-sm text-gray-400 hover:underline hover:text-gray-200 mb-4"
                            onClick={() => setShowForgot(false)}
                        >
                            Back to Login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}