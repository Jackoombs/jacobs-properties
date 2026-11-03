import CardCarousel from "@/components/marketing/CardCarousel";
import TeamCard, { type TeamMember } from "@/components/marketing/TeamCard";

interface Props {
  heading: string;
  members: TeamMember[];
}

/** 1.1 up on mobile, then 3 and 4 across. 786px, not md's 768px, is the original's Swiper breakpoint. */
export default function TeamSlider({ heading, members }: Props) {
  return (
    <CardCarousel heading={heading} itemClassName="basis-[90.9%] min-[786px]:basis-1/3 xl:basis-1/4">
      {members.map((member) => (
        <TeamCard key={member.name} {...member} />
      ))}
    </CardCarousel>
  );
}
