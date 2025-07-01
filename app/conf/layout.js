
import Link from "next/link"

export default function Layout({ children }) {


    return (
        <div className="h-full w-full  flex flex-row ">
            <div className="w-[20%] border-2 border-black flex flex-col">
                <Link href="/conf/cuenta" className=" min-h-[8%] w-full border-b-2 border-black text-center ">
                    <strong className="block h-full w-full bg-red-500  p-2 ">Cuenta</strong>
                </Link>
                <Link href="/conf/curso" className=" min-h-[8%] w-full border-b-2 border-black text-center ">
                    <strong className="block h-full w-full bg-red-500  p-2 ">Mis curso</strong>
                </Link>
                <Link href="/conf/misExamenes" className=" min-h-[8%] w-full border-b-2 border-black text-center ">
                    <strong className="block h-full w-full bg-red-500  p-2 ">Mis examenes</strong>
                </Link>
            </div >
            <div className="w-[80%] h-full">
                {children}
            </div>

        </div >
    )
}