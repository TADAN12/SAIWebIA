import { gatewayHost, gatewayPort } from "../../gateway.js"
import { cookies,headers } from 'next/headers'
export async function POST(req) {

    let requestPath = req.url.split(gatewayPort.toString())[1];
    let cookiesStore = await cookies();
    let sessionToken = cookiesStore.get("sessionToken");
    let pathSignIn = "/api/sign/signIn";
    let pathSignUp = "/api/sign/signUp";
    let path = "";
    console.log("SIGN route forntend")

    let body = await req.json();

    if (body.sign === "signin") {
        path = pathSignIn;
    } else {
        path = pathSignUp;
    }

    let response = await fetch(`http://${gatewayHost}:${gatewayPort}${path}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            'Cookie': `${sessionToken?.name}=${sessionToken?.value}`,

        },
        body: JSON.stringify(body),
    });
    console.log("Sign")
    let head = await headers();
    console.log(head.get("content-type"))
 
    if (response.status === 404) {
        return Response.json({ response: "No se encontro la pagina" })
    }

    let data = await response.json();

    if (response.url.includes("sign")) {
        if (data.sessionToken) {
            const cookiesStore = await cookies();
                cookiesStore.set("sessionToken", data.sessionToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7, // 1 semana
                path: "/",
            });
        }
        if (data.message)
            return new Response({ access: data.access, message: data.message });
    }

    return Response.json(data)
}