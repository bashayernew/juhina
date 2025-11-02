import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/i18n";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  const t = getDictionary("en");
  return (
    <>
      <Navbar t={t} locale="en" />
      {children}
      <Footer t={t} locale="en" />
    </>
  );
}


