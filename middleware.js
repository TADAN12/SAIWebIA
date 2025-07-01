import { NextResponse } from 'next/server';
import { gatewayHost, gatewayPort } from "./gateway.js"

export async function middleware(request) {
    // Get the pathname
    const pathname = request.nextUrl.pathname;
    let token = request.cookies.get("sessionToken");

    if (/^\/notas\/.+$/.test(pathname)) {

        return NextResponse.next();
    }

    if (pathname.startsWith("/logout")) {
        let response = NextResponse.next();
        response.cookies.delete("sessionToken");
        return response;
    }

    return NextResponse.next();

    if (!(await isAutorithed(token, request.cookies.get("sessionToken"), pathname))) {

        return NextResponse.redirect(new URL("/signin", request.url));
    }

    

}

async function isAutorithed(token, sessionToken, path) {
    try {
        console.log("Verificando autenticacionn")
        console.log("++++++++++++++++++++++++++++++++")

        if (path.includes("sign")) {
            console.log("Se salta verificacion al estar en sign")
            console.log(path)

            return true;
        }


        let response = await fetch(`http://${gatewayHost}:${gatewayPort}/api/sign/validateToken/${sessionToken?.value}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            origin: `http://localhost:3000`,
            credentials: "include",
        });

        console.log("------------dsfdfdf--------------------")


        let data = await response.json();


        if (!token || !data.valid) return false;

        return true;
    }
    catch (err) {

        console.log(err)
        return false;

    }

}

export const config = {
    matcher: '/((?!signin|signup|api|_next|static|.*\\.[^/]*$).*)'
}

