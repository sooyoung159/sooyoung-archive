export interface Project {
  id: string;
  name: string;
  nameKo: string;
  subtitle: string;
  description: string;
  status: "웹 출시" | "개발 중" | "베타 테스트" | "프로토타입";
  statusColor: string;
  tags: string[];
  demoUrl?: string;
  appStoreUrl?: string;
  githubUrl?: string;
  devlogCategorySlug?: string;
  accentColor: string;
  icon?: string;
  coverImage?: string;
  features: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "mycamp",
    name: "MyCamp",
    nameKo: "이번캠 (MyCamp)",
    subtitle: "캠핑 기록과 플랜 공유 서비스",
    description:
      "캠핑 갈 곳을 고르고, 저장하고, 공유하는 캠핑 로그. 전국 캠핑장 검색부터 찐후기 피드, 나만의 캠핑 지도, App Store 출시 및 웹 서비스까지 제공합니다.",
    status: "웹 출시",
    statusColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    accentColor: "#10b981",
    tags: ["App Store 출시 🍎", "Next.js 16", "Supabase", "Capacitor iOS/Android", "GoCamping API"],
    demoUrl: "https://camp.sooyoung.pe.kr",
    appStoreUrl: "https://apps.apple.com/kr/app/%EC%9D%B4%EB%B2%88%EC%BA%A0/id6790258305",
    devlogCategorySlug: "my-camp-log",
    features: [
      "App Store 공식 출시 (iOS) & 웹 서비스 동시 운영",
      "전국 2,000+ 캠핑장 실시간 검색 & 비교",
      "광고 없는 생생한 찐후기 포토 피드 & 지도 저장",
    ],
  },
];
