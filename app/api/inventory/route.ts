import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { authenticateRequest } from '@/lib/middleware';

// GET - Fetch all inventory items
export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [items] = await db.execute(
      'SELECT * FROM inventory_items ORDER BY created_at DESC'
    );

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new inventory item
export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, description, quantity, price, category } = await request.json();

    if (!name || quantity === undefined) {
      return NextResponse.json(
        { error: 'Name and quantity are required' },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      'INSERT INTO inventory_items (name, description, quantity, price, category) VALUES (?, ?, ?, ?, ?)',
      [name, description || null, quantity, price || null, category || null]
    ) as any[];

    const [newItem] = await db.execute(
      'SELECT * FROM inventory_items WHERE id = ?',
      [result.insertId]
    );

    return NextResponse.json(
      { message: 'Item created successfully', item: (newItem as any[])[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating inventory item:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

