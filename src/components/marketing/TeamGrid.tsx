import TeamCard, { type TeamMember } from "@/components/marketing/TeamCard";

interface Props {
  members: TeamMember[];
}

/** The whole team, four across at xl. Each card opens that person's bio. */
export default function TeamGrid({ members }: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 xl:grid-cols-4">
      {members.map((member) => (
        <TeamCard key={member.name} {...member} />
      ))}
    </div>
  );
}
