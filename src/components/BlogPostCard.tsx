import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { CalendarDays, Clock, User, ArrowRight } from 'lucide-react'

interface BlogPostCardProps {
  post: {
    _id: string
    title: string
    slug: { current: string }
    publishedAt: string
    excerpt?: string
    mainImage?: any
    author?: {
      name: string
      image?: any
      slug: { current: string }
    }
    categories?: Array<{
      title: string
      slug: { current: string }
    }>
    estimatedReadingTime?: number
  }
  showAuthor?: boolean
  showCategories?: boolean
  showReadingTime?: boolean
  variant?: 'default' | 'compact'
}

export default function BlogPostCard({ 
  post, 
  showAuthor = true, 
  showCategories = true, 
  showReadingTime = true,
  variant = 'default'
}: BlogPostCardProps) {
  const isCompact = variant === 'compact'

  return (
    <article className={`bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${
      isCompact ? 'flex' : ''
    }`}>
      {post.mainImage && (
        <div className={`overflow-hidden ${isCompact ? 'w-32 flex-shrink-0' : 'aspect-video'}`}>
          <img
            src={urlFor(post.mainImage).width(isCompact ? 300 : 600).height(isCompact ? 200 : 400).url()}
            alt={post.mainImage.alt || post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className={`${isCompact ? 'flex-1' : ''} p-6`}>
        {/* Categories */}
        {showCategories && post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.slice(0, 2).map((category) => (
              <Link
                key={category.slug.current}
                href={`/blog/category/${category.slug.current}`}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className={`font-bold text-gray-900 mb-3 line-clamp-2 ${
          isCompact ? 'text-lg' : 'text-xl'
        }`}>
          <Link href={`/blog/${post.slug.current}`} className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {post.excerpt && !isCompact && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {showAuthor && post.author && (
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <Link
                  href={`/blog/author/${post.author.slug.current}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.author.name}
                </Link>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <CalendarDays className="w-4 h-4" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            {showReadingTime && post.estimatedReadingTime && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.estimatedReadingTime} min read</span>
              </div>
            )}
          </div>
        </div>

        {/* Read More */}
        <div className="mt-4">
          <Link
            href={`/blog/${post.slug.current}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group"
          >
            Read more
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  )
} 