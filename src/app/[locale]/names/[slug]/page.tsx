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
      .filter(k => k.strategy === 'category_page' && k.status === 'active' && k.path)
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

async function fetchNamesByPart(
  filterRule: { must: FilterCondition[]; should: FilterCondition[] },
  namePart: string,
  limit: number
): Promise<NameRecord[]> {
  const secret = process.env.JAPANESE_NAME_API_SECRET || 'CHANGE_ME'
  const partFilter: FilterCondition = { field: 'name_part', op: 'eq', value: namePart }
  const rule = {
    must: [...filterRule.must, partFilter],
    should: filterRule.should,
  }

  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (secret) headers['X-API-Secret'] = secret

    const res = await fetch(`${API_BASE}/api/names/query`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ filter_rule: rule, limit }),
      next: { revalidate: 86400 },
    })
    if (!res.ok) return []
    const json = (await res.json()) as { data?: NameRecord[] }
    return json.data ?? []
  } catch {
    return []
  }
}

async function fetchNames(filterRule: { must: FilterCondition[]; should: FilterCondition[] }): Promise<NameRecord[]> {
  const [givenNames, familyNames] = await Promise.all([
    fetchNamesByPart(filterRule, 'given_name', 300),
    fetchNamesByPart(filterRule, 'family_name', 300),
  ])

  if (familyNames.length > 0) return [...givenNames, ...familyNames]

  const fallbackFamilyRule = {
    must: [
      { field: 'popularity', op: 'any_of', value: ['very_common', 'common', 'uncommon'] },
    ],
    should: [],
  }
  const fallbackFamilyNames = await fetchNamesByPart(fallbackFamilyRule, 'family_name', 300)

  return [...givenNames, ...fallbackFamilyNames]
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

function buildIntroText(kw: PageKeyword, combos: FullNameCombo[], locale: string): string {
  if (kw.slug === 'last-names') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组以日本姓氏为核心整理的名字组合，快速比较常见、稀有、自然系、优雅系等不同姓氏气质，并查看对应汉字、读音与文化说明。`
      : `Browse ${combos.length} curated name combinations built around Japanese surnames so you can compare common, rare, elegant, and nature-rooted last-name styles with kanji meanings and readings.`
  }

  if (kw.slug === 'last-names-with-meanings') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组带详细含义说明的日本姓氏组合，快速比较山川田野、聚落地景、自然意象与更有辨识度的 surname meaning 路线，并直接查看汉字、读音与整套全名气质。`
      : `Browse ${combos.length} Japanese surname combinations with detailed meanings, and compare landscape-rooted, settlement-based, nature-leaning, and more distinctive surname-meaning styles with kanji readings and full-name tone.`
  }


  if (kw.slug === 'last-names-female') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组偏柔和、优雅、顺口路线的日本女孩向姓氏组合，快速比较自然清新、地景轻盈、精致耐看与更有女性友好感的 surname 风格，并直接查看汉字、读音与整套全名气质。`
      : `Browse ${combos.length} Japanese girl-leaning surname combinations and compare soft, scenic, polished, and feminine-friendly last-name styles with kanji readings, meanings, and full-name tone.`
  }

  if (kw.slug === 'last-names-male') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组偏现代、稳重、利落路线的日本男性向姓氏组合，快速比较可靠耐用、轮廓更硬朗、以及更有当代角色感的 surname 风格，并直接查看汉字、读音与整套全名气质。`
      : `Browse ${combos.length} modern male-leaning Japanese surname combinations and compare dependable, sharper, sturdier, and more contemporary last-name styles with kanji readings, meanings, and full-name tone.`
  }

  if (kw.slug === 'last-names-unique') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组少见、神秘、带记忆点的日本姓氏组合，快速比较更安静冷感、更有家系感、以及更适合角色命名的 rare surname 路线，并直接查看汉字、读音与整套全名气质。`
      : `Browse ${combos.length} rare Japanese surname combinations and compare quieter mysterious, lineage-rich, and more character-forward last-name styles with kanji readings, meanings, and full-name tone.`
  }

  if (kw.slug === 'last-names-cool') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组偏冷感、利落、有轮廓感的日本姓氏组合，快速比较更干净克制、更锋利现代、或更具电影感与记忆点的 cool surname 路线，并直接查看汉字、读音与整套全名气质。`
      : `Browse ${combos.length} cool-leaning Japanese surname combinations and compare cleaner, sharper, more modern, and more cinematic last-name styles with kanji readings, meanings, and full-name tone.`
  }

  if (kw.slug === 'last') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组日本姓氏组合，快速比较现实常见、地景来源、自然意象与更有辨识度的 family name 路线，并直接查看汉字、读音与整套全名气质。`
      : `Browse ${combos.length} Japanese surname combinations and compare familiar, landscape-rooted, nature-leaning, and more distinctive family-name styles with kanji readings, meanings, and full-name tone.`
  }

  if (kw.slug === 'all') {
    return locale === 'zh'
      ? `从 ${combos.length} 组精选日本名字组合开始，横向比较男性名、女性名、偏中性名字与姓氏风格，快速找到最适合角色、宝宝或灵感采样的方向。`
      : `Start with ${combos.length} curated Japanese name combinations and compare male, female, unisex, and surname-led styles in one place for characters, baby names, or creative inspiration.`
  }

  if (kw.slug === 'popular') {
    return locale === 'zh'
      ? `查看 ${combos.length} 组热门日本名字组合，快速比较大众接受度高、读音顺口、经典耐看或更有当代感的常用名字，并直接对照汉字、读音与整体气质。`
      : `Explore ${combos.length} popular Japanese name combinations and compare familiar, easy-to-love, timeless, and modern mainstream styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'common') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组常见日本名字组合，快速比较现实里高频、顺口、接受度高的名字路线；无论你更偏熟悉男孩名、女孩名还是常见姓氏，都可以直接对照汉字、读音与整体气质。`
      : `Browse ${combos.length} common Japanese name combinations and compare familiar, high-acceptance, easy-to-use naming styles across boy names, girl names, and common surnames with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'common-first') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组常见日本 first name 组合，快速比较熟悉顺口、明亮开阔、经典耐用与更轻盈现代几条常用 given name 路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} common Japanese first-name combinations and compare familiar easy-to-use, bright open, classic durable, and lighter modern given-name styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'common-girl') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组常见日本女孩名字组合，快速比较高接受度、读音自然、经典常用与现代日常感兼具的名字，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} common Japanese girl-name combinations and compare familiar, easy-to-use, classic, and modern everyday styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'common-male') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组常见日本男孩名字组合，快速比较稳重可靠、明亮顺耳、经典正统与更利落有精神的常用男孩名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} common Japanese male-name combinations and compare dependable, bright, classic, and slightly sharper mainstream boy-name styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'common-female') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组常见日本女性名字组合，快速比较温柔亲切、明亮顺耳、经典耐看与更精致清爽的常用女孩名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} common Japanese female-name combinations and compare gentle, bright, classic, and more polished mainstream girl-name styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'cute-male') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组可爱风日本男孩名字组合，快速比较柔软明亮、轻快俏皮、温柔安定与更精致顺口几条 cute male 路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} cute Japanese male-name combinations and compare soft sunny, playful lively, gentle comforting, and more polished cute-boy styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'male-meanings') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组带详细含义的日本男性名字组合，快速比较稳重、明亮、文雅与更有力量感的不同字义路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} Japanese male-name combinations with detailed meanings, and compare steady, bright, refined, and stronger kanji directions with readings and overall tone.`
  }

  if (kw.slug === 'unisex') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组日本中性名字组合，快速比较柔和自然、清冷利落、明亮开阔与经典耐用几条 gender-neutral 路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} Japanese unisex name combinations and compare soft, cool, open, and timeless gender-neutral styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'gender-neutral') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组偏 gender-neutral 气质的日本名字组合，快速比较柔和自然、平衡克制、轻亮开阔与更清冷利落的中性路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} gender-neutral Japanese name combinations and compare soft, balanced, open, and cooler unisex styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'anime') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组偏 anime / game character 气质的日本名字组合，快速比较冷感战斗系、神秘画面系、顺耳好记型与更有设定感的角色名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} Japanese name combinations with anime and game-character energy, and compare cool battle-ready, mysterious, memorable, and more character-driven styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'fierce-historical') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组偏 samurai / 武家气质的日本名字组合，快速比较战斗感强、门第端正、冷静克制与更像历史人物本名的路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} samurai-style Japanese name combinations and compare battle-ready, noble-house, restrained, and historically believable full-name styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'male-anime') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组男性 anime 风日本名字组合，快速比较冷感战斗系、热血主角系、安静神秘型与更有强设定感的男角色路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} male anime-style Japanese name combinations and compare cool, heroic, mysterious, and high-impact boy-character styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'female-anime') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组女性 anime 风日本名字组合，快速比较明亮好看、神秘梦幻、可爱角色系与更像主角名的路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} female anime-style Japanese name combinations and compare bright, mysterious, cute, and heroine-like character styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'female-meanings') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组带详细含义的日本女孩名字组合，快速比较温柔、明亮、优雅、现代等不同字义路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} Japanese girl-name combinations with detailed meanings, and compare gentle, bright, elegant, and modern kanji directions with readings and overall tone.`
  }

  if (kw.slug === 'popular-girl') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组热门日本女孩名字组合，快速比较高接受度、明亮顺口、经典受欢迎或更有当代感的女孩名，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} popular Japanese girl-name combinations and compare widely loved, bright, classic, and modern-favorite styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'popular-female') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组热门日本女性名字组合，快速比较高接受度、柔和好看、优雅耐看或更有现代感的女性名字，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} popular Japanese female-name combinations and compare widely loved, soft, elegant, and more modern-favorite female styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'popular-boy') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组热门日本男孩名字组合，快速比较经典稳重、明亮顺口、长期耐用或更偏当代感的男孩名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} popular Japanese boy-name combinations and compare classic, bright, dependable, and modern-favorite male styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'powerful-girl') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组强势日本女孩名字组合，快速比较锋利战斗系、尊贵压场系、明亮推进系与更安静克制的强大女性路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} powerful Japanese girl-name combinations and compare fierce battle-ready, noble commanding, bright forceful, and quieter controlled female-power styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'popular-male') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组热门日本男性名字组合，快速比较经典稳重、明亮顺口、长期耐用或更偏当代感的男性名字路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} popular Japanese male-name combinations and compare classic, bright, dependable, and modern-favorite male styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'rare-girl') {
    return locale === 'zh'
      ?         `浏览 ${combos.length} 组稀有日本女孩名字组合，快速比较安静神秘、优雅少见、带微光感与更有强记忆点的女孩名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} rare Japanese girl-name combinations and compare quiet mysterious, elegant uncommon, luminous, and more striking styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'unique-female') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组独特日本女性名字组合，快速比较安静神秘、纤细少见、锋利有记忆点与更有角色存在感的女性名字路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} unique Japanese female-name combinations and compare quiet mysterious, delicate uncommon, sharp memorable, and more high-presence female styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'unique-male') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组独特日本男性名字组合，快速比较锋利克制、安静神秘、稳重少见与更有强辨识度的男性名字路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} unique Japanese male-name combinations and compare sharp restrained, quietly mysterious, grounded uncommon, and more high-recall male styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'unique-girl') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组独特日本女孩名字组合，快速比较少见、神秘、纤细优雅或更有锋利记忆点的女孩名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} unique Japanese girl-name combinations and compare rare, mysterious, delicate, and striking styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'unique-boy') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组独特日本男孩名字组合，快速比较冷感锋利、安静神秘、自然少见或更有强烈记忆点的男孩名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} unique Japanese boy-name combinations and compare sharp, mysterious, grounded, and strikingly rare styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'uncommon') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组 uncommon japanese names 组合，快速比较安静少见、优雅耐看、神秘有气氛与更有记忆点的名字路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} uncommon Japanese name combinations and compare quietly rare, elegant, atmospheric, and more memorable styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'rare') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组 rare japanese names 组合，快速比较安静神秘、优雅疏离、带微光的柔和感与更强记忆点几条少见路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} rare Japanese name combinations and compare quiet mysterious, elegant distant, softly luminous, and more striking low-frequency styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'unique') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组 unique japanese names 组合，快速比较锋利冷感、安静而特别、带微光幻想感与强记忆点几条独特路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} unique Japanese name combinations and compare sharp cool, quietly unusual, softly luminous, and highly memorable styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'pretty') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组 pretty japanese names 组合，快速比较优雅精致、柔和温润、明亮有记忆点与安静轻盈几种漂亮路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} pretty Japanese name combinations and compare graceful polished, soft gentle, luminous memorable, and calm airy styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'elegant') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组 elegant japanese names 组合，快速比较安静端正、古典精致、明亮修整与自然留白几条优雅路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} elegant Japanese name combinations and compare poised serene, classical refined, polished luminous, and airy natural styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'cool') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组偏冷感、利落、带锋芒与记忆点的日本名字组合，快速比较安静神秘、现代高能、电影感冷调与更有压迫感的“酷名字”路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} cool Japanese name combinations and compare sharp, mysterious, cinematic, and high-energy styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'cool-male') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组酷感日本男孩名字组合，快速比较冷感锋利、安静压场、现代利落与更有角色记忆点的男孩名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} cool Japanese boy-name combinations and compare sharp, controlled, modern, and character-rich male styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'dark') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组暗黑系日本名字组合，快速比较暗影神秘、锋利危险、月色冷美与更有角色电影感的 dark name 路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} dark Japanese name combinations and compare shadowy, fierce, moonlit, and more cinematic dark-name styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'cool-female') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组酷感日本女孩名字组合，快速比较冷感利落、静谧神秘、现代有锋芒与更优雅压场的女孩名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} cool Japanese girl-name combinations and compare sharp, mysterious, modern, and elegantly high-presence female styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'cute') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组可爱日本名字组合，快速比较甜软亲和、轻快灵动、精致秀气与明亮闪闪几种不同可爱路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} cute Japanese name combinations and compare sweet, playful, delicate, and bright styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'pretty-female') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组漂亮日本女孩名字组合，快速比较优雅精致、温柔柔和、梦幻微神秘与更明亮有记忆点的女孩名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} pretty Japanese girl-name combinations and compare graceful, gentle, dreamy, and bright styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'beautiful-female') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组偏优雅、静美、耐看路线的日本女孩名字组合，快速比较柔和花感、月色静美、精致有完成度与更轻盈现代的 beautiful girl name 方向，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} beautiful Japanese girl-name combinations and compare graceful, serene, floral, moonlit, and more polished full-name styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'cute-female') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组可爱日本女孩名字组合，快速比较软萌贴近、甜感花朵、明亮活泼与精致秀气几种女孩名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} cute Japanese girl-name combinations and compare soft, sweet, bright, and delicate styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'cute-boy') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组可爱日本男孩名字组合，快速比较软萌温柔、阳光开朗、淘气机灵与自然清新的男孩名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} cute Japanese boy-name combinations and compare soft, cheerful, playful, and fresh styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'baby') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组适合宝宝使用的日本名字组合，快速比较温柔顺口、明亮讨喜、轻盈现代与长期耐用的命名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} Japanese baby-name combinations and compare gentle, bright, modern, and long-term-usable styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'baby-boy') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组日本男宝宝名字组合，快速比较温柔顺口、明亮有朝气、经典耐用与更现代清爽的男孩名路线，并直接查看汉字、读音与整套全名气质。`
      : `Browse ${combos.length} Japanese baby boy name combinations and compare soft, bright, classic, and cleaner modern boy-name styles with kanji, romaji, and full-name tone.`
  }

  if (kw.slug === 'first') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组以日本 first name 为中心整理的名字组合，快速比较更自然日常、明亮有记忆点、经典正统或更现代轻盈的“名”路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} Japanese first-name combinations and compare natural everyday, bright memorable, classic personal-name, and lighter modern given-name styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'given') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组日本 given name 组合，快速比较自然顺口、明亮有记忆点、经典稳妥与更轻盈现代几条 personal-name 路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} Japanese given-name combinations and compare natural, bright, classic, and lighter modern personal-name styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'middle') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组可作为 japanese middle names 参考的 given name 组合，快速比较更顺口百搭、轻盈有记忆点、经典耐看或更有画面感的中段命名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} given-name combinations that work well as Japanese middle-name inspiration, and compare smooth versatile, lightly distinctive, classic durable, and more image-rich naming directions with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'long') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组 long japanese names 组合，快速比较更有展开感、更古典正式、更有风景层次或更像角色全名的长音节路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} long Japanese name combinations and compare more expansive, classical, scenic, and character-rich multi-syllable styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'short') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组 short japanese names 组合，快速比较更短促利落、更轻快明亮、更极简耐看或更像昵称式记忆点强的短音节路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} short Japanese name combinations and compare clipped, bright, minimal, and nickname-like short-syllable styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'nicknames') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组带日系昵称感的名字组合，快速比较更可爱亲近、更短促好记、更适合日常呼叫或更像角色昵称的小名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} Japanese nickname-style name combinations and compare cute, crisp, everyday-usable, and character-friendly nickname directions with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'light') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组 light japanese names 组合，快速比较更偏阳光开阔、更像星光发亮、更柔和通透或更有画面感的明亮系路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} light Japanese name combinations and compare sunlit, star-bright, soft luminous, and more image-rich naming directions with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'that-mean-death') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组带死亡意象的日本名字组合，快速比较更偏阴影诡秘、冷感哀美、危险锋利或更有剧情张力的 dark-name 路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} Japanese name combinations linked to death symbolism, and compare eerie, mournful, dangerous, and more story-heavy dark-name directions with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'pet') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组适合宠物使用的日系名字组合，快速比较可爱亲近、清爽顺口、自然柔和与更有记忆点的 pet name 路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} Japanese pet-name combinations and compare cute, clean, nature-leaning, and more memorable pet-friendly naming styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'names') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组适合做日文全名灵感采样的名字组合，快速比较自然日常、明亮顺口、经典正统与现代轻盈几种路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} Japanese full-name combinations for naming inspiration, and compare natural everyday, bright memorable, classic, and lighter modern styles with kanji meanings, readings, and overall tone.`
  }

  return locale === 'zh'
    ? `探索我们精心整理的 ${combos.length} 组日本名字。每个名字都包含汉字解析、含义说明和文化背景，帮助你找到最完美的名字搭配。`
    : `Discover ${combos.length} curated full-name combinations. Each name features detailed kanji breakdowns, meanings, and cultural context to help you find the perfect match.`
}

function buildSectionHeading(kw: PageKeyword, combos: FullNameCombo[], locale: string): { title: string; subtitle: string } {
  if (kw.slug === 'last-names') {
    return locale === 'zh'
      ? {
          title: '姓氏优先的名字组合',
          subtitle: '按日本姓氏风格浏览精选搭配与整体节奏感',
        }
      : {
          title: 'Surname-led Name Combinations',
          subtitle: 'Browse curated combinations organized around Japanese last-name styles',
        }
  }

  if (kw.slug === 'last-names-with-meanings') {
    return locale === 'zh'
      ? {
          title: '日本姓氏含义精选',
          subtitle: `浏览 ${combos.length} 组更适合拿来理解 surname meanings 的日本姓氏组合`,
        }
      : {
          title: 'Japanese Surname Meaning Picks',
          subtitle: `Browse ${combos.length} Japanese surname combinations chosen for clear, useful surname-meaning comparison`,
        }
  }

  if (kw.slug === 'all') {
    return locale === 'zh'
      ? {
          title: '日本名字精选总览',
          subtitle: `浏览 ${combos.length} 组跨风格精选组合`,
        }
      : {
          title: 'Japanese Name Collection',
          subtitle: `Browse ${combos.length} curated combinations across styles`,
        }
  }

  if (kw.slug === 'popular') {
    return locale === 'zh'
      ? {
          title: '热门日本名字精选',
          subtitle: `浏览 ${combos.length} 组高接受度、常用且顺口的组合`,
        }
      : {
          title: 'Popular Japanese Name Picks',
          subtitle: `Browse ${combos.length} widely loved, mainstream, and easy-to-use combinations`,
        }
  }

  if (kw.slug === 'common') {
    return locale === 'zh'
      ? {
          title: '常见日本名字精选',
          subtitle: `浏览 ${combos.length} 组熟悉、自然、现实里高频出现的常见名字组合`,
        }
      : {
          title: 'Common Japanese Name Picks',
          subtitle: `Browse ${combos.length} familiar, natural-sounding, and widely used Japanese name combinations`,
        }
  }

  if (kw.slug === 'common-first') {
    return locale === 'zh'
      ? {
          title: '常见日本 first name 精选',
          subtitle: `浏览 ${combos.length} 组熟悉、顺口、现实里高接受度的常见 given name 组合`,
        }
      : {
          title: 'Common Japanese First Name Picks',
          subtitle: `Browse ${combos.length} familiar, easy-to-use, and high-acceptance common Japanese first-name combinations`,
        }
  }

  if (kw.slug === 'common-girl') {
    return locale === 'zh'
      ? {
          title: '常见日本女孩名字精选',
          subtitle: `浏览 ${combos.length} 组熟悉、自然、耐看的常用女孩名组合`,
        }
      : {
          title: 'Common Japanese Girl Name Picks',
          subtitle: `Browse ${combos.length} familiar, broadly liked, and natural-sounding girl-name combinations`,
        }
  }

  if (kw.slug === 'common-boy') {
    return locale === 'zh'
      ? {
          title: '常见日本男孩名字精选',
          subtitle: `浏览 ${combos.length} 组稳重、顺口、现实里很好用的常用男孩名组合`,
        }
      : {
          title: 'Common Japanese Boy Name Picks',
          subtitle: `Browse ${combos.length} steady, familiar, and easy-to-use common boy-name combinations`,
        }
  }

  if (kw.slug === 'common-male') {
    return locale === 'zh'
      ? {
          title: '常见日本男性名字精选',
          subtitle: `浏览 ${combos.length} 组熟悉、稳妥、顺口又有长期实用性的常见男性名字组合`,
        }
      : {
          title: 'Common Japanese Male Name Picks',
          subtitle: `Browse ${combos.length} familiar, dependable, and easy-to-use common male-name combinations`,
        }
  }

  if (kw.slug === 'common-female') {
    return locale === 'zh'
      ? {
          title: '常见日本女性名字精选',
          subtitle: `浏览 ${combos.length} 组温柔、顺口、耐看又适合长期使用的常见女性名字组合`,
        }
      : {
          title: 'Common Japanese Female Name Picks',
          subtitle: `Browse ${combos.length} gentle, familiar, and easy-to-use common female-name combinations`,
        }
  }

  if (kw.slug === 'cute-male') {
    return locale === 'zh'
      ? {
          title: '可爱风日本男孩名字精选',
          subtitle: `浏览 ${combos.length} 组柔软、顺耳、俏皮又不失男孩名骨架的 cute male 名字组合`,
        }
      : {
          title: 'Cute Japanese Male Name Picks',
          subtitle: `Browse ${combos.length} soft, playful, and believable cute male-name combinations`,
        }
  }

  if (kw.slug === 'male-meanings') {
    return locale === 'zh'
      ? {
          title: '日本男性名字含义精选',
          subtitle: `浏览 ${combos.length} 组更聚焦字义、读音与现实使用感的男性名字组合`,
        }
      : {
          title: 'Japanese Male Names and Meanings Picks',
          subtitle: `Browse ${combos.length} male-name combinations focused on kanji sense, sound, and real-world usability`,
        }
  }

  if (kw.slug === 'unisex') {
    return locale === 'zh'
      ? {
          title: '日本中性名字精选',
          subtitle: `浏览 ${combos.length} 组柔和、清冷、开阔又平衡的中性名字组合`,
        }
      : {
          title: 'Japanese Unisex Name Picks',
          subtitle: `Browse ${combos.length} soft, cool, open, and balanced unisex Japanese name combinations`,
        }
  }

  if (kw.slug === 'gender-neutral') {
    return locale === 'zh'
      ? {
          title: 'Gender-Neutral 日本名字精选',
          subtitle: `浏览 ${combos.length} 组更平衡、柔和、开阔又不失辨识度的中性名字组合`,
        }
      : {
          title: 'Gender-Neutral Japanese Name Picks',
          subtitle: `Browse ${combos.length} balanced, soft, open, and quietly distinctive gender-neutral Japanese name combinations`,
        }
  }

  if (kw.slug === 'anime') {
    return locale === 'zh'
      ? {
          title: 'Anime 风日本名字精选',
          subtitle: `浏览 ${combos.length} 组更有角色感、画面感与设定感的名字组合`,
        }
      : {
          title: 'Japanese Anime Name Picks',
          subtitle: `Browse ${combos.length} character-like, atmospheric, and visually memorable name combinations`,
        }
  }

  if (kw.slug === 'fierce-historical') {
    return locale === 'zh'
      ? {
          title: 'Samurai 风日本名字精选',
          subtitle: `浏览 ${combos.length} 组更像武家、旧时代人物与战记角色的名字组合`,
        }
      : {
          title: 'Samurai-Style Japanese Name Picks',
          subtitle: `Browse ${combos.length} historical, warrior-leaning, and noble-house Japanese name combinations`,
        }
  }

  if (kw.slug === 'male-anime') {
    return locale === 'zh'
      ? {
          title: '男性 Anime 风日本名字精选',
          subtitle: `浏览 ${combos.length} 组冷感、热血、神秘又有角色感的男孩名组合`,
        }
      : {
          title: 'Male Anime Name Picks',
          subtitle: `Browse ${combos.length} cool, heroic, mysterious, and character-rich male anime-name combinations`,
        }
  }

  if (kw.slug === 'female-anime') {
    return locale === 'zh'
      ? {
          title: '女性 Anime 风日本名字精选',
          subtitle: `浏览 ${combos.length} 组漂亮、神秘、可爱又有角色感的女孩名组合`,
        }
      : {
          title: 'Female Anime Name Picks',
          subtitle: `Browse ${combos.length} pretty, mysterious, cute, and character-rich female anime-name combinations`,
        }
  }

  if (kw.slug === 'female-meanings') {
    return locale === 'zh'
      ? {
          title: '日本女孩名字含义精选',
          subtitle: `浏览 ${combos.length} 组更聚焦字义、读音与现实使用感的女孩名组合`,
        }
      : {
          title: 'Japanese Girl Names and Meanings Picks',
          subtitle: `Browse ${combos.length} girl-name combinations focused on kanji sense, sound, and real-world usability`,
        }
  }

  if (kw.slug === 'popular-girl') {
    return locale === 'zh'
      ? {
          title: '热门日本女孩名字精选',
          subtitle: `浏览 ${combos.length} 组高接受度、顺口又耐看的女孩名组合`,
        }
      : {
          title: 'Popular Japanese Girl Name Picks',
          subtitle: `Browse ${combos.length} widely loved, easy-to-like, and polished girl-name combinations`,
        }
  }

  if (kw.slug === 'popular-female') {
    return locale === 'zh'
      ? {
          title: '热门日本女性名字精选',
          subtitle: `浏览 ${combos.length} 组柔和、顺口、优雅又有当代感的热门女性名字组合`,
        }
      : {
          title: 'Popular Japanese Female Name Picks',
          subtitle: `Browse ${combos.length} soft, polished, and modern-favorite popular female-name combinations`,
        }
  }

  if (kw.slug === 'popular-boy') {
    return locale === 'zh'
      ? {
          title: '热门日本男孩名字精选',
          subtitle: `浏览 ${combos.length} 组经典、顺口、耐用又有好感度的男孩名组合`,
        }
      : {
          title: 'Popular Japanese Boy Name Picks',
          subtitle: `Browse ${combos.length} trusted, easy-to-like, and polished popular boy-name combinations`,
        }
  }

  if (kw.slug === 'powerful-girl') {
    return locale === 'zh'
      ? {
          title: '强势日本女孩名字精选',
          subtitle: `浏览 ${combos.length} 组锋利、尊贵、强大又有角色感的女孩名组合`,
        }
      : {
          title: 'Powerful Japanese Girl Name Picks',
          subtitle: `Browse ${combos.length} fierce, commanding, and memorable powerful girl-name combinations`,
        }
  }

  if (kw.slug === 'popular-male') {
    return locale === 'zh'
      ? {
          title: '热门日本男性名字精选',
          subtitle: `浏览 ${combos.length} 组经典、顺口、耐用又有好感度的男性名字组合`,
        }
      : {
          title: 'Popular Japanese Male Name Picks',
          subtitle: `Browse ${combos.length} trusted, easy-to-like, and polished popular male-name combinations`,
        }
  }

  if (kw.slug === 'rare-girl') {
    return locale === 'zh'
      ? {
          title: '稀有日本女孩名字精选',
          subtitle:             `浏览 ${combos.length} 组少见、优雅、神秘又耐看的女孩名组合`,
        }
      : {
          title: 'Rare Japanese Girl Name Picks',
          subtitle: `Browse ${combos.length} uncommon, elegant, mysterious, and quietly memorable girl-name combinations`,
        }
  }

  if (kw.slug === 'unique-female') {
    return locale === 'zh'
      ? {
          title: '独特日本女性名字精选',
          subtitle: `浏览 ${combos.length} 组少见、安静、锋利又带记忆点的女性名字组合`,
        }
      : {
          title: 'Unique Japanese Female Name Picks',
          subtitle: `Browse ${combos.length} rare, atmospheric, sharp, and memorable female-name combinations`,
        }
  }

  if (kw.slug === 'unique-male') {
    return locale === 'zh'
      ? {
          title: '独特日本男性名字精选',
          subtitle: `浏览 ${combos.length} 组少见、利落、克制又带强记忆点的男性名字组合`,
        }
      : {
          title: 'Unique Japanese Male Name Picks',
          subtitle: `Browse ${combos.length} rare, sharp, restrained, and memorable male-name combinations`,
        }
  }

  if (kw.slug === 'unique-girl') {
    return locale === 'zh'
      ? {
          title: '独特日本女孩名字精选',
          subtitle: `浏览 ${combos.length} 组少见、灵气足、带记忆点的女孩名组合`,
        }
      : {
          title: 'Unique Japanese Girl Name Picks',
          subtitle: `Browse ${combos.length} rare, distinctive, and quietly memorable girl-name combinations`,
        }
  }

  if (kw.slug === 'unique-boy') {
    return locale === 'zh'
      ? {
          title: '独特日本男孩名字精选',
          subtitle: `浏览 ${combos.length} 组少见、利落、带锋芒和记忆点的男孩名组合`,
        }
      : {
          title: 'Unique Japanese Boy Name Picks',
          subtitle: `Browse ${combos.length} rare, sharp, and quietly unforgettable boy-name combinations`,
        }
  }

  if (kw.slug === 'cool') {
    return locale === 'zh'
      ? {
          title: '酷感日本名字精选',
          subtitle: `浏览 ${combos.length} 组冷感、利落、带电影感与锋芒的名字组合`,
        }
      : {
          title: 'Cool Japanese Name Picks',
          subtitle: `Browse ${combos.length} sharp, sleek, cinematic, and high-presence name combinations`,
        }
  }

  if (kw.slug === 'cool-male') {
    return locale === 'zh'
      ? {
          title: '酷感日本男孩名字精选',
          subtitle: `浏览 ${combos.length} 组冷感、利落、带压场感与记忆点的男孩名组合`,
        }
      : {
          title: 'Cool Japanese Boy Name Picks',
          subtitle: `Browse ${combos.length} sharp, sleek, controlled, and memorable cool boy-name combinations`,
        }
  }

  if (kw.slug === 'dark') {
    return locale === 'zh'
      ? {
          title: '暗黑系日本名字精选',
          subtitle: `浏览 ${combos.length} 组神秘、锋利、冷调又有画面感的日文名字组合`,
        }
      : {
          title: 'Dark Japanese Name Picks',
          subtitle: `Browse ${combos.length} shadowy, fierce, moonlit, and cinematic Japanese name combinations`,
        }
  }

  if (kw.slug === 'cool-female') {
    return locale === 'zh'
      ? {
          title: '酷感日本女孩名字精选',
          subtitle: `浏览 ${combos.length} 组冷感、利落、神秘又带优雅压场感的女孩名组合`,
        }
      : {
          title: 'Cool Japanese Girl Name Picks',
          subtitle: `Browse ${combos.length} sharp, sleek, mysterious, and poised cool girl-name combinations`,
        }
  }

  if (kw.slug === 'cute') {
    return locale === 'zh'
      ? {
          title: '可爱日本名字精选',
          subtitle: `浏览 ${combos.length} 组甜软、灵动、秀气又带记忆点的名字组合`,
        }
      : {
          title: 'Cute Japanese Name Picks',
          subtitle: `Browse ${combos.length} sweet, lively, delicate, and memorable name combinations`,
        }
  }

  if (kw.slug === 'pretty-female') {
    return locale === 'zh'
      ? {
          title: '漂亮日本女孩名字精选',
          subtitle: `浏览 ${combos.length} 组优雅、温柔、梦幻又耐看的女孩名组合`,
        }
      : {
          title: 'Pretty Japanese Girl Name Picks',
          subtitle: `Browse ${combos.length} graceful, gentle, dreamy, and polished girl-name combinations`,
        }
  }

  if (kw.slug === 'uncommon') {
    return locale === 'zh'
      ? {
          title: '少见日本名字精选',
          subtitle: `浏览 ${combos.length} 组少见、耐看、有气氛又不至于失真的日本名字组合`,
        }
      : {
          title: 'Uncommon Japanese Name Picks',
          subtitle: `Browse ${combos.length} uncommon, elegant, atmospheric, and memorable Japanese name combinations`,
        }
  }

  if (kw.slug === 'rare') {
    return locale === 'zh'
      ? {
          title: '稀有日本名字精选',
          subtitle: `浏览 ${combos.length} 组神秘、优雅、带微光感又真正少见的日本名字组合`,
        }
      : {
          title: 'Rare Japanese Name Picks',
          subtitle: `Browse ${combos.length} mysterious, elegant, luminous, and truly low-frequency Japanese name combinations`,
        }
  }

  if (kw.slug === 'unique') {
    return locale === 'zh'
      ? {
          title: '独特日本名字精选',
          subtitle: `浏览 ${combos.length} 组锋利、特别、有风格又很难忽略的日本名字组合`,
        }
      : {
          title: 'Unique Japanese Name Picks',
          subtitle: `Browse ${combos.length} sharp, distinctive, atmospheric, and unforgettable Japanese name combinations`,
        }
  }

  if (kw.slug === 'pretty') {
    return locale === 'zh'
      ? {
          title: '漂亮日本名字精选',
          subtitle: `浏览 ${combos.length} 组优雅、柔和、明亮又有完成度的日本名字组合`,
        }
      : {
          title: 'Pretty Japanese Name Picks',
          subtitle: `Browse ${combos.length} graceful, gentle, luminous, and polished Japanese name combinations`,
        }
  }

  if (kw.slug === 'elegant') {
    return locale === 'zh'
      ? {
          title: '优雅日本名字精选',
          subtitle: `浏览 ${combos.length} 组端正、克制、精致又耐看的日本名字组合`,
        }
      : {
          title: 'Elegant Japanese Name Picks',
          subtitle: `Browse ${combos.length} poised, refined, serene, and polished Japanese name combinations`,
        }
  }

  if (kw.slug === 'beautiful-female') {
    return locale === 'zh'
      ? {
          title: 'Beautiful 日本女孩名字精选',
          subtitle: `浏览 ${combos.length} 组优雅、静美、精致又耐看的女孩名组合`,
        }
      : {
          title: 'Beautiful Japanese Girl Name Picks',
          subtitle: `Browse ${combos.length} graceful, serene, polished, and quietly luminous girl-name combinations`,
        }
  }


  if (kw.slug === 'last-names-female') {
    return locale === 'zh'
      ? {
          title: '日本女孩向姓氏精选',
          subtitle: `浏览 ${combos.length} 组柔和、优雅、顺口又适合搭女孩名的姓氏组合`,
        }
      : {
          title: 'Japanese Girl Last Name Picks',
          subtitle: `Browse ${combos.length} soft, elegant, scenic, and feminine-friendly surname combinations`,
        }
  }

  if (kw.slug === 'last-names-male') {
    return locale === 'zh'
      ? {
          title: '日本男性向姓氏精选',
          subtitle: `浏览 ${combos.length} 组稳重、现代、硬朗又适合搭男孩名的姓氏组合`,
        }
      : {
          title: 'Japanese Male Last Name Picks',
          subtitle: `Browse ${combos.length} dependable, modern, scenic, and stronger-structured surname combinations`,
        }
  }

  if (kw.slug === 'last-names-unique') {
    return locale === 'zh'
      ? {
          title: '稀有日本姓氏精选',
          subtitle: `浏览 ${combos.length} 组少见、神秘、耐看又带记忆点的日本姓氏组合`,
        }
      : {
          title: 'Rare Japanese Last Name Picks',
          subtitle: `Browse ${combos.length} uncommon, mysterious, and memorable Japanese surname combinations`,
        }
  }

  if (kw.slug === 'last-names-cool') {
    return locale === 'zh'
      ? {
          title: '酷感日本姓氏精选',
          subtitle: `浏览 ${combos.length} 组冷感、利落、带轮廓感与压场感的日本姓氏组合`,
        }
      : {
          title: 'Cool Japanese Last Name Picks',
          subtitle: `Browse ${combos.length} sleek, sharp, cinematic, and high-presence Japanese surname combinations`,
        }
  }

  if (kw.slug === 'last') {
    return locale === 'zh'
      ? {
          title: '日本姓氏精选',
          subtitle: `浏览 ${combos.length} 组常见、自然、耐看又适合搭全名的日本姓氏组合`,
        }
      : {
          title: 'Japanese Surname Picks',
          subtitle: `Browse ${combos.length} familiar, scenic, and usable Japanese surname combinations`,
        }
  }

  if (kw.slug === 'cute-female') {
    return locale === 'zh'
      ? {
          title: '可爱日本女孩名字精选',
          subtitle: `浏览 ${combos.length} 组甜软、灵动、顺耳又秀气的女孩名组合`,
        }
      : {
          title: 'Cute Japanese Girl Name Picks',
          subtitle: `Browse ${combos.length} sweet, lively, soft, and polished cute girl-name combinations`,
        }
  }

  if (kw.slug === 'cute-boy') {
    return locale === 'zh'
      ? {
          title: '可爱日本男孩名字精选',
          subtitle: `浏览 ${combos.length} 组软萌、开朗、清新又顺口的男孩名组合`,
        }
      : {
          title: 'Cute Japanese Boy Name Picks',
          subtitle: `Browse ${combos.length} sweet, lively, fresh, and easy-to-like boy-name combinations`,
        }
  }

  if (kw.slug === 'baby') {
    return locale === 'zh'
      ? {
          title: '日本宝宝名字精选',
          subtitle: `浏览 ${combos.length} 组温柔、顺口、适合长期使用的宝宝名字组合`,
        }
      : {
          title: 'Japanese Baby Name Picks',
          subtitle: `Browse ${combos.length} gentle, usable, and family-friendly baby-name combinations`,
        }
  }

  if (kw.slug === 'baby-boy') {
    return locale === 'zh'
      ? {
          title: '日本男宝宝名字精选',
          subtitle: `浏览 ${combos.length} 组温柔、明亮、耐用又适合长期使用的男孩名组合`,
        }
      : {
          title: 'Japanese Baby Boy Name Picks',
          subtitle: `Browse ${combos.length} soft, bright, dependable, and baby-friendly boy-name combinations`,
        }
  }

  if (kw.slug === 'first') {
    return locale === 'zh'
      ? {
          title: '日本名字中的 First Name 精选',
          subtitle: `浏览 ${combos.length} 组更聚焦“名”本身气质与使用感的组合`,
        }
      : {
          title: 'Japanese First Name Picks',
          subtitle: `Browse ${combos.length} combinations focused on the tone and usability of the given name itself`,
        }
  }

  if (kw.slug === 'given') {
    return locale === 'zh'
      ? {
          title: 'Japanese Given Name 精选',
          subtitle: `浏览 ${combos.length} 组更聚焦 personal name 本身节奏与可用性的组合`,
        }
      : {
          title: 'Japanese Given Name Picks',
          subtitle: `Browse ${combos.length} combinations centered on the rhythm and usability of the given name itself`,
        }
  }

  if (kw.slug === 'old') {
    return locale === 'zh'
      ? {
          title: '古风日本名字精选',
          subtitle: `浏览 ${combos.length} 组带传统、旧时代与历史余韵的日本名字组合`,
        }
      : {
          title: 'Old Japanese Name Picks',
          subtitle: `Browse ${combos.length} Japanese name combinations with traditional, historical, and old-style flavor`,
        }
  }

  if (kw.slug === 'traditional') {
    return locale === 'zh'
      ? {
          title: '传统日式名字精选',
          subtitle: `浏览 ${combos.length} 组正统、古典、安静耐看的日本名字组合`,
        }
      : {
          title: 'Traditional Japanese Name Picks',
          subtitle: `Browse ${combos.length} noble, classical, historical, and quietly durable Japanese name combinations`,
        }
  }

  if (kw.slug === 'middle') {
    return locale === 'zh'
      ? {
          title: 'Japanese Middle Name 灵感精选',
          subtitle: `浏览 ${combos.length} 组更适合做 middle name 参考的 given name 组合`,
        }
      : {
          title: 'Japanese Middle Name Inspiration',
          subtitle: `Browse ${combos.length} given-name combinations that work well as middle-name inspiration`,
        }
  }

  if (kw.slug === 'long') {
    return locale === 'zh'
      ? {
          title: '长音节日本名字精选',
          subtitle: `浏览 ${combos.length} 组展开感强、层次更丰富、读起来更有长度的日本名字组合`,
        }
      : {
          title: 'Long Japanese Name Picks',
          subtitle: `Browse ${combos.length} expansive, layered, and more extended-sounding Japanese name combinations`,
        }
  }

  if (kw.slug === 'short') {
    return locale === 'zh'
      ? {
          title: '短音节日本名字精选',
          subtitle: `浏览 ${combos.length} 组更短、更利落、更容易一口记住的日本名字组合`,
        }
      : {
          title: 'Short Japanese Name Picks',
          subtitle: `Browse ${combos.length} compact, quick, and easy-to-remember Japanese name combinations`,
        }
  }

  if (kw.slug === 'nicknames') {
    return locale === 'zh'
      ? {
          title: '日系昵称感名字精选',
          subtitle: `浏览 ${combos.length} 组更亲近、更顺口、也更容易拿来当昵称叫的日本名字组合`,
        }
      : {
          title: 'Japanese Nickname Picks',
          subtitle: `Browse ${combos.length} Japanese name combinations chosen for cute, easy, nickname-friendly use`,
        }
  }

  if (kw.slug === 'light') {
    return locale === 'zh'
      ? {
          title: '明亮系日本名字精选',
          subtitle: `浏览 ${combos.length} 组带光、太阳、星辰意象，更通透也更有发光感的日本名字组合`,
        }
      : {
          title: 'Light Japanese Name Picks',
          subtitle: `Browse ${combos.length} luminous Japanese name combinations shaped by light, sun, and star imagery`,
        }
  }

  if (kw.slug === 'that-mean-death') {
    return locale === 'zh'
      ? {
          title: '带死亡意象的日本名字精选',
          subtitle: `浏览 ${combos.length} 组更偏阴影、哀美、危险或更有剧情张力的名字组合`,
        }
      : {
          title: 'Japanese Names with Death Symbolism',
          subtitle: `Browse ${combos.length} eerie, mournful, dangerous, and story-heavy Japanese name combinations`,
        }
  }

  if (kw.slug === 'pet') {
    return locale === 'zh'
      ? {
          title: '日系宠物名字精选',
          subtitle: `浏览 ${combos.length} 组更适合日常呼叫、亲切顺口又有画面感的宠物名字组合`,
        }
      : {
          title: 'Japanese Pet Name Picks',
          subtitle: `Browse ${combos.length} pet-friendly Japanese name combinations chosen for easy calling, charm, and everyday usability`,
        }
  }

  if (kw.slug === 'names') {
    return locale === 'zh'
      ? {
          title: '日文全名灵感精选',
          subtitle: `浏览 ${combos.length} 组适合角色、宝宝与起名采样的日本全名组合`,
        }
      : {
          title: 'Japanese Full-Name Idea Picks',
          subtitle: `Browse ${combos.length} Japanese full-name combinations for characters, babies, and naming inspiration`,
        }
  }

  return locale === 'zh'
    ? {
        title: `全部 ${capitalize(kw.keyword)}`,
        subtitle: `浏览 ${combos.length} 组精选全名组合`,
      }
    : {
        title: `All ${capitalize(kw.keyword)}`,
        subtitle: `Browse ${combos.length} curated full-name combinations`,
      }
}

function buildFaqItems(kw: PageKeyword, combos: FullNameCombo[], locale: string): FaqItem[] {
  const topCombos = combos.slice(0, 5).map(c => `${c.fullKanji} (${c.fullRomaji})`).join(', ')

  if (kw.slug === 'male') {
    if (locale === 'zh') {
      return [
        {
          question: '哪些是经典又常见的日本男性名字？',
          answer: topCombos
            ? `这页会展示像 ${topCombos} 这样的精选全名组合，既包含常见、稳重的男性名字，也覆盖更现代或更有个性的写法，方便你直接比较整体气质。`
            : '这页收录了大量日本男性名字组合，涵盖经典、现代、温柔、强势等不同风格，并附带读音与含义说明。',
        },
        {
          question: '给男孩或男性角色挑日本名字时，最该看什么？',
          answer: '一般最值得优先看的有三点：第一是整体读音是否顺口有力量；第二是汉字本义是否传达出稳重、勇气、温和、雅致等你想要的男性形象；第三是姓与名连在一起后的整体节奏感与时代感。',
        },
        {
          question: '日本男性名字常见会用哪些汉字意象？',
          answer: '男性名里很常见的意象包括翔（飞翔）、斗（星斗、气魄）、太（厚重、宏大）、真（真实、诚恳）、介／助（扶助、守护）等。页面中的每个组合都会拆开说明姓与名各自的汉字含义，方便你判断整体气质。',
        },
      ]
    }

    return [
      {
        question: 'What are some classic and popular Japanese male names?',
        answer: topCombos
          ? `This page highlights curated full-name combinations such as ${topCombos}, mixing classic masculine staples with more modern or distinctive options so you can compare the full impression, not just the given name alone.`
          : 'This page collects a wide range of Japanese male name combinations, from classic and dependable to modern and distinctive, with readings and kanji meanings included.',
      },
      {
        question: 'How should I choose a Japanese male name for a baby or character?',
        answer: 'Start with the overall sound of the full name, then check whether the kanji express the masculine image you want: strong, calm, intelligent, refined, gentle, or heroic. Finally, look at how the surname and given name flow together, because the full-name rhythm matters as much as the individual kanji.',
      },
      {
        question: 'What kinds of kanji are common in Japanese male names?',
        answer: 'Many Japanese male names use kanji tied to strength, aspiration, clarity, and steadiness, such as 翔 (to soar), 斗 (dipper or constellation), 太 (broad, great), 真 (true), and 介 or 助 (to help or support). On this page, each combination includes a kanji-by-kanji breakdown so you can judge the tone more precisely.',
      },
    ]
  }

  if (kw.slug === 'female') {
    if (locale === 'zh') {
      return [
        {
          question: '有哪些经典又受欢迎的日本女性名字？',
          answer: topCombos
            ? `这页整理了像 ${topCombos} 这样的精选日本女性全名组合，既有温柔、优雅、可爱的路线，也有更现代、更清爽、更有角色感的写法。`
            : '这页收录了大量日本女性名字组合，覆盖优雅、甜美、现代、传统等常见路线，并附带读音与汉字含义说明。',
        },
        {
          question: '给女孩或女性角色挑日本名字时，该先看什么？',
          answer: '最实用的顺序通常是先看整体读音是否顺耳，再看汉字含义是否传达出你想要的气质，比如温柔、明亮、端庄、灵动或梦幻，最后再确认姓与名连起来后的节奏感和视觉印象。',
        },
        {
          question: '日本女性名字里常见哪些汉字意象？',
          answer: '女性名字里常见花、月、光、香、结、美、菜、音等意象，常常用来表达柔美、清新、希望、优雅或细腻感。页面里的每个组合都会拆开姓与名的汉字意义，方便你判断整体风格。',
        },
      ]
    }

    return [
      {
        question: 'What are some classic and popular Japanese female names?',
        answer: topCombos
          ? `This page highlights curated Japanese female full-name combinations such as ${topCombos}, spanning elegant, sweet, modern, soft, and more character-driven styles.`
          : 'This page collects a wide range of Japanese female name combinations, from graceful classics to modern, cute, and airy styles, each with readings and kanji meanings.',
      },
      {
        question: 'How should I choose a Japanese female name for a baby or character?',
        answer: 'Start with the full sound of the name, then check whether the kanji express the image you want: gentle, graceful, bright, dreamy, poetic, or quietly strong. After that, look at the surname-given-name flow, because rhythm and visual balance matter as much as the individual characters.',
      },
      {
        question: 'What kinds of kanji are common in Japanese female names?',
        answer: 'Japanese female names often draw on imagery such as flowers, moonlight, light, fragrance, beauty, connection, greenery, and sound. Kanji like 花, 月, 光, 香, 美, 結, 菜, and 音 often signal softness, elegance, freshness, or lyrical charm, and each combination on this page breaks that down for you.',
      },
    ]
  }

  if (kw.slug === 'boy') {
    if (locale === 'zh') {
      return [
        {
          question: '有哪些适合男孩的日本名字风格？',
          answer: topCombos
            ? `这页会展示像 ${topCombos} 这样的精选男孩名字组合，既有阳光亲切、稳重可靠的路线，也有更清爽、可爱、带少年感的写法。`
            : '这页整理了多种日本男孩名字组合，适合想找阳光、可爱、稳重、现代或经典路线的人参考。',
        },
        {
          question: '给男孩角色起日本名字时，怎样避免太老派或太浮夸？',
          answer: '一个好用的方法是先确定你要的是活泼、可靠、温柔还是利落感，再检查汉字是否过重或过戏剧化。最后把姓和名连起来读几遍，确认整体既自然又有记忆点。',
        },
        {
          question: '日本男孩名字常见会用哪些意象？',
          answer: '男孩名字里常见阳光、天空、海、树木、飞翔、成长、守护等意象，既可以表现清爽少年感，也可以表现稳重可靠感。页面里的组合会把这些汉字含义拆开说明。',
        },
      ]
    }

    return [
      {
        question: 'What kinds of Japanese boy names are popular?',
        answer: topCombos
          ? `This page features curated Japanese boy-name combinations such as ${topCombos}, ranging from bright and friendly to dependable, cool, and energetic styles.`
          : 'This page gathers Japanese boy-name combinations across cheerful, gentle, sturdy, and modern styles, each with readings and kanji meanings.',
      },
      {
        question: 'How do I choose a Japanese boy name without making it feel too old-fashioned or too dramatic?',
        answer: 'Decide first whether you want a bright, dependable, gentle, sporty, or cool impression. Then check whether the kanji feel natural rather than overdesigned, and say the full name aloud a few times to make sure the rhythm feels believable and memorable.',
      },
      {
        question: 'What imagery is common in Japanese boy names?',
        answer: 'Japanese boy names often use imagery tied to sunlight, sky, sea, trees, flight, growth, and protection. Those themes can make a name feel fresh, youthful, grounded, or quietly strong, and the combinations on this page break the kanji down so you can compare tones more precisely.',
      },
    ]
  }

  if (kw.slug === 'last-names') {
    if (locale === 'zh') {
      return [
        {
          question: '日本姓氏常见会来自哪些意象或来源？',
          answer: '很多日本姓氏都来自地形、自然景物和居住地特征，比如山、川、田、林、村、原、岛等，所以你会经常看到带有山川田野气质的姓氏。它们往往既有现实感，也很有文化辨识度。',
        },
        {
          question: '挑日本姓氏时，应该先看含义还是先看搭配感？',
          answer: '如果你是给角色、作品或全名搭配选姓，最稳妥的顺序通常是先看这个姓的整体读音和视觉印象，再看它和名字连起来是否顺口，最后再确认汉字意象是否符合人物设定或你想要的世界观。',
        },
        {
          question: '这页适合拿来做什么？',
          answer: '这页更适合先锁定姓氏风格，再去搭配名字：比如想找常见的、稀有的、自然系的、优雅系的日本姓氏，或者想先挑一个看起来就很日式、很有画面感的姓，再继续完善全名。',
        },
      ]
    }

    return [
      {
        question: 'What are Japanese last names usually based on?',
        answer: 'Many Japanese surnames come from landscapes, settlements, and natural features such as mountains, rivers, fields, forests, villages, plains, and islands. That is why so many family names feel grounded, visual, and strongly tied to place.',
      },
      {
        question: 'When choosing a Japanese surname, should I focus on meaning or on full-name flow first?',
        answer: 'For characters, stories, or naming projects, it usually helps to start with the surname’s sound and visual impression, then test how it flows with the given name, and only after that judge whether the kanji imagery matches the setting or personality you want.',
      },
      {
        question: 'What is this page best used for?',
        answer: 'This page works best when you want to start from the surname side: compare common, rare, elegant, or nature-rooted Japanese last names first, then use that surname style as the anchor for a fuller naming decision.',
      },
    ]
  }

  if (kw.slug === 'last-names-with-meanings') {
    if (locale === 'zh') {
      return [
        {
          question: '“Japanese surnames and meanings” 这一页最适合怎么用？',
          answer: '这页最适合你想先理解日本姓氏本身在说什么的时候用：不只看读音，还能连同汉字意象、地景来源和整套全名气质一起判断。它特别适合角色命名、写作采样，或先从 surname meaning 反推整体风格。',
        },
        {
          question: '为什么看姓氏含义时还要保留名字组合？',
          answer: topCombos
            ? `因为像 ${topCombos} 这样的组合，能让你同时判断这个姓单独成立时的 meaning，以及它和名字连起来之后的节奏。很多姓氏字面上很好懂，但只有放进全名里，才更容易看出它到底偏自然、偏稳重，还是偏有画面感。`
            : '因为姓氏单看字面可能很好懂，但和名字连起来时，现实感、顺口度和整体气质会完全不同。保留名字组合，能让“姓氏含义”判断更接近真实使用场景。',
        },
        {
          question: '如果我要继续缩小日本姓氏含义范围，先看什么最有效？',
          answer: '先区分你更想看山川田野这类典型地景姓、井村仓里这类聚落姓，还是更柔和、有季节或自然氛围的路线；然后再看它更偏常见稳妥，还是更有辨识度。先用来源意象和现实感拆分，通常会比只看字面翻译更有效。',
        },
      ]
    }

    return [
      {
        question: 'What is this Japanese surnames and meanings page best used for?',
        answer: 'This page is most useful when you want to understand what Japanese surnames are actually doing — not only how they sound, but what their kanji point to, what kind of landscape or settlement logic they come from, and how they behave inside full-name combinations.',
      },
      {
        question: 'Why keep full-name combinations on a surname-meanings page?',
        answer: topCombos
          ? `Because combinations like ${topCombos} let you judge both the surname meaning itself and the rhythm it creates inside a complete Japanese name. A surname may be clear on paper, but the full-name pairing reveals whether it feels grounded, elegant, scenic, or simply more believable in use.`
          : 'Because a surname can look easy to understand in isolation and still feel very different once paired with a given name. Keeping full-name combinations visible makes a meaning-focused surname page much more practical and realistic.',
      },
      {
        question: 'How should I narrow down Japanese surname meanings further?',
        answer: 'A practical next step is to split first by source imagery: landscape surnames, settlement and well surnames, or softer nature-driven surnames. After that, narrow again by usage feel: very familiar and everyday versus more distinctive and memorable.',
      },
    ]
  }

  if (kw.slug === 'all') {
    if (locale === 'zh') {
      return [
        {
          question: '如果我还没确定风格，为什么先看这个总览页？',
          answer: topCombos
            ? `因为你可以先从像 ${topCombos} 这样的代表性组合快速感受不同路线，再决定自己更偏向男性名、女性名、中性名，还是更想先从姓氏开始。`
            : '这个页面适合在你还没锁定方向时先快速逛一遍，横向比较不同风格的日本名字，再决定下一步要收窄到哪一类。',
        },
        {
          question: '总览页和细分类页面有什么区别？',
          answer: '总览页更像入口，帮你先建立整体审美和方向感；细分类页面则更适合深入筛选，比如只看男性名、女性名、姓氏、可爱风、冷感风或稀有风等。',
        },
        {
          question: '我应该怎么用这个页面继续缩小范围？',
          answer: '可以先看哪些组合最顺眼，再观察它们共同拥有的气质、汉字意象和读音风格；如果你已经有偏好，再继续点进相关分类页面，用更明确的风格继续筛选。',
        },
      ]
    }

    return [
      {
        question: 'Why start with this Japanese names overview page?',
        answer: topCombos
          ? `Because it lets you sample representative combinations such as ${topCombos} before deciding whether you really want male names, female names, surname-led ideas, or a more specific naming style.`
          : 'This page is useful when you have not chosen a direction yet and want to compare different Japanese naming styles before narrowing down to a specific category.',
      },
      {
        question: 'What is the difference between this overview page and a category page?',
        answer: 'The overview page is for orientation: it helps you compare styles side by side. Category pages are better once you know you want to go deeper into a narrower lane such as male names, female names, surnames, cute styles, cool styles, or rare names.',
      },
      {
        question: 'How should I use this page to narrow my search?',
        answer: 'Start by noticing which combinations feel right to you, then look for repeated patterns in mood, kanji imagery, and sound. Once you spot that pattern, move into the related category pages to refine the search more deliberately.',
      },
    ]
  }

  if (kw.slug === 'popular') {
    if (locale === 'zh') {
      return [
        {
          question: '热门日本名字通常为什么会让人觉得“顺眼又顺耳”？',
          answer: '因为很多高人气名字会在读音流畅、汉字意象清晰、整体气质稳定之间取得平衡：既不会太冷门难念，也不会因为过度设计而显得用力过猛，所以更容易被广泛接受。',
        },
        {
          question: '热门名字会不会太普通，不适合角色或宝宝？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，很多名字虽然属于主流路线，但在读音节奏、汉字搭配或气质表达上仍然各有区别。热门不等于没特色，关键是你要的是亲切感、经典感，还是更现代的流行感。`
            : '不一定。热门名字通常代表接受度高、读音自然、使用场景广，并不等于毫无个性。真正要看的是它更偏经典、温柔、明亮，还是更现代、清爽、容易记住。',
        },
        {
          question: '如果我想从热门名字里继续缩小范围，最适合先看什么？',
          answer: '可以先区分你想要的是经典常用型，还是更偏当代流行型；然后再看名字整体是温柔亲切、优雅体面，还是更有精神和存在感。这样会比单纯看“热度”更快找到适合自己的方向。',
        },
      ]
    }

    return [
      {
        question: 'Why do popular Japanese names often feel both easy to read and easy to like?',
        answer: 'Because many high-usage names strike a balance between smooth pronunciation, clear kanji imagery, and a stable overall impression. They tend to feel familiar without being dull, which is exactly why they stay widely liked.',
      },
      {
        question: 'Are popular Japanese names too ordinary for a baby or character?',
        answer: topCombos
          ? `Not necessarily. Combinations such as ${topCombos} may all live in the mainstream lane, but they still differ in rhythm, kanji tone, and emotional color. Popular does not mean bland — it just means broadly trusted and easy to use.`
          : 'Not necessarily. Popular names usually signal high acceptance, natural flow, and broad usability, not a lack of character. The real question is whether you want something classic, warm, polished, bright, or more current and trend-aware.',
      },
      {
        question: 'How should I narrow down a list of popular Japanese names?',
        answer: 'A useful first split is classic favorites versus modern mainstream picks. After that, compare whether the full name feels soft and friendly, elegant and polished, or more energetic and memorable. That kind of narrowing works better than looking at popularity alone.',
      },
    ]
  }

  if (kw.slug === 'common') {
    if (locale === 'zh') {
      return [
        {
          question: '为什么很多常见日本名字反而更耐看、更适合长期使用？',
          answer: '因为“常见”通常意味着这个名字在读音、字形、接受度和现实使用感之间已经形成了比较稳定的平衡。它们不一定最抢眼，但往往更顺口、更自然，也更容易在不同年龄和场景里长期成立。',
        },
        {
          question: '常见名字会不会太普通，没有记忆点？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合，虽然都属于常见路线，但仍然会在温柔、稳重、明亮、经典或现代感上拉开差异。常见更像是“高接受度”和“现实里好用”，而不是没有个性。`
            : '不一定。常见名字往往只是说明它更容易被接受、更符合日常命名习惯；真正的差异仍然来自读音节奏、汉字意象，以及它更偏男孩名、女孩名还是姓氏路线。',
        },
        {
          question: '如果我要从常见日本名字里继续缩小范围，先看什么最有效？',
          answer: '先分清你更想看常见男孩名、女孩名，还是常见姓氏；然后再按气质切一层，比如稳重、明亮、温柔、经典或稍微带一点冷感。先按用途和整体调性拆分，通常会比只看“常见”本身更高效。',
        },
      ]
    }

    return [
      {
        question: 'Why do many common Japanese names age so well?',
        answer: 'Because common names often represent a tested balance between pronunciation, familiar kanji structure, and real-world usability. They may not be the flashiest options, but they usually feel smooth, natural, and easy to imagine across many life stages.',
      },
      {
        question: 'Do common Japanese names feel too ordinary to remember?',
        answer: topCombos
          ? `Not necessarily. Even combinations like ${topCombos} can still separate into gentle, bright, grounded, classic, or more modern lanes. Common usually means high acceptance and practical usability, not the absence of personality.`
          : 'Not necessarily. Common often just means broadly accepted and easy to use in everyday life. The real differences still come from rhythm, kanji imagery, and whether you want a boy name, girl name, or surname-led direction.',
      },
      {
        question: 'How should I narrow down common Japanese names further?',
        answer: 'A strong first split is purpose: common boy names, common girl names, or common surnames. After that, narrow again by tone — steady, bright, gentle, classic, or slightly cool. That tends to work much better than sorting by commonness alone.',
      },
    ]
  }

  if (kw.slug === 'unisex') {
    if (locale === 'zh') {
      return [
        {
          question: '日本中性名字最难挑的地方通常是什么？',
          answer: '通常不是“好不好听”，而是它有没有在不明显偏男性或女性的前提下，仍然保留清晰的气质与记忆点。好的中性名字会在读音、字义和整体氛围之间保持平衡，而不是只靠模糊来显得中性。',
        },
        {
          question: '中性名字会不会听起来太平、太没个性？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，中性路线也能分成柔和自然、清冷利落、明亮开阔或更经典耐用几种不同方向。关键不是有没有性别标签，而是这个名字最终给人的情绪和画面感。`
            : '不一定。中性名字只是把明显的性别倾向拉平，但仍然可以在温柔、冷感、明亮、稳重或现代感上拉开差异。真正决定个性的，还是整体节奏、汉字意象与使用场景。',
        },
        {
          question: '如果我要继续缩小日本中性名字范围，先看什么最有效？',
          answer: '先区分你更想要柔和自然、清冷克制、明亮开放还是经典耐用的路线；再看它更适合现实长期使用、角色命名，还是只想要一个更有辨识度的灵感型名字。先按情绪调性切，再按用途切，通常最有效。',
        },
      ]
    }

    return [
      {
        question: 'What is usually hardest about choosing a Japanese unisex name?',
        answer: 'The challenge is rarely basic pleasantness. It is whether the name can stay balanced without leaning too obviously masculine or feminine while still feeling vivid and memorable. Strong unisex names feel intentional, not vague.',
      },
      {
        question: 'Do unisex Japanese names risk sounding too flat or generic?',
        answer: topCombos
          ? `Not necessarily. Even combinations like ${topCombos} can split into soft, cool, bright, or timeless lanes. The key question is not whether the name avoids gender extremes, but what emotional picture it creates when you hear the full name.`
          : 'Not necessarily. Unisex names simply reduce obvious gender coding; they can still feel gentle, sharp, bright, grounded, modern, or quietly distinctive depending on the kanji, rhythm, and context.',
      },
      {
        question: 'How should I narrow down Japanese unisex names further?',
        answer: 'A good next step is to decide whether you want something softer and more natural, cooler and more restrained, brighter and more open, or more timeless and grounded. After that, narrow again by use case: everyday realism, character naming, or a more striking inspiration-first style.',
      },
    ]
  }

  if (kw.slug === 'gender-neutral') {
    if (locale === 'zh') {
      return [
        {
          question: 'gender-neutral 日本名字和普通中性名字页有什么区别？',
          answer: '这页会更刻意保留“平衡感”这件事：不仅不明显偏男或偏女，还会尽量让读音、汉字意象和整体画面都落在更柔和、开阔、克制的中间带，而不是只把各种 unisex 名字混在一起。',
        },
        {
          question: 'gender-neutral 名字会不会因为太平衡而显得没记忆点？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，gender-neutral 路线仍然能分成柔和自然、轻亮开阔、清冷利落或更安静稳妥几种方向。重点不是“模糊”，而是把锋芒压低后，仍然保留清楚的气质。`
            : '不一定。真正好用的 gender-neutral 名字并不是把个性磨平，而是把过强的性别指向收住，再保留更清楚的节奏、意象与使用感，所以它反而常常更耐看。',
        },
        {
          question: '如果我要继续缩小 gender neutral japanese names 的范围，先看什么最有效？',
          answer: '先分你更想要柔和自然、平衡克制、清冷现代还是更明亮开阔的路线；然后再看它更适合现实长期使用、宝宝灵感，还是角色命名。先按情绪调性切，再按用途切，通常最省力。',
        },
      ]
    }

    return [
      {
        question: 'How is this gender-neutral Japanese names page different from a broader unisex page?',
        answer: 'This page leans harder into balance itself. Instead of simply mixing all unisex-usable names together, it prioritizes names whose sound, imagery, and overall mood stay especially even, open, and adaptable without losing character.',
      },
      {
        question: 'Do gender-neutral Japanese names risk feeling too neutral to remember?',
        answer: topCombos
          ? `Not necessarily. Combinations like ${topCombos} still separate into soft, airy, cooler, or more grounded lanes. The point is not to erase identity, but to lower heavy gender coding while keeping the name’s rhythm and atmosphere clear.`
          : 'Not necessarily. Good gender-neutral names do not flatten personality; they simply reduce stronger masculine or feminine signals and keep a clearer balance across sound, imagery, and everyday usability.',
      },
      {
        question: 'How should I narrow down gender neutral Japanese names further?',
        answer: 'A practical next step is to choose whether you want something softer and more natural, more balanced and restrained, cooler and cleaner, or brighter and more open. After that, narrow again by use: daily realism, baby-name inspiration, or character naming.',
      },
    ]
  }

  if (kw.slug === 'common-girl') {
    if (locale === 'zh') {
      return [
        {
          question: '常见日本女孩名字为什么往往更容易让人产生好感？',
          answer: '因为这类名字通常在读音顺口、字形熟悉、整体气质稳定之间取得了很好的平衡。它们不会太生僻，也不容易显得刻意，所以无论是现实使用还是角色命名，都比较容易被接受。',
        },
        {
          question: '常见女孩名会不会听起来太普通？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，很多名字虽然属于常见路线，但在温柔度、明亮感、经典感和现代感上仍然有细微区别。常见更像是“好用、耐看、顺耳”，不等于没有辨识度。`
            : '不一定。常见女孩名通常意味着日常接受度高、读音自然、场景适配广，而不是没有特色。关键要看它更偏亲切、优雅、可爱还是清爽现代。',
        },
        {
          question: '如果我想从常见女孩名里继续缩小范围，先看什么最有效？',
          answer: '可以先区分你更想要经典耐用型，还是现代日常型；然后再看它整体更偏温柔、明亮、清秀还是带一点可爱感。先用气质和时代感缩小范围，通常会比只看是否“常见”更有效。',
        },
      ]
    }

    return [
      {
        question: 'Why do common Japanese girl names often feel so easy to like?',
        answer: 'Because they usually balance smooth pronunciation, familiar kanji patterns, and a stable emotional tone. They tend to feel natural rather than forced, which makes them strong choices for both real-life naming and believable characters.',
      },
      {
        question: 'Do common girl names sound too ordinary?',
        answer: topCombos
          ? `Not necessarily. Even among combinations like ${topCombos}, common girl names can still vary in softness, brightness, elegance, and modernity. Common often means usable and broadly appealing, not empty of personality.`
          : 'Not necessarily. Common girl names are often widely accepted because they sound natural and fit many situations, but they can still lean gentle, bright, graceful, cute, or more modern depending on the kanji and rhythm.',
      },
      {
        question: 'How should I narrow down common Japanese girl names further?',
        answer: 'A practical next step is to decide whether you want something classic and dependable or more modern and everyday, then narrow again by tone: gentle, bright, refined, sweet, or quietly stylish. That approach works better than popularity alone.',
      },
    ]
  }

  if (kw.slug === 'common-first') {
    if (locale === 'zh') {
      return [
        {
          question: '“common japanese first names” 这一页最适合怎么用？',
          answer: '这页最适合你已经明确想看“常见 given name”时使用。它会把注意力放在现实里顺口、接受度高、长期成立的日本名字上，而不是更极端的稀有感或角色设定感。',
        },
        {
          question: '常见 first name 会不会显得太普通？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，常见 first name 之间依然能分出更温柔、更明亮、更经典，或更轻一点、更现代一点的细差。常见更像“好用、稳、顺耳”，不等于没有气质。`
            : '不一定。常见 first name 更多是在说明这个名字读起来自然、现实里接受度高、长期使用也不容易出戏，而不是说它一定没个性。关键还是看它更偏温柔、明亮、经典还是更轻现代。',
        },
        {
          question: '如果我想继续缩小 common japanese first names 的范围，先看什么最有效？',
          answer: '最有效的顺序通常是先按气质切一刀，比如熟悉稳妥、明亮开阔、经典耐用，还是更轻更现代；然后再按用途切，比如现实取名、宝宝灵感，还是角色命名。先按调性切，通常比只看“常见”更有用。',
        },
      ]
    }

    return [
      {
        question: 'What is this common Japanese first names page best used for?',
        answer: 'This page works best when you specifically want familiar Japanese given names that feel smooth, believable, and easy to use in everyday life. It is less about chasing rarity and more about comparing first names with strong mainstream usability.',
      },
      {
        question: 'Do common Japanese first names sound too ordinary?',
        answer: topCombos
          ? `Not necessarily. Even among combinations like ${topCombos}, common first names still separate into gentler, brighter, more classic, or lighter more modern lanes. Common usually means usable, stable, and easy to accept, not empty of personality.`
          : 'Not necessarily. Common first names are often widely accepted because they sound natural and hold up well in real life, but they can still feel gentle, bright, classic, or lighter and more current depending on the kanji and cadence.',
      },
      {
        question: 'How should I narrow down common Japanese first names further?',
        answer: 'A practical next step is to split by tone first: familiar and dependable, bright and open, classic and durable, or lighter and more modern. After that, narrow again by use case, such as real-life naming, baby-name inspiration, or believable character naming.',
      },
    ]
  }

  if (kw.slug === 'common-male') {
    if (locale === 'zh') {
      return [
        {
          question: '常见日本男性名字这页最适合怎么用？',
          answer: '这页最适合你已经明确想看“常见、现实里好用”的男性名字时使用：重点不是追求极端个性，而是比较哪些男名更稳、更顺口、更容易在真实场景里长期成立。',
        },
        {
          question: '常见男性名字会不会显得太普通？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，常见男名之间依然能分出稳重、明亮、经典、利落等细微差别。常见更像“高接受度、耐用、顺耳”，并不等于没有辨识度。`
            : '不一定。常见男性名字通常只是说明它更容易被大众接受、读音更自然、长期使用更稳，不代表它一定平淡无趣。关键还是看它更偏稳重、开阔、经典还是更有精神感。',
        },
        {
          question: '如果我想从 common male names 里继续缩小范围，先看什么最有效？',
          answer: '先区分你更想要稳重可靠、明亮亲切、经典正统，还是“常见但更利落”这几条路线；然后再看它更适合现实取名、宝宝命名，还是作品里需要可信度的男性角色。',
        },
      ]
    }

    return [
      {
        question: 'What is this common Japanese male names page best used for?',
        answer: 'This page works best when you want male names that feel familiar, believable, and easy to use in real life. It is less about extreme uniqueness and more about finding boy names that stay smooth, dependable, and broadly acceptable over time.',
      },
      {
        question: 'Do common male names sound too ordinary?',
        answer: topCombos
          ? `Not necessarily. Even among combinations like ${topCombos}, common male names still split into steady, bright, classic, and sharper lanes. Common usually means usable, durable, and broadly liked — not empty of character.`
          : 'Not necessarily. Common male names are often easier to accept because they sound natural and hold up well in everyday life, but they can still feel grounded, open, classic, or slightly sharper depending on the kanji and cadence.',
      },
      {
        question: 'How should I narrow down common Japanese male names further?',
        answer: 'A strong next step is to split by tone first: dependable, bright, classic, or more crisp and energetic. After that, narrow again by use case — real-life naming, baby naming, or believable character naming. That usually works better than popularity alone.',
      },
    ]
  }

  if (kw.slug === 'common-female') {
    if (locale === 'zh') {
      return [
        {
          question: '常见日本女性名字这页最适合怎么用？',
          answer: '这页最适合你已经明确想看“常见、现实里顺口、长期也成立”的女性名字时使用：重点不是追求极端稀有，而是比较哪些女孩名更自然、更耐看、更适合真实场景。',
        },
        {
          question: '常见女性名字会不会显得太普通？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，常见女性名字之间依然能分出温柔、明亮、经典、精致等细微差别。常见更像“高接受度、顺耳、耐用”，不等于没有记忆点。`
            : '不一定。常见女性名字通常只是说明它更自然、好读、长期使用更稳，不代表它一定平淡。关键还是看它更偏温柔亲切、清爽明亮、经典耐看，还是更精致利落。',
        },
        {
          question: '如果我想从 common female names 里继续缩小范围，先看什么最有效？',
          answer: '先区分你更想要温柔亲切、明亮顺耳、经典耐看，还是更清爽精致的路线；然后再看它更适合现实取名、宝宝命名，还是作品里需要自然可信的女性角色。',
        },
      ]
    }

    return [
      {
        question: 'What is this common Japanese female names page best used for?',
        answer: 'This page works best when you want female names that feel familiar, smooth, and believable over the long term. It is less about chasing rarity and more about comparing girl names that stay natural, likable, and usable in real life.',
      },
      {
        question: 'Do common female names sound too ordinary?',
        answer: topCombos
          ? `Not necessarily. Even among combinations like ${topCombos}, common female names still split into gentle, bright, classic, and more polished lanes. Common usually means high acceptance and easy flow — not lack of personality.`
          : 'Not necessarily. Common female names are often easier to like because they sound natural and hold up well in everyday use, but they can still feel soft, bright, classic, or more refined depending on the kanji and rhythm.',
      },
      {
        question: 'How should I narrow down common Japanese female names further?',
        answer: 'A strong next step is to split by tone first: gentle, bright, classic, or more polished and crisp. After that, narrow again by use case — real-life naming, baby naming, or believable character naming. That usually works better than popularity alone.',
      },
    ]
  }

  if (kw.slug === 'cute-male') {
    if (locale === 'zh') {
      return [
        {
          question: 'cute male japanese names 这一页最适合怎么用？',
          answer: '这页适合你已经明确想看“男孩名也可以可爱、顺耳、有好感”，但又不希望名字幼态失真时使用。重点不是卖萌，而是比较哪些男孩名既柔和讨喜，又仍像真实会被长期使用的名字。',
        },
        {
          question: '可爱男孩名会不会听起来太软，不像正式名字？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，可爱感更多来自顺耳、轻快、亲近感和一点亮度，而不是把名字做得很幼。真正好用的 cute male names 通常还是会保留男孩名该有的结构感。`
            : '不一定。好用的 cute male names 通常不是单纯往“萌”上堆，而是让名字更顺口、更亲近、更有轻亮感，同时仍保留男孩名应有的可信度和骨架。',
        },
        {
          question: '如果我想继续缩小 cute male japanese names 的范围，先看什么最有效？',
          answer: '先分你更想要柔软明亮、轻快俏皮、温柔安定，还是更精致顺口的路线；然后再看它更适合现实取名、宝宝灵感，还是作品里需要亲近感强的男角色。先按气质和使用场景拆，会比只盯“可爱”两个字更有效。',
        },
      ]
    }

    return [
      {
        question: 'What is this cute male Japanese names page best used for?',
        answer: 'This page is most useful when you want boy names that feel cute, smooth, and likable without collapsing into something childish or unbelievable. The goal is not pure sweetness — it is finding male names that carry warmth and charm while still holding a credible full-name shape.',
      },
      {
        question: 'Do cute male names sound too soft to feel like proper names?',
        answer: topCombos
          ? `Not necessarily. Among combinations like ${topCombos}, the cuteness usually comes from ease, brightness, and approachable rhythm rather than from making the name feel babyish. The strongest results still keep a believable male-name backbone.`
          : 'Not necessarily. Strong cute male names usually feel cute through warmth, bounce, and easy likability rather than through childish exaggeration. They can stay soft while still sounding like real names people would actually use.',
      },
      {
        question: 'How should I narrow down cute male Japanese names further?',
        answer: 'A practical next step is to split first by tone: soft and sunny, playful and bouncy, gentle and comforting, or cute but more polished. After that, narrow again by use case — real-life naming, baby-name inspiration, or believable boy-character naming.',
      },
    ]
  }

  if (kw.slug === 'male-meanings') {
    if (locale === 'zh') {
      return [
        {
          question: '“Japanese male names and meanings” 这一页最适合怎么用？',
          answer: '这页最适合你不只想听名字顺不顺口，而是还想一起判断字义是否站得住的时候：你可以同时比较读音、汉字含义、整体气质，以及它放进全名后是不是依然像一个成熟、可信的男性名字。',
        },
        {
          question: '为什么看 male names and meanings 时还要保留姓氏组合？',
          answer: topCombos
            ? `因为像 ${topCombos} 这样的组合，能让你一起判断“字义是否好看”和“整套全名是否成立”。很多男性名字单看汉字很强，但和姓氏连起来后，气质可能会偏太重、太硬或太散，所以保留全名组合更接近真实使用。`
            : '因为男性名字单看字义可能很好，但和姓氏连起来时，节奏、轻重和时代感常常会变。保留姓氏组合，能让“名字含义”判断不只停留在解释层，而更接近真实命名场景。',
        },
        {
          question: '如果我想继续缩小 male names and meanings 的范围，先看什么最有效？',
          answer: '先区分你更想要稳重可靠、明亮开阔、文雅有分寸，还是更有力量和记忆点的路线；然后再看字义更偏光、山水、品格、祝福还是行动感。先用气质和字义主题拆分，通常会比只看发音更有效。',
        },
      ]
    }

    return [
      {
        question: 'What is this Japanese male names and meanings page best used for?',
        answer: 'This page works best when you want to judge Japanese male names not only by sound, but by what their kanji actually communicate. It helps you compare pronunciation, meaning, and full-name credibility at the same time instead of treating meaning as an afterthought.',
      },
      {
        question: 'Why keep surname combinations on a male-names-with-meanings page?',
        answer: topCombos
          ? `Because combinations like ${topCombos} let you evaluate both the kanji sense and the full-name balance together. A male given name can look powerful in isolation and still land too heavy, too stiff, or too diffuse once a surname is attached.`
          : 'Because a male given name can have strong kanji on its own and still feel awkward once it sits inside a full name. Keeping surname combinations visible makes a meanings page much more realistic and useful.',
      },
      {
        question: 'How should I narrow down Japanese male names and meanings further?',
        answer: 'A practical next step is to split first by tone: steady and dependable, bright and open, refined and thoughtful, or stronger and more forceful. After that, narrow again by kanji theme: light, landscape, character, blessing, or motion.',
      },
    ]
  }

  if (kw.slug === 'anime') {
    if (locale === 'zh') {
      return [
        {
          question: 'anime 风日本名字和普通日文名最大的区别是什么？',
          answer: 'anime 风名字通常会更强调角色辨识度、画面感和情绪张力。它不一定必须夸张，但往往会比普通日文名更在意第一印象是否鲜明、是否有设定感，以及放进作品后能不能立刻立住。',
        },
        {
          question: 'anime 名字会不会太假，不适合做真实人物名字？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，有些名字更偏现实可用，有些则更有戏剧性。真正关键不是“anime”三个字，而是你想要名字更贴近日常，还是更像作品角色出场时就能被记住。`
            : '不一定。很多 anime 风名字本质上仍然来自真实可用的日文命名逻辑，只是会在气氛、辨识度和视觉意象上更强一点。',
        },
        {
          question: '如果我要从 anime 风名字里继续缩小范围，先看什么最有效？',
          answer: '先区分你更想要冷感战斗系、神秘画面系、顺耳好记型，还是更古典有设定感的路线；然后再看它是更贴近现实可用，还是更偏稀有、高冲击力的角色名。先用角色气质和作品氛围缩小范围，通常最有效。',
        },
      ]
    }

    return [
      {
        question: 'What makes anime-style Japanese names different from ordinary Japanese names?',
        answer: 'Anime-leaning Japanese names usually place more weight on character silhouette, atmosphere, and first-impression impact. They do not have to be unrealistic, but they often work harder to feel memorable on screen and emotionally distinct inside a story world.',
      },
      {
        question: 'Do anime names feel too dramatic to use for believable characters?',
        answer: topCombos
          ? `Not necessarily. Among combinations like ${topCombos}, some feel highly usable and grounded, while others land with more theatrical force. The real question is whether you want the name to blend into everyday realism or to stand out the moment a character appears.`
          : 'Not necessarily. Many anime-style Japanese names still follow believable naming patterns; they just lean more heavily into atmosphere, recognizability, and visual impact.',
      },
      {
        question: 'How should I narrow down anime-style Japanese names further?',
        answer: 'A practical next step is to decide whether you want something cooler and battle-ready, more mysterious and cinematic, more smooth and memorable, or more traditional and setting-rich. After that, split again by realism level: believable everyday use versus high-impact character presence.',
      },
    ]
  }

  if (kw.slug === 'fierce-historical') {
    if (locale === 'zh') {
      return [
        {
          question: 'samurai names 这一页和普通“酷名字”页面最大的区别是什么？',
          answer: '这页更强调“历史人物感”而不只是酷。真正像武家、战记或旧时代角色的名字，通常既要有锋利感，也要有家格、秩序感和时代可信度，所以判断重点会落在全名气氛是否像真实存在过的人。',
        },
        {
          question: '为什么 samurai 名字页里还要保留姓氏组合？',
          answer: topCombos
            ? `因为像 ${topCombos} 这样的组合，能让你直接判断它到底更像猛将、名门武家，还是安静克制的旧时代人物。samurai 风名字如果只看名，常常会显得太飘；放回全名后，时代感和可信度才真正站得住。`
            : '因为 samurai 风最怕只剩“字面很猛”却不像真实人物。把姓氏一起保留，才能看出这个名字到底更像历史武人、门第子弟，还是只是现代视角下觉得很酷的角色名。',
        },
        {
          question: '如果我想继续缩小 samurai names 的范围，先看什么最有效？',
          answer: '先区分你更想要战斗感强、门第端正、冷静神秘，还是更像真实史传人物的路线；然后再看它更偏压场武人、名门旧族，还是更带山城、战记、古道这类历史地景感。先按角色位置和时代气氛拆分，通常最快。',
        },
      ]
    }

    return [
      {
        question: 'How is this samurai names page different from an ordinary cool-names page?',
        answer: 'This page is trying to preserve historical credibility, not just edge. Strong samurai-style names usually need force, rank, restraint, and period texture at the same time, so the goal is a name that feels like it could belong to a warrior house or old chronicle, not merely a modern cool character.',
      },
      {
        question: 'Why keep surname pairings on a samurai-style name page?',
        answer: topCombos
          ? `Because combinations like ${topCombos} let you judge whether the result lands as a field commander, a noble house heir, or a quieter period figure. Samurai-style naming gets much more believable once the surname and given name carry the same historical weight together.`
          : 'Because samurai-style naming often collapses if you judge the given name alone. Keeping surname pairings visible makes it easier to test period realism, class tone, and whether the full name feels like a plausible historical person rather than just a sharp-sounding fragment.',
      },
      {
        question: 'How should I narrow down samurai-style Japanese names further?',
        answer: 'A practical next step is to choose whether you want something more battle-ready, more noble-house and formal, more quiet and shadowed, or more grounded in believable historical realism. After that, narrow again by image: steel, clan gate, mountain road, or war chronicle.',
      },
    ]
  }

  if (kw.slug === 'male-anime') {
    if (locale === 'zh') {
      return [
        {
          question: '男性 anime 风日本名字和普通男孩名最大的区别是什么？',
          answer: '这类名字通常会更强调角色轮廓、第一印象和出场记忆点。它们不只是顺口，还会更在意名字有没有动作感、镜头感和设定张力，所以常常比普通男孩名更冷、更亮，或者更像主角与战斗系角色。',
        },
        {
          question: '男性 anime 名字会不会太夸张，不适合现实使用？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，有些名字本身就很接近日常男孩名，只是比普通路线更有角色辨识度；也有一些则更偏战斗感、主角感或强设定风。关键不在于“anime”，而在于你想让名字更贴近日常，还是更像角色一登场就能被记住。`
            : '不一定。很多男性 anime 风名字本身仍然建立在真实可用的日文命名逻辑上，只是会更强调力量感、辨识度和角色氛围。',
        },
        {
          question: '如果我要继续缩小男性 anime 名字范围，先看什么最有效？',
          answer: '先区分你更想要冷感战斗系、热血主角系、安静神秘型，还是更有古典设定感的路线；然后再看它更偏现实可用，还是更偏稀有高冲击力。先用角色气质和作品画面缩小，通常最快。',
        },
      ]
    }

    return [
      {
        question: 'What makes male anime-style Japanese names different from ordinary boy names?',
        answer: 'They usually care more about silhouette, entrance impact, and character energy. A strong male anime-style name is not only pleasant to hear — it also feels built to leave an impression through coolness, heroism, mystery, or dramatic presence.',
      },
      {
        question: 'Do male anime names feel too dramatic for believable use?',
        answer: topCombos
          ? `Not necessarily. Among combinations like ${topCombos}, some feel close to everyday boy names with just a little extra character edge, while others lean harder into fighter, hero, rival, or setting-heavy territory. The real choice is whether you want realism first or immediate character impact first.`
          : 'Not necessarily. Many male anime-style Japanese names still rest on believable naming logic; they simply push harder on recognizability, momentum, and character atmosphere.',
      },
      {
        question: 'How should I narrow down male anime-style Japanese names further?',
        answer: 'A practical next split is cool and battle-ready versus bright and heroic versus quiet and mysterious versus more traditional and setting-rich. After that, narrow again by realism level: everyday-usable versus rarer, sharper, and more high-impact character presence.',
      },
    ]
  }

  if (kw.slug === 'female-anime') {
    if (locale === 'zh') {
      return [
        {
          question: '女性 anime 风日本名字和普通女孩名最大的区别是什么？',
          answer: '这类名字通常会更强调“角色登场感”。它们不只是好听，还会更在意画面感、第一印象和人设辨识度，所以常常比普通女孩名更亮、更梦幻，或更有一点神秘设定感。',
        },
        {
          question: '女性 anime 名字一定会太夸张、不适合现实使用吗？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，有些名字本身就很接近日常女孩名，只是比普通路线更有镜头感；也有一些则更偏主角感、偶像感或魔法系设定。关键不在于“anime”，而在于你想让名字更贴近日常，还是更像角色出场时一下就能被记住。`
            : '不一定。很多女性 anime 风名字本身仍然建立在真实可用的日文命名逻辑上，只是会更强调漂亮、辨识度和角色氛围。',
        },
        {
          question: '如果我要继续缩小女性 anime 名字范围，先看什么最有效？',
          answer: '先区分你更想要漂亮明亮型、神秘梦幻型、可爱角色型，还是更像主角的优雅路线；然后再看它更偏现实可用，还是更偏稀有设定感。先用角色气质和作品画面来缩小，通常最快。',
        },
      ]
    }

    return [
      {
        question: 'What makes female anime-style Japanese names different from ordinary girl names?',
        answer: 'They usually care more about on-screen presence. A strong female anime-style name is not just pleasant — it also feels visual, character-rich, and immediately memorable, whether that comes through brightness, mystery, sweetness, or heroine energy.',
      },
      {
        question: 'Do female anime names feel too dramatic for believable use?',
        answer: topCombos
          ? `Not necessarily. Among combinations like ${topCombos}, some feel very close to everyday girl names with just a little extra cinematic charm, while others lean more strongly into heroine, idol, or magical-character territory. The real choice is whether you want realism first or instant character impact first.`
          : 'Not necessarily. Many female anime-style Japanese names still sit on believable naming foundations; they simply push harder on beauty, recognizability, and character atmosphere.',
      },
      {
        question: 'How should I narrow down female anime-style Japanese names further?',
        answer: 'A practical next split is bright and pretty versus mysterious and dreamy versus cute and character-like versus elegant heroine-style. After that, narrow again by realism level: everyday-usable versus more distinctive, setting-rich, and fantastical.',
      },
    ]
  }

  if (kw.slug === 'female-meanings') {
    if (locale === 'zh') {
      return [
        {
          question: '“Japanese girl names and meanings” 这一页最适合怎么用？',
          answer: '这页最适合你想同时看女孩名本身与汉字含义的时候：你不仅能比较读音和整体气质，还能直接判断这个名字更偏温柔、明亮、优雅，还是更现代轻盈。',
        },
        {
          question: '为什么看 girl names and meanings 时还要保留姓氏组合？',
          answer: topCombos
            ? `因为像 ${topCombos} 这样的组合，能让你同时判断女孩名字义和整套全名的节奏。很多名字单看含义很好，但放进全名里，才更容易看出它到底是更耐看、更温柔，还是更有现代感。`
            : '因为女孩名单看字义可能很漂亮，但和姓氏连起来时，节奏、时代感和整体气质可能完全不同。保留姓氏组合，能让“名字含义”判断更接近真实使用场景。',
        },
        {
          question: '如果我要继续缩小 girl names and meanings 的范围，先看什么最有效？',
          answer: '先区分你更想要温柔柔和、明亮有希望、优雅精致，还是更现代轻盈的路线；然后再看汉字是更强调花、光、水、季节，还是品格与祝福。先用气质和字义主题拆分，通常会比只看读音更有效。',
        },
      ]
    }

    return [
      {
        question: 'What is this Japanese girl names and meanings page best used for?',
        answer: 'This page works best when you want to compare Japanese girl names not only by sound, but by kanji meaning at the same time. It helps you judge whether a name feels gentler, brighter, more elegant, or more modern once the meaning is made explicit.',
      },
      {
        question: 'Why keep surname combinations on a girl-names-with-meanings page?',
        answer: topCombos
          ? `Because combinations like ${topCombos} let you evaluate both the kanji sense and the full-name rhythm together. A girl name may look beautiful in isolation, but the surname pairing reveals whether it feels softer, steadier, brighter, or more modern in actual use.`
          : 'Because a girl name can have lovely kanji in isolation and still land awkwardly inside a full name. Keeping surname pairings visible makes a meaning-focused page much more realistic and usable.',
      },
      {
        question: 'How should I narrow down Japanese girl names and meanings further?',
        answer: 'A practical next step is to split first by tone: gentle and soft, bright and hopeful, elegant and refined, or lighter and more modern. After that, narrow again by kanji theme: flowers, light, water, seasons, beauty, blessing, or character.',
      },
    ]
  }

  if (kw.slug === 'popular-girl') {
    if (locale === 'zh') {
      return [
        {
          question: '热门日本女孩名字为什么总让人觉得顺口又容易喜欢？',
          answer: '因为这类名字通常兼顾了读音流畅、汉字意象清晰和整体气质稳定。它们既不会太生僻，也不会显得过度设计，所以更容易在第一印象里就建立好感。',
        },
        {
          question: '热门女孩名会不会太大众、缺少个性？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，很多名字虽然处在主流路线，但在温柔度、明亮感、精致感和时代感上仍然有明显差别。热门更像是“高接受度”，不等于“没有记忆点”。`
            : '不一定。热门女孩名通常代表读音自然、使用广、接受度高，但依然可以偏温柔、优雅、清爽或更有当代感。关键在于你想要哪一种热门气质。',
        },
        {
          question: '如果我要从热门女孩名里继续缩小范围，先看什么最好？',
          answer: '先区分你更想要经典热门型，还是现代日常型；接着再看名字整体更偏温柔亲切、优雅体面，还是明亮有元气。先用气质和时代感缩小范围，通常会比只看热度更有效。',
        },
      ]
    }

    return [
      {
        question: 'Why do popular Japanese girl names often feel so instantly likable?',
        answer: 'Because they usually balance smooth pronunciation, clear kanji imagery, and a stable emotional tone. They feel familiar without becoming dull, which is exactly why they keep attracting broad affection.',
      },
      {
        question: 'Do popular girl names feel too mainstream or generic?',
        answer: topCombos
          ? `Not necessarily. Even among combinations like ${topCombos}, popular girl names can still differ in softness, brightness, refinement, and era feel. Popular often means broadly trusted, not lacking in personality.`
          : 'Not necessarily. Popular girl names usually signal natural flow, broad usability, and strong first-impression appeal, but they can still lean gentle, elegant, fresh, or distinctly modern depending on the kanji and rhythm.',
      },
      {
        question: 'How should I narrow down popular Japanese girl names further?',
        answer: 'A good first split is classic favorites versus modern everyday hits. After that, narrow again by tone: soft and warm, elegant and polished, or bright and lively. That usually works better than treating popularity as one single bucket.',
      },
    ]
  }

  if (kw.slug === 'popular-female') {
    if (locale === 'zh') {
      return [
        {
          question: '热门日本女性名字为什么常常给人一种“顺眼、顺口、容易接受”的感觉？',
          answer: '因为这类名字通常把读音流畅、现实使用率和整体气质稳定放在一起平衡。它们不会太生僻，也不会显得设计痕迹太重，所以很容易在第一印象里建立好感。',
        },
        {
          question: '热门女性名字会不会太主流，少了自己的味道？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，热门女性名字仍然会分成柔和亲切、优雅耐看、现代清爽或更有一点记忆点的不同路线。热门更像“高接受度”，不等于模板化。`
            : '不一定。热门女性名字通常只是说明它更自然、顺耳、现实里更常被接受，但依然可以偏柔和、优雅、明亮，或者更有一点现代感。关键还是你想要哪种热门气质。',
        },
        {
          question: '如果我想从 popular female names 里继续缩小范围，先看什么最有效？',
          answer: '先区分你更想要柔和亲切型、优雅体面型，还是更现代清爽的路线；然后再看它是更偏经典耐看，还是更像当代高接受度名字。先用气质和时代感拆分，通常会比只看“热门”更快。',
        },
      ]
    }

    return [
      {
        question: 'Why do popular Japanese female names often feel so smooth and easy to accept?',
        answer: 'Because they usually balance natural sound, real-world usability, and a stable emotional tone at the same time. They feel accessible without sounding flat, which is why they tend to make a strong first impression so quickly.',
      },
      {
        question: 'Do popular female names feel too mainstream or repetitive?',
        answer: topCombos
          ? `Not necessarily. Even among combinations like ${topCombos}, popular female names still split into softer, more elegant, more modern, or slightly more distinctive lanes. Popular usually means broadly trusted — not personality-free.`
          : 'Not necessarily. Popular female names often signal natural flow and broad acceptance, but they can still lean soft, polished, bright, or more modern depending on the kanji and cadence.',
      },
      {
        question: 'How should I narrow down popular Japanese female names further?',
        answer: 'A practical first split is soft and approachable versus elegant and polished versus cleaner modern favorites. After that, narrow again by era feel: timeless everyday use versus more current and contemporary popularity.',
      },
    ]
  }

  if (kw.slug === 'popular-boy') {
    if (locale === 'zh') {
      return [
        {
          question: '热门日本男孩名字为什么常常给人一种稳妥又顺口的感觉？',
          answer: '因为这类名字通常同时照顾了读音流畅、现实使用率和整体气质稳定。它们既容易被理解，也不容易显得过度设计，所以会天然带一种“放心、耐用”的好感。',
        },
        {
          question: '热门男孩名会不会太普通、缺少辨识度？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，很多名字虽然属于主流路线，但在稳重感、明亮度、时代感和整体节奏上仍然差很多。热门更像是“高接受度”，并不等于“没有个性”。`
            : '不一定。热门男孩名通常只是说明它更自然、顺口、使用广，但依然可以偏经典、明亮、温和或更现代利落。关键是你想让这个热门名更偏哪一种男孩气质。',
        },
        {
          question: '如果我要从热门男孩名里继续缩小范围，先看什么最有效？',
          answer: '先区分你更想要经典稳重型、明亮亲切型，还是更当代利落的路线；然后再看它更偏长期耐用，还是更有一点现代记忆点。先用气质和时代感拆分，通常会比只盯着“热门”更有效。',
        },
      ]
    }

    return [
      {
        question: 'Why do popular Japanese boy names often feel so dependable and easy to like?',
        answer: 'Because they usually balance smooth sound, broad usability, and a stable emotional tone. They feel understandable and well-rooted without becoming flat, which is why they keep earning trust across generations.',
      },
      {
        question: 'Do popular boy names feel too ordinary or generic?',
        answer: topCombos
          ? `Not necessarily. Even among combinations like ${topCombos}, popular boy names can still differ a lot in steadiness, brightness, era feel, and overall rhythm. Popular often means widely trusted, not personality-free.`
          : 'Not necessarily. Popular boy names often signal natural flow, familiarity, and strong everyday usability, but they can still lean classic, cheerful, gentle, or distinctly modern depending on the kanji and pacing.',
      },
      {
        question: 'How should I narrow down popular Japanese boy names further?',
        answer: 'A useful first split is classic and dependable versus bright and approachable versus cleaner modern favorites. After that, narrow again by long-term feel: timeless everyday use versus a more current, polished edge.',
      },
    ]
  }

  if (kw.slug === 'powerful-girl') {
    if (locale === 'zh') {
      return [
        {
          question: 'powerful japanese girl names 这一页最适合怎么用？',
          answer: '这页适合你已经明确想看“强、能压场、有角色存在感”的女孩名字，但又不想只剩下夸张感的时候使用。重点不是单纯做凶，而是比较哪些女孩名既有力量，又能保留结构感、气质和全名完成度。',
        },
        {
          question: '强势女孩名字一定会听起来很硬、很不真实么？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，力量感可以来自锋利、门第感、气场、控制感或推进感，而不只是“很凶”。真正好用的 powerful girl names 往往既有压场力，也还保留现实可信度。`
            : '不一定。强势女孩名字不一定只能靠生硬或夸张来成立，它也可以来自尊贵感、稳定感、锋利度或安静但很强的存在感。关键是名字的整体节奏和全名气质是否站得住。',
        },
        {
          question: '如果我想继续缩小 powerful japanese girl names 的范围，先看什么最有效？',
          answer: '先区分你更想要锋利战斗型、尊贵统率型、明亮推进型，还是安静压场型；然后再看它更偏现实可用、宝宝灵感，还是角色命名。先按力量来源和使用场景拆分，通常会比只盯“强”这个字更有效。',
        },
      ]
    }

    return [
      {
        question: 'What is this powerful Japanese girl names page best used for?',
        answer: 'This page is most useful when you want female names that carry force, authority, and strong presence without collapsing into something cartoonishly harsh. The goal is not just aggression — it is finding girl names that feel powerful, shaped, and convincing as full names.',
      },
      {
        question: 'Do powerful girl names always sound too hard or unrealistic?',
        answer: topCombos
          ? `Not necessarily. Among combinations like ${topCombos}, the power can come from sharpness, rank, poise, pressure, or forward force — not only from sounding severe. The strongest results keep impact while still feeling believable.`
          : 'Not necessarily. Powerful girl names do not have to rely on blunt severity alone. They can feel strong through dignity, control, edge, momentum, or quiet command, as long as the full-name rhythm still holds together.',
      },
      {
        question: 'How should I narrow down powerful Japanese girl names further?',
        answer: 'A strong next step is to split first by where the power comes from: battle edge, noble authority, bright forward drive, or quiet command. After that, narrow again by use case — real-life naming, baby-name inspiration, or stronger character naming.',
      },
    ]
  }

  if (kw.slug === 'popular-male') {
    if (locale === 'zh') {
      return [
        {
          question: '热门日本男性名字为什么常常给人一种稳妥又顺口的感觉？',
          answer: '因为这类名字通常同时照顾了读音流畅、现实使用率和整体气质稳定。它们既容易被理解，也不容易显得过度设计，所以会天然带一种“放心、耐用”的好感。',
        },
        {
          question: '热门男性名字会不会太普通、缺少辨识度？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，很多名字虽然属于主流路线，但在稳重感、明亮度、时代感和整体节奏上仍然差很多。热门更像是“高接受度”，并不等于“没有个性”。`
            : '不一定。热门男性名字通常只是说明它更自然、顺口、使用广，但依然可以偏经典、明亮、温和或更现代利落。关键是你想让这个热门名更偏哪一种男性气质。',
        },
        {
          question: '如果我要从热门男性名字里继续缩小范围，先看什么最有效？',
          answer: '先区分你更想要经典稳重型、明亮亲切型，还是更当代利落的路线；然后再看它更偏长期耐用，还是更有一点现代记忆点。先用气质和时代感拆分，通常会比只盯着“热门”更有效。',
        },
      ]
    }

    return [
      {
        question: 'Why do popular Japanese male names often feel so dependable and easy to like?',
        answer: 'Because they usually balance smooth sound, broad usability, and a stable emotional tone. They feel understandable and well-rooted without becoming flat, which is why they keep earning trust across generations.',
      },
      {
        question: 'Do popular male names feel too ordinary or generic?',
        answer: topCombos
          ? `Not necessarily. Even among combinations like ${topCombos}, popular male names can still differ a lot in steadiness, brightness, era feel, and overall rhythm. Popular often means widely trusted, not personality-free.`
          : 'Not necessarily. Popular male names often signal natural flow, familiarity, and strong everyday usability, but they can still lean classic, cheerful, gentle, or distinctly modern depending on the kanji and pacing.',
      },
      {
        question: 'How should I narrow down popular Japanese male names further?',
        answer: 'A useful first split is classic and dependable versus bright and approachable versus cleaner modern favorites. After that, narrow again by long-term feel: timeless everyday use versus a more current, polished edge.',
      },
    ]
  }

  if (kw.slug === 'rare-girl') {
    if (locale === 'zh') {
      return [
        {
          question: '稀有日本女孩名字为什么不一定会显得刻意？',
          answer: '因为真正好用的稀有女孩名，重点不是为了稀有而牺牲自然度，而是在少见感、读音顺滑度和汉字意象之间找到平衡。它可以不常见，但仍然要像一个真实成立、能被长期使用的名字。',
        },
        {
          question: '稀有女孩名和独特女孩名最大的区别是什么？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合里，“稀有”通常更强调不容易撞名、气质安静、完成度高；而“独特”往往会再多一点锋利感、实验感或更强的画面记忆点。稀有不一定更张扬，反而常常更克制。`
            : '稀有女孩名通常更强调少见但自然、少见但耐看；独特女孩名则更容易带一点更强的轮廓、记忆点或设计感。前者偏克制，后者偏辨识度。',
        },
        {
          question: '如果我要继续缩小 rare japanese girl names 范围，先看什么最有效？',
          answer: '可以先分你更想要安静神秘、优雅少见、带一点发光感，还是更冷一点、更有强记忆点的路线；然后再看它更偏古典稀有还是现代轻盈。先按气质和时代感拆分，通常会比只看稀有度更有效。',
        },
      ]
    }

    return [
      {
        question: 'Why do rare Japanese girl names not have to feel forced?',
        answer: 'Because the strongest rare girl names are not trying to look unusual at all costs. They still need natural flow, believable kanji imagery, and a full-name rhythm that feels usable, so the rarity lands as refinement rather than strain.',
      },
      {
        question: 'What is the difference between a rare girl name and a unique girl name?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, rare girl names usually feel more restrained, harder to bump into, and quietly polished, while unique girl names often push a little further into sharper silhouette, stronger atmosphere, or more obvious memorability.`
          : 'Rare girl names usually lean toward uncommon-but-natural appeal, while unique girl names often feel more deliberately distinctive, sharper, or more visibly styled. Rare tends to be quieter; unique tends to stand out faster.',
      },
      {
        question: 'How should I narrow down rare Japanese girl names further?',
        answer: 'A good next step is to decide whether you want quiet mystery, elegant rarity, a little more luminous softness, or something cooler and more unforgettable. After that, split again by era feel: classical rare versus lighter modern rare.',
      },
    ]
  }

  if (kw.slug === 'unique-girl') {
    if (locale === 'zh') {
      return [
        {
          question: '独特日本女孩名字为什么不一定会显得过于夸张？',
          answer: '因为真正好用的独特女孩名通常不是为了“怪”而怪，而是在少见感、读音流畅度和汉字意象之间找到平衡。它可以稀有、有画面感，但依然要让人觉得是一个成立的名字。',
        },
        {
          question: '独特女孩名和普通冷门女孩名最大的区别是什么？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合里，“独特”通常不只是使用频率低，还会多一点整体气氛、画面感或节奏记忆点。真正有意思的是它的气质成立，而不只是单纯不常见。`
            : '独特女孩名不只是少见而已，它往往还带着更明确的气质：可能更神秘、更轻盈、更锋利，或者更有时代感。重点不在冷门本身，而在它是否有完整的名字美感。',
        },
        {
          question: '如果我要继续缩小独特女孩名范围，先看什么最有效？',
          answer: '先区分你更想要安静神秘、纤细优雅，还是更冷感、更有锋利记忆点的路线；再看它更偏古典稀有还是现代轻盈。先用气质和时代感拆分，通常会比只看“稀有度”更有效。',
        },
      ]
    }

    return [
      {
        question: 'Why do unique Japanese girl names not have to feel too extreme?',
        answer: 'Because the best ones are not unusual just for shock value. They still need smooth sound, believable kanji imagery, and a coherent emotional tone, so the result feels rare without becoming awkward or overdesigned.',
      },
      {
        question: 'What makes a unique girl name different from a merely uncommon one?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, a unique girl name is usually doing more than being low-frequency. It often carries a stronger atmosphere, image, or rhythm that makes it memorable as a full name, not just unusual on paper.`
          : 'A unique girl name is not just infrequent. It usually brings a clearer mood — perhaps mysterious, airy, sharp, lyrical, or quietly modern — so the appeal comes from full-name character, not rarity alone.',
      },
      {
        question: 'How should I narrow down unique Japanese girl names further?',
        answer: 'A good next step is to decide whether you want quiet mystery, delicate elegance, or something cooler and more striking. After that, split again by era feel: old-world rare versus modern airy. That usually works better than sorting by rarity alone.',
      },
    ]
  }

  if (kw.slug === 'unique-boy') {
    if (locale === 'zh') {
      return [
        {
          question: '独特日本男孩名字为什么不一定会显得太中二或太夸张？',
          answer: '因为真正成立的独特男孩名，重点不是故意做得很怪，而是在少见感、读音利落度和汉字气质之间找到平衡。它可以冷、可以少见、可以有锋芒，但仍然要像一个真的名字。',
        },
        {
          question: '独特男孩名和普通冷门男孩名最大的区别是什么？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合里，“独特”往往不只是出现频率低，还多了一层完整的气氛、节奏或画面感。真正有辨识度的，是它作为全名能不能站得住。`
            : '独特男孩名不只是冷门而已，它通常还会更有气场、更有轮廓，可能偏冷、偏静、偏硬朗，或者更有现代感。重点不是少见本身，而是整体气质是否成立。',
        },
        {
          question: '如果我要继续缩小独特男孩名范围，先看什么最有效？',
          answer: '先区分你更想要冷感锋利、安静神秘，还是自然稳重但少见的路线；再看它更偏古典厚重还是现代利落。先用气质和时代感拆分，通常会比只盯着“稀有度”更有效。',
        },
      ]
    }

    return [
      {
        question: 'Why do unique Japanese boy names not have to feel overly dramatic?',
        answer: 'Because the strongest ones are not unusual just to show off. They still need believable sound, coherent kanji imagery, and a full-name rhythm that feels usable, so the rarity comes across as intentional rather than forced.',
      },
      {
        question: 'What makes a unique boy name different from a merely uncommon one?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, a unique boy name usually does more than sit at low frequency. It often carries a clearer atmosphere, stronger silhouette, or more memorable rhythm as a full name.`
          : 'A unique boy name is not just rare on paper. It usually has a stronger mood — perhaps sharper, quieter, more grounded, or more modern — so the appeal comes from full-name character as much as rarity.',
      },
      {
        question: 'How should I narrow down unique Japanese boy names further?',
        answer: 'A useful next step is to decide whether you want something sharp and cool, quietly mysterious, or more natural but still uncommon. After that, split again by era feel: classical and weighty versus modern and clean-cut.',
      },
    ]
  }

  if (kw.slug === 'cute') {
    if (locale === 'zh') {
      return [
        {
          question: '可爱日本名字为什么不等于只适合小孩或角色？',
          answer: '因为真正好用的可爱名字，不只是第一耳朵软萌，而是同时兼顾顺口、亲和、视觉意象和长期耐看度。它可以很甜、很轻，也依然适合现实使用。',
        },
        {
          question: '可爱名字和漂亮名字最大的区别是什么？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合里，“可爱”通常会多一点轻快、亲近和灵动感；而“漂亮”更强调完成度、精致感和更安静的美感。两者会重叠，但可爱的重心通常更偏好感和活力。`
            : '可爱名字通常更强调亲近感、轻快感和让人想靠近的第一印象；漂亮名字则更偏优雅、精致和更安静的完成度。两者会有交集，但重心不完全一样。',
        },
        {
          question: '如果我想继续缩小可爱日本名字范围，先看什么最有效？',
          answer: '先区分你想要的是甜软亲和、活泼弹跳、秀气精致，还是更明亮闪闪的可爱路线；然后再看它更偏经典耐看还是现代轻盈。先用可爱感的具体方向缩小范围，通常最有效。',
        },
      ]
    }

    return [
      {
        question: 'Why are cute Japanese names not only for little kids or fictional characters?',
        answer: 'Because the best cute names do more than sound adorable at first glance. They also carry smooth rhythm, easy warmth, and enough balance to stay believable and attractive in everyday use.',
      },
      {
        question: 'What is the difference between a cute name and a pretty name?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, cute names usually carry more bounce, sweetness, and approachable energy, while pretty names lean more polished, graceful, and quietly refined. They can overlap, but the emotional center is different.`
          : 'Cute names usually emphasize warmth, bounce, and approachable charm, while pretty names lean more toward polish, elegance, and a calmer sense of beauty. The two can overlap, but they are not exactly the same lane.',
      },
      {
        question: 'How should I narrow down cute Japanese names further?',
        answer: 'A useful next step is to decide whether you want something sweeter, more playful, more delicate, or more bright and sparkling. After that, split again by feel: classic lovable softness versus lighter modern cuteness.',
      },
    ]
  }

  if (kw.slug === 'pretty-female') {
    if (locale === 'zh') {
      return [
        {
          question: '漂亮日本女孩名字为什么不只是“选最好看的字”？',
          answer: '因为真正漂亮的女孩名，不只是单字好看，而是全名读音、字义、节奏和气氛一起成立。一个字很美，不代表组合起来就自然；这页更适合看整体完成度。',
        },
        {
          question: '漂亮女孩名和温柔女孩名最大的区别是什么？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合里，“漂亮”通常会更强调精致感、画面感和整体完成度；温柔名字则更偏舒服、柔和和容易亲近。漂亮不一定更冷，只是更注重“美感被完整地做出来”。`
            : '漂亮女孩名通常更强调优雅、精致、梦幻或更强的视觉画面感；温柔女孩名则更偏柔和、舒服、自然亲近。两者会重叠，但“漂亮”通常更强调完成度。',
        },
        {
          question: '如果我想继续缩小漂亮日本女孩名字范围，先看什么最有效？',
          answer: '可以先区分你更想要优雅精致、温柔柔和、梦幻微神秘，还是更明亮有记忆点的路线；然后再看它更偏现实可用、适合作品角色，还是更适合宝宝灵感。先用美感方向和使用场景一起缩小范围，通常最有效。',
        },
      ]
    }

    return [
      {
        question: 'Why is a pretty Japanese girl name not just about choosing beautiful kanji?',
        answer: 'Because a genuinely pretty girl name works as a full composition. Sound, rhythm, kanji imagery, and emotional tone all need to align; beautiful individual characters alone do not guarantee a beautiful full name.',
      },
      {
        question: 'What is the difference between a pretty girl name and a gentle girl name?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, pretty girl names usually feel more polished, visual, and carefully shaped, while gentle girl names lean softer, warmer, and easier to approach. Pretty does not have to be colder — it just aims for a stronger sense of finish.`
          : 'Pretty girl names usually lean more polished, graceful, dreamy, or visually striking, while gentle girl names lean softer, warmer, and more naturally approachable. They overlap, but pretty names usually emphasize finish and beauty more strongly.',
      },
      {
        question: 'How should I narrow down pretty Japanese girl names further?',
        answer: 'A practical next step is to choose whether you want something more graceful, softer, dreamier, or brighter and more memorable. After that, narrow again by use: everyday realism, baby-name inspiration, or stronger character presence.',
      },
    ]
  }

  if (kw.slug === 'beautiful-female') {
    if (locale === 'zh') {
      return [
        {
          question: 'beautiful Japanese girl names 这一页和 pretty girl names 有什么区别？',
          answer: '这页会更强调“整体美感成立”这件事：不只是字面漂亮，而是读音、节奏、气氛和汉字画面一起显得优雅、静美、耐看。pretty girl names 偏精致完成度；beautiful girl names 会更强调柔和、从容、带余韵的漂亮。',
        },
        {
          question: '怎样判断一个日本女孩名是真的漂亮，而不是只靠几个好看的字？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，更值得看的通常不是单个字，而是整套全名念出来是否顺、画面是否统一、汉字是不是一起指向同一种美感。真正漂亮的名字往往不会只有“字很好看”，而是全名气氛也很完整。`
            : '最有效的方法是把全名连起来看：读音是不是顺、姓和名的节奏是不是自然、汉字意象有没有互相打架。真正漂亮的名字通常是整体完成度高，而不是只靠某个单字出彩。',
        },
        {
          question: '如果我想继续缩小 beautiful Japanese girl names 范围，先看什么最有效？',
          answer: '可以先分你更想要优雅静美、花感明亮、月色梦幻，还是更精致有记忆点的路线；再看你更偏古典耐看还是轻盈现代。先按美感中心和时代感一起拆，通常会比单看字义更快。',
        },
      ]
    }

    return [
      {
        question: 'How is this beautiful Japanese girl names page different from a pretty girl names page?',
        answer: 'This page leans more into beauty as a full-name atmosphere. Instead of focusing only on polish or visual prettiness, it prioritizes names whose sound, rhythm, kanji imagery, and emotional tone all land as graceful, serene, and quietly beautiful together.',
      },
      {
        question: 'How can I tell whether a Japanese girl name is truly beautiful rather than just built from pretty kanji?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, the strongest results are usually the ones whose full rhythm, imagery, and surname-given-name flow all agree with each other. A beautiful name is rarely just a stack of attractive kanji; it feels coherent as a whole.`
          : 'The best test is the full-name composition. Say it aloud, check the flow between surname and given name, and see whether the kanji imagery points in one unified direction. A truly beautiful name feels composed, not merely decorated.',
      },
      {
        question: 'How should I narrow down beautiful Japanese girl names further?',
        answer: 'A practical next step is to decide whether you want something more graceful and serene, more floral and luminous, more moonlit and dreamy, or more refined and memorable. Then narrow again by feel: classical elegance versus lighter modern beauty.',
      },
    ]
  }


  if (kw.slug === 'last-names-female') {
    if (locale === 'zh') {
      return [
        {
          question: '“Japanese girl last names” 这一页为什么本质上还是在看姓氏？',
          answer: '因为日语里的姓氏本身没有像名字那样严格按性别切分。这一页说的“girl last names”，更准确是在筛选那些和女性名字搭起来更柔和、更顺口、更容易显得优雅或清新的姓氏。',
        },
        {
          question: '怎样判断一个日本姓氏和女孩名搭起来是否真的好看？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，最值得看的通常是姓和名连起来后的节奏、轻重、画面是不是统一。真正适合女孩名的姓氏，往往不是“本身很女性化”，而是它能把整套全名托得更柔和、更完整。`
            : '最有效的方法是直接看全名组合：姓和名连起来是不是顺、是不是过重、有没有一边太硬一边太轻。适合女孩名的姓氏，通常会让整套全名更柔和、更清楚，也更有完成度。',
        },
        {
          question: '如果我想继续缩小 Japanese girl last names 范围，先看什么最有效？',
          answer: '可以先分你更想要柔和优雅、自然清新、还是更精致利落的姓氏路线；然后再看你更偏现实常用、角色命名，还是想要一点稀少感。先按姓氏气质拆，再看全名落地感，通常最有效。',
        },
      ]
    }

    return [
      {
        question: 'Why is this Japanese girl last names page still basically a surname page?',
        answer: 'Because Japanese surnames are not rigidly divided by gender the way given names often are. In practice, this page is about surnames that pair more softly, elegantly, or naturally with female given names in full-name combinations.',
      },
      {
        question: 'How can I tell whether a Japanese surname works well with girl names?',
        answer: topCombos
          ? `With combinations like ${topCombos}, the useful test is the full-name balance: rhythm, weight, and imagery. A surname does not need to be inherently feminine — it just needs to help the full name land as softer, cleaner, or more graceful.`
          : 'The best test is the full-name composition. Check whether the surname and given name flow smoothly together, whether one side feels too heavy, and whether the combined imagery points in a coherent direction. Good girl-friendly surnames usually improve softness and finish rather than sounding explicitly feminine on their own.',
      },
      {
        question: 'How should I narrow down Japanese girl last names further?',
        answer: 'A practical next step is to choose whether you want something softer and elegant, more scenic and fresh, or more polished and refined. After that, narrow again by use: realistic everyday naming, character naming, or slightly rarer combinations.',
      },
    ]
  }

  if (kw.slug === 'last-names-male') {
    if (locale === 'zh') {
      return [
        {
          question: '“Japanese male last names” 这一页为什么还是以姓氏搭配为主？',
          answer: '因为日本姓氏本身不像名字那样会严格区分男女。这一页里的“male”更接近一种搭配语境，指的是那些和男性名字组合时更稳、更硬朗、更有现代男性角色感的姓氏路线。',
        },
        {
          question: '怎样判断一个日本姓氏放进男性全名后是否足够成立？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，最好看的通常不是单个姓多生僻，而是姓和名连起来后的节奏够不够稳、骨架够不够清楚、整体是不是有现实成立感。真正适合男性向全名的姓氏，往往会让整套名字更扎实、更有轮廓。`
            : '最有效的方法是直接看全名组合：姓和名连起来后是不是够稳、有没有一边太轻、整体节奏是不是清楚。适合男性向全名的姓氏，通常会让整套名字更扎实、更利落，也更容易显得可信。',
        },
        {
          question: '如果我想继续缩小 Japanese male last names 范围，先看什么最有效？',
          answer: '可以先分你更想要稳重现实、利落现代，还是更有山川地景感的姓氏路线；然后再看你是偏现实常用、角色命名，还是想保留一点冷感与记忆点。先按姓氏骨架拆，再看全名落地感，通常最有效。',
        },
      ]
    }

    return [
      {
        question: 'Why is this Japanese male last names page still mainly about surname pairing?',
        answer: 'Because Japanese surnames are not strictly gendered the way given names often are. Here, “male” is mostly a pairing context, meaning surnames that tend to feel steadier, sharper, or more convincingly masculine when combined with male given names.',
      },
      {
        question: 'How can I tell whether a Japanese surname works in a male-leaning full name?',
        answer: topCombos
          ? `With combinations like ${topCombos}, the useful test is not rarity by itself but structure, pace, and weight. Strong male-leaning surnames usually help the whole name feel steadier, more grounded, and more believable in current-era use.`
          : 'The best test is the full-name composition. Check whether the surname gives the name enough structure, whether the rhythm feels stable instead of flimsy, and whether the combined imagery lands as grounded or sharp rather than vague. Good male-leaning surnames usually improve solidity and definition.',
      },
      {
        question: 'How should I narrow down Japanese male last names further?',
        answer: 'A practical next step is to choose whether you want something more dependable and realistic, cleaner and more modern, or more scenic and terrain-rooted. After that, narrow again by use: everyday realism, character naming, or slightly more stylized combinations.',
      },
    ]
  }

  if (kw.slug === 'last-names-unique') {
    if (locale === 'zh') {
      return [
        {
          question: '“rare japanese last names” 这页最适合怎么用？',
          answer: '这页更适合你先从“少见但成立”的姓氏出发来挑方向，而不是只追求越怪越好。重点是比较哪些日本姓氏既有稀有感、又还能撑住全名的节奏、质感和现实可信度。',
        },
        {
          question: '怎样判断一个日本姓氏是真的独特，还是只是看起来太生僻？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，关键不只是少见，而是少见之后全名仍然顺、仍然像一个真实会存在的人名或角色名。好用的 rare surname 往往会带来更强的记忆点，但不会让整套名字显得硬拗。`
            : '最有效的方法是把姓氏放回全名里看。真正好用的稀有姓氏，通常会让全名更有记忆点、更有轮廓，但不会因为过分生僻而破坏节奏或真实感。',
        },
        {
          question: '如果我想继续缩小 rare japanese last names 的范围，先看什么最有效？',
          answer: '可以先分你更想要安静神秘、偏旧家系感，还是更适合角色命名的锋利路线；然后再看你是希望全名仍然现实可信，还是允许它更有戏剧张力。先按“少见感如何落地”拆，会比只看罕见度更有效。',
        },
      ]
    }

    return [
      {
        question: 'What is this rare Japanese last names page best used for?',
        answer: 'This page works best when you want surnames that feel uncommon without collapsing into novelty for novelty’s sake. The goal is to compare rare Japanese surnames that still hold together well inside believable full names.',
      },
      {
        question: 'How can I tell whether a Japanese surname is truly distinctive instead of just overly obscure?',
        answer: topCombos
          ? `With combinations like ${topCombos}, the useful test is whether the rarity improves recall, texture, and silhouette without making the full name feel forced. Strong rare surnames stand out, but they still let the whole name feel usable and coherent.`
          : 'The best test is to put the surname back into a full name. Good rare surnames add recall, atmosphere, and structure, but they do not make the whole combination feel awkward, overdesigned, or unbelievable.',
      },
      {
        question: 'How should I narrow down rare Japanese last names further?',
        answer: 'A practical next step is to choose whether you want something quieter and mysterious, more lineage-heavy and old-house in tone, or sharper and more character-forward. After that, narrow again by use: realistic naming, pen names, or story-cast naming.',
      },
    ]
  }

  if (kw.slug === 'last-names-cool') {
    if (locale === 'zh') {
      return [
        {
          question: '“cool japanese last names” 这一页最适合怎么用？',
          answer: '这页最适合你想先从姓氏的冷感、锋利感和轮廓感出发，再去搭配全名的时候用。它不是单看哪个姓最罕见，而是更适合比较哪些日本姓氏读起来更利落、画面更克制、放进角色名里更有压场感。',
        },
        {
          question: '怎样判断一个日本姓氏到底是“酷”，还是只是看起来生僻？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，最值得看的是姓和名连起来后的节奏是不是干净、重音是不是稳、意象是不是收得住。真正有 cool 感的姓氏，通常不是靠冷僻取胜，而是能让整套全名更利落、更有轮廓。`
            : '最有效的方法是看全名组合而不是只看单个汉字。真正有 cool 感的日本姓氏，通常会让全名更利落、更有边界，也更像电影角色、游戏角色或成熟一点的人物名字；如果只是生僻但节奏散，它不一定真的酷。',
        },
        {
          question: '如果我想继续缩小 cool japanese last names 范围，先看什么最有效？',
          answer: '可以先分你更想要干净冷静、偏锋利现代，还是更有夜色感、风景感的姓氏路线；然后再看你是更偏现实里可用，还是更适合角色命名。先按气质轮廓拆，再看全名节奏，通常最有效。',
        },
      ]
    }

    return [
      {
        question: 'What is this cool Japanese last names page best used for?',
        answer: 'This page works best when you want to start from the surname side and look for sharper, cleaner, or more high-presence Japanese last names before deciding on the given name. It is less about rarity by itself and more about finding surnames that give the full name a cooler silhouette and stronger finish.',
      },
      {
        question: 'How can I tell whether a Japanese surname is actually cool rather than just obscure?',
        answer: topCombos
          ? `With combinations like ${topCombos}, the useful test is full-name control: rhythm, weight, and imagery. A truly cool surname usually makes the whole name feel cleaner, tighter, and more intentional — not merely uncommon.`
          : 'The best test is the full-name composition. Cool Japanese surnames usually sharpen the overall rhythm, create a clearer silhouette, and feel controlled rather than noisy. Obscurity alone does not create that effect.',
      },
      {
        question: 'How should I narrow down cool Japanese last names further?',
        answer: 'A practical next step is to decide whether you want something cleaner and restrained, sharper and more modern, or darker and more cinematic. Then narrow again by use: realistic naming, character naming, or names with a slightly stronger dramatic edge.',
      },
    ]
  }

  if (kw.slug === 'last') {
    if (locale === 'zh') {
      return [
        {
          question: '“my surname in japanese” 这一页最适合怎么用？',
          answer: '这页最适合你已经确定想先从“姓氏”而不是“名字”入手时使用。它会把常见、自然、带地景来源以及更有辨识度的日本姓氏放在一起比较，方便你先判断哪种 family name 气质最接近你要的方向。',
        },
        {
          question: '为什么看日本姓氏时，最好还是连全名组合一起看？',
          answer: topCombos
            ? `因为像 ${topCombos} 这样的组合，能直接告诉你一个姓放进全名后到底是更自然、更多画面感，还是会显得太硬、太散。单看姓氏容易只看到汉字，连全名一起看才更容易判断真实使用感。`
            : '因为很多日本姓氏单独看很顺眼，但一旦和 given name 连起来，节奏、轻重、甚至画面都可能变掉。一起看全名组合，才更容易判断这个姓到底适不适合现实使用或角色命名。',
        },
        {
          question: '如果我想继续缩小 Japanese surnames 范围，先看什么最有效？',
          answer: '可以先分你更想要现实里常见、地景来源明确、自然秀气，还是更有记忆点的姓氏路线；然后再看你更在意真实感、角色感，还是和特定 given name 的搭配顺口度。先按姓氏气质拆，再看全名落地感，通常最有效。',
        },
      ]
    }

    return [
      {
        question: 'What is this my surname in Japanese page best used for?',
        answer: 'This page is most useful when you want to start from the surname side of Japanese naming rather than the given name. It helps you compare familiar, scenic, nature-linked, and more distinctive family-name directions before you decide what kind of full name you want to build.',
      },
      {
        question: 'Why is it still useful to look at full-name combinations on a surname page?',
        answer: topCombos
          ? `Because combinations like ${topCombos} show whether a surname actually works once it enters a complete name. Looking at the surname alone can make you focus only on the kanji, while full-name combinations reveal rhythm, realism, and how the surname carries the overall tone.`
          : 'Because a Japanese surname may look appealing on its own but feel too heavy, too flat, or mismatched once paired with a given name. Full-name combinations make the surname easier to evaluate in realistic use.',
      },
      {
        question: 'How should I narrow down Japanese surnames further?',
        answer: 'A practical next step is to decide whether you want something more familiar, more landscape-rooted, softer and prettier, or simply more distinctive. Then narrow again by use: realistic naming, character naming, or pairing with a specific given-name style.',
      },
    ]
  }

  if (kw.slug === 'cute-female') {
    if (locale === 'zh') {
      return [
        {
          question: '可爱日本女孩名字为什么不一定会显得太幼态？',
          answer: '因为好用的可爱女孩名通常不是只靠卖萌，而是把顺耳、甜感、轻盈和真实可用性放在一起平衡。它可以听起来软、亮、甜，但依然能作为现实里长期使用的名字成立。',
        },
        {
          question: '可爱女孩名和漂亮女孩名最大的区别是什么？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合里，“可爱”通常更强调亲近感、轻盈感和甜感；“漂亮”则更强调精致、画面和完成度。两者会重叠，但可爱女孩名通常更像让人自然想靠近。`
            : '可爱女孩名通常更偏甜、软、灵动和容易亲近；漂亮女孩名则更偏精致、梦幻和完成度更强的美感。可爱不一定更幼，只是气质更轻、更亲和。',
        },
        {
          question: '如果我想继续缩小 cute Japanese girl names 的范围，先看什么最有效？',
          answer: '可以先区分你更想要软萌贴近、甜感花朵、明亮活泼，还是更精致秀气的路线；然后再看它更偏日常亲切、轻盈当代，还是更有一点记忆点。先用可爱感方向和时代感拆分，通常最有效。',
        },
      ]
    }

    return [
      {
        question: 'Why do cute Japanese girl names not have to feel childish?',
        answer: 'Because the strongest cute girl names are not trying to sound babyish. They balance sweetness, softness, brightness, and real-world usability, so the result can feel adorable without losing credibility as a full everyday name.',
      },
      {
        question: 'What is the difference between a cute girl name and a pretty girl name?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, cute girl names usually lean more toward warmth, bounce, sweetness, and approachability, while pretty girl names often feel more polished, visual, and carefully finished. They overlap, but cute names usually invite you in faster.`
          : 'Cute girl names usually lean sweeter, softer, lighter, and easier to approach, while pretty girl names tend to feel more polished, dreamy, or visually refined. The overlap is real, but cute names usually prioritize warmth and charm first.',
      },
      {
        question: 'How should I narrow down cute Japanese girl names further?',
        answer: 'A practical next step is to decide whether you want something softer, sweeter, brighter, or more delicate. After that, narrow again by overall feel: everyday familiarity, lighter modern style, or stronger memorability.',
      },
    ]
  }

  if (kw.slug === 'cool') {
    if (locale === 'zh') {
      return [
        {
          question: '什么样的日本名字会让人觉得“酷”？',
          answer: topCombos
            ? `这页会展示像 ${topCombos} 这样的精选组合。通常所谓“酷”并不只是少见，而是读音利落、整体有压低的气场，或者带一点冷感、神秘感与现代锋芒。`
            : '让人觉得“酷”的日本名字，通常不是单靠生僻字，而是靠读音节奏、整体轮廓、汉字意象与姓名组合后的气场一起成立。',
        },
        {
          question: '挑酷感日本名字时，应该先看读音还是看汉字含义？',
          answer: '最好先看全名读起来是否干净利落，再看汉字是否支撑这种冷感、锋利感或现代感。因为真正好用的酷名字，往往是声音先成立，含义再把气质补完整。',
        },
        {
          question: '酷感名字常见会用哪些意象？',
          answer: '常见意象包括夜色、星空、冷水、风、山脊、光刃、金石感与带距离感的自然画面。这些元素会让名字显得更有镜头感，同时保留现实可用性。',
        },
      ]
    }

    return [
      {
        question: 'What makes a Japanese name feel cool?',
        answer: topCombos
          ? `This page highlights combinations such as ${topCombos}. A cool Japanese name usually does more than look rare: it sounds clean, lands with controlled presence, and carries a colder, sleeker, or more modern edge.`
          : 'A cool Japanese name usually feels cool through sound, rhythm, kanji imagery, and full-name presence together rather than through rarity alone.',
      },
      {
        question: 'When choosing a cool Japanese name, should I prioritize sound or meaning first?',
        answer: 'Start with the sound of the full name. If it already feels crisp, memorable, and controlled, then check whether the kanji reinforce that mood with sharper, darker, cleaner, or more modern imagery. The strongest cool names usually work in both sound and meaning.',
      },
      {
        question: 'What kinds of imagery are common in cool Japanese names?',
        answer: 'Cool Japanese names often lean on imagery like night sky, stars, cold water, wind, ridgelines, flashes of light, stone, metal, or distant natural space. Those motifs give a name cinematic edge while keeping it believable and usable.',
      },
    ]
  }

  if (kw.slug === 'cool-male') {
    if (locale === 'zh') {
      return [
        {
          question: '什么样的日本男孩名字会显得更“酷”？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，通常不是只靠冷门，而是靠更干净利落的读音、偏收束的力量感，以及带一点距离感或锋芒感的整体气场来成立。`
            : '酷感日本男孩名通常不是单靠生僻字，而是靠读音线条、汉字意象和全名压场感一起成立。',
        },
        {
          question: '酷感男孩名和热血型男孩名最大的区别是什么？',
          answer: '酷感男孩名通常更克制、更利落，也更像把力量压低后留下来的存在感；热血型名字则更外放、更明亮，常常带更直接的英雄感和动作感。',
        },
        {
          question: '如果我要继续缩小 cool Japanese boy names 的范围，先看什么最有效？',
          answer: '先区分你更想要冷感锋利、安静神秘、现代利落，还是更有角色记忆点的路线；再看它更偏现实可用还是更适合作品角色。先用气质和使用场景拆分，通常最有效。',
        },
      ]
    }

    return [
      {
        question: 'What makes a Japanese boy name feel cool rather than merely uncommon?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, cool boy names usually rely less on rarity by itself and more on cleaner rhythm, tighter full-name control, and a sharper or more distant kind of presence.`
          : 'A cool Japanese boy name usually feels cool through crisp sound, controlled full-name rhythm, and kanji imagery that carries edge, restraint, or modern presence — not through rarity alone.',
      },
      {
        question: 'What is the difference between a cool boy name and a more heroic boy name?',
        answer: 'Cool boy names often feel more restrained, sleek, and pressure-controlled, while heroic names tend to feel brighter, more forward-driving, and openly energetic. Both can be strong, but cool names usually sound more composed than triumphant.',
      },
      {
        question: 'How should I narrow down cool Japanese boy names further?',
        answer: 'A practical next step is to choose whether you want something sharper, quieter, more modern, or more character-heavy. After that, narrow again by use: realistic everyday naming versus higher-impact story naming.',
      },
    ]
  }

  if (kw.slug === 'dark') {
    if (locale === 'zh') {
      return [
        {
          question: '什么样的日本名字会显得更“暗黑”？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，暗黑感通常不是靠生僻本身，而是靠更冷的读音、更收束的节奏，以及神秘、锋利、月色或危险感这些意象一起成立。`
            : '暗黑系日本名字通常不是单靠冷门字，而是靠读音、节奏、汉字意象与整套全名的氛围一起把神秘、冷感或危险感立起来。',
        },
        {
          question: 'dark japanese names 和 cool japanese names 最大的区别是什么？',
          answer: 'cool 更强调利落、压场和现代轮廓；dark 则更强调阴影感、神秘感、情绪重量，或者一种更像夜色与故事张力的氛围。两者会重叠，但 dark 通常更偏情绪和画面。',
        },
        {
          question: '如果我想继续缩小 dark japanese names 的范围，先看什么最有效？',
          answer: '先区分你更想要暗影神秘、锋利危险、月色冷美，还是更偏角色电影感；再看它更适合现实可用名字，还是更适合作品角色。先按气氛轮廓和用途拆分，通常最有效。',
        },
      ]
    }

    return [
      {
        question: 'What makes a Japanese name feel dark rather than merely rare or cool?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, dark Japanese names usually feel darker through colder rhythm, heavier atmosphere, and kanji imagery that leans shadowy, mysterious, moonlit, or quietly dangerous — not through rarity alone.`
          : 'A dark Japanese name usually feels dark through atmosphere first: colder rhythm, stronger emotional weight, and kanji imagery that suggests shadow, mystery, danger, or moonlit distance rather than rarity alone.',
      },
      {
        question: 'What is the difference between dark Japanese names and cool Japanese names?',
        answer: 'Cool names usually emphasize sleekness, control, edge, and modern presence. Dark names can overlap with that, but they usually carry more shadow, emotional gravity, mystery, or story tension. Cool is often about silhouette; dark is often about atmosphere.',
      },
      {
        question: 'How should I narrow down dark Japanese names further?',
        answer: 'A practical next step is to choose whether you want something more shadowy and mysterious, sharper and more dangerous, more moonlit and elegant, or more cinematic and character-heavy. After that, narrow again by use: realistic naming versus story-driven naming.',
      },
    ]
  }

  if (kw.slug === 'cool-female') {
    if (locale === 'zh') {
      return [
        {
          question: '什么样的日本女孩名字会显得更“酷”？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，通常不是靠生僻取胜，而是靠更干净利落的读音、更收束的气场，以及一点冷感、锋芒或优雅压场感来成立。`
            : '酷感日本女孩名通常不是单靠冷门字，而是靠读音、节奏、汉字意象与整套全名的压场感一起成立。',
        },
        {
          question: '酷感女孩名和漂亮女孩名最大的区别是什么？',
          answer: '酷感女孩名通常更克制、更有边界，也更强调冷感、轮廓和记忆点；漂亮女孩名则更偏优雅、柔和、精致和整体美感完成度。它们会重叠，但“酷”通常更强调力量被收住后的存在感。',
        },
        {
          question: '如果我要继续缩小 cool female japanese names 的范围，先看什么最有效？',
          answer: '先区分你更想要冷感锋利、安静神秘、现代利落，还是更偏优雅高压场的路线；再看它更偏现实可用还是更适合作品角色。先按气质轮廓和使用场景拆分，通常最有效。',
        },
      ]
    }

    return [
      {
        question: 'What makes a Japanese girl name feel cool rather than merely pretty or uncommon?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, cool girl names usually stand out through cleaner rhythm, stronger silhouette, and a more controlled kind of presence rather than rarity alone.`
          : 'A cool Japanese girl name usually feels cool through crisp sound, controlled full-name rhythm, and kanji imagery that adds edge, distance, or poised strength — not through rarity alone.',
      },
      {
        question: 'What is the difference between a cool girl name and a pretty girl name?',
        answer: 'Cool girl names usually feel more restrained, sharper, and more high-presence, while pretty girl names lean more polished, graceful, soft, or visually beautiful. They can overlap, but cool names usually prioritize silhouette and control first.',
      },
      {
        question: 'How should I narrow down cool Japanese girl names further?',
        answer: 'A practical next step is to choose whether you want something sharper, quieter, more modern, or more elegant with strong presence. After that, narrow again by use: realistic everyday naming versus stronger character-style naming.',
      },
    ]
  }

  if (kw.slug === 'cute-boy') {
    if (locale === 'zh') {
      return [
        {
          question: '可爱日本男孩名字为什么不会显得太幼态？',
          answer: '因为好的可爱男孩名通常不是单纯卖萌，而是在顺口、亲和、少年感和真实使用感之间找到平衡。它可以听起来温柔或明亮，但依然适合作为现实里长期使用的名字。',
        },
        {
          question: '可爱男孩名和普通温柔男孩名最大的区别是什么？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合里，“可爱”通常多了一点轻盈感、灵动感或亲近感。它不一定更弱，反而常常更有记忆点，只是气质更偏柔和、清新或活泼。`
            : '可爱男孩名通常会比一般温柔男孩名多一点轻快感、少年感或让人想亲近的感觉。重点不是幼态，而是更自然地传达软萌、明亮或机灵的一面。',
        },
        {
          question: '如果我想继续缩小可爱男孩名范围，先看什么最有效？',
          answer: '先区分你更想要软萌温柔、阳光开朗、淘气机灵，还是自然清新；再看它更偏经典耐看还是当代少年感。先用气质和时代感缩小范围，通常会比只看“可爱”两个字更有效。',
        },
      ]
    }

    return [
      {
        question: 'Why do cute Japanese boy names not have to feel childish?',
        answer: 'Because the best ones are not just trying to sound adorable. They balance softness, warmth, youthful energy, and real-world usability, so the result can feel cute without losing credibility as an everyday name.',
      },
      {
        question: 'What makes a cute boy name different from a simply gentle boy name?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, cute boy names usually add a little bounce, brightness, or easy affection. They are not necessarily weaker — just lighter, friendlier, and often a bit more memorable.`
          : 'Cute boy names often carry more bounce, playfulness, or approachable charm than names that are only gentle. The difference is less about sounding childish and more about sounding light, fresh, and easy to love.',
      },
      {
        question: 'How should I narrow down cute Japanese boy names further?',
        answer: 'A good next step is to choose the kind of cuteness you want: soft, sunny, playful, or fresh. After that, narrow again by era — classic and steady versus modern and youthful. That usually works better than treating cute as one single style.',
      },
    ]
  }

  if (kw.slug === 'baby') {
    if (locale === 'zh') {
      return [
        {
          question: '日本宝宝名字为什么不能只看“可爱”就决定？',
          answer: '因为真正适合宝宝长期使用的名字，除了小时候听起来亲切可爱，还要兼顾读音顺口、汉字自然、长大后依然成立。好用的宝宝名通常是柔和、稳妥和辨识度之间的平衡。',
        },
        {
          question: '宝宝名和普通日文名最大的区别是什么？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合里，适合宝宝使用的名字通常会更重视第一印象的亲和力、长期使用感，以及全名搭配时是否自然。重点不只是“好听”，而是能不能陪伴一个人从小时候用到长大。`
            : '宝宝名通常更看重温柔度、可用性和成长后的自然感。它不一定要最热门，但往往要更顺口、更稳定，也更适合现实使用。',
        },
        {
          question: '如果我要继续缩小宝宝名字范围，先看什么最有效？',
          answer: '可以先区分你更想要温柔柔和、明亮有朝气，还是带一点轻盈现代感；然后再看它更偏经典耐用，还是保留一点软萌亲和力。先用气质和长期使用感缩小范围，通常会比只看流行度更有效。',
        },
      ]
    }

    return [
      {
        question: 'Why should I not choose a Japanese baby name based on cuteness alone?',
        answer: 'Because a strong baby name needs more than a cute first impression. It should also sound natural, wear well over time, and still feel believable when the child grows older. The best choices balance warmth, usability, and identity.',
      },
      {
        question: 'What makes baby names different from general Japanese names?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, baby-suited names usually place more weight on softness, first-impression warmth, and long-term usability as a full name. The point is not only that they sound nice now, but that they can grow with a person.`
          : 'Baby names usually ask for more than style alone. They often need stronger everyday usability, gentler first-impression appeal, and a sense that the name will still feel natural years later.',
      },
      {
        question: 'How should I narrow down Japanese baby names further?',
        answer: 'A practical next step is to decide whether you want something softer, brighter, or more modern and airy. After that, split again by long-term feel: classic and dependable versus cute and tender. That usually works better than filtering by popularity alone.',
      },
    ]
  }

  if (kw.slug === 'baby-boy') {
    if (locale === 'zh') {
      return [
        {
          question: '日本男宝宝名字和一般男孩名字最大的区别是什么？',
          answer: '男宝宝名字通常会更强调“小时候亲切、长大后也不尴尬”这件事，所以除了男孩感，还会更看重顺口度、日常可用性和全名搭配后的稳定感。',
        },
        {
          question: '男宝宝名字一定要偏可爱、偏软吗？',
          answer: topCombos
            ? `不一定。像 ${topCombos} 这样的组合里，适合男宝宝使用的名字可以是温柔的、明亮的、经典稳重的，也可以稍微现代一点。关键不是一味软萌，而是既有亲和力，又能陪着孩子长大。`
            : '不一定。男宝宝名字可以温柔、阳光、稳重，甚至带一点现代清爽感。重点是它既要有亲和力，也要避免只适合幼年阶段。',
        },
        {
          question: '如果我要继续缩小日本男宝宝名字范围，先看什么最有效？',
          answer: '可以先分成柔和亲切、明亮有精神、经典耐用、现代清爽四条路线；然后再看你更在意现实使用感、时代感，还是和姓氏搭配时的整体节奏。这样通常比只看热度更快。',
        },
      ]
    }

    return [
      {
        question: 'What makes Japanese baby boy names different from general boy-name pages?',
        answer: 'Baby boy pages usually care more about long-term usability. A good pick should feel warm and approachable for a child, but still sound credible, balanced, and natural later in life as part of a full Japanese name.',
      },
      {
        question: 'Do Japanese baby boy names always need to sound cute or soft?',
        answer: topCombos
          ? `Not at all. Among combinations like ${topCombos}, baby boy names can land soft, bright, classic, or a little more modern. The goal is not to make every result sound tiny, but to keep the name friendly, usable, and able to grow with the child.`
          : 'Not at all. Baby boy names can be gentle, sunny, steady, or lightly modern. What matters more is that they feel warm without becoming too childish or too heavy for everyday life.',
      },
      {
        question: 'How should I narrow down Japanese baby boy names more effectively?',
        answer: 'A useful first split is soft and kind versus bright and energetic versus classic and dependable versus cleaner modern styles. After that, compare how each option feels in a full name, not just as a standalone given name.',
      },
    ]
  }

  if (kw.slug === 'first') {
    if (locale === 'zh') {
      return [
        {
          question: '“Japanese first names” 这一页和一般名字页最大的区别是什么？',
          answer: '这页会更聚焦“名”本身的气质与使用感，也就是 given name 这一侧：你可以先看这个名字单独念出来是否自然、是否像真实日本人名，再去比较它和不同姓氏组合后的整体效果。',
        },
        {
          question: '为什么 first name 页面里仍然会看到姓氏搭配？',
          answer: topCombos
            ? `因为像 ${topCombos} 这样的组合，能帮助你判断一个 given name 在真实全名里的节奏和画面感。页面重点仍然是“名”，但保留姓氏搭配能让你更快看出这个名字单独好不好听、连起来顺不顺。`
            : '因为很多名字单独看不错，和姓氏连起来却可能节奏不稳。保留姓氏搭配，是为了让你在看 first name 时也能同时评估真实全名效果。',
        },
        {
          question: '如果我要从 first names 里继续缩小范围，先看什么最有效？',
          answer: '可以先区分你更想要自然日常、明亮有记忆点、经典正统，还是更现代轻盈的路线；然后再看它是否更偏现实可用、适合宝宝，还是更适合作品角色。先用“名”的气质和使用场景缩小范围，通常最有效。',
        },
      ]
    }

    return [
      {
        question: 'What makes this Japanese first names page different from a general name page?',
        answer: 'This page focuses more deliberately on the given-name side of the full name. The goal is to help you judge how the personal name itself feels — on its own, as a style, and as part of a believable Japanese full-name combination.',
      },
      {
        question: 'Why does a first names page still show surname combinations?',
        answer: topCombos
          ? `Because combinations like ${topCombos} make it easier to judge rhythm, realism, and overall tone. The page still centers the first name, but matching surnames help you see whether that given name really works once it becomes a full name.`
          : 'Because a given name may sound good on its own but feel awkward inside a full name. Showing surname combinations lets you evaluate first-name choices in a more realistic way.',
      },
      {
        question: 'How should I narrow down Japanese first names further?',
        answer: 'A practical next step is to decide whether you want something more natural and everyday, more bright and memorable, more classic and established, or more modern and airy. After that, split again by use: realistic family naming, baby naming, or character naming.',
      },
    ]
  }

  if (kw.slug === 'given') {
    if (locale === 'zh') {
      return [
        {
          question: '“Japanese given names” 这一页最适合什么时候用？',
          answer: '这页最适合你已经明确想看 given name，也就是“名”这一侧本身时使用。重点不是先挑姓氏风格，而是先判断这个 personal name 单独念出来是否自然、像不像真实会被长期使用的日本名字。',
        },
        {
          question: '为什么 given name 页面里仍然保留姓氏搭配？',
          answer: topCombos
            ? `因为像 ${topCombos} 这样的组合，能让你更快判断一个 given name 放进完整全名后是不是依然顺口、稳定、像真实人名。页面重点仍然是“名”，但保留姓氏能避免只看单词感而忽略全名节奏。`
            : '因为一个 given name 单独看顺耳，不代表和姓氏连起来也自然。保留完整组合，是为了让你在聚焦“名”时，仍然能同时判断真实全名的落地感。',
        },
        {
          question: '如果我要继续缩小 japanese given names 的范围，先看什么最有效？',
          answer: '通常可以先分成自然日常、明亮有记忆点、经典稳妥、现代轻盈四条路线；然后再看你更在意现实长期使用、宝宝命名，还是角色创作。先按“名”的气质和用途拆，通常最快。',
        },
      ]
    }

    return [
      {
        question: 'When is this Japanese given names page most useful?',
        answer: 'This page is most useful when you already know you want to evaluate the given-name side of Japanese naming first. It helps you judge whether the personal name itself feels natural, believable, and usable before you worry too much about surname style.',
      },
      {
        question: 'Why keep surname pairings on a given names page?',
        answer: topCombos
          ? `Because combinations like ${topCombos} make it much easier to test whether a given name still sounds smooth, stable, and realistic once it sits inside a full Japanese name.`
          : 'Because a given name that looks good in isolation may still feel awkward once paired with a surname. Full-name pairings make given-name evaluation more realistic.',
      },
      {
        question: 'How should I narrow down Japanese given names further?',
        answer: 'A practical first split is natural everyday versus bright memorable versus classic established versus lighter modern styles. After that, narrow again by use, for example real-life naming, baby naming, or character naming.',
      },
    ]
  }

  if (kw.slug === 'old') {
    if (locale === 'zh') {
      return [
        {
          question: '什么样的日本名字会更像“old japanese names”？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，所谓 old japanese names 往往不是单靠生僻，而是靠旧时代常见结构、传统尾韵、历史感汉字和整体读起来更稳、更沉一点的节奏一起成立。`
            : 'old japanese names 通常不是越难写越古，而是会带一点传统时期常见的字形、尾韵、时代感和更安定的整体节奏。',
        },
        {
          question: '这页和 traditional japanese names 最大的区别是什么？',
          answer: 'traditional 往往更强调正统、端正、可长期使用；old 则会更进一步偏向旧时代余韵、历史感、古风结构，甚至更像祖辈、旧小说或历史人物会出现的名字轮廓。',
        },
        {
          question: '如果我想继续缩小 old japanese names 的范围，先看什么最有效？',
          answer: '最有效的顺序通常是先分你更想要门第感、朴素旧风、温和古雅，还是更像历史角色命名；然后再看它更偏 given name、family name，还是你更想保留现实可用性还是作品气质。先按时代感和用途拆，通常最快。',
        },
      ]
    }

    return [
      {
        question: 'What makes a Japanese name feel old-fashioned rather than merely rare?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, old Japanese names usually feel older through structure, rhythm, and period flavor — older suffixes, steadier pacing, and kanji choices that suggest family history or a pre-modern naming texture, not rarity alone.`
          : 'An old Japanese name usually feels old through period texture rather than rarity alone: more traditional endings, steadier rhythm, and kanji choices that suggest older naming habits or historical atmosphere.',
      },
      {
        question: 'How is this different from a traditional Japanese names page?',
        answer: 'Traditional-name pages often stay broader and more usable in a modern setting. This page leans further toward names that feel older in era flavor — more historical, more period-coded, and sometimes closer to the naming texture of older generations, literature, or historical characters.',
      },
      {
        question: 'How should I narrow down old Japanese names further?',
        answer: 'A practical next step is to decide whether you want something nobler, plainer, gentler, or more explicitly historical. After that, narrow again by use: realistic old-style naming, family-history flavor, or stronger character and period-story naming.',
      },
    ]
  }

  if (kw.slug === 'middle') {
    if (locale === 'zh') {
      return [
        {
          question: '这页里的 japanese middle names 应该怎么理解？',
          answer: '这页更适合把 Japanese middle name 当作“中段补位灵感”来用：重点不是日本现实制度里是否严格存在 middle name，而是帮你找那些放在名字中段时依然顺口、自然、不会太突兀的 given name 选项。',
        },
        {
          question: '为什么 middle name 页面仍然展示完整姓与名组合？',
          answer: topCombos
            ? `因为像 ${topCombos} 这样的组合，能让你直接判断一个 given name 放进完整结构后会不会太抢、太轻，还是刚好能补出节奏。middle name 灵感如果脱离完整组合，很多时候反而不容易看出真实效果。`
            : '因为你想拿来做 middle name 参考的名字，单独看顺眼不代表放进完整结构里就合适。保留全名组合，是为了让你更快判断节奏、重量和真实可用性。',
        },
        {
          question: '如果我要继续缩小 japanese middle names 的范围，先看什么最有效？',
          answer: '最有效的顺序通常是先分你要它更顺滑百搭、轻巧有记忆点、经典耐看，还是更有画面感；然后再看它偏男性、女性还是中性，以及你希望它更像现实可用还是更偏角色命名。先看节奏和用途，通常比一上来纠结单个汉字更快。',
        },
      ]
    }

    return [
      {
        question: 'How should this Japanese middle names page be used?',
        answer: 'This page works best as middle-name inspiration rather than a claim about strict real-world Japanese naming structure. It helps you find given names that can sit in a middle position gracefully — names that stay smooth, natural, and believable when layered into a longer full-name idea.',
      },
      {
        question: 'Why keep full-name combinations on a middle names page?',
        answer: topCombos
          ? `Because combinations like ${topCombos} make it much easier to judge whether a given name feels too heavy, too thin, or rhythmically useful once it sits inside a fuller naming structure.`
          : 'Because a name that looks appealing on its own may not function well in a middle position. Keeping fuller combinations visible helps you judge rhythm, weight, and practical naming flow more accurately.',
      },
      {
        question: 'How should I narrow down Japanese middle names further?',
        answer: 'A practical next step is to decide whether you want something smoother and more versatile, lighter and more distinctive, more classic and durable, or more image-rich and expressive. After that, split again by gender lean and use case: realistic naming, pen-name styling, or character naming.',
      },
    ]
  }

  if (kw.slug === 'that-mean-death') {
    if (locale === 'zh') {
      return [
        {
          question: '什么样的日本名字会更像“带死亡意象”的名字？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，死亡感通常不是只靠一个“死”字，而是靠阴影、凋零、夜色、终结感，或一种更冷、更空、更不安的节奏一起成立。`
            : '带死亡意象的日本名字通常不是字面直接写“死亡”就够了，而是要靠读音、节奏、汉字意象与整体气氛一起把阴影感、终结感或不祥感立起来。',
        },
        {
          question: '这页和 dark japanese names 最大的区别是什么？',
          answer: 'dark japanese names 更偏暗影、神秘、冷感与故事张力；这页会更进一步，把结果收向死亡、凋零、终结、危险余味这些更明确的意象。所以它通常更窄，也更偏主题性。',
        },
        {
          question: '如果我想继续缩小 names that mean death in japanese 的范围，先看什么最有效？',
          answer: '最有效的顺序通常是先分你要诡秘阴影、冷感哀美、锋利危险，还是更像作品角色设定的路线；然后再看它更适合现实可用名字，还是更适合动漫、游戏或奇幻角色。先按气氛轮廓和用途拆分，通常最快。',
        },
      ]
    }

    return [
      {
        question: 'What makes a Japanese name feel linked to death rather than simply dark?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, death-leaning Japanese names usually go beyond darkness alone. They carry endings, absence, fading beauty, funerary stillness, or a more explicit sense of danger and mortality.`
          : 'A Japanese name tied to death symbolism usually does more than feel dark. It suggests endings, mourning, shadow, fatality, or a colder sense of disappearance and finality through rhythm and imagery together.',
      },
      {
        question: 'How is this different from a general dark Japanese names page?',
        answer: 'Dark-name pages usually stay broader: shadow, mystery, cold beauty, and story tension all fit there. This page narrows harder toward death symbolism itself — mortality, fading, ominous finality, or names that feel more explicitly fatal or haunted.',
      },
      {
        question: 'How should I narrow down Japanese names that mean death further?',
        answer: 'A practical next step is to choose whether you want something eerier, more mournful, more dangerous, or more poetic and tragic. After that, narrow again by use: realistic dark naming, horror-style naming, or stronger anime and fantasy character naming.',
      },
    ]
  }

  if (kw.slug === 'first-male') {
    if (locale === 'zh') {
      return [
        {
          question: '“Japanese first names for boys” 这页最适合怎么用？',
          answer: '这页最适合你已经确定想看男孩 given name 时使用：重点不是泛泛地看全名风格，而是先判断这个男孩名本身是否稳、顺、像真实会被长期使用的日本名字。',
        },
        {
          question: '为什么男孩 first name 页里还保留姓氏组合？',
          answer: topCombos
            ? `因为像 ${topCombos} 这样的组合，能让你更快判断一个男孩名放进真实全名后是不是依然顺口、有没有压住姓氏、整体气质是更稳重还是更明亮。`
            : '因为男孩名单独看可能不错，但和姓氏连起来后，节奏、时代感和整体气质都会变化。保留姓氏组合，能让你更接近真实使用场景。',
        },
        {
          question: '如果我要继续缩小范围，先看什么最有效？',
          answer: '先区分你更想要稳重可靠、明亮顺耳、经典正统，还是更现代轻盈的路线；然后再看它是否更适合现实取名、宝宝命名，还是作品角色。先用男孩名本身的气质和使用场景拆分，通常最有效。',
        },
      ]
    }

    return [
      {
        question: 'What is this Japanese first names for boys page best used for?',
        answer: 'This page is most useful when you already know you want a male given name and want to judge the first name itself before anything else — how believable it feels, how strong or bright it sounds, and how well it holds up inside a full Japanese name.',
      },
      {
        question: 'Why does a boys first-name page still keep surname combinations?',
        answer: topCombos
          ? `Because combinations like ${topCombos} help you judge whether a boy given name still sounds balanced, realistic, and well-shaped once it becomes a full Japanese name.`
          : 'Because a boy given name may look good on its own but change a lot once it is paired with a surname. Keeping combinations visible makes the evaluation more realistic.',
      },
      {
        question: 'How should I narrow down Japanese first names for boys further?',
        answer: 'A practical next step is to split by tone first: dependable, bright, classic, or more modern. After that, split again by intended use — realistic personal naming, baby naming, or character naming. That usually works better than filtering by popularity alone.',
      },
    ]
  }

  if (kw.slug === 'boy-meanings') {
    if (locale === 'zh') {
      return [
        {
          question: '“Japanese boy names and meanings” 这一页最适合怎么用？',
          answer: '这页最适合你想同时看男孩名本身和汉字含义时使用：不仅能比较读音和整体气质，还能直接从字义层面判断这个名字更偏稳重、明亮、力量感还是更现代利落。',
        },
        {
          question: '为什么看 boy names 时还要保留姓氏组合？',
          answer: topCombos
            ? `因为像 ${topCombos} 这样的组合，能让你同时判断男孩名的字义和整套全名的节奏。很多名字单独看含义不错，但放进全名里才更容易看出它到底是偏可靠、明亮，还是更有力量感。`
            : '因为男孩名单独看含义可能很好，但和姓氏连起来时，节奏、时代感和整体气质可能会完全不同。保留姓氏组合能让“名字含义”变得更接近真实使用场景。',
        },
        {
          question: '如果我要继续缩小 boy names and meanings 的范围，先看什么最有效？',
          answer: '先区分你更想要经典稳重、明亮开阔、坚实有力量，还是更现代利落的路线；然后再看汉字是更强调品格、光亮、成长还是担当。先用气质和字义主题拆分，通常会比只看读音更有效。',
        },
      ]
    }

    return [
      {
        question: 'What is this Japanese boy names and meanings page best used for?',
        answer: 'This page works best when you want to compare Japanese boy names not only by sound, but also by kanji sense. It helps you judge whether a name feels steadier, brighter, stronger, more grounded, or more modern once the meanings are spelled out.',
      },
      {
        question: 'Why keep surname combinations on a boy-names-with-meanings page?',
        answer: topCombos
          ? `Because combinations like ${topCombos} let you evaluate both the kanji meaning and the full-name rhythm at the same time. A boy name may look strong on its own, but the full-name pairing reveals whether it feels believable, bright, weighty, or sharply modern.`
          : 'Because a boy name can have excellent kanji on its own but still land awkwardly inside a full name. Keeping surname combinations visible makes the meaning-focused page more realistic and useful.',
      },
      {
        question: 'How should I narrow down Japanese boy names and meanings further?',
        answer: 'A practical next step is to decide whether you want something more classic and dependable, brighter and more open, stronger and more grounded, or cleaner and more modern. After that, narrow again by kanji theme: character, light, growth, aspiration, or responsibility.',
      },
    ]
  }

  if (kw.slug === 'uncommon') {
    if (locale === 'zh') {
      return [
        {
          question: '什么样的日本名字会更像“uncommon”而不是单纯生僻？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，真正成立的 uncommon name 通常不是为了稀奇而硬拗，而是会同时保留顺口度、完整度和一点不那么常见的记忆点。`
            : '真正成立的 uncommon japanese names 通常不是只靠冷门汉字取胜，而是既少见，又还保留顺口、可信和整体气质。',
        },
        {
          question: '这页和 rare japanese names 最大的区别是什么？',
          answer: 'rare japanese names 往往会更进一步追求低频、稀少甚至偏尖一点的辨识度；这页会更强调“少见但还自然”，也就是 uncommon 而不是刻意极端。',
        },
        {
          question: '如果我想继续缩小 uncommon japanese names 的范围，先看什么最有效？',
          answer: '最有效的顺序通常是先分你要安静低调、优雅精致、神秘有氛围，还是更有轮廓和记忆点的路线；然后再看它更适合现实取名、宝宝命名，还是更偏角色用途。先按气质和用途拆，通常最快。',
        },
      ]
    }

    return [
      {
        question: 'What makes a Japanese name feel uncommon rather than merely obscure?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, the strongest uncommon names still sound usable and composed. They stand out because they are less expected, not because they break rhythm or readability.`
          : 'A strong uncommon Japanese name usually feels less expected without becoming awkward. It stays believable, readable, and well-shaped even while being less common than the mainstream pool.',
      },
      {
        question: 'How is this different from a rare Japanese names page?',
        answer: 'Rare-name pages usually push further toward low-frequency, sharper, or more obviously unusual results. This page stays a little closer to the usable middle: names that are uncommon, distinctive, and memorable, but still naturally wearable.',
      },
      {
        question: 'How should I narrow down uncommon Japanese names further?',
        answer: 'A practical next step is to choose whether you want something quieter, more elegant, more mysterious, or more sharply memorable. After that, narrow again by use case: realistic personal naming, baby naming, or character naming. Tone first usually works better than filtering by rarity alone.',
      },
    ]
  }

  if (kw.slug === 'unique-female') {
    if (locale === 'zh') {
      return [
        {
          question: '什么样的日本女性名字会更像“unique japanese female names”，而不是只是奇怪？',
          answer: topCombos
            ?               `像 ${topCombos} 这样的组合，真正成立的 unique japanese female names 往往不只是“没见过”，而是会同时带着轮廓感、记忆点和完整气质，念出来也依然顺。`
            : '真正成立的 unique japanese female names 往往不是靠生硬字形取胜，而是独特、完整、顺口，并且有明确的女性名字存在感。',
        },
        {
          question: '这页和 rare girl 或 unique japanese names 最大的区别是什么？',
          answer: 'rare girl 会更强调“少见、氛围感、低频”；通用 unique japanese names 会同时混合男名、女名与更宽的独特风格。这页则专门把女性名字收拢出来，重点放在独特感、记忆点与女性向整体气质的平衡。',
        },
        {
          question: '如果我想继续缩小 unique japanese female names 的范围，先看什么最有效？',
          answer: '通常最有效的是先分你更想要安静神秘、纤细少见、锋利有记忆点，还是更有角色存在感的路线；然后再看它更偏现实使用、宝宝灵感，还是角色 / 设定用途。先按存在感与用途拆，通常比只看“独特”更快。',
        },
      ]
    }

    return [
      {
        question: 'What makes a Japanese female name feel unique rather than merely odd?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, the strongest unique Japanese female names do more than look unfamiliar. They carry silhouette, memorability, and a coherent feminine tone, so the distinctiveness feels designed rather than random.`
          : 'A strong unique Japanese female name is not just unfamiliar. It feels deliberate, memorable, and internally coherent, with enough rhythm that the distinctiveness reads as style rather than noise.',
      },
      {
        question: 'How is this different from a rare-girl page or a general unique Japanese names page?',
        answer: 'Rare-girl pages lean more toward low frequency and atmosphere, while general unique-name pages mix broader male, female, and unisex directions. This page narrows specifically to female-name combinations where distinctiveness, memorability, and feminine tone all need to land together.',
      },
      {
        question: 'How should I narrow down unique Japanese female names further?',
        answer: 'A useful next step is to decide whether you want something quieter and mysterious, more delicate and uncommon, sharper and more memorable, or more obviously high-presence and character-like. After that, narrow again by use: real-life naming, baby-name inspiration, or character-driven naming.',
      },
    ]
  }

  if (kw.slug === 'unique-male') {
    if (locale === 'zh') {
      return [
        {
          question: '什么样的日本男性名字会更像“unique japanese male names”，而不是只是故意做怪？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，真正成立的 unique japanese male names 往往不只是少见，还会同时带着轮廓感、节奏和完整气场，所以念出来依然像一个真的男性名字。`
            : '真正成立的 unique japanese male names 往往不是靠生硬字形或夸张设定撑起来，而是少见、顺口、利落，并且有明确的男性名字存在感。',
        },
        {
          question: '这页和 unique boy 或通用 unique japanese names 最大的区别是什么？',
          answer: 'unique boy 更偏“男孩名”语境，通常更年轻、更角色化一点；通用 unique japanese names 会混合更宽的男名、女名与中性风格。这页则专门把男性名字收拢出来，重点放在独特感、骨架感与男性向整体气质的平衡。',
        },
        {
          question: '如果我想继续缩小 unique japanese male names 的范围，先看什么最有效？',
          answer: '通常最有效的是先分你更想要锋利克制、安静神秘、稳重少见，还是更强辨识度的路线；然后再看它更偏现实使用、宝宝灵感，还是角色 / 设定用途。先按存在感与用途拆，通常比只看“独特”更快。',
        },
      ]
    }

    return [
      {
        question: 'What makes a Japanese male name feel unique rather than simply weird?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, the strongest unique Japanese male names do more than sit outside the mainstream. They still carry structure, rhythm, and believable masculine tone, so the distinctiveness feels deliberate rather than accidental.`
          : 'A strong unique Japanese male name is not unusual just for shock value. It still needs believable sound, clear shape, and enough masculine tone that the rarity reads as style rather than noise.',
      },
      {
        question: 'How is this different from a unique-boy page or a general unique Japanese names page?',
        answer: 'Unique-boy pages usually lean younger and a little more character-facing, while general unique-name pages mix broader male, female, and unisex directions. This page narrows specifically to male-name combinations where distinctiveness, structure, and masculine tone all need to land together.',
      },
      {
        question: 'How should I narrow down unique Japanese male names further?',
        answer: 'A useful next step is to decide whether you want something sharper and controlled, quieter and mysterious, more grounded but still uncommon, or more obviously high-recall. After that, narrow again by use: real-life naming, baby-name inspiration, or character-driven naming.',
      },
    ]
  }

  if (kw.slug === 'rare') {
    if (locale === 'zh') {
      return [
        {
          question: '什么样的日本名字会更像“rare japanese names”，而不是为了冷门而冷门？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，真正成立的 rare japanese names 往往不是只追求低频，而是少见的同时，读音、节奏、画面感和整体完成度也都还站得住。`
            : '真正成立的 rare japanese names 往往不是只靠冷门标签撑着，而是少见、顺口、有气质，而且整套名字依然可信。',
        },
        {
          question: '这页和 uncommon 或 unique japanese names 有什么区别？',
          answer: 'uncommon 会更强调“少见但自然”；unique 往往会更强调更强的轮廓感、记忆点或风格化存在。rare japanese names 这页更像卡在两者中间：重点是低频、少见、有气氛，但不一定要夸张到特别尖。',
        },
        {
          question: '如果我想继续缩小 rare japanese names 的范围，先看什么最有效？',
          answer: '通常最有效的是先分你更想要安静神秘、优雅疏离、柔和带微光，还是更有强记忆点的少见路线；然后再看用途更偏现实取名、宝宝灵感，还是角色命名。先按气质和用途拆，通常比只盯“稀有度”更快。',
        },
      ]
    }

    return [
      {
        question: 'What makes a Japanese name feel rare rather than rare just for the sake of it?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, the strongest rare Japanese names do more than sit at low frequency. They still feel readable, well-shaped, and emotionally coherent, so the rarity lands as atmosphere rather than strain.`
          : 'A strong rare Japanese name does more than look low-frequency on paper. It still needs readability, rhythm, and believable emotional tone so the rarity feels intentional rather than forced.',
      },
      {
        question: 'How is this different from uncommon or unique Japanese names?',
        answer: 'Uncommon-name pages stay closer to natural usability, while unique-name pages usually push harder toward sharper silhouette, stronger memorability, or more visible stylistic edge. Rare names sit between them: clearly low-frequency and distinctive, but not automatically extreme.',
      },
      {
        question: 'How should I narrow down rare Japanese names further?',
        answer: 'A useful next step is to decide whether you want something quieter and mysterious, more elegant and distant, softer and more luminous, or more obviously striking. After that, narrow again by use: realistic naming, baby-name inspiration, or character-driven naming. Tone first usually works better than rarity alone.',
      },
    ]
  }

  if (kw.slug === 'unique') {
    if (locale === 'zh') {
      return [
        {
          question: '什么样的日本名字会更像“unique japanese names”，而不是只是奇怪？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，真正成立的 unique japanese names 往往不只是“没见过”，而是有鲜明轮廓、记忆点和完整气质，同时读音与画面感也站得住。`
            : '真正成立的 unique japanese names 往往不是单纯靠怪字或生硬组合取胜，而是独特、完整、顺口，并且有明确的名字存在感。',
        },
        {
          question: '这页和 rare 或 uncommon japanese names 最大的区别是什么？',
          answer: 'uncommon 更强调“少见但自然”；rare 更强调“低频、有氛围、少见”；unique 则会更进一步强调轮廓感、记忆点和风格化存在。也就是说，这页不是只要少见，而是要特别到能留下强印象。',
        },
        {
          question: '如果我想继续缩小 unique japanese names 的范围，先看什么最有效？',
          answer: '通常最有效的是先分你更想要锋利冷感、安静而特别、带微光幻想感，还是更像角色名的高辨识度路线；然后再看它更偏现实使用、宝宝灵感，还是角色 / 设定用途。先按存在感与用途拆，通常最快。',
        },
      ]
    }

    return [
      {
        question: 'What makes a Japanese name feel unique rather than simply odd?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, the strongest unique Japanese names do more than look unfamiliar. They have a clear silhouette, memorable tone, and strong internal coherence, so the distinctiveness feels designed rather than accidental.`
          : 'A strong unique Japanese name is not just unfamiliar. It feels deliberate, well-shaped, and memorable, with enough rhythm and coherence that the distinctiveness reads as style rather than noise.',
      },
      {
        question: 'How is this different from rare or uncommon Japanese names?',
        answer: 'Uncommon names stay closer to natural wearability, and rare names focus more on low frequency and atmosphere. Unique names push further toward sharper silhouette, stronger memorability, and a more visibly stylized presence.',
      },
      {
        question: 'How should I narrow down unique Japanese names further?',
        answer: 'A useful next step is to decide whether you want something sharper and cooler, quieter but still unusual, more luminous and fantasy-tinged, or more character-like and high-concept. After that, narrow again by use: real-life naming, baby-name inspiration, or character-driven naming.',
      },
    ]
  }

  if (kw.slug === 'long') {
    if (locale === 'zh') {
      return [
        {
          question: 'long japanese names 为什么不只是“字多、音节长”这么简单？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合里，真正成立的 long japanese names 不只是长度更长，而是节奏会更展开、画面层次更多，也更容易做出正式感或角色感。`
            : '真正成立的 long japanese names 不只是名字更长，而是读音展开得更完整，层次更多，也更容易带出正式感、风景感或更强的角色存在感。',
        },
        {
          question: '这页和 traditional 或 unique japanese names 最大的区别是什么？',
          answer: 'traditional 更强调历史感、正统感；unique 更强调少见度和记忆点。long japanese names 这一页的核心不是古不古、稀不稀，而是名字本身的长度、展开感，以及读起来有没有完整的延伸层次。',
        },
        {
          question: '如果我想继续缩小 long japanese names 的范围，先看什么最有效？',
          answer: '最有效的顺序通常是先分你更想要正式古典、自然风景、角色感更强，还是现实里也顺口耐用的长名字；然后再看它更偏姓氏、名字，还是整套全名里的长度平衡。先按“长出来的气质”拆，通常比只看音节数更有用。',
        },
      ]
    }

    return [
      {
        question: 'Why are long Japanese names not just about having more syllables?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, the strongest long Japanese names do more than stretch the sound. They create fuller rhythm, more layered imagery, and a stronger sense of ceremony or character presence.`
          : 'A strong long Japanese name is not only longer on paper. It usually opens into a fuller rhythm, richer imagery, and a more deliberate sense of form, which can make the name feel more formal, scenic, or character-rich.',
      },
      {
        question: 'How is this different from traditional or unique Japanese names?',
        answer: 'Traditional-name pages focus more on historical weight and orthodoxy, while unique-name pages focus on rarity and memorability. Long-name pages are centered on expansion, cadence, and how a longer name carries itself when spoken or paired into a full name.',
      },
      {
        question: 'How should I narrow down long Japanese names further?',
        answer: 'A useful first split is formal and classical versus scenic and flowing versus more dramatic and character-like. After that, narrow again by role: surname-heavy balance, given-name emphasis, or overall full-name length and rhythm.',
      },
    ]
  }

  if (kw.slug === 'short') {
    if (locale === 'zh') {
      return [
        {
          question: 'short japanese names 为什么不只是“更短、更省字”？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合里，真正成立的 short japanese names 不只是更短，而是读起来更利落、更容易被记住，也更容易在全名里留下干净轮廓。`
            : '真正成立的 short japanese names 不只是字少，而是节奏收得更快、轮廓更干净，也更容易在第一印象里留下记忆点。',
        },
        {
          question: '这页和 cute 或 nickname 风格页面最大的区别是什么？',
          answer: 'cute 或 nickname 会更强调可爱、亲近或玩味感，short japanese names 这一页的核心则是长度本身带来的利落、清爽、好记和节奏感。短，不等于幼，也不等于随便。',
        },
        {
          question: '如果我想继续缩小 short japanese names 的范围，先看什么最有效？',
          answer: '最有效的顺序通常是先分你更想要明亮轻快、极简冷静、柔和顺口，还是更像昵称一样有一口记住的短名字；然后再看它更适合现实取名、宝宝命名，还是角色用途。先按节奏和用途拆，通常比只看字数更有用。',
        },
      ]
    }

    return [
      {
        question: 'Why are short Japanese names not just about using fewer syllables?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, the strongest short Japanese names do more than stay brief. They land faster, leave a cleaner outline, and often become easier to remember inside a full name.`
          : 'A strong short Japanese name is not just brief. It usually lands faster, feels cleaner in shape, and leaves a sharper first impression without becoming flimsy.',
      },
      {
        question: 'How is this different from cute or nickname-style pages?',
        answer: 'Cute or nickname-style pages lean harder into affection, playfulness, or casual charm. This page is centered on brevity itself, the crispness, speed, and memorability that come from a shorter name shape.',
      },
      {
        question: 'How should I narrow down short Japanese names further?',
        answer: 'A practical next step is to decide whether you want something brighter, more minimal, softer and smoother, or more nickname-like and instantly memorable. After that, narrow again by use case: realistic naming, baby naming, or character naming.',
      },
    ]
  }

  if (kw.slug === 'nicknames') {
    if (locale === 'zh') {
      return [
        {
          question: '这页为什么不只是把正式名字随便截短一下？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合里，真正成立的 japanese nicknames 不只是“短一点”，而是会同时更顺口、更亲近，也更像别人真的会拿来反复叫你的那种名字。`
            : '真正成立的 japanese nicknames 不只是把正式名字截短，而是会同时兼顾顺口、亲近感、记忆点，以及被人自然叫出来时的舒服程度。',
        },
        {
          question: '这页和 short japanese names 或 cute japanese names 最大的区别是什么？',
          answer: 'short 页面核心是长度本身，cute 页面核心是可爱气氛；nicknames 这一页更看重“被人叫出来时是否自然”。它可以短、可以可爱，但重点是昵称感和呼叫感成立。',
        },
        {
          question: '如果我想继续缩小 japanese nicknames 的范围，先看什么最有效？',
          answer: '最有效的顺序通常是先分你更想要可爱软糯、短促利落、日常顺口，还是更像角色昵称的路线；然后再看它更适合现实使用、宝宝小名，还是更偏角色用途。先按“叫出来的感觉”拆，通常最快。',
        },
      ]
    }

    return [
      {
        question: 'Why is this page not just about shortening formal Japanese names?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, the strongest Japanese nicknames do more than get shorter. They become easier to call, warmer in tone, and more believable as names people would naturally repeat out loud.`
          : 'A strong Japanese nickname is not just a trimmed-down formal name. It also needs ease, warmth, memorability, and the kind of rhythm that makes repeated everyday use feel natural.',
      },
      {
        question: 'How is this different from short Japanese names or cute Japanese names?',
        answer: 'Short-name pages are centered on brevity, and cute-name pages are centered on sweetness or charm. This page is centered on callability, whether the name actually feels natural, affectionate, and nickname-friendly when spoken aloud.',
      },
      {
        question: 'How should I narrow down Japanese nicknames further?',
        answer: 'A practical next step is to split first by calling feel: softer and cuter, shorter and crisper, more everyday-friendly, or more character-like. After that, narrow again by use case, real-life use, baby-name affection, or fictional naming. Tone when spoken usually works best as the first filter.',
      },
    ]
  }

  if (kw.slug === 'light') {
    if (locale === 'zh') {
      return [
        {
          question: '什么样的日本名字会更像“light japanese names”，而不只是字面上带光？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合里，真正成立的 light japanese names 往往不只是字义里出现“光”，而是整体会更明亮、开阔、通透，念出来也会带一点发光感和上扬感。`
            : '真正成立的 light japanese names 往往不只是字义里有光，而是整体气质会更明亮、通透、上扬，也更容易给人希望感和清爽感。',
        },
        {
          question: '这页和 sun、star 或 pretty / beautiful 页面有什么区别？',
          answer: 'sun 或 star 会更偏单一意象，pretty / beautiful 则更强调审美与精致感。light japanese names 这一页更宽，核心是“明亮感”本身，所以太阳、星、光泽、通透感都可能成立。',
        },
        {
          question: '如果我想继续缩小 light japanese names 的范围，先看什么最有效？',
          answer: '最有效的顺序通常是先分你更想要阳光开阔、星光灵动、柔光温和，还是更有画面感和幻想感的明亮路线；然后再看它更适合现实取名、宝宝命名，还是角色用途。先按亮度类型和用途拆，通常最快。',
        },
      ]
    }

    return [
      {
        question: 'What makes a Japanese name feel light rather than merely literal?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, the strongest light Japanese names do more than contain a kanji tied to brightness. They feel open, luminous, and slightly uplifting in the overall rhythm, not just in dictionary meaning.`
          : 'A strong light Japanese name usually does more than include a kanji for brightness. It feels open, luminous, and a little uplifting in the full impression, not only on paper.',
      },
      {
        question: 'How is this different from a sun, star, or pretty-names page?',
        answer: 'Sun and star pages lean harder into one image, while pretty-name pages prioritize polish and beauty. This page is broader and centered on luminosity itself, so sunlight, starlight, clarity, warmth, and glow can all belong here.',
      },
      {
        question: 'How should I narrow down light Japanese names further?',
        answer: 'A practical next step is to decide whether you want something more sunlit and open, more star-bright and lively, softer and more translucent, or more scenic and image-rich. After that, narrow again by use: real-life naming, baby naming, or character naming.',
      },
    ]
  }

  if (kw.slug === 'short') {
    if (locale === 'zh') {
      return [
        {
          question: '为什么 short japanese names 不只是简单地把名字变短？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，真正有力量的短名字不只是字数少，它们念起来更快、记忆点更清晰，能让整个全名看起来有一种干脆的轮廓感。`
            : '一个好的短日文名字不只是字面短。它通常节奏更快，更干净，更容易被记住，给人一种紧凑自信的感觉。',
        },
        {
          question: '这页和 cute 或 nickname 风格的名字有什么区别？',
          answer: '可爱或昵称类的页面更强调软萌、亲昵的气质；而 short japanese names 更看重名字的紧凑度、清晰感，以及如何做到简短但不单薄。',
        },
        {
          question: '如果我想继续缩小 short japanese names 的范围，先看什么最有效？',
          answer: '最有效的顺序是先按风格分：明亮跳跃、极简清爽、柔和顺口，还是更像有记忆点的昵称；然后再看它是用于现实取名、宝宝灵感还是角色命名。',
        },
      ]
    }

    return [
      {
        question: 'Why are short Japanese names not just about being shorter?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, the strongest short Japanese names do more than save syllables. They land faster, stay cleaner in memory, and create a sharper full-name silhouette.`
          : 'A strong short Japanese name is not only brief on paper. It usually feels quicker, cleaner, and easier to hold in memory, which gives the whole name a more compact and confident shape.',
      },
      {
        question: 'How is this different from cute or nickname-style Japanese names?',
        answer: 'Cute or nickname-led pages focus more on sweetness, playfulness, or affection. Short-name pages are centered on compact rhythm, clarity, and how quickly a name lands without losing balance or usability.',
      },
      {
        question: 'How should I narrow down short Japanese names further?',
        answer: 'A practical first split is bright and bouncy versus minimal and cool versus soft and easygoing versus more nickname-like and instantly memorable. After that, narrow again by use: realistic personal naming, baby-name use, or character naming.',
      },
    ]
  }

  if (kw.slug === 'pretty') {
    if (locale === 'zh') {
      return [
        {
          question: '什么样的日本名字会更像“pretty japanese names”，而不是只靠几个漂亮汉字？',
          answer: topCombos
            ? `像 ${topCombos} 这样的组合，真正成立的 pretty japanese names 往往不是单字好看就够了，而是读音、节奏、气氛和汉字画面一起显得顺、雅、完整。`
            : '真正漂亮的日文名字，通常不是只靠某个字好看，而是整套名字读起来顺、气质统一、而且有完整的美感。',
        },
        {
          question: '这页和 cute 或 rare japanese names 最大的区别是什么？',
          answer: 'cute 更强调亲近、甜感和轻快；rare 更强调低频和少见。pretty japanese names 这一页更看重“整体漂亮是否成立”，也就是优雅、柔和、顺口和完成度，而不一定追求特别萌或特别稀有。',
        },
        {
          question: '如果我想继续缩小 pretty japanese names 的范围，先看什么最有效？',
          answer: '最有效的顺序通常是先分你更想要优雅精致、柔和温润、明亮有记忆点，还是更安静轻盈的漂亮路线；然后再看它更偏现实取名、角色命名，还是宝宝灵感。先按美感方向和使用场景拆，会比只盯单个汉字快很多。',
        },
      ]
    }

    return [
      {
        question: 'What makes a Japanese name feel pretty rather than merely decorated with beautiful kanji?',
        answer: topCombos
          ? `Among combinations like ${topCombos}, the strongest pretty Japanese names feel composed as full names. Sound, rhythm, imagery, and emotional tone all agree with each other instead of relying on one attractive kanji to do all the work.`
          : 'A truly pretty Japanese name usually feels beautiful as a full composition. It is not just one nice-looking kanji — the reading, rhythm, and imagery all work together.',
      },
      {
        question: 'How is this different from cute or rare Japanese names?',
        answer: 'Cute-name pages lean more playful, sweet, and approachable, while rare-name pages push harder toward low-frequency or unusual results. This page stays centered on polish, grace, softness, and whether the whole name lands as beautiful and well-finished.',
      },
      {
        question: 'How should I narrow down pretty Japanese names further?',
        answer: 'A useful next step is to decide whether you want something more graceful, softer, brighter, or calmer and airier. After that, narrow again by use: realistic personal naming, baby-name inspiration, or more image-rich character naming.',
      },
    ]
  }

  if (kw.slug === 'pet') {
    if (locale === 'zh') {
      return [
        {
          question: '这页里的 japanese pet names 更适合怎么用？',
          answer: '这页最适合你想先从“宠物日常叫起来顺不顺、亲不亲、有没有画面感”来挑名字时使用。重点不是做非常正式的人名判断，而是找那些对猫、狗或其他小动物来说更顺口、更有陪伴感的日系名字。',
        },
        {
          question: '为什么宠物名页面里还是保留了 full-name style 组合？',
          answer: topCombos
            ? `因为像 ${topCombos} 这样的组合，能帮你快速判断一个名字的读音、节奏和汉字画面到底顺不顺。即使实际给宠物时你可能只取其中一部分，先看完整组合也更容易判断这个名字是不是自然、好叫、有记忆点。`
            : '因为完整组合更容易看出读音节奏、汉字意象和整体气质。即使最后给宠物只会用短一点的叫法，先看完整组合也更容易判断它好不好用。',
        },
        {
          question: '如果我想继续缩小 japanese pet names 的范围，先看什么最有效？',
          answer: '最有效的顺序通常是先分你更想要可爱亲近、干净清爽、自然柔和，还是更亮眼有记忆点的路线；然后再看宠物本身更像猫、狗、小型宠物还是更安静温顺的类型。先按呼叫感和第一印象拆分，通常会比一上来纠结单个汉字更快。',
        },
      ]
    }

    return [
      {
        question: 'What is this Japanese pet names page best used for?',
        answer: 'This page works best when you want to choose from the pet side first: which Japanese names feel easy to call, affectionate in daily use, and vivid enough to suit a cat, dog, or other companion animal. It is less about strict formal naming and more about livable charm.',
      },
      {
        question: 'Why keep full-name-style combinations on a pet names page?',
        answer: topCombos
          ? `Because combinations like ${topCombos} make it easier to judge rhythm, sound, and kanji imagery quickly. Even if you only end up using part of the name for a pet, the fuller combination helps you see whether it feels natural, memorable, and easy to call.`
          : 'Because fuller combinations make it easier to judge rhythm, imagery, and overall usability. Even if the final pet name becomes shorter in practice, the complete combination gives you a better starting read.',
      },
      {
        question: 'How should I narrow down Japanese pet names further?',
        answer: 'A practical next step is to decide whether you want something cuter and warmer, cleaner and lighter, softer and more nature-led, or brighter and more distinctive. After that, narrow again by the pet itself: cat, dog, small companion, or a calmer and gentler personality type.',
      },
    ]
  }

  if (kw.slug === 'names') {
    if (locale === 'zh') {
      return [
        {
          question: '“Japanese name maker” 这一页最适合怎么用？',
          answer: '这页最适合你还没决定具体风格、想先广泛看日文全名灵感时使用。它会把更自然日常、明亮顺口、经典正统与现代轻盈几条路线放在一起，方便你先挑方向，再往下细分。',
        },
        {
          question: '为什么这个页面会同时出现男性名、女性名和中性名？',
          answer: topCombos
            ? `因为像 ${topCombos} 这样的组合，本来就是为了给起名灵感做横向比较。把不同性别倾向的日本全名放在一个入口里，可以更快看出你究竟更偏自然现实、偏明亮好记，还是偏经典耐久。`
            : '因为这是一个偏总览型的起名入口页。把男性名、女性名与中性名放在一起，更适合在还没锁定方向时快速横向比较。',
        },
        {
          question: '如果我要从这一页继续缩小范围，先看什么最有效？',
          answer: '最有效的顺序通常是先按整体印象分：自然日常、明亮有记忆点、经典正统、现代轻盈；然后再按用途分成现实取名、宝宝名或角色名。先用“全名的整体气质”缩小范围，通常会比一开始就盯着单个汉字更快。',
        },
      ]
    }

    return [
      {
        question: 'What is this Japanese name maker page best used for?',
        answer: 'This page works best as a broad entry point when you want Japanese full-name ideas but have not settled on a specific style yet. It lets natural, bright, classic, and more modern directions compete side by side before you narrow further.',
      },
      {
        question: 'Why does this page mix male, female, and unisex Japanese names?',
        answer: topCombos
          ? `Because combinations like ${topCombos} are most useful when you are still comparing overall full-name directions. Keeping male, female, and unisex options together makes it easier to see whether you prefer something more grounded, brighter, softer, or more timeless.`
          : 'Because this page is meant to act as an overview-style naming entry point. Showing male, female, and unisex options together helps you compare full-name direction before locking into a narrower category.',
      },
      {
        question: 'How should I narrow down Japanese full-name ideas from here?',
        answer: 'A practical next step is to split first by overall impression — natural and everyday, bright and memorable, classic and established, or modern and airy. After that, narrow again by use case: baby naming, realistic personal names, or character naming.',
      },
    ]
  }

  const kwName = kw.keyword;

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

  const introText = buildIntroText(kw, combos, locale)

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
      <ComboListSection combos={combos} kw={kw} locale={locale} />

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
  kw,
  locale,
}: {
  combos: FullNameCombo[]
  kw: PageKeyword
  locale: string
}) {
  const INITIAL_SHOW = 48
  const heading = buildSectionHeading(kw, combos, locale)

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {heading.title}
          </h2>
          <p className="text-gray-500">{heading.subtitle}</p>
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
