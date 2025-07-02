'use client';

import JapaneseNameGenerator from '@/components/JapaneseNameGenerator';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';

export default function GeneratePage() {
  const t = useTranslations('generatePage');

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link 
            href="../"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('backToHome')}
          </Link>
        </div>
        
        {/* SEO Content Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('title')}
          </h1>
          <h2 className="text-lg text-gray-600 mb-4">
            {t('subtitle')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </header>
        
        <JapaneseNameGenerator />
      </div>
    </div>
  )
} 