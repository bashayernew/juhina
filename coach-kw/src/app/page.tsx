"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ backgroundColor: "#fff", color: "#000" }}
    >
      <h1 className="text-4xl font-bold mb-4" style={{ color: "#000" }}>
        Welcome to Juhainah Al-Shawaf
      </h1>
      <p className="max-w-2xl mb-8 text-lg">
        Self-Development Coach • Mind Reprogramming • Conscious Manifestation
      </p>
      <div className="flex gap-4">
        <Link
          href="/en/booking"
          className="px-6 py-3 rounded-md font-semibold"
          style={{ backgroundColor: "#FFD700", color: "#000", border: "2px solid #000" }}
        >
          Book a Session
        </Link>
        <Link
          href="/en/about"
          className="px-6 py-3 rounded-md font-semibold"
          style={{ backgroundColor: "#000", color: "#fff", border: "2px solid #FFD700" }}
        >
          Learn More
        </Link>
      </div>
      <footer className="mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} Juhainah Hussain Al-Shawaf. All rights reserved.
      </footer>
    </main>
  );
}
