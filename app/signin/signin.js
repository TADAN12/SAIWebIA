'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn({gatewayHost,gatewayPort}) {
    const router = useRouter();
    const [failMessage, setFailMessage] = useState("");

    async function sendForm(event) {
        event.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        console.log(gatewayHost);
        console.log(gatewayPort);
        
        let res = await fetch(`/apiSign`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                user_email: email,
                password: password,
                sign:"signin"
            }),
        });

        let response = await res.json();
        let { access, message } = response;
        setFailMessage(message);
        if (access) router.push("/");
    }

    
    return (
        <>

            <div className="bg-white border-2 border-red h-[100%] flex flex-row justify-around">
           
                <div className="bg-white p-8 rounded-lg max-w-md my-12 w-full text-center">
                    <strong className="block mb-8 font-bold text-2xl">¡Bienvenido!</strong>
                    <form onSubmit={sendForm}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-md font-medium text-gray-900">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 p-2 w-full border-[1px] border-gray-500 rounded-md"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-md font-medium text-gray-900">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="mt-1 p-2 w-full border-[1px] border-gray-500 rounded-md"
                                placeholder="********"
                                required
                            />
                        </div>
                        <em className="block my-3">
                            {failMessage ? <strong className="text-red-500">{failMessage}</strong> : null}
                        </em>
                        <button
                            type="submit"
                            className="w-full bg-[#4A576A] text-white py-2 rounded-md hover:bg-gray-800"
                        >
                            Sign In
                        </button>
                        <Link href="/signup">
                            <p className="my-3 text-gray-600 hover:text-black">¿No tienes una cuenta? Haz click aqui.</p>
                        </Link>
                    </form>
                    <p>OR</p>
                    <p className="border-[0.5px] border-black w-full"></p>
                   
                </div>
            </div>
        </>
    );
}
