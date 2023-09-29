import { getCurrentUser } from '../../../lib/session';
import { db } from '../../../lib/db';
import { NextResponse } from 'next/server';
import { Post } from '@prisma/client';

export async function PUT(request) {
  try {
    const { id, title, description, category } = await request.json();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const existingPost = await db.Post.findFirst({
      where: {
        id,
        UserId: user.id,
      },
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found or unauthorized' }, { status: 404 });
    }

    const updatedPost = await db.Post.update({
      where: { id },
      data: { title, description, category },
    });

    return NextResponse.json({ result: 'Post updated successfully', success: true, updatedPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while updating the post' }, { status: 500 });
  }
}