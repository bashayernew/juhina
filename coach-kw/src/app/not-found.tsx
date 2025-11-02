"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 text-center" style={{ backgroundColor: "#fff", color: "#000" }}>
      <div>
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-2 text-sm" style={{ color: "#6b7280" }}>The page you’re looking for doesn’t exist.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link href="/en" className="px-5 py-2 rounded-md font-semibold" style={{ backgroundColor: "#FFD700", color: "#000", border: "2px solid #000" }}>Go to English Home</Link>
          <Link href="/ar" className="px-5 py-2 rounded-md font-semibold" style={{ backgroundColor: "#000", color: "#fff", border: "2px solid #FFD700" }}>اذهب للرئيسية العربية</Link>
        </div>
      </div>
    </main>
  );
}


