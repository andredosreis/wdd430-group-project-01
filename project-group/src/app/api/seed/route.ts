// src/app/api/seed/route.ts
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
 
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      price NUMERIC NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL
    );
  `;

 
  const items = [
     { id: "p1", category: "furniture",   title: "handmade mug",  price: 35, image: "/products/handmade_mug.png"},
  { id: "p2", category: "kitchenware",  title: "ceramic plate", price: 20, image: "/products/ceramic_plate.png" },
 
  { id: "p3", category: "decor",        title: "wall art",      price: 50, image: "/products/wall_art.png" },
  { id: "p4", category: "kitchenware",  title: "glass jar set", price: 15, image: "/products/glass_jar_set.png" },
  { id: "p5", category: "furniture",    title: "wooden chair",  price: 80, image: "/products/wooden_chair.png" },
  { id: "p6", category: "decor",        title: "vase set",      price: 30, image: "/products/vase_set.png" },
  ];

  for (const p of items) {
    await sql`
      INSERT INTO products (id, title, price, category, image)
      VALUES (${p.id}, ${p.title}, ${p.price}, ${p.category}, ${p.image})
      ON CONFLICT (id) DO NOTHING;
    `;
  }

  return NextResponse.json({ seeded: true, count: items.length });
}
