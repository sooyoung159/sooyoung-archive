# Next.js 개발 아카이브를 Vercel에 배포하기: 환경 변수와 운영 점검

Sooyoung Archive는 개인 프로젝트의 제작 과정과 개발 중 해결한 문제를 기록하는 블로그다. Next.js로 화면과 API를 만들고, 글과 카테고리는 Supabase에 저장한다. 배포는 GitHub 저장소와 연결된 Vercel에서 진행한다.

이 글은 이 프로젝트의 코드 구성을 기준으로 배포할 때 확인할 설정을 정리한다. 광고 심사 과정은 별도의 [애드센스 승인 시도 기록](/post/개인-블로그-만들기부터-adsense-수익화까지-완벽-가이드)에서 다룬다.

> 2026년 10월 2일 수정: 사이트와 무관한 수영 기록 설명을 삭제하고, 현재 프로젝트의 배포 설정과 확인 항목으로 바로잡았다.

## 화면, 데이터, 로그인 역할 나누기

- Next.js 16 App Router: 글 목록, 상세 페이지, API 라우트와 메타데이터를 담당한다.
- Supabase: `posts`와 `categories` 데이터를 저장한다. 배포된 사이트의 글은 로컬 JSON 파일이 아니라 이 데이터베이스에서 읽는다.
- NextAuth.js v4와 GitHub: 로그인 세션을 관리한다. 앱의 글 작성 및 수정 API는 관리자 세션을 확인한다.
- Tailwind CSS와 React Markdown: 화면 스타일과 글 본문의 마크다운 표시를 담당한다.
- Vercel: Next.js 프로젝트를 빌드하고 배포한다.

코드와 글 데이터의 저장 위치가 다르다는 점이 중요하다. 화면 코드는 GitHub에 반영하면 배포되고, 글 본문은 Supabase에서 수정된다. 화면이 새로 배포됐다고 글 데이터도 함께 바뀌는 구조는 아니다.

## 환경 변수는 실행 환경별로 설정하기

이 프로젝트의 Supabase 클라이언트와 로그인 설정에서 읽는 변수 이름은 다음과 같다. 값은 예시이며 실제 키를 글이나 저장소에 공개하면 안 된다.

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY

AUTH_GITHUB_ID=YOUR_GITHUB_CLIENT_ID
AUTH_GITHUB_SECRET=YOUR_GITHUB_CLIENT_SECRET
NEXTAUTH_SECRET=YOUR_RANDOM_SERVER_SECRET
NEXTAUTH_URL=https://sooyoung.pe.kr

ADMIN_GITHUB=YOUR_GITHUB_USERNAME
# ADMIN_EMAIL can also be used by this project's admin check.
```

로컬에서는 `NEXTAUTH_URL`을 실제 개발 서버 주소로 설정한다. 개발 서버를 다른 포트로 실행했다면 그 포트까지 맞춰야 한다. 운영 환경에서는 공개 대표 주소인 `https://sooyoung.pe.kr`을 사용한다.

`AUTH_GITHUB_ID`와 `AUTH_GITHUB_SECRET`은 이 저장소에서 사용하는 변수 이름이다. 라이브러리 예제의 변수 이름과 달라도 코드에서 읽는 이름에 맞춰야 한다. `ADMIN_GITHUB` 또는 `ADMIN_EMAIL`은 앱의 관리자 판별에 사용되며, 로그인에 성공하는 것과 관리자 권한을 얻는 것은 별개다.

`NEXT_PUBLIC_` 접두사가 있는 값은 브라우저에 노출될 수 있다. Supabase 공개 키가 있다는 이유만으로 데이터 쓰기가 안전해지는 것은 아니다. 공개 클라이언트의 읽기와 쓰기 권한은 데이터베이스의 RLS 정책에서도 별도로 확인해야 한다. GitHub Secret과 `NEXTAUTH_SECRET`, Supabase 서버 전용 키에는 이 접두사를 붙이지 않는다.

Vercel의 Production과 Preview 설정도 구분한다. 테스트 배포가 운영 데이터에 쓰기를 수행하지 않도록 데이터베이스, OAuth 앱, 비밀 값의 사용 범위를 확인한다. 환경 변수를 바꾼 뒤에는 해당 환경을 다시 배포한다.

## 도메인 변경 시 로그인 콜백도 확인하기

대표 도메인으로 로그인하려면 GitHub OAuth 앱의 콜백 주소도 실제 운영 주소와 맞아야 한다. 이 프로젝트의 기본 인증 경로를 기준으로 운영 콜백은 다음과 같다.

```text
https://sooyoung.pe.kr/api/auth/callback/github
```

로컬 테스트용 주소는 개발 서버 포트에 맞춘다. GitHub OAuth 앱은 앱 하나에 콜백 URL 하나를 설정하므로 로컬과 운영을 함께 사용하는 경우에는 OAuth 앱을 구분하는 편이 관리하기 쉽다. 자세한 설정은 [NextAuth GitHub 문서](https://next-auth.js.org/providers/github)와 [환경 변수 문서](https://next-auth.js.org/configuration/options)를 참고한다.

도메인 변경은 환경 변수 한 줄만 바꾸는 작업으로 끝나지 않는다. OAuth 콜백, 대표 주소를 나타내는 canonical, 사이트맵, 기존 주소의 리디렉션도 함께 확인한다.

## GitHub와 연결한 배포 흐름

1. 변경할 코드가 저장소에 반영됐는지 확인한다. `.env.local`과 실제 비밀 값은 커밋에서 제외한다.
2. Vercel 프로젝트에 GitHub 저장소를 연결하고 Next.js 프레임워크 설정을 확인한다.
3. Production 환경에 필요한 변수를 등록하고 운영 브랜치를 `main`으로 지정한다.
4. 배포 로그에서 빌드 성공 여부를 확인한다. 실패하면 첫 번째 오류와 관련 설정부터 확인한다.
5. Vercel 배포 주소와 대표 도메인에서 실제 글 페이지를 연다.

이 저장소는 `main`에 반영된 코드가 Vercel에서 자동 배포되는 흐름으로 운영한다. 글 내용만 바꾼 경우에도 공개 페이지에 새 본문이 표시되는지 확인해야 한다. 글 상세 페이지에는 60초 재검증 설정이 있고, 사이트맵은 1시간 재검증 설정이 있어 이미 캐시된 응답에는 반영 시차가 생길 수 있다.

## 배포 성공 후 실제 페이지 점검

빌드 성공은 출발점이다. 이 블로그에서는 다음 항목을 나누어 확인한다.

- 데이터: 글 목록과 상세 페이지가 같은 Supabase 프로젝트의 글을 표시하는지 확인한다.
- 로그인: GitHub 로그인 후 운영 도메인으로 돌아오는지, 관리자 계정에서 글 관리 기능이 표시되는지 확인한다.
- 권한: 일반 사용자와 공개 데이터베이스 클라이언트가 관리 작업을 수행할 수 없는지 확인한다.
- 본문: 코드 블록, 이미지, 표, 내부 링크가 실제 화면에서 읽기 좋게 표시되는지 확인한다.
- 검색 정보: 글 제목과 설명, canonical, `sitemap.xml`이 올바른 공개 주소를 사용하는지 확인한다.
- 모바일: 긴 제목이나 코드가 페이지 전체를 가로로 밀어내지 않는지 확인한다.

이 항목들은 운영 점검 목록이다. 배포 버튼을 누른 것만으로 모든 항목이 충족됐다고 판단하지 않는다.

## 무료 플랜과 수익화는 따로 확인하기

기존 원고의 "유료 업그레이드만 하지 않으면 완전 무료"라는 설명은 정확하지 않았다. 사용량 한도, 이용 목적, 외부 서비스 비용을 함께 확인해야 한다.

2026년 10월 2일 확인한 [Vercel Hobby 공식 안내](https://vercel.com/docs/plans/hobby)는 Hobby를 비상업적 개인 용도로 제한한다. 광고 수익화를 계획한다면 적용 가능한 플랜과 이용 조건을 먼저 확인해야 한다. 이 글이 현재 계정의 요금제 적합성이나 전체 운영 비용을 보장하는 것은 아니다.

블로그 배포에서 남길 만한 기록은 단순히 주소가 생겼다는 사실에 그치지 않는다. 어떤 코드가 화면을 만들고, 어떤 데이터가 표시되며, 도메인과 로그인 설정이 어떻게 연결되는지 구분해 두면 다음 배포에서도 같은 확인 과정을 재사용할 수 있다.
