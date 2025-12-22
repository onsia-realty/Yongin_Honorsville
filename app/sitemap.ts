import { MetadataRoute } from 'next'
import { neon } from '@neondatabase/serverless'

// SQL 클라이언트를 함수 내부에서 초기화
function getSql() {
  if (!process.env.BLOG_DATABASE_URL) {
    return null;
  }
  return neon(process.env.BLOG_DATABASE_URL);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yongin-honorsville.vercel.app'

  const routes = [
    '',
    '/business',
    '/directions',
    '/premium',
    '/location',
    '/site-plan',
    '/system',
    '/club-honors',
    '/floor-plan',
    '/interior',
    '/press',
    '/promotional-video',
    '/subscription-guide',
    '/sales-schedule',
    '/recruitment-notice',
    '/registration',
    '/e-model-house',
    '/e-model-house/virtual-tour',
    '/e-model-house/3d',
  ]

  // 정적 페이지
  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 블로그 포스트 동적 추가
  let blogPages: MetadataRoute.Sitemap = []

  try {
    const sql = getSql();
    if (sql) {
      const posts = await sql`
        SELECT slug, published_at, updated_at
        FROM blog_posts
        WHERE status = 'published'
        ORDER BY published_at DESC
      `;

      blogPages = posts.map((post: any) => ({
        url: `${baseUrl}/press/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at),
        changeFrequency: 'daily' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('블로그 포스트 sitemap 생성 실패:', error);
  }

  return [...staticPages, ...blogPages]
}