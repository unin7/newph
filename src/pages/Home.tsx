import { Link } from "react-router-dom";
import { Calendar, Radio, Twitter, Zap, ShoppingBag, Sparkles } from "lucide-react";
import { useJsonData } from "../hooks/useJsonData";
import { cn } from "../lib/utils"; // ✅ 요청하신 경로 반영
import { Member } from "../types";  // ✅ 요청하신 타입 파일 경로 반영

export default function Home() {
  // 1. 데이터 호출 (status.json)
  const { data: members } = useJsonData<Member[]>('status');

  // 2. 방송 중인 멤버 필터링 (대소문자 및 플랫폼 구분 처리)
  const liveMembers = members?.filter(
    (member) => member.status && (
      member.status.toLowerCase().includes('live') || 
      member.status.includes('X_live')
    )
  ) || [];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-10 animate-in fade-in zoom-in-95 duration-500">
      
      {/* =========================================
          1. 히어로 섹션 (로고 & 슬로건)
          ========================================= */}
      <div className="text-center mb-10 space-y-4 px-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl shadow-sm">
             <Sparkles className="w-8 h-8 text-indigo-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500">Pastel</span>
            hub
          </h1>
        </div>
        <p className="text-base md:text-xl text-slate-500 font-medium break-keep">
          팬덤을 위한 모든 정보가 한곳에 ✨
        </p>
      </div>

      {/* =========================================
          2. 모바일 전용: 방송 중인 멤버 리스트
          (모바일은 사이드바가 없으므로 여기서 보여줌)
          ========================================= */}
      {liveMembers.length > 0 && (
        <div className="md:hidden w-full max-w-5xl px-4 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-red-100 shadow-sm">
             <div className="flex items-center gap-2 mb-3">
               <span className="relative flex h-2.5 w-2.5">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
               </span>
               <h2 className="text-sm font-bold text-slate-700">현재 방송 중 ({liveMembers.length})</h2>
             </div>
             <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
               {liveMembers.map((member, idx) => (
                 <a key={idx} href={member.liveUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 min-w-[64px]">
                   <div className="relative">
                     <img src={member.profileImg} alt={member.name} className="w-12 h-12 rounded-full border-2 border-red-100 object-cover" />
                     {member.status === 'X_live' && <span className="absolute -bottom-1 -right-1 bg-black text-white text-[8px] px-1 rounded">X</span>}
                   </div>
                   <span className="text-xs font-medium text-slate-600 truncate w-full text-center">{member.name}</span>
                 </a>
               ))}
             </div>
          </div>
        </div>
      )}

      {/* =========================================
          3. 메인 메뉴 그리드 (Bento Grid)
          ========================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-5xl px-4">
        
        {/* 카드 1: 일정 (Blue) */}
        <Link to="/news/schedule" className="group relative overflow-hidden p-6 md:p-8 rounded-3xl bg-gradient-to-br from-sky-50 to-blue-50 border border-blue-100 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Calendar className="w-24 h-24 text-blue-500" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px] md:min-h-[160px]">
            <div className="p-3 w-fit rounded-2xl bg-white shadow-sm mb-4 text-blue-500 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">일정</h2>
              <p className="text-slate-500 mt-1 font-medium text-sm md:text-base">다가오는 이벤트와 일정 확인</p>
            </div>
          </div>
        </Link>

        {/* 카드 2: 방송 (Pink/Rose) - 데이터 연동 */}
        <Link to="/news/broadcast" className="group relative overflow-hidden p-6 md:p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 hover:shadow-lg hover:shadow-pink-100/50 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Radio className="w-24 h-24 text-rose-500" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px] md:min-h-[160px]">
             <div className="flex justify-between items-start">
               <div className="p-3 w-fit rounded-2xl bg-white shadow-sm mb-4 text-rose-500 group-hover:scale-110 transition-transform duration-300">
                <Radio className="w-8 h-8" />
               </div>
               {/* 방송 중일 때 뱃지 표시 */}
               {liveMembers.length > 0 && (
                 <span className="bg-white/80 backdrop-blur text-rose-600 border border-rose-200 text-xs font-extrabold px-3 py-1 rounded-full animate-pulse shadow-sm">
                   {liveMembers.length}명 ON AIR
                 </span>
               )}
             </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 group-hover:text-rose-600 transition-colors">방송</h2>
              <p className="text-slate-500 mt-1 font-medium text-sm md:text-base">실시간 생방송 현황</p>
            </div>
          </div>
        </Link>

        {/* 카드 3: 타임라인 (Violet) - 데스크탑에서 배치 조정 */}
        <Link to="/news/twitter" className="group relative overflow-hidden p-6 md:p-8 rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 hover:shadow-lg hover:shadow-violet-100/50 transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Twitter className="w-24 h-24 text-violet-500" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px] md:min-h-[160px]">
             <div className="p-3 w-fit rounded-2xl bg-white shadow-sm mb-4 text-violet-500 group-hover:scale-110 transition-transform duration-300">
              <Twitter className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 group-hover:text-violet-600 transition-colors">타임라인</h2>
              <p className="text-slate-500 mt-1 font-medium text-sm md:text-base">멤버들의 최신 소식 모아보기</p>
            </div>
          </div>
        </Link>

        {/* 카드 4: 활동 (Amber/Orange) */}
        <Link to="/activities" className="group relative overflow-hidden p-6 md:p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 hover:shadow-lg hover:shadow-amber-100/50 transition-all duration-300 hover:-translate-y-1">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="w-24 h-24 text-amber-500" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px] md:min-h-[160px]">
             <div className="p-3 w-fit rounded-2xl bg-white shadow-sm mb-4 text-amber-500 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 group-hover:text-amber-600 transition-colors">활동</h2>
              <p className="text-slate-500 mt-1 font-medium text-sm md:text-base">투표하고 함께 즐겨요</p>
            </div>
          </div>
        </Link>

        {/* 카드 5: 교환소 (Emerald/Teal) - 데스크탑 넓게 배치 */}
        <Link to="/others/goods" className="group relative overflow-hidden p-6 md:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-1 md:col-span-2">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShoppingBag className="w-24 h-24 text-emerald-500" />
          </div>
           <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px] md:min-h-[160px]">
             <div className="p-3 w-fit rounded-2xl bg-white shadow-sm mb-4 text-emerald-500 group-hover:scale-110 transition-transform duration-300">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">교환소</h2>
                <span className="bg-emerald-100 text-emerald-600 text-[10px] md:text-xs font-bold px-2 py-1 rounded-full">HOT</span>
              </div>
              <p className="text-slate-500 mt-1 font-medium text-sm md:text-base">굿즈 교환 정보 및 장터</p>
            </div>
          </div>
        </Link>

      </div>

      {/* =========================================
          4. 하단 통계 섹션
          ========================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-5xl px-4 mt-6 md:mt-8">
        {[
          { label: '멤버', value: members ? members.length : '-', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
          { label: '다가오는 일정', value: '5', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
          { label: 'LIVE 중', value: liveMembers.length, color: 'text-red-500', bg: 'bg-red-50 border-red-100' },
          { label: '교환 게시글', value: '6', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
        ].map((stat, idx) => (
          <div key={idx} className={cn("rounded-2xl p-4 text-center border shadow-sm transition-transform hover:scale-105", stat.bg)}>
            <p className={cn("text-2xl md:text-3xl font-extrabold", stat.color)}>
              {stat.value}
            </p>
            <p className="text-xs font-medium text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
