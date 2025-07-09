import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const AdminNavbar = async () => {
  const user = await currentUser();

  return (
    <nav className="fixed z-50 top-0 w-full h-20 mb-20 px-2 md:px-10 border-b shadow-sm bg-white flex items-center">
      <Link href="/admin" className="cursor-pointer">
        <Image
          src="/img/logos/logo.png"
          width={80}
          height={80}
          alt="La Escuelita ONG"
        />
      </Link>
      <span className="hidden md:block ml-4 font-montserrat text-myzinc">
        Hola {user?.firstName} !
      </span>

      {/* Desktop */}
      <div className="hidden flex-1 md:flex items-center justify-end w-full gap-6 mr-6">
        <Link
          href="/admin/sessions/create-session"
          className="px-4 py-2.5 bg-myorange text-white font-semibold rounded-md"
        >
          Crear evento
        </Link>
        <Link
          href="/admin/agenda"
          className="px-4 py-2.5 bg-myzinc text-white font-semibold rounded-md"
        >
          Agenda
        </Link>
      </div>
      {/* Mobile */}
      <div className="md:hidden flex-1 flex items-center justify-end w-full">
        <Link
          href="/admin/sessions/create-session"
          className="bg-myorange rounded-full text-white min-w-[40px] min-h-[40px] flex items-center justify-center mr-6"
        >
          <i className="fa-solid fa-plus text-xl"></i>
        </Link>
        <Link href="/admin/agenda" className="mr-6 text-3xl text-myzinc">
          <i className="fa-solid fa-calendar-days"></i>
        </Link>
      </div>
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


    </nav>

    
  );
};

export default AdminNavbar;
