import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { groq } from 'next-sanity'
import Link from 'next/link'
import { CalendarDays, Clock, User, ArrowLeft, ArrowRight } from 'lucide-react'
import { Footer } from '@/components/Footer'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await client.fetch(
    groq`*[_type == "category" && slug.current == $slug][0] {
      title,
      description
    }`,
    { slug: params.slug }
  )

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} | IncExchange Blog`,
    description: category.description || `Read all posts in ${category.title} category.`,
  }
}

const categoryQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    title,
    description,
    slug
  }
`

// First, let's get all posts in this category to debug
const allPostsInCategoryQuery = groq`
  *[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc) {
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
const postsQuery = groq`
  *[_type == "post" && (publishedAt <= now() || !defined(publishedAt)) && $slug in categories[]->slug.current] | order(publishedAt desc) {
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

const allCategoriesQuery = groq`
  *[_type == "category"] {
    title,
    slug,
    description
  }
`

export default async function CategoryPage({ params }: Props) {
  const category = await client.fetch(categoryQuery, { slug: params.slug })
  const posts = await client.fetch(postsQuery, { slug: params.slug })
  const allPostsInCategory = await client.fetch(allPostsInCategoryQuery, { slug: params.slug }) // For debugging
  const allCategories = await client.fetch(allCategoriesQuery)

  if (!category) {
    notFound()
  }

  // Debug information
  console.log('Category:', category.title)
  console.log('All posts in category count:', allPostsInCategory.length)
  console.log('Published posts in category count:', posts.length)
  console.log('All posts in category:', allPostsInCategory.map((p: any) => ({ title: p.title, publishedAt: p.publishedAt })))
  console.log('Published posts in category:', posts.map((p: any) => ({ title: p.title, publishedAt: p.publishedAt })))

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <div className="bg-black border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                {category.title}
              </h1>
              {category.description && (
                <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                  {category.description}
                </p>
              )}
              <p className="mt-2 text-gray-400">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
              </p>
              {/* Debug info - remove this in production */}
              <div className="mt-2 text-sm text-gray-500">
                Total posts in category: {allPostsInCategory.length} | Published posts: {posts.length}
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
                  <h3 className="text-lg font-semibold text-white mb-4">All Categories</h3>
                  <div className="space-y-2">
                    {allCategories.map((cat: any) => (
                      <Link
                        key={cat.slug.current}
                        href={`/blog/category/${cat.slug.current}`}
                        className={`block transition-colors ${
                          cat.slug.current === params.slug
                            ? 'text-blue-400 font-medium'
                            : 'text-gray-300 hover:text-blue-400'
                        }`}
                      >
                        {cat.title}
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
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts.map((post: any) => (
                    <article key={post._id} className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-shadow">
                      {post.mainImage && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={urlFor(post.mainImage).width(600).height(400).url()}
                            alt={post.mainImage.alt || post.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <div className="p-6">
                        {/* Categories */}
                        {post.categories && post.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.categories.slice(0, 2).map((cat: any) => (
                              <span
                                key={cat.slug.current}
                                className={`inline-block text-xs px-2 py-1 rounded-full ${
                                  cat.slug.current === params.slug
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300'
                                }`}
                              >
                                {cat.title}
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
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-600 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No posts in this category</h3>
                  <p className="text-gray-400 mb-4">Check back soon for new content in {category.title}!</p>
                  {/* Debug info - remove this in production */}
                  <div className="mt-4 text-sm text-gray-500">
                    <p>Debug: Found {allPostsInCategory.length} total posts in category "{category.title}"</p>
                    <p>Posts without publishedAt date: {allPostsInCategory.filter((p: any) => !p.publishedAt).length}</p>
                    <p>Posts with future publishedAt date: {allPostsInCategory.filter((p: any) => p.publishedAt && new Date(p.publishedAt) > new Date()).length}</p>
                  </div>
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to all posts
                  </Link>
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