import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/i18n";

export default function ArLayout({ children }: { children: React.ReactNode }) {
  const t = getDictionary("ar");
  return (
    <>
      <Navbar t={t} locale="ar" />
      {children}
      <Footer t={t} locale="ar" />
    </>
  );
}


