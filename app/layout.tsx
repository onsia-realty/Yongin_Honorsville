import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import ViewportHeight from '@/components/ViewportHeight'
import QuickButtons from '@/components/QuickButtons'

export const metadata: Metadata = {
  title: '클러스터용인 경남아너스빌 | 반도체 프리미엄 직접 영향권',
  description: '용인 반도체클러스터 중심, 삼성·SK 10분대 프리미엄아파트. 동용인IC 인접, 997세대 대단지',
  keywords: '클러스터용인, 경남아너스빌, 용인아파트, 반도체클러스터, SK하이닉스, 삼성전자, 용인분양, 용인신도시, 처인구아파트, 양지아파트',
  generator: 'Next.js',
  applicationName: '클러스터용인 경남아너스빌',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: '경남아너스빌' }],
  colorScheme: 'light',
  creator: '온시아',
  publisher: '온시아',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '클러스터용인 경남아너스빌 | 반도체 프리미엄 직접 영향권',
    description: '용인 반도체클러스터 중심, 삼성·SK 10분대 프리미엄아파트. 동용인IC 인접, 997세대 대단지',
    url: 'https://yongin-honorsville.vercel.app',
    siteName: '클러스터용인 경남아너스빌',
    images: [
      {
        url: 'https://yongin-honorsville.vercel.app/대표홈페이지 썸네일.jpg',
        width: 1200,
        height: 630,
        alt: '클러스터용인 경남아너스빌 - 반도체 프리미엄 직접 영향권',
        type: 'image/jpeg',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '클러스터용인 경남아너스빌 | 반도체 프리미엄 직접 영향권',
    description: '용인 반도체클러스터 중심, 삼성·SK 10분대 프리미엄아파트. 동용인IC 인접, 997세대 대단지',
    images: ['https://yongin-honorsville.vercel.app/대표홈페이지 썸네일.jpg'],
    creator: '@clusteryongin',
    site: '@clusteryongin',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    naver: '21e431fabface3d904e1968338dd3fd66dd05ba3',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 뷰포트 메타 태그 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        
        {/* 모바일 웹앱 설정 */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="클러스터용인" />
        
        {/* 전화번호 자동 감지 방지 (의도적인 전화 링크만 사용) */}
        <meta name="format-detection" content="telephone=no" />
        
        {/* 폰트 설정 */}
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily}, 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* iOS 바운스 스크롤 최적화 */
          body {
            width: 100%;
            height: 100%;
            overflow-x: hidden;
          }
          
          #__next {
            min-height: 100vh;
            -webkit-overflow-scrolling: touch;
          }
        `}</style>
        
        {/* 네이버 사이트 인증 */}
        <meta name="naver-site-verification" content="21e431fabface3d904e1968338dd3fd66dd05ba3" />
        
        {/* 구글 사이트 인증 (선택사항) */}
        {/* <meta name="google-site-verification" content="인증코드" /> */}
      </head>
      <body className="antialiased">
        <ViewportHeight />
        {children}
        <QuickButtons />
        
        {/* 카카오 SDK (선택사항) */}
        {/* <script src="https://developers.kakao.com/sdk/js/kakao.min.js" async /> */}
        
        {/* Smartlog */}
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
          var hpt_info={'_account':'UHPT-32957', '_server': 'a29'};
        ` }} />
        <script language="javascript" src="//cdn.smlog.co.kr/core/smart.js" charSet="utf-8"></script>
        <noscript><img src="//a29.smlog.co.kr/smart_bda.php?_account=32957" style={{display:'none',width:0,height:0}} border="0"/></noscript>
      </body>
    </html>
  )
}