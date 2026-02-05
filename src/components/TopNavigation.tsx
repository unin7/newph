import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Calendar, Radio, Twitter, Zap, ShoppingBag } from 'lucide-react';
import { cn } from './utils/common'; // cn 유틸리티가 없다면 className 문자열로 대체 가능

const navItems = [
  { path: '/news/schedule', label: '일정', desc: '주요 스케줄', icon: Calendar },
  { path: '/news/broadcast', label: '방송', desc: '실시간 생방송', icon: Radio },
  { path: '/news/twitter', label: '타임라인', desc: '최신 소식', icon: Twitter },
  { path: '/activities', label: '활동', desc: '참여형 콘텐츠', icon: Zap },
  { path: '/others/goods', label: '교환소', desc: '굿즈 거래', icon: ShoppingBag },
];

export function TopNavigation() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl flex-none">
      {/* 컨테이너: 모바일(세로 배치), 데스크탑(가로 배치) */}
      <div className="w-full px-4 py-2 md:px-8 md:h-20 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
        
        {/* 1. 로고 (좌측) */}
        <Link to="/" className="group flex items-center gap-2 min-w-max self-start md:self-auto py-1">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-100 to-pink-100 group-hover:from-blue-200 group-hover:to-pink-200 transition-colors">
            <Sparkles className="h-5 w-5 text-indigo-500 transition-transform duration-500 group-hover:rotate-180" />
          </div>
          <h1 className="font-extrabold text-2xl tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500">Pastel</span>
            <span className="text-slate-700">hub</span>
          </h1>
        </Link>

        {/* 2. 메뉴 (우측) - 아이콘+제목+설명 구조 */}
        <div className="flex items-center w-full md:w-auto overflow-x-auto no-scrollbar gap-2 md:gap-6 pb-1 md:pb-0">
          {navItems.map((menu) => {
            const isActive = location.pathname.startsWith(menu.path);
            return (
              <Link 
                key={menu.path} 
                to={menu.path} 
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 min-w-max",
                  isActive ? "bg-indigo-50/80" : "hover:bg-gray-50"
                )}
              >
                {/* 아이콘 */}
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                  isActive ? "bg-white text-indigo-600 shadow-sm" : "bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-indigo-500 group-hover:shadow-sm"
                )}>
                  <menu.icon className="size-4" />
                </div>

                {/* 텍스트 (제목 + 설명) */}
                <div className="flex flex-col">
                  <span className={cn(
                    "text-[13px] font-bold leading-none mb-0.5 transition-colors",
                    isActive ? "text-indigo-900" : "text-gray-700 group-hover:text-gray-900"
                  )}>
                    {menu.label}
                  </span>
                  <span className={cn(
                    "text-[10px] leading-none transition-colors",
                    isActive ? "text-indigo-400" : "text-gray-400 group-hover:text-gray-500"
                  )}>
                    {menu.desc}
                  </span>
                </div>

                {/* 활성 상태 표시 바 (데스크탑 하단) */}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[3px] bg-indigo-500 rounded-t-full hidden md:block" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}