import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { KeywordRecord, NameRecord, FilterCondition, FullNameCombo } from '@/types/name-page'
import { generateCombos } from '@/lib/name-combos'
import { QUIZ_DATA } from '@/lib/quiz-data'
import RandomNameCombo from '@/components/RandomNameCombo'
import NameQuiz from '@/components/NameQuiz'
import ComboGridClient from '@/components/ComboGridClient'
import NameListExpanderClient from '@/components/NameListExpanderClient'
import keywordsData from '../../../../../新版本PSEO改造/keyword/keyword.json'

const API_BASE = 'https://japanesenamedata.yuisama.top'

interface PageKeyword {
  keyword: string
  path: string
  slug: string
  filter_rule?: { must: FilterCondition[]; should: FilterCondition[] } | null
  related_keywords?: KeywordRecord['related_keywords']
  seo?: KeywordRecord['seo'] | null
  seo_guidance?: string | null
}

function loadAllKeywords(): PageKeyword[] {
  try {
    const keywords: KeywordRecord[] = keywordsData as KeywordRecord[]
    return keywords
      .filter(k => k.strategy === 'category_page' && k.path)
      .map(k => ({
        keyword: k.keyword,
        path: k.path,
        slug: k.path.replace(/^\/names\//, ''),
        filter_rule: k.filter_rule as PageKeyword['filter_rule'],
        related_keywords: k.related_keywords,
        seo: k.seo,
        seo_guidance: k.seo_guidance,
      }))
  } catch {
    return []
  }
}

async function fetchNames(filterRule: { must: FilterCondition[]; should: FilterCondition[] }): Promise<NameRecord[]> {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    const secret = process.env.JAPANESE_NAME_API_SECRET
    if (secret) headers['X-API-Secret'] = secret

    const res = await fetch(`${API_BASE}/api/names/query`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ filter_rule: filterRule, limit: 500 }),
      next: { revalidate: 86400 },
    })
    if (!res.ok) return []
    const json = (await res.json()) as { data?: NameRecord[] }
    return json.data ?? []
  } catch {
    return []
  }
}

export async function generateStaticParams() {
  const keywords = loadAllKeywords()
  return keywords.map(k => ({ slug: k.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const keywords = loadAllKeywords()
  const kw = keywords.find(k => k.slug === slug)
  if (!kw) return {}

  const title = kw.seo?.title ?? `${capitalize(kw.keyword)} — Discover Authentic Names with Meanings`
  const description =
    kw.seo?.description ??
    `Explore ${capitalize(kw.keyword)} with detailed kanji breakdowns, meanings, and cultural context. Find the perfect name combination with our interactive quiz.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://japanesename.vercel.app/${locale}${kw.path}`,
      languages: { en: `/en${kw.path}`, zh: `/zh${kw.path}` },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      siteName: 'Japanese Name Generator',
    },
  }
}

function capitalize(s: string): string {
  return s.replace(/\b\w/g, c => c.toUpperCase())
}

function buildJsonLd(kw: PageKeyword, combos: FullNameCombo[], locale: string) {
  const faqs = buildFaqItems(kw, combos, locale)

  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: kw.seo?.title ?? capitalize(kw.keyword),
      description: kw.seo?.description ?? `Explore ${capitalize(kw.keyword)} with meanings and cultural context.`,
      url: `https://japanesename.vercel.app/${locale}${kw.path}`,
      inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Japanese Name Generator',
        url: 'https://japanesename.vercel.app',
      },
    },
  ]

  if (faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    })
  }

  return schemas
}

interface FaqItem { question: string; answer: string }

function buildFaqItems(kw: PageKeyword, combos: FullNameCombo[], locale: string): FaqItem[] {
  const kwName = capitalize(kw.keyword)
  const topCombos = combos.slice(0, 5).map(c => `${c.fullKanji} (${c.fullRomaji})`).join(', ')

  if (locale === 'zh') {
    return [
      {
        question: `有哪些受欢迎的${kwName}？`,
        answer: topCombos
          ? `以下是一些精选的${kwName}：${topCombos}。每个名字都有独特的汉字含义和文化背景。`
          : `我们收录了大量的${kwName}，每个都有详细的汉字解析和含义说明。`,
      },
      {
        question: `如何为角色或孩子选择合适的${kwName}？`,
        answer: `选择日本名字时，可以考虑汉字的含义、读音的韵律、以及名字传达的气质。使用我们的互动问答工具，根据你的偏好找到完美搭配。`,
      },
      {
        question: `${kwName}中的汉字有什么含义？`,
        answer: `日本名字中的每个汉字都有独特的含义。例如"翔"意为翱翔，"太"意为伟大。我们为每个名字提供了详细的汉字拆解和含义解析。`,
      },
    ]
  }

  return [
    {
      question: `What are some popular ${kwName}?`,
      answer: topCombos
        ? `Here are some curated ${kwName}: ${topCombos}. Each name carries unique kanji meanings and cultural significance.`
        : `We have a large collection of ${kwName}, each with detailed kanji analysis and meaning explanations.`,
    },
    {
      question: `How do I choose the right ${kw.keyword} for a character or baby?`,
      answer: `When choosing a Japanese name, consider the meaning of each kanji, the rhythm and flow of the pronunciation, and the overall vibe the name conveys. Use our interactive quiz to find a perfect match based on your preferences.`,
    },
    {
      question: `What do the kanji in ${kwName} mean?`,
      answer: `Each kanji in a Japanese name carries specific meanings. For example, 翔 (shō) means "soar" and 太 (ta) means "great." We provide detailed kanji breakdowns for every name in our collection.`,
    },
  ]
}

export default async function NameInnerPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const t = await getTranslations('namePage')

  const keywords = loadAllKeywords()
  const kw = keywords.find(k => k.slug === slug)
  if (!kw) notFound()

  const filterRule = kw.filter_rule ?? { must: [], should: [] }
  const names = await fetchNames(filterRule)
  const combos = generateCombos(names)
  const quiz = QUIZ_DATA[slug] ?? null

  const h1 = kw.seo?.h1 ?? capitalize(kw.keyword)
  const jsonLd = buildJsonLd(kw, combos, locale)
  const faqs = buildFaqItems(kw, combos, locale)

  const introText = locale === 'zh'
    ? `探索我们精心整理的 ${combos.length} 组日本名字。每个名字都包含汉字解析、含义说明和文化背景，帮助你找到最完美的名字搭配。`
    : `Discover ${combos.length} curated full-name combinations. Each name features detailed kanji breakdowns, meanings, and cultural context to help you find the perfect match.`

  return (
    <div className="min-h-screen">
      {/* JSON-LD */}
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero */}
      <section className="text-center pt-14 pb-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            {h1}
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            {introText}
          </p>
        </div>
      </section>

      {/* Random Name Combo */}
      {combos.length > 0 && (
        <RandomNameCombo combos={combos} locale={locale} />
      )}

      {/* Quiz */}
      {quiz && combos.length > 0 && (
        <NameQuiz quiz={quiz} combos={combos} locale={locale} />
      )}

      {/* Full Name Combo List */}
      <ComboListSection combos={combos} keyword={kw.keyword} locale={locale} />

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-12 px-4 bg-white/40">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              {locale === 'zh' ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Categories */}
      {kw.related_keywords && kw.related_keywords.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {t('relatedCategories.title')}
              </h2>
              <p className="text-gray-500">{t('relatedCategories.subtitle')}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {kw.related_keywords.map(rel => (
                <Link
                  key={rel.path}
                  href={`/${locale}${rel.path}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-pink-300 hover:text-pink-600 transition-all duration-200 shadow-sm hover:shadow"
                >
                  {rel.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function ComboListSection({
  combos,
  keyword,
  locale,
}: {
  combos: FullNameCombo[]
  keyword: string
  locale: string
}) {
  const INITIAL_SHOW = 48

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {locale === 'zh' ? `全部 ${capitalize(keyword)}` : `All ${capitalize(keyword)}`}
          </h2>
          <p className="text-gray-500">
            {locale === 'zh'
              ? `浏览 ${combos.length} 组精选全名组合`
              : `Browse ${combos.length} curated full-name combinations`}
          </p>
        </div>
        <ComboGridClient combos={combos.slice(0, INITIAL_SHOW)} locale={locale} />
        {combos.length > INITIAL_SHOW && (
          <NameListExpanderClient
            combos={combos}
            locale={locale}
            initialCount={INITIAL_SHOW}
          />
        )}
      </div>
    </section>
  )
}
