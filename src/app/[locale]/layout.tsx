import './globals.css'
import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing';
import LanguageSwitcher from '../../components/LanguageSwitcher'
export const metadata: Metadata = {
  title: 'Japanese Name Generator',
  description: 'AI-powered personalized Japanese name creation',
}

// interface RootLayoutProps {
//   children: React.ReactNode
//   params: Promise<{ locale: string }>
// }




// export default async function RootLayout({
//   children,
//   params
// }: RootLayoutProps) {
//   // 获取参数
//   const { locale } = await params

//   // 验证语言参数
//   if (!locales.includes(locale as never)) {
//     notFound()
//   }

//   // 获取消息
//   const messages = await getMessages()

//   return (
//     <html lang={locale}>
//       <body>
//         <NextIntlClientProvider messages={messages}>
//           <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
//             <div className="absolute top-4 right-4 z-10">
//               <LanguageSwitcher />
//             </div>
//             {children}
//           </div>
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   )
// } 


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
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="absolute top-4 right-4 z-10">
            <LanguageSwitcher />
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

