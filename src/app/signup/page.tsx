"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import {toast} from "react-hot-toast"

export default function signupPage(){
    const router = useRouter();             
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:"",

    });

    const [buttonDisbled,setButonDisabled] = useState(false);

    //since this function will talk to db therefore async
    const onSignup = async () => {
        // console.log("entered")
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log(response.data);
            router.push("/login");
        }catch(error:any){
            console.log("Signup Failed",error.message)
            toast.error(error.message); //exercise - read docs and design our own.
        }finally{
            setLoading(false);
        }
    };

    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButonDisabled(false);
        }else{
            setButonDisabled(true);
        }
    },[user])
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing":"Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-amber-50"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username"
            />
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-amber-50"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-amber-50"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisbled ? "No Signup":"Signup"}</button>
            <Link href="/login">Already have an account</Link>
        </div>
    )

}