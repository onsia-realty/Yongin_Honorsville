import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://yongin-honorsville.vercel.app'
  
  const rssItems = [
    {
      title: '클러스터용인 경남아너스빌 - 반도체 프리미엄 직접 영향권',
      link: baseUrl,
      description: '동용인IC(예정)를 통해 삼성전자와 SK하이닉스 10분대 이동 가능. 서울~세종고속도로 더 가깝게, 삼성,SK하이닉스 10분대로 더 빠르게.',
      pubDate: new Date().toUTCString(),
    },
    {
      title: '사업개요 - 클러스터용인 경남아너스빌',
      link: `${baseUrl}/business`,
      description: '경기도 용인시 처인구 양지면 양지리 697번지 일원. 지하 2층 ~ 지상 최고 18층, 5개동, 총 420세대',
      pubDate: new Date().toUTCString(),
    },
    {
      title: '프리미엄 - 반도체 클러스터 중심',
      link: `${baseUrl}/premium`,
      description: '용인 반도체 클러스터의 중심에서 누리는 프리미엄 주거 환경',
      pubDate: new Date().toUTCString(),
    },
    {
      title: '단지안내 - 클러스터용인 경남아너스빌',
      link: `${baseUrl}/site-plan`,
      description: '자연과 조화를 이루는 아름다운 단지 설계와 최신 시스템',
      pubDate: new Date().toUTCString(),
    },
    {
      title: '평면안내 - 123㎡, 84A㎡, 84B㎡',
      link: `${baseUrl}/floor-plan`,
      description: '다양한 평면 구성으로 만나는 프리미엄 주거 공간',
      pubDate: new Date().toUTCString(),
    },
    {
      title: '분양일정 안내',
      link: `${baseUrl}/sales-schedule`,
      description: '클러스터용인 경남아너스빌 분양일정 및 청약 안내',
      pubDate: new Date().toUTCString(),
    },
    {
      title: 'E-모델하우스 오픈',
      link: `${baseUrl}/e-model-house`,
      description: '온라인으로 만나는 클러스터용인 경남아너스빌 모델하우스',
      pubDate: new Date().toUTCString(),
    },
  ]

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>클러스터용인 경남아너스빌</title>
    <link>${baseUrl}</link>
    <description>동용인IC(예정)를 통해 삼성전자와 SK하이닉스 10분대 이동 가능. 반도체 프리미엄 직접 영향권</description>
    <language>ko</language>
    <copyright>Copyright © 2025 온시아. All rights reserved.</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js</generator>
    <webMaster>noreply@yongin-honorsville.com (클러스터용인 경남아너스빌)</webMaster>
    <managingEditor>noreply@yongin-honorsville.com (클러스터용인 경남아너스빌)</managingEditor>
    ${rssItems.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <dc:creator>클러스터용인 경남아너스빌</dc:creator>
    </item>`).join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}