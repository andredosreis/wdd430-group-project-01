"use client";

import { useState } from "react";
import Link from "next/link";

// src/app/products/page.tsx
type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
};

const mockProducts = [
  { id: "p1", category: "furniture", title: "handmade mug", price:  35.0 },
  {id: "p2", category: "kitchenware", title: "ceramic plate", price: 20.0 },
  { id: "p3", category: "decor", title: "wall art", price: 50.0 },
  { id: "p4", category: "kitchenware", title: "glass jar set", price: 15.0 },
  { id: "p5", category: "furniture", title: "wooden chair", price: 80.0 },
  { id: "p6", category: "decor", title: "vase set", price: 30.0
  },

];

export default function ProductPage() {
  const [filter, setFilter] = useState<string>("all");
  const filtered = mockProducts.filter(
    (pr) => filter === "all" || pr.category === filter
  );

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Product</h1>

      <div className="mb-6">
        <label htmlFor="filter" className="block mb-2 font-medium">
          Filtrar por status:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilter(e.target.value)
          }
          className="border px-3 py-2 rounded"
        >
          <option value="all">All</option>
          <option value="furniture">Furniture</option>
          <option value="kitchenware">Kitchenware</option>
          <option value="decor">Decor</option>
        </select>

      </div>

      <ul className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
        {filtered.map((tl) => (
          <li key={tl.id}>
            <Link
              href={`/products/${tl.id}`}
              className="text-blue-600 hover:underline"
            >
              {tl.title} —{" "}
              <span className="capitalize">{tl.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
