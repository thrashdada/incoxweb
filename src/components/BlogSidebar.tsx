import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface BlogSidebarProps {
  categories: Array<{
    title: string
    slug: { current: string }
    description?: string
  }>
  authors?: Array<{
    name: string
    image?: any
    slug: { current: string }
  }>
  currentCategory?: string
  currentAuthor?: string
  showNewsletter?: boolean
  showAuthors?: boolean
}

export default function BlogSidebar({ 
  categories, 
  authors = [], 
  currentCategory, 
  currentAuthor,
  showNewsletter = true,
  showAuthors = false
}: BlogSidebarProps) {
  return (
    <div className="sticky top-8 space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.slug.current}
              href={`/blog/category/${category.slug.current}`}
              className={`block transition-colors ${
                currentCategory === category.slug.current
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {category.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Authors */}
      {showAuthors && authors.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Authors</h3>
          <div className="space-y-3">
            {authors.map((author) => (
              <Link
                key={author.slug.current}
                href={`/blog/author/${author.slug.current}`}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  currentAuthor === author.slug.current
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                {author.image && (
                  <img
                    src={urlFor(author.image).width(40).height(40).url()}
                    alt={author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className={`font-medium ${
                    currentAuthor === author.slug.current ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {author.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      {showNewsletter && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
          <p className="text-blue-100 text-sm mb-4">
            Get the latest posts delivered to your inbox.
          </p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md text-gray-900 text-sm"
            />
            <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      )}

      {/* Popular Posts */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Posts</h3>
        <div className="space-y-4">
          <div className="flex space-x-3">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  The Future of Digital Transformation
                </Link>
              </h4>
              <p className="text-xs text-gray-500 mt-1">2 days ago</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  Building Scalable Web Applications
                </Link>
              </h4>
              <p className="text-xs text-gray-500 mt-1">1 week ago</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  AI and Machine Learning Trends
                </Link>
              </h4>
              <p className="text-xs text-gray-500 mt-1">2 weeks ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['Technology', 'Innovation', 'Web Development', 'AI', 'Design', 'Business'].map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase()}`}
              className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full hover:bg-blue-100 hover:text-blue-800 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 