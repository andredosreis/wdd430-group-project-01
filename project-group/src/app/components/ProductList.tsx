"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
    id: string;
    title: string;
    price: number;
    category: string;
    image: string;
};

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Product>>({});

    useEffect(() => {
        fetch("/api/products")
            .then((r) => r.json())
            .then((data: any[]) =>
                setProducts(data.map((p) => ({ ...p, price: parseFloat(p.price) })))
            );
    }, []);

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        if (!editingId) return;

        await fetch(`/api/products/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...editForm,
                price: Number(editForm.price),
            }),
        });

        // Atualiza o estado local
        setProducts((current) =>
            current.map((p) =>
                p.id === editingId
                    ? { ...(p as any), ...(editForm as any) }
                    : p
            ) as Product[]
        );

        // Sai do modo edição e limpa o formulário
        setEditingId(null);
        setEditForm({});
    }

    return (
        <div className="space-y-4">
            {products.map((p) => (
                <div key={p.id} className="border p-4 flex items-center gap-4">
                    <div className="w-16 h-16 relative">
                        <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-1">
                        {editingId === p.id ? (
                            <form onSubmit={handleUpdate} className="flex gap-2">
                                <input
                                    defaultValue={p.title}
                                    onChange={(e) =>
                                        setEditForm({ ...editForm, title: e.target.value })
                                    }
                                    className="border p-1"
                                />
                                <input
                                    defaultValue={p.price.toString()}
                                    type="number"
                                    step="0.01"
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            price: parseFloat(e.target.value),
                                        })
                                    }
                                    className="border p-1"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-2 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setEditForm({});
                                    }}
                                    className="text-gray-500 px-2"
                                >
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            <>
                                <div className="font-semibold">{p.title}</div>
                                <div>€{p.price.toFixed(2)}</div>
                                <div className="text-sm text-gray-600">{p.category}</div>
                            </>
                        )}
                    </div>

                    {editingId !== p.id && (
                        <button
                            onClick={() => {
                                setEditingId(p.id);
                                setEditForm({ ...p });
                            }}
                            className="text-blue-600"
                        >
                            Edit
                        </button>
                    )}

         
                    {editingId !== p.id && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setEditingId(p.id);
                                    setEditForm({ ...p });
                                }}
                                className="text-blue-600"
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={async () => {
                                    if (!confirm(`Are you sure you want to delete "${p.title}"?`)) return;
                                    // chama a API DELETE
                                    await fetch(`/api/products/${p.id}`, { method: "DELETE" });
                                    // atualiza estado local removendo o produto
                                    setProducts((current) =>
                                        current.filter((prod) => prod.id !== p.id)
                                    );
                                }}
                                className="text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    )}

                </div>
            ))}
        </div>
    );
}
