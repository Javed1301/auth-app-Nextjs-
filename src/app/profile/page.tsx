"use client"
import axios from "axios"
import Link from "next/link"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
    const [data, setData] = useState("Nothing")
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful")
            router.push("/login");
        } catch (error: any) {
            // console.log("logout failed", error.message)
            toast.error(error.message || "logout failed" )
        }
    }

    const getUserData = async () => {
        const res = await axios.get("/api/users/me");
        setData(res.data.user._id);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="bg-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center border border-gray-700">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-4 border-4 border-gray-700">
                    <span className="text-4xl text-blue-400 font-bold">👤</span>
                </div>
                {/* Profile Heading */}
                <h2 className="text-2xl font-bold mb-2 text-white">Profile</h2>
                <p className="text-gray-400 mb-6">Welcome to your profile page!</p>
                {/* User Info */}
                <div className="w-full bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-blue-400">User ID:</h3>
                    <p className="break-all text-gray-200">
                        {data === "Nothing" ? "" : <Link href={`/profile/${data}`} className="underline text-blue-400 hover:text-blue-300">{data}</Link>}
                    </p>
                </div>
                {/* Buttons */}
                <div className="flex gap-4 w-full">
                    <button
                        onClick={getUserData}
                        className="flex-1 cursor-pointer transition-all bg-blue-600 text-white px-6 py-2 rounded-lg
                        border-blue-700 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                    >
                        Get User Data
                    </button>
                    <button
                        onClick={logout}
                        className="flex-1 cursor-pointer transition-all bg-red-600 text-white px-6 py-2 rounded-lg
                        border-red-700 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                    >
                        Logout
                    </button>
                </div>
                {/* Back to Home */}
                <Link href="/" className="mt-6 text-blue-400 hover:underline hover:text-blue-300">
                    ← Back to Home
                </Link>
            </div>
        </div>
    )
}