"use client";

import { useState } from "react";
import Link from "next/link";

// src/app/products/page.tsx

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

const mockCustomers: Customer[]= [
    { id: "c1", name: "Alice Smith", email: "alice@exemplo.com", phone: "123-456-7890" },
    { id: "c2", name: "Bob Johnson", email: "bob@exemplo.com", phone: "987-654-3210" },
    { id: "c3", name: "Charlie Brown", email: "charlie@exemplo.com", phone: "555-555-5555" },
    { id: "c4", name: "Diana Prince", email: "diana@exemplo.com", phone: "111-222-3333" }
];

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
            <strong>{cu.name}</strong> – {cu.email} – {cu.phone}
          </li>
        ))}
      </ul>
    </main>
  );
}