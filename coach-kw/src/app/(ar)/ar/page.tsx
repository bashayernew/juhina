import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import ProgramsTeaser from "@/components/ProgramsTeaser";
import SocialProof from "@/components/SocialProof";
import TestimonialsTeaser from "@/components/TestimonialsTeaser";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import CTABand from "@/components/CTABand";
import { getDictionary } from "@/lib/i18n";

export default function Page() {
  const t = getDictionary("ar");
  return (
    <>
      <Hero t={t} locale="ar" />
      <Pillars t={t} locale="ar" />
      <ProgramsTeaser t={t} locale="ar" />
      <SocialProof locale="ar" />
      <TestimonialsTeaser t={t} locale="ar" />
      <LeadCaptureForm t={t} locale="ar" />
      <CTABand t={t} locale="ar" />
    </>
  );
}


