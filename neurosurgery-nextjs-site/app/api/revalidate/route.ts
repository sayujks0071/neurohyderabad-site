import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, type, slug } = body;

    // Verify the secret token (set this in your environment variables)
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // Revalidate based on content type
    switch (type) {
      case 'post':
        if (slug) {
          revalidatePath(`/blog/${slug}`);
        }
        revalidatePath('/blog');
        revalidateTag('blog-posts');
        break;
      
      case 'page':
        if (slug) {
          revalidatePath(`/${slug}`);
        }
        revalidateTag('pages');
        break;
      
      case 'service':
        revalidatePath('/services');
        revalidateTag('services');
        break;
      
      case 'condition':
        revalidatePath('/conditions');
        revalidateTag('conditions');
        break;
      
      default:
        // Revalidate all pages
        revalidatePath('/');
        revalidatePath('/blog');
        revalidatePath('/services');
        revalidatePath('/conditions');
        revalidatePath('/about');
        revalidatePath('/contact');
        break;
    }

    return NextResponse.json({ 
      message: 'Revalidation successful',
      type,
      slug: slug || 'all'
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating' }, 
      { status: 500 }
    );
  }
}

