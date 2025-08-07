// src/app/page.tsx
"use client";

import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to hu</h1>
      <p className="text-lg mb-8">
          Manage your invoices simply and quickly.
      </p>
      <Link
        href="/customers"
        className="px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
      >
        See all Custumers
      </Link>
    </main>
  );
}
