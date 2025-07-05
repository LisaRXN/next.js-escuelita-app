import Link from "next/link";

interface CardTitleProps {
  title: string;
  subtitle?: string;
  link: string;
}

const CardTitle = ({ title, subtitle, link }: CardTitleProps) => {
  return (
    <Link
      href={link}
      className="p-2 flex justify-between items-start w-full text-start text-myzinc"
    >
      <div className="">
        <p className="text-2xl font-montserrat font-bold max-w-[500px]">{title}</p>
        <p className="mt-2">{subtitle}</p>
      </div>
      <span className="min-w-[30px] min-h-[30px] bg-myorange rounded-full flex items-center justify-center">
        <i className="fa-solid fa-arrow-right text-white text-lg -rotate-45"></i>
      </span>
    </Link>
  );
};

export default CardTitle;
