import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaYoutubeSquare,
} from "react-icons/fa/index.js";

export default function Socials() {
  return (
    <ul className="flex w-full justify-between text-[3.5rem] text-white">
      <li>
        <a href="https://www.facebook.com/JacobsPropertiesLtd">
          {<FaFacebookSquare />}
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/jacobs.properties/">
          {<FaInstagram />}
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/company/jacobsproperties/about/">
          {<FaLinkedin />}
        </a>
      </li>
      <li>
        <a href="https://www.youtube.com/@jacobs.properties">
          {<FaYoutubeSquare />}
        </a>
      </li>
    </ul>
  );
}
