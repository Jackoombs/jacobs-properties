import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  icon: "phone" | "mail" | "pin";
  link: string;
  textColor?: string;
}

type IconProps = { className?: string };

/*
 * The original's filled glyphs, inlined as BrandIcons does rather than pulling
 * in an icon package. Phone is Font Awesome Free (CC BY 4.0); mail is Grommet
 * Icons and the pin is Material Design Icons (both Apache 2.0).
 */
function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" className={className} aria-hidden="true">
      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" d="M23,20 L23,6 L12,15 L1,6 L1,20 L23,20 Z M12,12 L22,4 L2,4 L12,12 Z" />
    </svg>
  );
}

function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84.95 1.54 2.2 2.86 3.16 4.4.47.75.81 1.45 1.17 2.26.26.55.47 1.5 1.26 1.5s1-.95 1.25-1.5c.37-.81.7-1.51 1.17-2.26.96-1.53 2.21-2.85 3.16-4.4C18.5 12.37 19 10.74 19 9c0-3.87-3.13-7-7-7zm0 9.75a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}

const icons = { phone: PhoneIcon, mail: MailIcon, pin: PinIcon };

const hrefFor = (icon: Props["icon"], link: string) => {
  if (icon === "phone") return `tel:${link}`;
  if (icon === "mail") return `mailto:${link}`;
  return link;
};

export default function ContactItem({
  children,
  className,
  link,
  icon,
  textColor = "text-primary-100",
}: Props) {
  const Icon = icons[icon];

  return (
    <a
      className={cn(
        "flex items-start gap-3 text-xl font-medium duration-100 hover:text-secondary-100",
        className,
        textColor,
      )}
      href={hrefFor(icon, link)}
    >
      <Icon className="box-content mt-1 size-[1em] shrink-0 text-secondary-100" />
      {children}
    </a>
  );
}
