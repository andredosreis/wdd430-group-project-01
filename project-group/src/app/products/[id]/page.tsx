// src/app/invoices/[id]/page.tsx
"use client";              // necessário se usar useRouter, useState etc.
import { useRouter } from "next/navigation";

export default function InvoiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Invoice Detail: {params.id}</h1>
      {/* TODO: fetch(`/api/invoices/${params.id}`) para dados reais */}
      <p>Status: <em>— mock data —</em></p>
      <button
        onClick={() => router.back()}
        className="mt-4 underline"
      >
        ← Back to Invoices
      </button>
    </main>
  );
}
