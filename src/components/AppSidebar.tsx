import * as React from "react";
import { useJsonData } from "../hooks/useJsonData";
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroupLabel } from "./ui/sidebar";

interface LiveStatus { name: string; status: string; title: string; profileImg: string; liveUrl: string; }

// ----------------------------------------------------------------------
// 홈 사이드바 콘텐츠
// ----------------------------------------------------------------------
function HomeSidebarContent() {
  const { data: members } = useJsonData<LiveStatus[]>('status');
  // 방송 중 필터링
  const liveMembers = members?.filter(member => member.status && member.status.toLowerCase().includes('live')) || [];

  return (
    <div className="h-full flex flex-col w-full py-2">
      <div className="flex-1 overflow-y-auto px-4 space-y-3 custom-scrollbar">
        {liveMembers.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-gray-300 gap-2">
            <span className="text-xs">현재 방송 중인 멤버가 없습니다</span>
          </div>
        )}

        {liveMembers.map((member, idx) => {
           const isXSpace = member.status === 'X_live';
           const badgeText = isXSpace ? "SPACE" : "LIVE";
           
           // 링 색상: 그라데이션 적용
           const ringStyle = isXSpace 
             ? { background: 'linear-gradient(to bottom right, #ec4899, #a855f7)' } 
             : { background: 'linear-gradient(to bottom right, #ff4d4d, #f9cb28)' }; // 라이브는 붉은 계열 포인트

           return (
             <a key={idx} href={member.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-2xl bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-gray-50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer">
               
               {/* 1. 프로필 이미지 + 링 */}
               <div className="relative flex-shrink-0">
                 <div 
                   className="rounded-full p-[2px]"
                   style={{ width: '42px', height: '42px', ...ringStyle }} 
                 >
                   <img 
                     src={member.profileImg} 
                     alt={member.name} 
                     className="w-full h-full rounded-full object-cover border-2 border-white bg-gray-100" 
                   />
                 </div>
               </div>
               
               {/* 2. 텍스트 정보 */}
               <div className="flex-1 min-w-0 flex flex-col justify-center">
                 {/* 상단: 이름 + 배지 (양끝 정렬) */}
                 <div className="flex items-center justify-between mb-0.5">
                   <span className="text-sm font-bold text-gray-900">{member.name}</span>
                   <span className={`text-[9px] font-extrabold px-1.5 py-[2px] rounded-md tracking-wide ${isXSpace ? 'text-purple-600 bg-purple-50' : 'text-red-600 bg-red-50'}`}>
                     {badgeText}
                   </span>
                 </div>
                 
                 {/* 하단: 방송 제목 (말줄임) */}
                 <p className="text-xs text-gray-400 truncate group-hover:text-indigo-500 transition-colors">
                   {member.title || (isXSpace ? '스페이스 청취하기' : '방송 시청하기')}
                 </p>
               </div>
             </a>
           );
        })}
      </div>
    </div>
  );
}

export function AppSidebar() {
  return (
    <Sidebar 
      collapsible="none" 
      // 모바일 숨김, 배경색 제거(투명), 우측 보더 제거 (시안처럼 깔끔하게)
      className="hidden md:flex flex-none h-full bg-transparent"
      style={{ width: '280px' }} // 시안에 맞춰 너비 약간 확보
    >
      <SidebarContent className="h-full p-0 overflow-hidden">
        <HomeSidebarContent />
      </SidebarContent>
    </Sidebar>
  );
}