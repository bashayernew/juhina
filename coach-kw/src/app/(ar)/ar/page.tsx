import Hero from "@/components/Hero";
import ScrollDots from "@/components/ScrollDots";
import SocialRail from "@/components/SocialRail";
import { getDictionary } from "@/lib/i18n";
import TestimonialsTeaser from "@/components/TestimonialsTeaser";
import ProgramsFAQ from "@/components/ProgramsFAQ";
import CTABand from "@/components/CTABand";

export default function Page() {
  const t = getDictionary("ar");
  return (
    <>
      <SocialRail locale="ar" />
      <ScrollDots locale="ar" />
      <Hero t={t} locale="ar" />
      <TestimonialsTeaser t={t} locale="ar" />
      <ProgramsFAQ t={t} locale="ar" />
      <CTABand t={t} locale="ar" />
    </>
  );
}


