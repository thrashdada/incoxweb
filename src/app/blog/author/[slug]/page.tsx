import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { groq } from 'next-sanity'
import Link from 'next/link'
import { CalendarDays, Clock, User, ArrowLeft, ArrowRight, Mail, Globe } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { Footer } from '@/components/Footer'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await client.fetch(
    groq`*[_type == "author" && slug.current == $slug][0] {
      name,
      bio
    }`,
    { slug: params.slug }
  )

  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `${author.name} | IncExchange Blog`,
    description: `Read all posts by ${author.name} on IncExchange blog.`,
  }
}

const authorQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    name,
    image,
    bio,
    slug
  }
`

const postsQuery = groq`
  *[_type == "post" && publishedAt <= now() && author->slug.current == $slug] | order(publishedAt desc) {
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

const allAuthorsQuery = groq`
  *[_type == "author"] {
    name,
    image,
    slug
  }
`

export default async function AuthorPage({ params }: Props) {
  const author = await client.fetch(authorQuery, { slug: params.slug })
  const posts = await client.fetch(postsQuery, { slug: params.slug })
  const allAuthors = await client.fetch(allAuthorsQuery)

  if (!author) {
    notFound()
  }

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
              
              {/* Author Profile */}
              <div className="flex flex-col items-center">
                {author.image && (
                  <img
                    src={urlFor(author.image).width(120).height(120).url()}
                    alt={author.name}
                    className="w-30 h-30 rounded-full object-cover mb-6 shadow-lg"
                  />
                )}
                <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mb-4">
                  {author.name}
                </h1>
                {author.bio && (
                  <div className="max-w-2xl mx-auto text-lg text-gray-300 mb-4">
                    <PortableText value={author.bio} />
                  </div>
                )}
                <p className="text-gray-400">
                  {posts.length} {posts.length === 1 ? 'post' : 'posts'} by this author
                </p>
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
                {/* Author Info */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">About the Author</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    {author.image && (
                      <img
                        src={urlFor(author.image).width(50).height(50).url()}
                        alt={author.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-medium text-white">{author.name}</h4>
                      <p className="text-sm text-gray-400">{posts.length} posts</p>
                    </div>
                  </div>
                  {author.bio && (
                    <div className="prose prose-sm text-gray-300 prose-invert">
                      <PortableText value={author.bio} />
                    </div>
                  )}
                </div>

                {/* All Authors */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">All Authors</h3>
                  <div className="space-y-3">
                    {allAuthors.map((auth: any) => (
                      <Link
                        key={auth.slug.current}
                        href={`/blog/author/${auth.slug.current}`}
                        className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                          auth.slug.current === params.slug
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-800'
                        }`}
                      >
                        {auth.image && (
                          <img
                            src={urlFor(auth.image).width(40).height(40).url()}
                            alt={auth.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className={`font-medium ${
                            auth.slug.current === params.slug ? 'text-white' : 'text-gray-300'
                          }`}>
                            {auth.name}
                          </p>
                        </div>
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
                            {post.categories.slice(0, 2).map((category: any) => (
                              <Link
                                key={category.slug.current}
                                href={`/blog/category/${category.slug.current}`}
                                className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full hover:bg-blue-700 transition-colors"
                              >
                                {category.title}
                              </Link>
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
                  <h3 className="text-lg font-medium text-white mb-2">No posts by this author</h3>
                  <p className="text-gray-400 mb-4">Check back soon for new content from {author.name}!</p>
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