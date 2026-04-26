import './globals.css'
import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing';
import Navigation from '../../components/Navigation'
import GoogleAnalytics from '../../components/GoogleAnalytics'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'zh') {
    return {
      metadataBase: new URL('https://japanesename.vercel.app'),
      title: '日本名字大全 | 500000+ 正宗日本名字含义与文化解读',
      description: '收录超过 500,000 个正宗日本名字，包含汉字含义、读音、文化背景。按分类浏览男名、女名、姓氏，了解每个名字背后的日本文化故事。',
      keywords: ['日本名字', '日本名字大全', '日本名字含义', '日本男名', '日本女名', '日本姓氏', '日本取名', '日本文化', '动漫名字', '日本名字汉字'],
      authors: [{ name: 'Japanese Name Dictionary' }],
      creator: 'Japanese Name Dictionary',
      publisher: 'Japanese Name Dictionary',
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
        title: '日本名字大全 — 含义、汉字与文化解读',
        description: '收录 500,000+ 正宗日本名字，按分类浏览男名、女名、姓氏，了解汉字含义与文化背景。',
        siteName: '日本名字大全',
        images: [
          {
            url: '/og-image-zh.jpg',
            width: 1200,
            height: 630,
            alt: '日本名字大全 — 正宗日本名字含义与文化解读',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: '日本名字大全 — 含义、汉字与文化解读',
        description: '收录 500,000+ 正宗日本名字，按分类浏览，了解汉字含义与文化背景。',
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
  
  return {
    metadataBase: new URL('https://japanesename.vercel.app'),
    title: 'Japanese Name Dictionary | 500,000+ Authentic Names with Meanings & Kanji',
    description: 'Browse over 500,000 authentic Japanese names with kanji meanings, readings, and cultural origins. Explore male names, female names, family names, and discover the stories behind each name.',
    keywords: ['Japanese names', 'Japanese name meanings', 'Japanese name dictionary', 'Japanese male names', 'Japanese female names', 'Japanese last names', 'kanji names', 'Japanese baby names', 'anime names', 'Japanese culture'],
    authors: [{ name: 'Japanese Name Dictionary' }],
    creator: 'Japanese Name Dictionary',
    publisher: 'Japanese Name Dictionary',
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
      title: 'Japanese Name Dictionary — Meanings, Kanji & Cultural Origins',
      description: 'Browse 500,000+ authentic Japanese names with kanji meanings, readings, and cultural origins.',
      siteName: 'Japanese Name Dictionary',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Japanese Name Dictionary — Authentic Names with Meanings & Kanji',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Japanese Name Dictionary — Meanings, Kanji & Cultural Origins',
      description: 'Browse 500,000+ authentic Japanese names with kanji meanings, readings, and cultural origins.',
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
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ec4899" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": locale === 'zh' ? "日本名字大全" : "Japanese Name Dictionary",
              "description": locale === 'zh' 
                ? "收录 500,000+ 正宗日本名字，包含汉字含义、读音、文化背景，按分类浏览男名、女名、姓氏。"
                : "Browse 500,000+ authentic Japanese names with kanji meanings, readings, and cultural origins across categories.",
              "url": "https://japanesename.vercel.app",
              "inLanguage": locale === 'zh' ? "zh-CN" : "en-US",
              "publisher": {
                "@type": "Organization",
                "name": "Japanese Name Dictionary"
              }
            }),
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
          <Navigation />
          {children}
        </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

