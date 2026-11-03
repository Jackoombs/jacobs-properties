import Link from "@/components/common/Link";
import GetInTouchButton from "@/components/forms/get-in-touch/GetInTouchButton";
import ExpertValuationButton from "@/components/forms/expert-valuation/ExpertValuationButton";
import InstantValuationButton from "@/components/forms/instant-valuation/InstantValuationButton";
import BrochureButton from "@/components/forms/brochure/BrochureButton";
import type { Cta } from "@/lib/types";

interface Props {
  cta: Cta;
  variant?: "primary" | "secondary" | "white" | "transparent-white" | "transparent-blue";
  size?: "default" | "sm" | "md" | "lg";
  className?: string;
}

/** Renders the right trigger (link vs. one of the form modals) for a CMS-described CTA. */
export default function CtaButton({ cta, variant = "primary", size, className }: Props) {
  switch (cta.type) {
    case "link":
      return (
        <Link link={cta.link} type={variant} size={size} className={className} newTab={cta.newTab}>
          {cta.text}
        </Link>
      );
    case "get-in-touch":
      return (
        <GetInTouchButton variant={variant} size={size} className={className}>
          {cta.text}
        </GetInTouchButton>
      );
    case "expert-valuation":
      return (
        <ExpertValuationButton variant={variant} size={size} className={className}>
          {cta.text}
        </ExpertValuationButton>
      );
    case "instant-valuation":
      return (
        <InstantValuationButton variant={variant} size={size} className={className}>
          {cta.text}
        </InstantValuationButton>
      );
    case "brochure":
      return (
        <BrochureButton
          variant={variant}
          size={size}
          className={className}
          buyOrRent={cta.buyOrRent}
          pdfUrl={cta.pdfUrl}
        >
          {cta.text}
        </BrochureButton>
      );
  }
}
