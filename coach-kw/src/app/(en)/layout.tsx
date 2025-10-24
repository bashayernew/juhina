import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { getDictionary } from "@/lib/i18n";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  const t = getDictionary("en");
  return (
    <>
      <Navbar t={t} locale="en" />
      {children}
      <Footer t={t} locale="en" />
      <WhatsAppFAB label={t.cta.whatsapp} />
    </>
  );
}


