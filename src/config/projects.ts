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
    nameKo: "마이캠",
    subtitle: "나만의 캠핑 기록 & 공간 서비스",
    description:
      "다녀온 캠핑장의 위치, 날씨, 장비, 분위기와 사진을 한곳에 기록하고 통계로 보는 캠퍼 전용 커스텀 기록 서비스입니다.",
    status: "개발 중",
    statusColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    accentColor: "#10b981",
    tags: ["Next.js", "Supabase", "지도 API", "캠핑 일기"],
    devlogCategorySlug: "my-camp-log",
    features: [
      "지도 기반의 캠핑장 탐색 & 위치별 기록",
      "캠핑 장비 및 조과/날씨 자동 정리",
      "감성 사진 중심의 커스텀 포토 다이어리",
    ],
  },
];
