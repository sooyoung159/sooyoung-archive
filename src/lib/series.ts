export interface SeriesItem {
  order: number;
  title: string;
  slug: string;
}

export interface Series {
  id: string;
  slug: string;
  title: string;
  description: string;
  badge: string;
  color: "emerald" | "indigo" | "amber" | "sky";
  posts: SeriesItem[];
}

export interface SeriesContext {
  series: Series;
  currentIndex: number;
  totalCount: number;
  prevPost: SeriesItem | null;
  nextPost: SeriesItem | null;
}

export const SERIES_LIST: Series[] = [
  {
    id: "mycamp",
    slug: "mycamp",
    title: "이번캠(MyCamp) 만들기",
    description: "전국 2,000+ 캠핑장 검색부터 Capacitor를 이용한 iOS App Store 출시 및 운영까지의 전 과정",
    badge: "캠핑인스타",
    color: "emerald",
    posts: [
      {
        order: 1,
        title: "캠핑인스타 만들기 첫편",
        slug: "캠핑인스타-만들기-첫편",
      },
      {
        order: 2,
        title: "캠핑인스타 만들기 2편",
        slug: "캠핑인스타-만들기-2편",
      },
      {
        order: 3,
        title: "캠핑 인스타 만들기 3편",
        slug: "캠핑-인스타-만들기-3편",
      },
      {
        order: 4,
        title: "캠핑인스타 만들기 4편",
        slug: "캠핑인스타-만들기-4편",
      },
      {
        order: 5,
        title: "캠핑인스타 만들기 5편: '이번캠(MyCamp)' 리브랜딩과 Capacitor로 Apple App Store 심사 통과한 이야기",
        slug: "캠핑인스타-만들기-5편-이번캠mycamp-리브랜딩과-capacitor로-apple-app-store-심사-통과한-이야기",
      },
    ],
  },
  {
    id: "sammun",
    slug: "sammun",
    title: "삼문판결 만들기",
    description: "아이디어 기획부터 제품 출시, 지표 분석, 그리고 피벗과 중단 결정까지 1인 개발 사이클 회고",
    badge: "삼문판결",
    color: "indigo",
    posts: [
      {
        order: 1,
        title: "삼문판결 만들기 1편: '좋은 말' 대신 '판결문'을 선택한 이유",
        slug: "삼문판결-만들기-첫번째-이야기-1",
      },
      {
        order: 2,
        title: "삼문판결 만들기 2편: 만든 다음부터가 진짜 시작이었다",
        slug: "삼문판결-만들기-이야기-2",
      },
      {
        order: 3,
        title: "삼문판결 만들기 3편: 재심(appeal)을 기능이 아니라 장치로 설계한 이유",
        slug: "재심appeal을-기능이-아니라-장치로-설계한-이유",
      },
      {
        order: 4,
        title: "삼문판결 만들기 4편: 감이 아니라 숫자로 보는 운영 지표",
        slug: "감이-아니라-숫자로-보는-운영-지표",
      },
      {
        order: 5,
        title: "삼문판결 만들기 5편: 계속할지 멈출지, 프로젝트 피벗과 중단 기준",
        slug: "계속할지-멈출지-판정-기준을-먼저-정했다",
      },
    ],
  },
  {
    id: "grimtalk",
    slug: "grimtalk",
    title: "그림톡(GrimTalk) 만들기",
    description: "아이가 그린 그림과 진짜 친구처럼 대화하는 감정선 중심의 AI 인터랙션 서비스 개발기",
    badge: "그림톡",
    color: "amber",
    posts: [
      {
        order: 1,
        title: "그림톡 만들기 1편: 아이의 그림이 말을 걸기까지 (MVP 기획과 프로토타입)",
        slug: "내-캐릭터와-대화하기",
      },
      {
        order: 2,
        title: "그림톡 만들기 2편: 결과 화면을 '정보 화면'에서 '첫 만남 장면'으로 바꾸기",
        slug: "first-meeting",
      },
      {
        order: 3,
        title: "그림톡 만들기 3편: '한 번 답하는 앱'에서 '계속 대화하는 친구'로 바꾸기",
        slug: "친구",
      },
    ],
  },
  {
    id: "admin-starter-kit",
    slug: "admin-starter-kit",
    title: "Admin Starter Kit 만들기",
    description: "생산성을 높이기 위해 직접 만든 모던 관리자 페이지 스타터 킷 제작기",
    badge: "AdminKit",
    color: "sky",
    posts: [
      {
        order: 1,
        title: "admin-starter-kit 만들기 (1)",
        slug: "admin-starter-kit-만들기-1",
      },
      {
        order: 2,
        title: "admin-starter-kit 만들기 (2)",
        slug: "admin-starter-kit-만들기-2",
      },
    ],
  },
];

/**
 * 포스트 slug를 바탕으로 해당 포스트가 포함된 시리즈 정보를 조회합니다.
 * 디코딩된 slug와 인코딩된 slug 모두를 안전하게 처리합니다.
 */
export function getSeriesByPostSlug(slug: string): SeriesContext | null {
  const decodedSlug = decodeURIComponent(slug).trim().toLowerCase();

  for (const series of SERIES_LIST) {
    const index = series.posts.findIndex((p) => {
      const pSlug = decodeURIComponent(p.slug).trim().toLowerCase();
      return pSlug === decodedSlug;
    });

    if (index !== -1) {
      return {
        series,
        currentIndex: index,
        totalCount: series.posts.length,
        prevPost: index > 0 ? series.posts[index - 1] : null,
        nextPost: index < series.posts.length - 1 ? series.posts[index + 1] : null,
      };
    }
  }

  return null;
}

/**
 * 특정 시리즈 slug로 시리즈 데이터를 조회합니다.
 */
export function getSeriesBySlug(seriesSlug: string): Series | null {
  return SERIES_LIST.find((s) => s.slug === seriesSlug || s.id === seriesSlug) || null;
}

/**
 * 등록된 모든 시리즈 목록을 반환합니다.
 */
export function getAllSeries(): Series[] {
  return SERIES_LIST;
}
