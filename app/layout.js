import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { LogOut } from "lucide-react";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "SAI",
  description: "Learn app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen flex flex-col ">
        <nav className=" w-full h-[5%]">
          <section className="flex flex-row w-full h-full justify-around my-1">
            <div className="group inline-block">
              <Link href="/">
                <strong className="herramientas">Herramientas</strong>
              </Link>

              <aside className="hidden group-hover:block  fixed top-[39px] left-10 w-52 bg-gray-400 z-50 rounded-b-xl">
                {/* Your aside content here */}
                <div className="p-2 flex justify-center hover:bg-slate-700"><Link href="/notas"><strong className="m-auto ">Notas</strong></Link></div>
                <div className="p-2 flex justify-center hover:bg-slate-700"><Link href="/calculator"><strong className="m-auto ">Calculdora</strong></Link></div>
                <div className="p-2 flex justify-center hover:bg-slate-700"><Link href="/examen"><strong className="m-auto ">Examenes</strong></Link></div>
                <div className="p-2 flex justify-center hover:bg-slate-700"><Link href="/mapas"><strong className="m-auto ">Mapas</strong></Link></div>
                <div className="p-2 flex justify-center hover:bg-slate-700 rounded-b-xl"><Link href="/abstract"><strong className="m-auto ">Abstracts</strong></Link></div>
              </aside>
            </div>

            <Link href="/chat-bot"><strong>Chat-Bot</strong></Link>
            <Link href="/"><strong>SAI</strong></Link>
            <Link href="/cursos"><strong>Cursos</strong></Link>
            <Link href="/conf "><strong>Cuenta</strong></Link>
            <Link href="/logout"><LogOut> </LogOut></Link>
          </section>
        </nav>

        <main className="w-full h-[95%]">
          {children}
        </main>
      </body>
    </html>
  );
}
