# 📚 Sooyoung Archive

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

> 개인 프로젝트, 개발 일지, 그리고 일상의 생각들을 기록하는 나만의 아카이브 블로그입니다. 🚀

🔗 **바로가기:** [https://sooyoung-archive.vercel.app](https://sooyoung-archive.vercel.app)

---

## ✨ 특징 (Features)

- **최신 기술 스택**: Next.js (App Router) 기반의 빠르고 최적화된 웹사이트
- **깔끔한 UI/UX**: Tailwind CSS와 Lucide Icons를 활용한 직관적이고 모던한 디자인
- **안정적인 데이터베이스**: Supabase를 활용한 포스트, 카테고리, 조회수 관리
- **마크다운 렌더링**: `react-markdown`을 활용하여 풍부한 텍스트 포맷 지원
- **검색엔진 최적화(SEO)**: 동적 Sitemap(`sitemap.xml`) 생성 및 메타태그 최적화

## 📂 카테고리 (Categories)

- **💻 Develop**: 개발하면서 배운 점, 트러블슈팅, 기술 아티클
- **🚀 Project**: 개인 프로젝트 제작기 및 회고
- **🏕️ My Camp Log**: 개발 학습 및 부트캠프 기록
- **💬 Grimtalk**: 그림톡, 개인적인 생각과 일상 기록
- **📝 Blog**: 이 블로그의 제작 및 운영 일지

## 🛠️ 시작하기 (Getting Started)

### 환경 변수 설정
이 프로젝트를 로컬에서 실행하려면 Supabase 프로젝트가 필요합니다. 루트 경로에 `.env.local` 파일을 만들고 아래 변수를 추가하세요.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 설치 및 실행

```bash
# 1. 패키지 설치
npm install

# 2. 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속하여 결과를 확인합니다.
