"use client";

import { UserButton } from "@clerk/nextjs";
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
      <div className="flex-1 flex items-center justify-end w-full gap-10">
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                height: 40,
                width: 40,
              },
            },
          }}
          afterSignOutUrl="/sign-in"
        />
      </div>
    </nav>
  );
};

export default AuthNavbar;
