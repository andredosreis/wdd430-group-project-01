import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

export default function ProductsPage() {
  return (
    <Suspense fallback={<main className="p-8">Loading products…</main>}>
      <ProductsContent />
    </Suspense>
  );
}
