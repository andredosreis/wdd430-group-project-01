// src/app/products/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mockProducts } from "@/lib/products";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Estado inicial do filtro (vem da URL ?category=)
  const [category, setCategory] = useState(
    () => searchParams.get("category") ?? "all"
  );

  // Ao mudar category, atualiza a URL sem scroll
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (category && category !== "all") params.set("category", category);
    else params.delete("category");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [category, pathname, router, searchParams]);

  // Lista de categorias
  const categories = [
    "all",
    ...Array.from(new Set(mockProducts.map((p) => p.category))),
  ];

  // Produtos filtrados
  const filtered = mockProducts.filter(
    (p) => category === "all" || p.category === category
  );

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-6">Products</h1>

      {/* Select de Categoria */}
      <div className="mb-6">
        <label className="mr-2 font-medium">Categoria:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "Todas" : c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Grid de Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((pr) => (
          <Link
            key={pr.id}
            href={`/products/${pr.id}`}
            className="block overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Wrapper com aspect-ratio 3:2 */}
            <div className="relative w-full aspect-[4/4] bg-gray-100">
              <Image
                src={pr.image}               // ex: "/products/phone-01.jpg"
                alt={pr.title}
                fill                          // ocupa todo o wrapper
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
                priority={false}
              />
            </div>

            <div className="p-4">
              <h2 className="font-semibold capitalize line-clamp-2">
                {pr.title}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                € {pr.price.toFixed(2)} · {pr.category}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-gray-500">
          Nenhum produto encontrado nesta categoria.
        </p>
      )}
    </main>
  );
}
