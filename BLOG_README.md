# Blog System Documentation

This document describes the full-featured blog system built for the IncExchange website.

## Features

### 🎯 Core Blog Features
- **Blog Listing Page** (`/blog`) - Main blog page with all posts
- **Individual Post Pages** (`/blog/[slug]`) - Full post view with author info and related posts
- **Category Pages** (`/blog/category/[slug]`) - Filter posts by category
- **Author Pages** (`/blog/author/[slug]`) - View all posts by a specific author
- **Search Functionality** - Search through posts by title and content
- **Pagination** - Navigate through multiple pages of posts
- **Responsive Design** - Works on all device sizes

### 📝 Content Management
- **Sanity CMS Integration** - Manage all blog content through Sanity Studio
- **Rich Text Editor** - Portable Text support for rich content
- **Image Management** - Optimized images with Sanity Image URL builder
- **SEO Optimization** - Meta tags, Open Graph, and structured data
- **Reading Time Estimation** - Automatic calculation based on content length

### 🎨 UI Components
- **BlogPostCard** - Reusable post card component
- **BlogSidebar** - Sidebar with categories, authors, and newsletter signup
- **BlogSearch** - Search component with debounced input
- **BlogPagination** - Pagination component with smart page number display
- **BlogPreview** - Homepage blog preview section

### 🔧 Technical Features
- **Server-Side Rendering** - Fast initial page loads
- **Static Generation** - Optimized for performance
- **TypeScript Support** - Full type safety
- **Tailwind CSS** - Modern, responsive styling
- **Lucide Icons** - Beautiful, consistent iconography

## File Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx                    # Main blog listing
│   │   ├── [slug]/
│   │   │   └── page.tsx               # Individual post page
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Category page
│   │   └── author/
│   │       └── [slug]/
│   │           └── page.tsx           # Author page
├── components/
│   ├── BlogPostCard.tsx               # Reusable post card
│   ├── BlogSidebar.tsx                # Sidebar component
│   ├── BlogSearch.tsx                 # Search component
│   ├── BlogPagination.tsx             # Pagination component
│   └── BlogPreview.tsx                # Homepage preview
└── sanity/
    └── schemaTypes/
        ├── postType.ts                # Post schema
        ├── authorType.ts              # Author schema
        ├── categoryType.ts            # Category schema
        └── blockContentType.ts        # Rich text schema
```

## Sanity Schema

### Post Schema
- `title` - Post title
- `slug` - URL slug (auto-generated from title)
- `author` - Reference to author
- `mainImage` - Featured image with alt text
- `categories` - Array of category references
- `publishedAt` - Publication date
- `body` - Rich text content (Portable Text)
- `excerpt` - Short description (optional)

### Author Schema
- `name` - Author name
- `slug` - URL slug (auto-generated from name)
- `image` - Author profile picture
- `bio` - Author biography (rich text)

### Category Schema
- `title` - Category name
- `slug` - URL slug (auto-generated from title)
- `description` - Category description

## Usage

### Adding a New Blog Post

1. **Access Sanity Studio** - Go to `/studio` in your browser
2. **Create New Post** - Click "Create new" and select "Post"
3. **Fill in Details**:
   - Title (slug will be auto-generated)
   - Select an author
   - Upload a featured image
   - Add categories
   - Set publication date
   - Write content using the rich text editor
   - Add an excerpt (optional)
4. **Publish** - Click "Publish" to make it live

### Customizing the Blog

#### Styling
- All styling is done with Tailwind CSS classes
- Colors and spacing can be customized in `src/app/globals.css`
- Component-specific styles are in their respective component files

#### Adding New Features
- **Tags** - Add a `tags` field to the post schema and create tag pages
- **Comments** - Integrate a commenting system like Disqus or build custom
- **Newsletter Integration** - Connect the newsletter signup to your email service
- **Social Sharing** - Add more social media platforms to the share buttons

#### SEO Optimization
- Each page has proper meta tags and Open Graph data
- Structured data can be added for better search engine understanding
- Sitemap generation can be added for better indexing

## Environment Variables

Make sure these environment variables are set in your hosting platform:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-06-17
```

## Performance Optimization

- **Image Optimization** - All images are optimized through Sanity's image URL builder
- **Lazy Loading** - Images are lazy-loaded for better performance
- **Caching** - Sanity client uses CDN for fast content delivery
- **Static Generation** - Pages are statically generated where possible

## Future Enhancements

- **Search API** - Implement server-side search with Sanity's GROQ queries
- **Related Posts** - Improve related posts algorithm
- **Reading Progress** - Add reading progress indicator
- **Dark Mode** - Add dark mode support
- **RSS Feed** - Generate RSS feed for blog posts
- **Email Notifications** - Notify subscribers of new posts

## Troubleshooting

### Common Issues

1. **Posts not showing** - Check if `publishedAt` date is in the past
2. **Images not loading** - Verify Sanity project ID and dataset
3. **Build errors** - Ensure all dependencies are installed (`@portabletext/react`)

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access Sanity Studio
# Go to http://localhost:3000/studio
```

The blog system is now fully functional and ready for content creation! 