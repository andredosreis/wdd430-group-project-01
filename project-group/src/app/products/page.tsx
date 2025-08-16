// src/app/products/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
};


type RawProduct = {
  id: string;
  title: string;
  price: string;
  category: string;
  image: string;
};


function CategoryFilter({
  categories,
  selected,
  onChange,
}: {
  categories: string[];
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-6 flex items-center gap-2">
      <label className="font-medium">Category:</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="border px-3 py-2 rounded-md"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c === "all" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="block overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative w-full aspect-[3/2] bg-gray-100">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h2 className="font-semibold capitalize line-clamp-2">
              {product.title}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              € {product.price.toFixed(2)} · {product.category}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState(
    () => searchParams.get("category") ?? "all"
  );

  // Fetch products from API with error handling and normalize price to number
useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        let rawArray: RawProduct[] = [];
        if (Array.isArray(json)) {
          rawArray = json as RawProduct[];
        } else if (
          typeof json === "object" &&
          json !== null &&
          Array.isArray((json as any).rows)
        ) {
          rawArray = (json as { rows: RawProduct[] }).rows;
        }

        const normalized: Product[] = rawArray.map((p) => ({
          id: p.id,
          title: p.title,
          price: parseFloat(p.price),
          category: p.category,
          image: p.image,
        }));
        setProducts(normalized);
      } catch (err) {
        console.error(err);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Sync category filter with URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (category !== "all") params.set("category", category);
    else params.delete("category");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [category, pathname, router, searchParams]);

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];
  const filtered = products.filter(
    (p) => category === "all" || p.category === category
  );

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-6">Products</h1>

      {loading && <p className="mb-6 text-gray-500">Loading products…</p>}

      {error && (
        <div className="mb-6">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 inline-block rounded bg-blue-600 px-4 py-2 text-white"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <CategoryFilter
            categories={categories}
            selected={category}
            onChange={setCategory}
          />

          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <p className="mt-8 text-center text-gray-500">
              No products found in this category.
            </p>
          )}
        </>
      )}
    </main>
  );
}
