"use client";

import { useState } from "react";
import Link from "next/link";

const mockInvoices = [
  { id: "1", name: "Invoice #1", status: "paid" },
  { id: "2", name: "Invoice #2", status: "pending" },
  { id: "3", name: "Invoice #3", status: "overdue" },
];

export default function InvoicesPage() {
  const [filter, setFilter] = useState<string>("all");
  const filtered = mockInvoices.filter(
    (inv) => filter === "all" || inv.status === filter
  );

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Invoices</h1>

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
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <ul className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
        {filtered.map((inv) => (
          <li key={inv.id}>
            <Link
              href={`/invoices/${inv.id}`}
              className="text-blue-600 hover:underline"
            >
              {inv.name} —{" "}
              <span className="capitalize">{inv.status}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
