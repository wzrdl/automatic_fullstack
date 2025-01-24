import './globals.css'
import { Inter } from 'next/font/google'

// 配置 Inter 字体
const inter = Inter({ subsets: ['latin'] })

// 页面元数据
export const metadata = {
  title: 'Prompt Optimizer',
  description: 'Optimize your prompts for better AI interactions',
}

// 根布局组件
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}

