"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            // console.log(response.data);
            toast.success("Signup successful! You can now login.");
            router.push("/login");
        } catch (error: any) {
            console.log("Signup Failed", error.message)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="bg-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center border border-gray-700">
                <h1 className="text-2xl font-bold mb-6 text-white">{loading ? "Processing..." : "Signup"}</h1>
                <hr className="w-1/2 mb-6 border-gray-700" />

                <label htmlFor="username" className="self-start text-gray-300 mb-1">Username</label>
                <input
                    className="w-full p-2 mb-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Enter your username"
                    autoComplete="username"
                />

                <label htmlFor="email" className="self-start text-gray-300 mb-1">Email</label>
                <input
                    className="w-full p-2 mb-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email"
                    autoComplete="email"
                />

                <label htmlFor="password" className="self-start text-gray-300 mb-1">Password</label>
                <input
                    className="w-full p-2 mb-6 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                />

                <button
                    onClick={onSignup}
                    disabled={buttonDisabled || loading}
                    className={`w-full py-2 rounded-lg font-semibold transition-all
                        ${buttonDisabled || loading
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700 hover:brightness-110"}
                        mb-4`}
                >
                    Signup
                </button>
                <Link href="/login" className="text-blue-400 hover:underline hover:text-blue-300">
                    Already have an account?
                </Link>
            </div>
        </div>
    )
}