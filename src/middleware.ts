import createIntlMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';

// 创建国际化中间件
const intlMiddleware = createIntlMiddleware(routing);

// 主中间件函数
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // 如果是 API 路由
  if (pathname.startsWith('/api')) {
    // API 路由处理
    const requestStartTime = Date.now();
    return NextResponse.next();
  }

  // 其他路由使用国际化中间件
  return intlMiddleware(request);
}



export const config = {
  // Match only internationalized pathnames
  matcher: [
    // API 路由
    '/api/:path*',
    // 国际化路由
    '/',
    '/(de|en)/:path*'
  ]
};