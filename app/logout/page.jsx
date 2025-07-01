
'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/signin'); // Cambia '/signin' por la ruta que corresponda
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full">
      <p>Cerrando sesión...</p>
    </div>
  );
}
