// src/app/customers/page.tsx
"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mockCustomers } from "@/lib/customers";

function CustomersContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("q", search);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [search, pathname, router, searchParams]);

  const filtered = mockCustomers.filter((cu) =>
    cu.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Sellers</h1>

      <input
        type="text"
        placeholder="Search by name…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 mb-6 rounded"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  <Link
                    href={`/customers/${customer.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {customer.name}
                  </Link>
                </td>
                <td className="border px-4 py-2">{customer.email}</td>
                <td className="border px-4 py-2">{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default function CustomersPage() {
  return (
    <Suspense fallback={<main className="p-8">Loading customers…</main>}>
      <CustomersContent />
    </Suspense>
  );
}
