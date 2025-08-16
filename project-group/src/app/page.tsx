// src/app/page.tsx
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
        Handcrafted Haven
      </h1>
      <p className="text-xl text-gray-700 mb-8 max-w-xl text-center">
        Discover and support talented artisans by browsing unique handcrafted
        items. Filter by category, price range, or artisan profile to find the
        perfect treasure.
      </p>
      <div className="flex space-x-4">
        <Link
          href="/customers"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          View Sellers
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Browse Products
        </Link>
      </div>
    </main>
  );
}
