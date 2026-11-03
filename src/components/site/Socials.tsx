import { FacebookSquareIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/common/BrandIcons";

const socials = [
  { icon: FacebookSquareIcon, href: "https://www.facebook.com/JacobsPropertiesLtd", label: "Facebook" },
  { icon: InstagramIcon, href: "https://www.instagram.com/jacobs.properties/", label: "Instagram" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/company/jacobsproperties/about/", label: "LinkedIn" },
  { icon: YoutubeIcon, href: "https://www.youtube.com/@jacobs.properties", label: "YouTube" },
];

export default function Socials() {
  return (
    <ul className="flex w-full justify-between text-[3.5rem] text-white">
      {socials.map(({ icon: Icon, href, label }) => (
        <li key={label}>
          <a href={href} aria-label={label}>
            <Icon className="size-[1em]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
