import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { groq } from 'next-sanity'
import Link from 'next/link'
import { CalendarDays, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { Footer } from '@/components/Footer'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      title,
      excerpt,
      mainImage,
      author->{name},
      publishedAt
    }`,
    { slug: params.slug }
  )

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | IncExchange Blog`,
    description: post.excerpt || `Read ${post.title} on IncExchange blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : [],
    },
  }
}

const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    body,
    author->{
      name,
      image,
      bio,
      slug
    },
    categories[]->{
      title,
      slug
    },
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
  }
`

const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug && publishedAt <= now()] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    author->{name},
    categories[]->{title}
  }
`

export default async function BlogPost({ params }: Props) {
  const post = await client.fetch(postQuery, { slug: params.slug })
  const relatedPosts = await client.fetch(relatedPostsQuery, { slug: params.slug })

  if (!post) {
    notFound()
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `${post.title} - IncExchange Blog`

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Back to Blog */}
        <div className="border-b border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <header className="mb-8">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category: any) => (
                  <Link
                    key={category.slug.current}
                    href={`/blog/category/${category.slug.current}`}
                    className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
              <div className="flex items-center space-x-6">
                {post.author && (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <Link
                      href={`/blog/author/${post.author.slug.current}`}
                      className="hover:text-blue-400 transition-colors"
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
                      month: 'long',
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

              {/* Share */}
              <div className="flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span className="text-xs">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.mainImage && (
            <div className="mb-8">
              <img
                src={urlFor(post.mainImage).width(1200).height(600).url()}
                alt={post.mainImage.alt || post.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12 prose-invert">
            <PortableText value={post.body} />
          </div>

          {/* Author Bio */}
          {post.author && (
            <div className="border-t border-gray-800 pt-8 mb-12">
              <div className="flex items-start space-x-4">
                {post.author.image && (
                  <img
                    src={urlFor(post.author.image).width(80).height(80).url()}
                    alt={post.author.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    About {post.author.name}
                  </h3>
                  {post.author.bio && (
                    <div className="prose prose-sm text-gray-300 prose-invert">
                      <PortableText value={post.author.bio} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-gray-800 pt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost: any) => (
                  <article key={relatedPost._id} className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-shadow">
                    {relatedPost.mainImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={urlFor(relatedPost.mainImage).width(400).height(250).url()}
                          alt={relatedPost.mainImage.alt || relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-2 line-clamp-2">
                        <Link href={`/blog/${relatedPost.slug.current}`} className="hover:text-blue-400 transition-colors">
                          {relatedPost.title}
                        </Link>
                      </h3>
                      {relatedPost.excerpt && (
                        <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{relatedPost.author?.name}</span>
                        <span>
                          {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
      <Footer />
    </>
  )
} 