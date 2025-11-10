import Hero from "@/components/Hero";
import ScrollDots from "@/components/ScrollDots";
import SocialRail from "@/components/SocialRail";
import { getDictionary } from "@/lib/i18n";

export default function Page() {
  const t = getDictionary("en");
  return (
    <>
      <SocialRail locale="en" />
      <ScrollDots locale="en" />
      <Hero t={t} locale="en" />
    </>
  );
}


