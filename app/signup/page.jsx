'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {gatewayHost,gatewayPort} from "../../gateway.js"


export default function SignUp() {
    const router = useRouter();
    const [failMessage, setFailMessage] = useState("");

    async function sendForm(event) {
        event.preventDefault(); // Prevent the default form submission
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        let res = await fetch(`/apiSign`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Indicate the content type
            },
            credentials: "include",
            body: JSON.stringify({
                name: name,
                user_email: email,
                password: password,
                sign:"signup"
            }),
        });

        let response = await res.json();
        if (response.error) return console.log(response.error);
        let { access, message } = response;
        setFailMessage(message);
        if (access) router.push("/");

    }

    //shadow-md
    return (
        <div className="bg-white border-2 border-red h-[100%] flex flex-row justify-around">

            <div className="bg-white p-8 rounded-lg  max-w-md my-12 w-full text-center">
                <h2 className="text-2xl font-bold mb-8">Crea una cuenta para empezar.</h2>
                <form onSubmit={(event) => sendForm(event)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-md font-medium text-gray-900">Nombre</label>
                        <input type="name" id="name" className="mt-1 p-2 w-full border-[1px] border-gray-500 rounded-md" placeholder="Jhon Doe"></input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-md font-medium text-gray-900">Email</label>
                        <input type="email" id="email" className="mt-1 p-2 w-full border-[1px] border-gray-500 rounded-md" placeholder="m@example.com"></input>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-md font-medium text-gray-900">Constraseña</label>
                        <input type="password" id="password" className="mt-1 p-2 w-full border-[1px] border-gray-500 rounded-md" placeholder="********"></input>
                    </div>
                    <em className="block my-3">
                        {failMessage ? <strong className="text-red-500">{failMessage}</strong> : null}
                    </em>
                    <button type="submit" className=" w-full bg-[#4A576A] text-white py-2 rounded-md hover:bg-gray-800">Sign Up</button>
                    <Link href='/signin'><p className="my-3  text-gray-600 hover:text-black">¿Ya tienes una cuenta? Haz click aqui.</p></Link>
                </form>
            </div>
        </div>
    )
}