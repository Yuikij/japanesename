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
  return [...givenNames, ...familyNames]
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

  if (kw.slug === 'common-girl') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组常见日本女孩名字组合，快速比较高接受度、读音自然、经典常用与现代日常感兼具的名字，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} common Japanese girl-name combinations and compare familiar, easy-to-use, classic, and modern everyday styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'popular-girl') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组热门日本女孩名字组合，快速比较高接受度、明亮顺口、经典受欢迎或更有当代感的女孩名，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} popular Japanese girl-name combinations and compare widely loved, bright, classic, and modern-favorite styles with kanji meanings, readings, and overall tone.`
  }

  if (kw.slug === 'cute-boy') {
    return locale === 'zh'
      ? `浏览 ${combos.length} 组可爱日本男孩名字组合，快速比较软萌温柔、阳光开朗、淘气机灵与自然清新的男孩名路线，并直接查看汉字、读音与整体气质。`
      : `Browse ${combos.length} cute Japanese boy-name combinations and compare soft, cheerful, playful, and fresh styles with kanji meanings, readings, and overall tone.`
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
  const kwName = capitalize(kw.keyword)
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
