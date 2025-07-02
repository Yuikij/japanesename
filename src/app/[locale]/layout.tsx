import './globals.css'
import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing';
import LanguageSwitcher from '../../components/LanguageSwitcher'
import GoogleAnalytics from '../../components/GoogleAnalytics'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'zh') {
    return {
      metadataBase: new URL('https://japanesename.vercel.app'),
      title: 'AI日本名字生成器 | 个性化文化取名服务',
      description: '使用AI技术深度分析个性特质，结合日本文化传统，为您精心定制专属日本名字。基于个性问答的智能日本取名服务，获得真正适合您的日本名字。',
      keywords: ['日本名字生成器', 'AI取名', '日本文化', '个性化命名', '日本取名服务', '文化名字', '动漫名字', '传统日本名字'],
      authors: [{ name: '日本名字生成器团队' }],
      creator: '日本名字生成器',
      publisher: '日本名字生成器',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
      openGraph: {
        type: 'website',
        locale: 'zh_CN',
        alternateLocale: ['en_US'],
        title: 'AI日本名字生成器 - 个性化文化取名',
        description: '通过AI驱动的文化分析，发现您完美的日本名字。',
        siteName: '日本名字生成器',
        images: [
          {
            url: '/og-image-zh.jpg',
            width: 1200,
            height: 630,
            alt: '日本名字生成器 - AI驱动的文化取名服务',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'AI日本名字生成器 - 个性化文化取名',
        description: '通过AI驱动的文化分析和个性化取名，创造您完美的日本名字。',
        images: ['/twitter-image-zh.jpg'],
      },
      alternates: {
        canonical: `https://japanesename.vercel.app/${locale}`,
        languages: {
          'en': '/en',
          'zh': '/zh',
        },
      },
      category: '文化',
    }
  }
  
  // Default English metadata
  return {
    metadataBase: new URL('https://japanesename.vercel.app'),
    title: 'AI-Powered Japanese Name Generator | Personalized Cultural Names',
    description: 'Create your perfect Japanese name with our AI-powered generator. Deep personality analysis, cultural authenticity, and personalized naming based on Japanese traditions. Get your unique Japanese name today.',
    keywords: ['Japanese name generator', 'AI naming', 'Japanese culture', 'personalized names', 'Japanese naming service', 'cultural names', 'anime names', 'traditional Japanese names'],
    authors: [{ name: 'Japanese Name Generator Team' }],
    creator: 'Japanese Name Generator',
    publisher: 'Japanese Name Generator',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['zh_CN'],
      title: 'AI Japanese Name Generator - Personalized Cultural Names',
      description: 'Discover your perfect Japanese name with our AI-powered generator. Cultural authenticity meets personalization.',
      siteName: 'Japanese Name Generator',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Japanese Name Generator - AI-Powered Cultural Naming Service',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AI Japanese Name Generator - Personalized Cultural Names',
      description: 'Create your perfect Japanese name with AI-powered cultural analysis and personalized naming.',
      images: ['/twitter-image.jpg'],
      creator: '@japanesenames',
    },
    alternates: {
      canonical: `https://japanesename.vercel.app/${locale}`,
      languages: {
        'en': '/en',
        'zh': '/zh',
      },
    },
    category: 'Culture',
  }
}

// interface RootLayoutProps {
//   children: React.ReactNode
//   params: Promise<{ locale: string }>
// }




// export default async function RootLayout({
//   children,
//   params
// }: RootLayoutProps) {
//   // 获取参数
//   const { locale } = await params

//   // 验证语言参数
//   if (!locales.includes(locale as never)) {
//     notFound()
//   }

//   // 获取消息
//   const messages = await getMessages()

//   return (
//     <html lang={locale}>
//       <body>
//         <NextIntlClientProvider messages={messages}>
//           <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
//             <div className="absolute top-4 right-4 z-10">
//               <LanguageSwitcher />
//             </div>
//             {children}
//           </div>
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   )
// } 


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <GoogleAnalytics />
        <link rel="canonical" href={`https://japanesename.vercel.app/${locale}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ec4899" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": locale === 'zh' ? "日本名字生成器" : "Japanese Name Generator",
              "description": locale === 'zh' 
                ? "AI驱动的个性化日本名字定制服务，基于文化传统和个性分析。"
                : "AI-powered personalized Japanese name creation service based on cultural traditions and personality analysis.",
              "url": "https://japanesename.vercel.app",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web Browser",
              "inLanguage": locale === 'zh' ? "zh-CN" : "en-US",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": locale === 'zh' ? "日本名字生成器团队" : "Japanese Name Generator Team"
              }
            }),
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
          <div className="absolute top-4 right-4 z-10">
            <LanguageSwitcher />
          </div>
          {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

