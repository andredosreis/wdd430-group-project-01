"use client";

import { useState } from "react";
import Link from "next/link";
import { mockProducts } from "@/lib/products"; // Assuming mockProducts is exported from a separate file

// src/app/products/page.tsx


export default function ProductPage() {
  const [filter, setFilter] = useState<string>("all");
  const filtered = mockProducts.filter(
    (pr) => filter === "all" || pr.category === filter
  );

  return (
     <main className="p-8">
      <h1 className="text-2xl mb-6">Products</h1>

      {/* grid de cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((pr) => (
          <Link
            key={pr.id}
            href={`/products/${pr.id}`}
            className="border rounded-lg overflow-hidden hover:shadow"
          >
            <img
              src={pr.image}
              alt={pr.title}
              className="w-full h-49 object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h2 className="font-semibold capitalize">{pr.title}</h2>
              <p className="text-sm text-gray-600">
                € {pr.price.toFixed(2)} · {pr.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
