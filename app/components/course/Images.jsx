import {gatewayHost,gatewayPort} from "../../../gateway.js"

export default function Images({element,index,id_course}) {
    return (
        <div className="rounded-md mx-auto  my-10 bg-gray-400 inline-block p-4 ">
            <img
                className=" rounded-md"
                key={index}
                src={`/api/media/getImage/${id_course}/${element.dato}`}
                alt=""
                crossOrigin="use-credentials"
            >
            </img>
        </div>
    )

}
