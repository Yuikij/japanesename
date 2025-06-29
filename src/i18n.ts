import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// 支持的语言列表
export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];

// 默认语言
export const defaultLocale: Locale = 'zh';

export default getRequestConfig(async ({ locale }: { locale?: string }) => {
  // 如果没有locale参数，使用默认语言
  const currentLocale = locale || defaultLocale;
  
  // 验证传入的语言是否支持
  if (!locales.includes(currentLocale as Locale)) notFound();

  return {
    locale: currentLocale,
    messages: (await import(`../messages/${currentLocale}.json`)).default
  };
}); 