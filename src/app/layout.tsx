import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ポートフォリオ | フロントエンド開発者',
  description: 'フロントエンド開発者のポートフォリオサイトです。React、Next.js、TypeScriptを使用したWebアプリケーション開発の実績をご覧ください。',
  keywords: 'フロントエンド, React, Next.js, TypeScript, ポートフォリオ',
  authors: [{ name: 'Your Name' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
