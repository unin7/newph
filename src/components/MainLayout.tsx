import React from "react";
import { TopNavigation } from "./TopNavigation";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "./ui/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    // 배경: 아주 연한 그라데이션으로 시안의 뽀샤시한 느낌 구현
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
      
      {/* 네비게이션 */}
      <TopNavigation />
      
      {/* 메인 콘텐츠 영역 */}
      <SidebarProvider defaultOpen={true} className="flex-1 flex overflow-hidden h-[calc(100vh-80px)]">
        <div className="flex w-full h-full max-w-[1920px] mx-auto">
          {/* 사이드바 (모바일 Hidden) */}
          <AppSidebar />
          
          {/* 메인 뷰 */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
            <div className="mx-auto max-w-6xl">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
