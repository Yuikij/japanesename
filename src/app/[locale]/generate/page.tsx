import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import JapaneseNameGenerator from '../../../components/JapaneseNameGenerator'

export const metadata: Metadata = {
  title: 'Generate Your Japanese Name - AI Personalized Naming Service',
  description: 'Start creating your personalized Japanese name with our AI-powered generator. Answer deep personality questions to get culturally authentic Japanese names that match your character.',
  keywords: ['generate Japanese name', 'Japanese name creator', 'AI naming questions', 'personality-based naming', 'custom Japanese names'],
  openGraph: {
    title: 'Create Your Perfect Japanese Name',
    description: 'Generate personalized Japanese names through AI-powered cultural analysis.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function GeneratePage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link 
            href="../"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            返回主页
          </Link>
        </div>
        
        {/* SEO Content Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Generate Your Personalized Japanese Name
          </h1>
          <h2 className="text-lg text-gray-600 mb-4">
            AI-Powered Cultural Name Creation Process
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Begin your journey to discover the perfect Japanese name. Our AI will ask you personalized questions to understand your personality and create names that truly reflect who you are.
          </p>
        </header>
        
        <JapaneseNameGenerator />
      </div>
    </div>
  )
} 