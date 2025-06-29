import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // 支持的语言列表
  locales,
  // 默认语言
  defaultLocale,
  // 自动添加语言前缀
  localePrefix: 'as-needed'
});

export const config = {
  // 匹配所有路径除了：
  // - api 路由
  // - _next/static (静态文件)
  // - _next/image (图片优化)
  // - favicon.ico (网站图标)
  // - 其他静态资源
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)/']
}; 