
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


export default function Layout({ children }) {

    return (
        <div className="flex flex-row h-full w-full z-10">
            <div className="w-[10%] border-2 text-center">
                <Link href="/notas">
                    <ArrowLeft></ArrowLeft>
                </Link>
            </div>
            <div className="w-[80%] h-full">
                {children}
            </div>
            <div className="w-[10%] border-2 "></div>
        </div>
    )

}