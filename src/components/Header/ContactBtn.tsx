import { BsTelephoneFill } from "react-icons/bs/index.js";

export default function ContactBtn() {
  return (
    <a href="tel:01256781300">
      <BsTelephoneFill className="scale-x-[-1] text-[1.75rem] duration-150 hover:text-secondary-100" />
    </a>
  );
}
