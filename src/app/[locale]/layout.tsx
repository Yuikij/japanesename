import './globals.css'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '../../i18n'
import LanguageSwitcher from '../../components/LanguageSwitcher'

export const metadata: Metadata = {
  title: 'Japanese Name Generator',
  description: 'AI-powered personalized Japanese name creation',
}

interface RootLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({
  children,
  params
}: RootLayoutProps) {
  // 获取参数
  const { locale } = await params
  
  // 验证语言参数
  if (!locales.includes(locale as never)) {
    notFound()
  }

  // 获取消息
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
            <div className="absolute top-4 right-4 z-10">
              <LanguageSwitcher />
            </div>
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 