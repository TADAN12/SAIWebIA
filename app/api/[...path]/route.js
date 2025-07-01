import { gatewayHost, gatewayPort } from "../../../gateway"
import { cookies, headers } from "next/headers"

export async function GET(req) {

    let path = req.url.split(gatewayPort.toString())[1]
    let cookiesStore = await cookies();
    let sessionToken = cookiesStore.get("sessionToken")
    console.log("GET")
    console.log(path);
    let response = await fetch(`http://${gatewayHost}:${gatewayPort}${path}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            'Cookie': `${sessionToken?.name}=${sessionToken?.value}`,
        }
    });

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("image")) {
        const imageStream = response.body;
        return new Response(imageStream, {
            headers: {
                "Content-Type": contentType,
            },
        });
    }

    if (response.status === 404) {
        return Response.json({ response: "No se encontro la pagina" })
    }

    let data = await response.json();
    console.log("Data from API routes")
    console.log(data)
    return Response.json(data);

}

export async function POST(req) {

    let path = req.url.split(gatewayPort.toString())[1]
    let cookiesStore = await cookies();
    let headerList = await headers();
    let sessionToken = cookiesStore.get("sessionToken");
    console.log("POST route")
    console.log(headerList.get("content-type"))
    let options
    if (headerList.get("content-type")?.includes("form-data")) {
        console.log("Form data")
        options = {
            method: "POST",
            credentials: "include",
            headers: {
                'Cookie': `${sessionToken?.name}=${sessionToken?.value}`,
                //"content-type":`${contentType}`
            },
            body: await req.formData(),
        }
    
    } else {
        console.log("json");
        options = {
            method: "POST",
            credentials: "include",
            headers: {
                'Cookie': `${sessionToken?.name}=${sessionToken?.value}`,
                "content-type":`application/json`
            },
            body:  JSON.stringify(await req?.json()),
        }
    }



    console.log("Body:");
    console.log(options.body);

    let response = await fetch(`http://${gatewayHost}:${gatewayPort}${path}`,options);

    if (response.status === 404) {
        return Response.json({ response: "No se encontro la pagina" })
    }

    let data = await response.json();

    console.log(data)

    return Response.json(data)
}