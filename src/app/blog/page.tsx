import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { groq } from 'next-sanity'
import Link from 'next/link'
import { CalendarDays, Clock, User, ArrowRight } from 'lucide-react'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog | IncExchange',
  description: 'Read our latest insights, updates, and stories about innovation and technology.',
}

// First, let's get all posts to debug
const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    author->{
      name,
      image,
      slug
    },
    categories[]->{
      title,
      slug
    },
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
  }
`

// Then filter for published posts
const postQuery = groq`
  *[_type == "post" && (publishedAt <= now() || !defined(publishedAt))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    author->{
      name,
      image,
      slug
    },
    categories[]->{
      title,
      slug
    },
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
  }
`

const categoryQuery = groq`
  *[_type == "category"] {
    title,
    slug,
    description
  }
`

export default async function BlogPage() {
  const posts = await client.fetch(postQuery)
  const allPosts = await client.fetch(allPostsQuery) // For debugging
  const categories = await client.fetch(categoryQuery)

  // Debug information
  console.log('All posts count:', allPosts.length)
  console.log('Published posts count:', posts.length)
  console.log('All posts:', allPosts.map((p: any) => ({ title: p.title, publishedAt: p.publishedAt })))
  console.log('Published posts:', posts.map((p: any) => ({ title: p.title, publishedAt: p.publishedAt })))

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <div className="bg-black border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                Our Blog
              </h1>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Discover insights, updates, and stories from our team about innovation, 
                technology, and the future of digital transformation.
              </p>
              {/* Debug info - remove this in production */}
              <div className="mt-4 text-sm text-gray-400">
                Total posts: {allPosts.length} | Published posts: {posts.length}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {/* Categories */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category: any) => (
                      <Link
                        key={category.slug.current}
                        href={`/blog/category/${category.slug.current}`}
                        className="block text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-blue-600 rounded-lg p-6 text-white">
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
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post: any) => (
                  <article key={post._id} className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-shadow">
                    {post.mainImage && (
                      <Link href={`/blog/${post.slug.current}`} className="block aspect-video overflow-hidden">
                        <img
                          src={urlFor(post.mainImage).width(600).height(400).url()}
                          alt={post.mainImage.alt || post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    )}
                    
                    <div className="p-6">
                      {/* Categories */}
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories.slice(0, 2).map((category: any) => (
                            <span
                              key={category.slug.current}
                              className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
                            >
                              {category.title}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                        <Link href={`/blog/${post.slug.current}`} className="hover:text-blue-400 transition-colors">
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          {post.author && (
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4" />
                              <span>{post.author.name}</span>
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
                          {post.estimatedReadingTime && (
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
                          className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium text-sm group"
                        >
                          Read more
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Empty State */}
              {posts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-600 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No posts yet</h3>
                  <p className="text-gray-400">Check back soon for new content!</p>
                  {/* Debug info - remove this in production */}
                  <div className="mt-4 text-sm text-gray-500">
                    <p>Debug: Found {allPosts.length} total posts in Sanity</p>
                    <p>Posts without publishedAt date: {allPosts.filter((p: any) => !p.publishedAt).length}</p>
                    <p>Posts with future publishedAt date: {allPosts.filter((p: any) => p.publishedAt && new Date(p.publishedAt) > new Date()).length}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 