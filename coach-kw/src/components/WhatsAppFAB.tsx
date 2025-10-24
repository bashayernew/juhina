import Link from "next/link";

export default function WhatsAppFAB({ phone = "+96599986494", label = "WhatsApp" }: { phone?: string; label?: string }) {
  const href = `https://wa.me/${phone.replace(/\D/g, "")}`;
  return (
    <Link
      href={href}
      aria-label={label}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-[var(--accent)] text-[#0B0F14] shadow-lg px-5 py-3 font-semibold hover:brightness-95 focus-ring"
    >
      {label}
    </Link>
  );
}


