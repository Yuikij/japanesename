'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Sparkles, Brain, BookOpen, Users, ArrowRight, Star, CheckCircle } from 'lucide-react'

export default function HomePage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
      <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-x-2 md:gap-x-4 flex-wrap">
            <span>🌸</span>
            <span className="text-center">{t('home.title')}</span>
            <span>🌸</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
            {t('home.subtitle')}
          </h2>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('home.description')}
          </p>
          <Link 
            href="./generate"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Sparkles className="w-6 h-6" />
            {t('home.startButton')}
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            {t('home.features.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t('home.features.aiPowered.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.features.aiPowered.description')}
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t('home.features.cultural.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.features.cultural.description')}
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t('home.features.personalized.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.features.personalized.description')}
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t('home.features.professional.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.features.professional.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            {t('home.process.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-2xl font-bold text-white">1</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t('home.process.step1.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.process.step1.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-2xl font-bold text-white">2</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t('home.process.step2.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.process.step2.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-2xl font-bold text-white">3</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t('home.process.step3.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.process.step3.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-2xl font-bold text-white">4</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t('home.process.step4.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.process.step4.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - New H2 */}
      <section className="py-20 px-4 bg-white/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Why Choose Our Japanese Name Generator?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Authentic Cultural Heritage</h3>
              <p className="text-gray-600">Our AI is trained on thousands of traditional Japanese names, ensuring cultural authenticity and historical accuracy in every suggestion.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Deep Personality Analysis</h3>
              <p className="text-gray-600">Through our advanced questioning system, we understand your unique traits to create names that truly reflect your personality.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Beautiful Meanings</h3>
              <p className="text-gray-600">Every name comes with detailed explanations of its cultural significance, kanji meanings, and why it suits your character.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Multiple Options</h3>
              <p className="text-gray-600">Receive 10 carefully curated name options, each with different styles and cultural backgrounds to choose from.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-50 to-red-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {t('home.getStarted')}
          </h2>
          <Link 
            href="./generate"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-red-500 text-white px-10 py-5 rounded-full text-xl font-semibold hover:from-pink-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Sparkles className="w-7 h-7" />
            {t('home.startButton')}
            <ArrowRight className="w-7 h-7" />
          </Link>
      </div>
      </section>
    </div>
  )
} 