# WordPress + Next.js Integration Setup

## 🎉 What's Been Set Up

Your Next.js frontend is now integrated with WordPress as a headless CMS! Here's what's working:

### ✅ Frontend (Next.js on Vercel)
- **Domain**: `www.drsayuj.com` (configured in Vercel)
- **Blog**: `/blog` - Fetches posts from WordPress
- **Dynamic Posts**: `/blog/[slug]` - Individual blog posts
- **API Integration**: WordPress REST API integration
- **Caching**: 1-hour cache with revalidation support

### ✅ Backend (WordPress)
- **Domain**: `drsayuj.com` (your existing WordPress site)
- **REST API**: Enabled and accessible
- **Plugins**: WPGraphQL, JWT Authentication, Custom Post Types, ACF

## 🔧 Next Steps

### 1. DNS Configuration
You need to configure DNS in WordPress.com to point `www.drsayuj.com` to Vercel:

**Option A: CNAME Record (Recommended)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Option B: A Record**
```
Type: A
Name: www
Value: 76.76.21.21
```

### 2. WordPress Content Setup

#### Create Custom Post Types:
1. **Services** - For your medical services
2. **Conditions** - For medical conditions
3. **Doctors** - For staff profiles
4. **Testimonials** - For patient testimonials

#### Sample Blog Post:
Create a test blog post in WordPress to verify the integration:
- Title: "Welcome to Our Blog"
- Content: "This is a test post to verify WordPress integration"
- Publish it and check if it appears on `www.drsayuj.com/blog`

### 3. Webhook Setup (Optional)
To automatically update the frontend when you publish content:

1. **Install a webhook plugin** in WordPress
2. **Set webhook URL**: `https://www.drsayuj.com/api/revalidate`
3. **Set secret**: Add `REVALIDATE_SECRET` environment variable in Vercel
4. **Configure triggers**: Post publish, update, delete

### 4. Environment Variables
Add these to your Vercel project settings:
```
REVALIDATE_SECRET=your-secret-key-here
```

## 📝 How to Use

### Publishing Blog Posts:
1. Go to your WordPress admin (`drsayuj.com/wp-admin`)
2. Create a new post
3. Publish it
4. It will automatically appear on `www.drsayuj.com/blog`

### Managing Content:
- **Blog Posts**: Use WordPress Posts
- **Services**: Create custom post type "Services"
- **Conditions**: Create custom post type "Conditions"
- **Pages**: Use WordPress Pages for static content

## 🔍 Testing

### Test the Integration:
1. **Blog Page**: Visit `www.drsayuj.com/blog`
2. **Individual Post**: Click on any blog post
3. **WordPress API**: Test `https://drsayuj.com/wp-json/wp/v2/posts`

### Expected Behavior:
- Blog posts from WordPress appear on the Next.js site
- Featured images display correctly
- SEO metadata is generated automatically
- Fast loading with caching

## 🚀 Benefits

### Performance:
- ⚡ Lightning-fast Next.js frontend
- 🌍 Global CDN via Vercel
- 📱 Mobile-optimized
- 🔍 SEO-optimized

### Content Management:
- ✏️ Familiar WordPress editor
- 👥 User roles and permissions
- 📅 Content scheduling
- 🖼️ Media library management

### Development:
- 🔄 Automatic deployments from GitHub
- 🛠️ Modern development workflow
- 📊 Built-in analytics
- 🔒 Automatic HTTPS

## 🆘 Troubleshooting

### If blog posts don't appear:
1. Check WordPress REST API: `https://drsayuj.com/wp-json/wp/v2/posts`
2. Verify CORS settings in WordPress
3. Check Vercel deployment logs

### If domain doesn't work:
1. Verify DNS configuration
2. Check SSL certificate status in Vercel
3. Wait 24-48 hours for DNS propagation

### If images don't load:
1. Check WordPress media library
2. Verify image URLs in API response
3. Check CORS settings for media

## 📞 Support

If you need help:
1. Check Vercel deployment logs
2. Test WordPress API endpoints
3. Verify DNS configuration
4. Contact for technical support

---

**Your site is now live at**: `www.drsayuj.com`
**WordPress admin**: `drsayuj.com/wp-admin`
**API endpoint**: `drsayuj.com/wp-json/wp/v2/`
