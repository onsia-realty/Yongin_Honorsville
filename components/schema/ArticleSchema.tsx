'use client';

interface ArticleSchemaProps {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  keywords: string[];
  imageUrl?: string;
  url: string;
}

export default function ArticleSchema({
  title,
  description,
  publishedAt,
  updatedAt,
  author = 'AI Reporter',
  keywords,
  imageUrl,
  url,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: imageUrl || 'https://yongin-honorsville.vercel.app/대표홈페이지 썸네일.jpg',
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://yongin-honorsville.vercel.app',
    },
    publisher: {
      '@type': 'Organization',
      name: '클러스터용인 경남아너스빌',
      url: 'https://yongin-honorsville.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yongin-honorsville.vercel.app/대표홈페이지 썸네일.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: keywords.join(', '),
    articleSection: 'Real Estate',
    about: {
      '@type': 'Thing',
      name: '클러스터용인 경남아너스빌',
      description: '용인 반도체 클러스터 프리미엄 아파트',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
