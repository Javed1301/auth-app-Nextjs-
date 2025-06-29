"use client"
import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function ResetPasswordPage() {
    const [token, setToken] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [reset, setReset] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || "");
    }, [])

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!password || !confirmPassword) {
            setError("Please fill all fields.");
            toast.error("Please fill all fields.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            toast.error("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            await axios.post("/api/users/resetPassword", { token, password });
            setReset(true);
            toast.success("Password reset successfully! You can now login.");
                 

        } catch (error: any) {
            setError(error?.response?.data?.error || "Error resetting password. Please try again later.");
            toast.error(error?.response?.data?.error || "Error resetting password. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="bg-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center border border-gray-700">
                {reset ? (
                    <div className="text-green-500 text-2xl text-center">
                        Password reset successfully!<br />
                        You can now <Link href="/login" className="text-blue-400 underline">login</Link>.
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-4 text-white">Reset Password</h2>
                        <form className="w-full" onSubmit={handleReset}>
                            <label className="text-gray-300 mb-1 block">New Password</label>
                            <input
                                type="password"
                                className="w-full p-2 mb-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                            <label className="text-gray-300 mb-1 block">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full p-2 mb-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-blue-500"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                            />
                            {error && <div className="text-red-500 mb-2">{error}</div>}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2 rounded-lg font-semibold transition-all
                                    ${loading
                                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700 hover:brightness-110"}
                                    mb-2`}
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}