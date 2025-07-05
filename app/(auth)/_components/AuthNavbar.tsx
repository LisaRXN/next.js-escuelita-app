"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const AuthNavbar = () => {
  const router = useRouter();

  return (
    <nav className="fixed z-50 top-0 w-full h-[80px] mb-20 px-5 md:px-10 border-b shadow-sm bg-white flex items-center">
      <div onClick={() => router.push(`/dashboard`)} className="cursor-pointer">
        <Image
          src="/img/logos/logo.png"
          width={80}
          height={80}
          alt="La Escuelita ONG"
        />
      </div>
    </nav>
  );
};

export default AuthNavbar;
