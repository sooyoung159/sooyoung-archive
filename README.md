# 📚 Sooyoung Archive

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

> 개인 프로젝트, 개발 일지, 그리고 일상의 생각들을 기록하는 나만의 아카이브 블로그입니다. 🚀

🔗 **바로가기:** [https://sooyoung.pe.kr](https://sooyoung.pe.kr)

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
SUPABASE_SERVICE_ROLE_KEY=your_server_only_key
NEXTAUTH_SECRET=your_local_session_secret
NEXTAUTH_URL=http://localhost:3000
AUTH_GITHUB_ID=your_github_oauth_client_id
AUTH_GITHUB_SECRET=your_github_oauth_secret
ADMIN_GITHUB=your_admin_github_username
```

### 설치 및 실행

```bash
# 1. 패키지 설치
npm install

# 2. 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속하여 결과를 확인합니다.

### 운영 보안 및 광고 준비

서버 전용 Supabase 키에는 `NEXT_PUBLIC_` 접두사를 붙이지 않습니다.
글·카테고리 변경은 관리자 API를 통해서만 수행하고 댓글 API는 비밀번호 해시를
공개 응답에서 제외합니다. 기존 데이터베이스에도
`supabase/migrations/202610080001_secure_public_access.sql`을 적용해야 합니다.
코드 변경만으로 원격 데이터베이스의 권한은 변경되지 않습니다.

광고 노출은 기본적으로 비활성화되어 있습니다. 광고 운영을 허용하는 호스팅과
애드센스 승인 상태를 확인한 뒤에만 `NEXT_PUBLIC_ADSENSE_ENABLED=true`를
설정하고 다시 배포합니다. 사이트 확인용 메타 태그와 `ads.txt`는 유지합니다.

배포 순서와 광고 운영 조건은 [운영 점검](docs/adsense-readiness.md)을 참고합니다.
콘텐츠 교정 원문은 `content/`에 보관하며, 게시글 ID·슬러그·작성일은 유지합니다.

```bash
npm test
npx tsc --noEmit
npx next build --webpack
```
