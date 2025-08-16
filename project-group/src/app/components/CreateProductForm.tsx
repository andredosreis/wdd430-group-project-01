// components/CreateProductForm.tsx
"use client";
import { useState } from "react";

export default function CreateProductForm() {
  const [form, setForm] = useState({
    id: "",
    title: "",
    price: "",
    category: "",
    imageUrl: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Creating product…");

    const payload = {
      id: form.id,
      title: form.title,
      price: parseFloat(form.price),
      category: form.category,
      image: form.imageUrl,   // usa a URL que o usuário digitou
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("Product created!");
      setForm({ id: "", title: "", price: "", category: "", imageUrl: "" });
    } else {
      setStatus("Error creating product.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-lg">
      <input
        value={form.id}
        onChange={(e) => setForm({ ...form, id: e.target.value })}
        placeholder="ID"
        className="border p-2"
        required
      />
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
        className="border p-2"
        required
      />
      <input
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        placeholder="Price"
        type="number"
        step="0.01"
        className="border p-2"
        required
      />
      <input
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        placeholder="Category"
        className="border p-2"
        required
      />
      <input
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        placeholder="Image URL"
        className="border p-2"
        required
      />
      <button type="submit" className="bg-green-600 text-white py-2 rounded">
        Create
      </button>
      {status && <p className="mt-2">{status}</p>}
    </form>
  );
}
