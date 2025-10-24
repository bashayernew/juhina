import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import ProgramsTeaser from "@/components/ProgramsTeaser";
import SocialProof from "@/components/SocialProof";
import TestimonialsTeaser from "@/components/TestimonialsTeaser";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import CTABand from "@/components/CTABand";
import { getDictionary } from "@/lib/i18n";

export default function Page() {
  const t = getDictionary("en");
  return (
    <>
      <Hero t={t} locale="en" />
      <Pillars t={t} locale="en" />
      <ProgramsTeaser t={t} locale="en" />
      <SocialProof locale="en" />
      <TestimonialsTeaser t={t} locale="en" />
      <LeadCaptureForm t={t} locale="en" />
      <CTABand t={t} locale="en" />
    </>
  );
}


