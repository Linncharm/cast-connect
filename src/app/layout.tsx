import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CastConnect - 发现演员的影视纽带',
  description: '探索不同影视作品之间的演员联系，发现更多有趣的演艺圈关系网络。',
  keywords: ['演员关系', '影视作品', '演员查询', '剧集关联'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
