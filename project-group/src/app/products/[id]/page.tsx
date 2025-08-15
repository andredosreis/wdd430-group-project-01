// src/app/products/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/products";
import Image from "next/image";

export default async function ProductDetails({
  params,
}: { params: Promise<{ id: string }> }) {
  // Await nos params (Next 15)
  const { id } = await params;
  const product = mockProducts.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <main className="p-8">
      {/* Wrapper relativo com aspect-ratio 3:4 */}
      <div className="relative w-full max-w-2xl aspect-[3/4] overflow-hidden rounded-lg border">
        <Image
          src={product.image}               // ex.: "/products/phone-01.jpg"
          alt={product.title}
          fill                              // preenche todo o wrapper
          sizes="(max-width: 768px) 100vw, 640px"
          className="object-cover"
          priority
        />
      </div>

      {/* Detalhes do produto */}
      <div className="mt-4">
        <h1 className="text-2xl font-semibold capitalize">
          {product.title}
        </h1>
        <p className="text-gray-700">Category: {product.category}</p>
        <p className="text-lg font-medium mt-1">
          € {product.price.toFixed(2)}
        </p>
      </div>

      {/* Link de volta */}
      <Link
        href="/products"
        className="inline-block mt-4 underline text-blue-600"
      >
        ← Back to products
      </Link>
    </main>
  );
}
