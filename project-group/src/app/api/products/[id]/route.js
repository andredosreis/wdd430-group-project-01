import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

/**
 * GET /api/products/:id
 * Devolve apenas um produto.
 */
export async function GET(_request, { params }) {
  const { id } = params;

  try {
    const { rows } = await sql`
      SELECT id, title, price, category, image
      FROM products
      WHERE id = ${id};
    `;
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    const p = rows[0];
    return NextResponse.json({
      ...p,
      price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Unable to fetch product.' }, { status: 500 });
  }
}

/**
 * PUT /api/products/:id
 * Actualiza um produto existente.
 */
export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  try {
    const { rows } = await sql`
      UPDATE products
      SET title    = ${body.title},
          price    = ${body.price},
          category = ${body.category},
          image    = ${body.image}
      WHERE id = ${id}
      RETURNING *;
    `;
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    const p = rows[0];
    return NextResponse.json({
      ...p,
      price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Unable to update product.' }, { status: 500 });
  }
}

/**
 * DELETE /api/products/:id
 * Remove um produto.
 */
export async function DELETE(_request, { params }) {
  const { id } = params;

  try {
    await sql`DELETE FROM products WHERE id = ${id};`;
    return NextResponse.json({ deleted: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Unable to delete product.' }, { status: 500 });
  }
}
