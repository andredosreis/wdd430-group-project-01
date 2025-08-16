"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, logout } from "@/lib/auth";
import CreateProductForm from "@/app/components/CreateProductForm";
import ProductList from "@/app/components/ProductList";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) router.replace("/login");
  }, [router]);

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Product Admin</h1>
        <button onClick={() => { logout(); router.push("/login"); }} className="text-red-500">
          Logout
        </button>
      </div>

      <section className="mb-12">
        <h2 className="text-xl mb-2">Create New Product</h2>
        <CreateProductForm />
      </section>

      <section>
        <h2 className="text-xl mb-2">Existing Products</h2>
        <ProductList />
      </section>
    </main>
  );
}
