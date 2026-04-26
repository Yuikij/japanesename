import { getTranslations } from 'next-intl/server'
import { ArrowRight, Globe, Database } from 'lucide-react'
import Link from 'next/link'
import keywordsData from '../../../新版本PSEO改造/keyword/keyword.json'
import CategoryGrid from '@/components/CategoryGrid'

interface Keyword {
  id: string
  keyword: string
  search_volume: number
  search_volume_total?: number
  strategy: string
  path: string
  filter_rule?: { must?: Array<{ field: string; op: string; value: unknown }> }
}

const FEATURED_NAMES = [
  { kanji: '結衣', reading: 'ゆい', romaji: 'Yui', gender: 'female', name_part: 'given_name' },
  { kanji: '蓮', reading: 'れん', romaji: 'Ren', gender: 'male', name_part: 'given_name' },
  { kanji: '佐藤', reading: 'さとう', romaji: 'Satō', gender: 'unisex', name_part: 'family_name' },
  { kanji: 'さくら', reading: 'さくら', romaji: 'Sakura', gender: 'female', name_part: 'given_name' },
  { kanji: '大翔', reading: 'ひろと', romaji: 'Hiroto', gender: 'male', name_part: 'given_name' },
  { kanji: '鈴木', reading: 'すずき', romaji: 'Suzuki', gender: 'unisex', name_part: 'family_name' },
  { kanji: '陽菜', reading: 'ひな', romaji: 'Hina', gender: 'female', name_part: 'given_name' },
  { kanji: '悠真', reading: 'ゆうま', romaji: 'Yūma', gender: 'male', name_part: 'given_name' },
  { kanji: '高橋', reading: 'たかはし', romaji: 'Takahashi', gender: 'unisex', name_part: 'family_name' },
  { kanji: '美咲', reading: 'みさき', romaji: 'Misaki', gender: 'female', name_part: 'given_name' },
  { kanji: '翔太', reading: 'しょうた', romaji: 'Shōta', gender: 'male', name_part: 'given_name' },
  { kanji: '田中', reading: 'たなか', romaji: 'Tanaka', gender: 'unisex', name_part: 'family_name' },
]

const CATEGORY_ICONS: Record<string, string> = {
  // Gender / age
  '/names/male': '👦',
  '/names/female': '👧',
  '/names/boy': '🧒',
  '/names/girl': '🎀',
  '/names/unisex': '⚧️',
  // Family names
  '/names/last-names': '👨‍👩‍👧‍👦',
  '/names/last-names-with-meanings': '📝',
  '/names/last-names-common': '🏠',
  '/names/last-names-male': '👨',
  '/names/last-names-cute': '🌸',
  '/names/last-names-unique': '💎',
  // All / general
  '/names/all': '📖',
  '/names/names': '✨',
  '/names/first': '🔤',
  '/names/common': '📋',
  '/names/popular': '⭐',
  '/names/meanings': '🔍',
  // Style / vibe
  '/names/cute': '🍬',
  '/names/cool': '😎',
  '/names/unique': '🌟',
  '/names/rare': '💫',
  '/names/dark': '🌑',
  '/names/fierce-historical': '⚔️',
  // Gender + style combos
  '/names/cute-girl': '🌺',
  '/names/unique-girl': '🦋',
  '/names/common-girl': '🌷',
  '/names/unique-boy': '🚀',
  '/names/cute-boy': '🐻',
  '/names/cool-male': '🔥',
  '/names/boy-meanings': '📚',
  // Anime
  '/names/anime': '🎌',
  '/names/male-anime': '🗡️',
  '/names/female-anime': '🌙',
  // Misc
  '/names/nicknames': '😊',
}

function loadCategories(): Array<{ keyword: string; path: string; volume: number; icon: string | null }> {
  try {
    const keywords: Keyword[] = keywordsData as Keyword[]
    return keywords
      .filter(k => k.strategy === 'category_page' && k.path)
      .sort((a, b) => (b.search_volume_total ?? b.search_volume) - (a.search_volume_total ?? a.search_volume))
      .map(k => ({
        keyword: k.keyword,
        path: k.path,
        volume: k.search_volume_total ?? k.search_volume,
        icon: CATEGORY_ICONS[k.path] ?? null,
      }))
  } catch {
    return []
  }
}


export default async function HomePage() {
  const t = await getTranslations('home')
  const categories = loadCategories()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="text-center pt-16 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            <span className="inline-block mr-2">🌸</span>
            {t('title')}
            <span className="inline-block ml-2">🌸</span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 max-w-2xl mx-auto">
            {t('subtitle')}
          </h2>
          <p className="text-base text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
          <Link
            href="./names/all"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {t('browseAllButton')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Category Grid */}
      {categories.length > 0 && (
        <section className="py-16 px-4 bg-white/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                {t('categories.title')}
              </h2>
              <p className="text-gray-500 text-lg">
                {t('categories.subtitle')}
              </p>
            </div>
            <CategoryGrid
              categories={categories}
              initialCount={10}
              searchesLabel={t('categories.searches', { count: '{count}' })}
              showMoreLabel={t('categories.showMore', { count: '{count}' })}
              showLessLabel={t('categories.showLess')}
            />
          </div>
        </section>
      )}

      {/* Featured Names */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {t('showcase.title')}
            </h2>
            <p className="text-gray-500 text-lg">
              {t('showcase.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {FEATURED_NAMES.map((name) => (
              <div
                key={`${name.kanji}-${name.romaji}`}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 text-center group hover:border-pink-200"
              >
                <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1.5 group-hover:text-pink-600 transition-colors">
                  {name.kanji}
                </div>
                <div className="text-sm text-gray-400 mb-1">{name.reading}</div>
                <div className="text-sm font-medium text-gray-600 mb-3">{name.romaji}</div>
                <div className="flex items-center justify-center gap-2">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                    name.gender === 'male'
                      ? 'bg-blue-50 text-blue-600'
                      : name.gender === 'female'
                        ? 'bg-pink-50 text-pink-600'
                        : 'bg-purple-50 text-purple-600'
                  }`}>
                    {name.gender === 'male' ? '♂' : name.gender === 'female' ? '♀' : '⚥'}{' '}
                    {t(`nameLabels.${name.gender}`)}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-50 text-gray-500">
                    {t(`nameLabels.${name.name_part === 'given_name' ? 'givenName' : 'familyName'}`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-white/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
            {t('stats.title')}
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <Database className="w-8 h-8 text-pink-500 mb-3" />
              <div className="text-3xl sm:text-4xl font-bold text-gray-800">4,700+</div>
              <div className="text-sm text-gray-500 mt-1">{t('stats.names')}</div>
            </div>
            <div className="flex flex-col items-center">
              <Search className="w-8 h-8 text-pink-500 mb-3" />
              <div className="text-3xl sm:text-4xl font-bold text-gray-800">100+</div>
              <div className="text-sm text-gray-500 mt-1">{t('stats.categories')}</div>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="w-8 h-8 text-pink-500 mb-3" />
              <div className="text-3xl sm:text-4xl font-bold text-gray-800">2</div>
              <div className="text-sm text-gray-500 mt-1">{t('stats.languages')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {t('getStarted')}
          </h2>
          <Link
            href="./names/all"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-5 rounded-full text-xl font-semibold hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {t('browseAllButton')}
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  )
}
