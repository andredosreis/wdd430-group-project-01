// src/app/invoices/[id]/page.tsx
"use client";              // necessário se usar useRouter, useState etc.

import { notFound } from "next/navigation";
import { mockProducts , type Product } from "@/lib/products";
import Link from "next/link";


export default function ProductDetails({
  params,
}: { params: { id: string } }) {
  const product = mockProducts.find(p => p.id === params.id);
  if (!product) notFound();


  return (
    <main className="p-8">
     <img
        src={product.image}
        alt={product.title}
        className="w-full max-w-2xl aspect-[3/2] object-cover rounded-lg border"
      />

      <div>
        <h1 className="text-2xl font-semibold capitalize">{product.title}</h1>
        <p className="text-gray-700">Category: {product.category}</p>
        <p className="text-lg font-medium mt-1">€ {product.price.toFixed(2)}</p>
      </div>
       <Link href="/products" className="inline-block mt-4 underline text-blue-600">
        ← Back to products
      </Link>
  
    </main>
  );
}
