"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
export default function profilePage(){
    const router = useRouter();
    const logout = async()=>{
        try {
            await axios.get("/api/users/logout");
            toast.success("logout successfull")
            router.push("/login");
        } catch (error:any) {
            console.log("logout failed",error.message)
            toast.error(error.message)
        }
    }
    return(
        <div className="flex justify-center items-center gap-2">
            <h2>Profile</h2>
            
            <button
            onClick={logout}
            className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
            border-blue-600
            border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
            active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
            Logout
            </button>
        </div>
    )
}