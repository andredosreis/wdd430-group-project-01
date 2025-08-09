// src/app/customers/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { mockCustomers } from "@/lib/customers";  // Assuming mockCustomers is exported from a separate file


export default function CustomerPage() {
    const [search, setSearch] = useState("");
    
    const filtered = mockCustomers.filter( cu =>
        cu.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <main className="p-8">
      <h1 className="text-2xl mb-4">Customers</h1>

      <input
        type="text"
        placeholder="Search by name…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border px-3 py-2 mb-6 rounded"
      />

      <ul className="space-y-2">
        {filtered.map(cu => (
          <li key={cu.id}>
            <Link
              href={`/customers/${cu.id}`}
              className="text-blue-600 hover:underline"
            >
              {cu.name}
            </Link>
            { " - "}{cu.email}  - {cu.phone}
          </li>
        ))}
      </ul>
      
      
    </main>
  );
}