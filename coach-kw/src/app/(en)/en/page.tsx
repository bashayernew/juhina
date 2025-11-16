import Hero from "@/components/Hero";
import ScrollDots from "@/components/ScrollDots";
import SocialRail from "@/components/SocialRail";
import { getDictionary } from "@/lib/i18n";
import TestimonialsTeaser from "@/components/TestimonialsTeaser";
import ProgramsFAQ from "@/components/ProgramsFAQ";
import CTABand from "@/components/CTABand";

export default function Page() {
  const t = getDictionary("en");
  return (
    <>
      <SocialRail locale="en" />
      <ScrollDots locale="en" />
      <Hero t={t} locale="en" />
      <TestimonialsTeaser t={t} locale="en" />
      <ProgramsFAQ t={t} locale="en" />
      <CTABand t={t} locale="en" />
    </>
  );
}


