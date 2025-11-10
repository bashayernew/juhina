import Hero from "@/components/Hero";
import ScrollDots from "@/components/ScrollDots";
import SocialRail from "@/components/SocialRail";
import { getDictionary } from "@/lib/i18n";

export default function Page() {
  const t = getDictionary("ar");
  return (
    <>
      <SocialRail locale="ar" />
      <ScrollDots locale="ar" />
      <Hero t={t} locale="ar" />
    </>
  );
}


