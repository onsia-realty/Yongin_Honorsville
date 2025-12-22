import React from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ArticleSchema from "@/components/schema/ArticleSchema"
import ShareButtons from "@/components/ShareButtons"
import { neon } from '@neondatabase/serverless';
import type { Metadata } from 'next'

// SQL 클라이언트를 함수 내부에서 초기화 (빌드 타임 에러 방지)
function getSql() {
  if (!process.env.BLOG_DATABASE_URL) {
    throw new Error('BLOG_DATABASE_URL environment variable is not set');
  }
  return neon(process.env.BLOG_DATABASE_URL);
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  keywords: string[];
  category: string;
  author: string;
  published_at: string;
  updated_at: string;
  views: number;
  seo_title: string;
  seo_description: string;
  featured_image: string | null;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const sql = getSql();
    const posts = await sql`
      SELECT
        id,
        title,
        slug,
        excerpt,
        content,
        keywords,
        category,
        author,
        published_at,
        updated_at,
        views,
        seo_title,
        seo_description,
        featured_image
      FROM blog_posts
      WHERE slug = ${slug} AND status = 'published'
      LIMIT 1
    `;

    if (posts.length === 0) return null;

    return posts[0] as BlogPost;
  } catch (error) {
    console.error('블로그 포스트 조회 실패:', error);
    return null;
  }
}

async function incrementViews(slug: string): Promise<void> {
  try {
    const sql = getSql();
    await sql`
      UPDATE blog_posts
      SET views = views + 1
      WHERE slug = ${slug}
    `;
  } catch (error) {
    console.error('조회수 증가 실패:', error);
  }
}

async function getRelatedPosts(currentSlug: string, keywords: string[]): Promise<BlogPost[]> {
  try {
    const sql = getSql();
    const posts = await sql`
      SELECT
        id,
        title,
        slug,
        excerpt,
        category,
        published_at,
        keywords
      FROM blog_posts
      WHERE slug != ${currentSlug}
        AND status = 'published'
        AND keywords && ${keywords}
      ORDER BY published_at DESC
      LIMIT 3
    `;
    return posts as BlogPost[];
  } catch (error) {
    console.error('관련 기사 조회 실패:', error);
    return [];
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: '페이지를 찾을 수 없습니다',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yongin-honorsville.vercel.app';

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    keywords: post.keywords.join(', '),
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      url: `${siteUrl}/press/${post.slug}`,
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [post.author],
      tags: post.keywords,
    },
    alternates: {
      canonical: `${siteUrl}/press/${post.slug}`,
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // 조회수 증가 (비동기로 실행)
  incrementViews(slug);

  // 관련 기사 조회
  const relatedPosts = await getRelatedPosts(slug, post.keywords);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yongin-honorsville.vercel.app';

  return (
    <div className="min-h-screen bg-white">
      {/* Schema.org Structured Data */}
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        publishedAt={post.published_at}
        updatedAt={post.updated_at}
        author={post.author}
        keywords={post.keywords}
        url={`${siteUrl}/press/${post.slug}`}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-20">
        {/* Article Header */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="text-sm mb-6">
              <ol className="flex items-center space-x-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    홈
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/press" className="hover:text-white transition-colors">
                    보도자료
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white">{post.category}</li>
              </ol>
            </nav>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium text-blue-400 bg-blue-900/30 rounded-full">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.published_at)}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.views.toLocaleString()}
              </span>
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="text-sm text-gray-300 bg-gray-800/50 px-3 py-1 rounded-full"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* HTML Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              lineHeight: '1.8',
              fontSize: '16px',
            }}
          />

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">이 기사 공유하기</h3>
            <ShareButtons title={post.title} excerpt={post.excerpt} />
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-gray-50 py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                관련 기사
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/press/${relatedPost.slug}`}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full mb-3">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                      {relatedPost.excerpt}
                    </p>
                    <span className="text-sm text-gray-500">
                      {formatDate(relatedPost.published_at)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              경남아너스빌 분양 상담
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              전문 상담원이 자세한 분양 정보를 안내해드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1668-5257"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                1668-5257
              </a>
              <Link
                href="/registration"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                관심고객 등록
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}
