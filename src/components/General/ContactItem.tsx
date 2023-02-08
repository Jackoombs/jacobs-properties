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
  link,
  icon,
  textColor = "text-primary-100",
}: Props) {
  const linkRef = () => {
    if (icon === "phone") {
      return `tel:${link}`;
    }
    if (icon === "mail") {
      return `mailto:${link}`;
    }
    if (icon === "pin") {
      return link;
    }
  };

  return (
    <a
      className={clsx(
        "flex items-start gap-3 text-xl font-medium",
        className,
        textColor
      )}
      href={linkRef()}
    >
      {icon === "phone" && (
        <FaPhoneAlt className="box-content pt-1 text-secondary-100" />
      )}
      {icon === "mail" && (
        <GrMail className="box-content pt-1 text-secondary-100" />
      )}
      {icon === "pin" && (
        <MdLocationPin className="box-content pt-1 text-secondary-100" />
      )}
      {children}
    </a>
  );
}
