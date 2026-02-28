import Link from "next/link";

interface CardTitleProps {
  title: string;
  subtitle?: string;
  link: string;
}

const CardTitle = ({ title, subtitle, link }: CardTitleProps) => {
  const content = (
    <div className="flex justify-between items-start w-full text-start text-myzinc">
      <div>
        <p className="text-lg font-montserrat font-bold">{title}</p>
        {subtitle && <p className="mt-1 text-sm text-mygray">{subtitle}</p>}
      </div>
      {link && (
        <span className="min-w-[28px] min-h-[28px] bg-myorange rounded-full flex items-center justify-center shrink-0">
          <i className="fa-solid fa-arrow-right text-white text-sm -rotate-45"></i>
        </span>
      )}
    </div>
  );

  if (!link) return <div className="pb-2 border-b border-zinc-100">{content}</div>;
  return <Link href={link} className="pb-2 border-b border-zinc-100 block">{content}</Link>;
};

export default CardTitle;
