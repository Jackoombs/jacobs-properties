import clsx from "clsx";
import { FaPhoneAlt } from "react-icons/fa/index.js";
import { GrMail } from "react-icons/gr/index.js";
import { MdLocationPin } from "react-icons/md/index.js";

interface Props {
  children: string;
  className?: string;
  icon: "phone" | "mail" | "pin";
  link: string;
  textColor?: string;
}

export default function ContactItem({
  children,
  className,
  icon,
  link,
  textColor = "text-primary-100",
}: Props) {
  return (
    <a
      className={clsx(
        "flex items-start gap-3 text-xl font-medium",
        className,
        textColor
      )}
      href={link}
    >
      {icon === "phone" && <FaPhoneAlt className="text-secondary-100" />}
      {icon === "mail" && <GrMail className="text-secondary-100" />}
      {icon === "pin" && <MdLocationPin className="text-secondary-100" />}
      {children}
    </a>
  );
}
