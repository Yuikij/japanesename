import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import JapaneseNameGenerator from '../../../components/JapaneseNameGenerator'

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
        <JapaneseNameGenerator />
      </div>
    </div>
  )
} 