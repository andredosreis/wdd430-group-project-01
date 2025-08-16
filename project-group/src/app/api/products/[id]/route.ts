// src/app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// READ ONE
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { rows } = await sql`
    SELECT id, title, price, category, image
    FROM products
    WHERE id = ${id};
  `;
  if (rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(rows[0]);
}

// UPDATE
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, price, category, image } = await request.json();
  const { rows } = await sql`
    UPDATE products
    SET title = ${title}, price = ${price}, category = ${category}, image = ${image}
    WHERE id = ${id}
    RETURNING *;
  `;
  if (rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(rows[0]);
}

// DELETE /api/products/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await sql`DELETE FROM products WHERE id = ${id};`;
    return NextResponse.json({ deleted: true, id });
  } catch (err) {
    console.error("Failed to delete product:", err);
    return NextResponse.json(
      { error: "Unable to delete product." },
      { status: 500 }
    );
  }
}
