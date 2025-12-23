import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import ViewportHeight from '@/components/ViewportHeight'
import QuickButtons from '@/components/QuickButtons'
import AnalyticsTracker from '@/components/analytics/AnalyticsTracker'

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
        url: 'https://yongin-honorsville.vercel.app/og-thumbnail.jpg',
        width: 1024,
        height: 506,
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
    images: ['https://yongin-honorsville.vercel.app/og-thumbnail.jpg'],
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
    google: 'Ee8phSWzCfb70fE-qjRN6MgSk__agI8-X0zmuZdO7H4',
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
        
        {/* 카카오톡 공유 이미지 (명시적 설정) */}
        <meta property="og:image" content="https://yongin-honorsville.vercel.app/og-thumbnail.jpg" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="506" />
        <meta property="og:image:type" content="image/jpeg" />

        {/* 네이버 사이트 인증 */}
        <meta name="naver-site-verification" content="21e431fabface3d904e1968338dd3fd66dd05ba3" />
        
        {/* 구글 사이트 인증 (선택사항) */}
        {/* <meta name="google-site-verification" content="인증코드" /> */}
        
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5QZXXSFT');
        ` }} />
        
        {/* Google Ads 태그 (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-454722610"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-454722610');
        ` }} />

        {/* 네이버 전환 추적 스크립트 (Naver Ads Pixel) */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var na = document.createElement('script');
            na.type = 'text/javascript';
            na.async = true;
            na.src = 'https://wcs.naver.net/wcslog.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(na, s);
          })();
        ` }} />
        <script dangerouslySetInnerHTML={{ __html: `
          if (!window.wcs_add) window.wcs_add = {};
          wcs_add["wa"] = "${process.env.NEXT_PUBLIC_NAVER_ADS_ID || 's_5b5e8f4e9c9a'}";
          if (typeof wcs != "undefined" && typeof wcs.inflow == "function") {
            wcs.inflow("cluster-honorsville.co.kr");
          }
          if (typeof wcs_do != "undefined") {
            wcs_do();
          }
        ` }} />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript dangerouslySetInnerHTML={{ __html: `
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5QZXXSFT"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>
        ` }} />
        {/* End Google Tag Manager (noscript) */}

        {/* ONSIA Tracker - 방문자 추적 */}
        <AnalyticsTracker
          config={{
            apiEndpoint: process.env.NEXT_PUBLIC_TRACKER_API || 'https://tracker-1jtn6j9qy-realtors77-7871s-projects.vercel.app/api/analytics',
            siteSlug: 'yongin-honorsville',
            trackClicks: true,
            trackScroll: true,
            trackMouse: true,
            debugMode: process.env.NODE_ENV === 'development',
          }}
        />

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