import TeamCard from "./TeamCard";
import type { TeamCardType } from "./TeamSlider";
import Jon from "../../assets/images/jon-coombs.png";

export default function TeamGrid() {
  const teamTemplate: TeamCardType[] = [
    {
      name: "Jon Coombs",
      role: "Managing Director",
      imagePath: Jon.src,
      linkedInLink: "",
    },
    {
      name: "Jon Coombs",
      role: "Managing Director",
      imagePath: Jon.src,
      linkedInLink: "",
    },
    {
      name: "Jon Coombs",
      role: "Managing Director",
      imagePath: Jon.src,
      linkedInLink: "",
    },
    {
      name: "Jon Coombs",
      role: "Managing Director",
      imagePath: Jon.src,
      linkedInLink: "",
    },
    {
      name: "Jon Coombs",
      role: "Managing Director",
      imagePath: Jon.src,
      linkedInLink: "",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-4 gap-16">
        {teamTemplate.map(({ name, role, imagePath, linkedInLink }, index) => (
          <TeamCard key={index} {...{ name, role, imagePath, linkedInLink }} />
        ))}
      </div>
    </>
  );
}
