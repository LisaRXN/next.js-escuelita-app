import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav className="fixed z-50 top-0 w-full h-20 mb-20 px-2 md:px-10 border-b shadow-sm bg-white">
      <div className="flex items-center max-w-screen-2xl m-auto">
        <Link href="/dashboard" className="cursor-pointer">
          <Image
            src="/img/logos/logo.png"
            width={80}
            height={80}
            alt="La Escuelita ONG"
          />
        </Link>
        <span className="ml-4 font-montserrat text-myzinc">
          Hola {user?.firstName} !
        </span>

        <div className="flex-1 flex items-center justify-end w-full gap-10">
          <Link
            href="/activity"
            className="hidden md:block px-5 py-2.5 bg-myzinc text-white font-semibold rounded-lg"
          >
            Mi actividad
          </Link>
          {/* <Link
            href="/profil"
            className="hidden md:block px-5 py-2.5 bg-myzinc text-white font-semibold rounded-lg"
          >
            Mi perfil
          </Link> */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  height: 40,
                  width: 40,
                },
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
