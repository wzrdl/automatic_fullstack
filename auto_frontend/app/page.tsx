import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    // 主页面容器
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F7F7]">
      <div className="text-center">
        {/* 标题 */}
        <h1 className="text-5xl font-extrabold text-[#353740] mb-6 animate-fade-in-down">
          Prompt Optimizer
        </h1>
        
        {/* 描述文本 */}
        <p className="text-xl text-[#6E6E80] mb-8 max-w-md mx-auto">
          Enhance your AI interactions with our advanced prompt optimization tool.
        </p>
        
        {/* 开始按钮 */}
        <Link href="/interact">
          <Button 
            size="lg" 
            className="bg-[#10A37F] text-white hover:bg-[#1A7F64] transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Button>
        </Link>
      </div>

      {/* 添加底部装饰元素 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#E7F7F3] to-transparent"></div>
    </div>
  )
}

