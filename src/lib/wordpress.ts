// WordPress API configuration
export const WORDPRESS_API_URL = 'https://api.drsayuj.com/wp-json/wp/v2';

// API endpoints
export const API_ENDPOINTS = {
  posts: `${WORDPRESS_API_URL}/posts`,
  pages: `${WORDPRESS_API_URL}/pages`,
  services: `${WORDPRESS_API_URL}/services`, // Custom post type
  conditions: `${WORDPRESS_API_URL}/conditions`, // Custom post type
  doctors: `${WORDPRESS_API_URL}/doctors`, // Custom post type
  testimonials: `${WORDPRESS_API_URL}/testimonials`, // Custom post type
  media: `${WORDPRESS_API_URL}/media`,
  categories: `${WORDPRESS_API_URL}/categories`,
  tags: `${WORDPRESS_API_URL}/tags`,
};

// Helper function to fetch WordPress data
export async function fetchWordPressData(endpoint: string, params: Record<string, any> = {}) {
  try {
    const url = new URL(endpoint);
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });

        const response = await fetch(url.toString(), {
          next: { revalidate: 60 }, // Cache for 1 minute to get fresh data
        });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching WordPress data:', error);
    return null;
  }
}

// Specific functions for different content types
export async function getPosts(limit = 10, category?: string) {
  const params: Record<string, any> = {
    per_page: limit,
    _embed: true, // Include featured images and author data
  };
  
  if (category) {
    params.categories = category;
  }
  
  const response = await fetchWordPressData(API_ENDPOINTS.posts, params);
  
  // Add cache tag for posts
  if (response) {
    // This will be handled by the fetchWordPressData function with tags
  }
  
  return response;
}

export async function getServices() {
  return fetchWordPressData(API_ENDPOINTS.services, {
    per_page: 100,
    _embed: true,
  });
}

export async function getConditions() {
  return fetchWordPressData(API_ENDPOINTS.conditions, {
    per_page: 100,
    _embed: true,
  });
}

export async function getDoctors() {
  return fetchWordPressData(API_ENDPOINTS.doctors, {
    per_page: 100,
    _embed: true,
  });
}

export async function getTestimonials() {
  return fetchWordPressData(API_ENDPOINTS.testimonials, {
    per_page: 100,
    _embed: true,
  });
}

export async function getPostBySlug(slug: string) {
  const posts = await fetchWordPressData(API_ENDPOINTS.posts, {
    slug,
    _embed: true,
  });
  
  return posts && posts.length > 0 ? posts[0] : null;
}

export async function getPageBySlug(slug: string) {
  const pages = await fetchWordPressData(API_ENDPOINTS.pages, {
    slug,
    _embed: true,
  });
  
  return pages && pages.length > 0 ? pages[0] : null;
}

// Helper function to extract featured image URL
export function getFeaturedImageUrl(post: any): string | null {
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return null;
}

// Helper function to format WordPress content
export function formatWordPressContent(content: string): string {
  // Remove WordPress-specific HTML and clean up content
  return content
    .replace(/<p><\/p>/g, '') // Remove empty paragraphs
    .replace(/<br\s*\/?>/g, '\n') // Convert <br> to newlines
    .trim();
}
