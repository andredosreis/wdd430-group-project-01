// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  const { rows } = await sql`SELECT * FROM products;`;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  try {
    const { id, title, price, category, image } = await request.json();
    await sql`
      INSERT INTO products (id, title, price, category, image)
      VALUES (${id}, ${title}, ${price}, ${category}, ${image});
    `;
    return NextResponse.json({ created: true, id });
  } catch (err) {
    console.error("Error creating product:", err);
    return NextResponse.json({ error: "Unable to create product." }, { status: 500 });
  }
}
