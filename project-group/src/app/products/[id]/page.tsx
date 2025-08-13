// src/app/products/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/products";

export default async function ProductDetails({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;                 // ← await params (Next 15)
  const product = mockProducts.find(p => p.id === id);
  if (!product) notFound();

  return (
    <main className="p-8">
      next/image
      <img
        src={product.image}
        alt={product.title}
        className="w-full max-w-2xl aspect-[3/2] object-cover rounded-lg border"
      />

      <div className="mt-4">
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
