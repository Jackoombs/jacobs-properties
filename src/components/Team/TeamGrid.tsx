import TeamCard from "./TeamCard";
import { teamTemplate } from "./teamTemplate";

export default function TeamGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 xl:grid-cols-4">
      {teamTemplate.map(
        ({ name, role, bio, imagePath, linkedInLink, email }, index) => (
          <TeamCard
            key={index}
            {...{ name, role, bio, imagePath, linkedInLink, email }}
          />
        )
      )}
    </div>
  );
}
