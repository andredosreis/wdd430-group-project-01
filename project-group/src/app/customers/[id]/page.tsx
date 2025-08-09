//src/app/customers/[id]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";

import { mockCustomers } from "@/lib/customers"; // Assuming mockCustomers is exported from a separate file

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const customer = mockCustomers.find(cu => cu.id === params.id);

  if (!customer) {
    notFound();
  }

  return (
    <main className="p-8 space-x-4">
        <h1 className="text-2xl  font-semibold">
            {customer.name} 

        </h1>
        <div className="space-y-1">
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>


        </div>
        <Link href="/customers" className="inline-block mt-4 text-blue-600 hover:underline">
            Back to Customers
        </Link>

    </main>
    );
}