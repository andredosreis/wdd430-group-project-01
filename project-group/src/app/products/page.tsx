// src/app/products/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mockProducts } from "@/lib/products";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [category, setCategory] = useState(() => searchParams.get("category") ?? "all");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (category && category !== "all") params.set("category", category);
    else params.delete("category");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [category, pathname, router, searchParams]);

  const filtered = mockProducts.filter(
    (p) => category === "all" || p.category === category
  );

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-6">Products</h1>

      {/* filtro */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-3 py-2 rounded mb-6"
      >
        <option value="all">All</option>
        <option value="furniture">Furniture</option>
        <option value="kitchenware">Kitchenware</option>
        <option value="decor">Decor</option>
      </select>

      {/* grid de cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((pr) => (
          <Link key={pr.id} href={`/products/${pr.id}`} className="border rounded-lg overflow-hidden hover:shadow">
            <img src={pr.image} alt={pr.title} className="w-full h-48 object-cover" loading="lazy" />
            <div className="p-4">
              <h2 className="font-semibold capitalize">{pr.title}</h2>
              <p className="text-sm text-gray-600">€ {pr.price.toFixed(2)} · {pr.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<main className="p-8">Loading products…</main>}>
      <ProductsContent />
    </Suspense>
  );
}
