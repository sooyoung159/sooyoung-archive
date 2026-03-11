## 개인 수영 로그 블로그, Vercel로 무료 배포까지 해본 후기

혼자 쓰는 수영 로그라서 사실 로컬에서만 돌려도 되지만,  
언제 어디서든 모바일로 바로 열어보고 싶고, 기록하는 과정도 조금 더 “서비스처럼” 느끼고 싶었다.  
그래서 이번에는 단순히 만들고 끝나는 게 아니라, Next.js로 만든 내 수영 로그 블로그를 **Vercel에 실제로 배포**까지 해보기로 했다.  
어차피 혼자 쓰는 서비스라서 **완전 무료**로 운영하는 것도 중요한 조건이었다.

---

## 스택 정리

현재 블로그의 기술 스택은 이렇게 구성되어 있다.

- **프론트/백엔드**: Next.js 16 (app router)
- **인증**: NextAuth + GitHub 로그인
- **DB/스토리지**: Supabase Free tier
- **스타일**: Tailwind 기반 UI 컴포넌트
- **배포**: Vercel Hobby(무료)

Next.js + Vercel 조합은 워낙 많이 쓰이는 조합이고,  
특히 app router와 route handler 같은 최신 기능까지 자연스럽게 지원해 줘서  
설정 단계에서 크게 막히지 않고 배포까지 갈 수 있었다.

---

## 진짜로 무료로 운영 가능한지 먼저 확인

배포를 결정하기 전에 제일 먼저 확인한 건 **“정말로 돈 안 나오는가?”**였다.

- **Vercel Hobby 플랜**
  - 개인/사이드 프로젝트 용도로는 충분한 자원
  - GitHub에 push만 하면 자동 빌드 + 배포
  - Preview 환경도 자동으로 생성
- **Supabase Free 플랜**
  - 혼자 수영 기록 남기는 정도의 트래픽과 데이터량이면 넉넉하다

주의해야 할 점은 딱 두 가지였다.

1. Pro/Team 같은 **유료 플랜으로 업그레이드하지 않기**
2. Vercel에서 **Postgres, KV, Blob 같은 추가 유료 리소스를 함부로 생성하지 않기**

이 두 가지만 조심하면,  
“Next.js + Supabase + Vercel” 조합으로 개인 블로그를 **사실상 완전 무료**에 가깝게 운영할 수 있다.

---

## 환경 변수 정리: NEXTAUTH_URL, NEXTAUTH_SECRET

NextAuth를 쓰고 있어서, 배포 전에 환경변수를 한 번 정리해 줬다.

### 로컬 개발용 `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

AUTH_GITHUB_ID=...
AUTH_GITHUB_SECRET=...

ADMIN_EMAIL=...
ADMIN_GITHUB=...

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=로컬에서 생성한 긴 랜덤 문자열
```

`NEXTAUTH_URL`과 `NEXTAUTH_SECRET`을 설정해 두면  
콘솔에서 자주 보이는 `NEXTAUTH_URL`, `NO_SECRET` 경고도 깔끔하게 사라진다.

### 배포(Vercel) 환경 변수

배포 후에는 `NEXTAUTH_URL`만 실제 도메인으로 바꿔주면 된다.

```env
NEXTAUTH_URL=https://내-프로젝트명.vercel.app
NEXTAUTH_SECRET=로컬과 동일한 시크릿 값
```

그리고 Supabase, GitHub OAuth 관련 값들도  
로컬에서 쓰던 것과 똑같이 Vercel 프로젝트의 Environment Variables에 넣어줬다.

---

## GitHub와 Vercel 연결해서 배포하기

배포 과정은 크게 어렵지 않았다. 전체 흐름은 이렇다.

1. **GitHub에 코드 올리기**
   - 로컬에서 작업하던 repo를 GitHub 새 저장소에 `main` 브랜치로 push
2. **Vercel에서 Import**
   - Vercel 대시보드 → “Add New Project” → GitHub repo 선택
   - 프레임워크는 자동으로 Next.js로 인식
3. **환경변수 입력**
   - 위에서 정리한 값들(`NEXTAUTH_URL`, `NEXTAUTH_SECRET`, Supabase 키 등)을 그대로 입력
4. **Deploy 버튼 클릭**

조금 기다리면 빌드 로그가 쭉 올라가고,  
마지막에 `https://<프로젝트이름>.vercel.app`처럼 새 도메인이 하나 생긴다.  
이제 어떤 기기에서든 이 주소만 열면 내 수영 로그를 바로 볼 수 있게 됐다.

---

## 파비콘과 작은 디테일들

헤더에 쓰던 물결 모양 로고가 마음에 들어서,  
이걸 바탕으로 **파비콘**도 같이 만들었다.

- 두 줄의 파형으로 수영 레인을 표현하는 작은 SVG 아이콘
- 어두운 네모 배경 위에 파란 물결선 두 줄
- `src/app/icon.svg`로 추가하면 Next.js app router에서 자동으로 파비콘으로 인식된다

브라우저 탭에 걸리는 작은 아이콘 하나만으로도  
프로젝트가 훨씬 “서비스다운” 느낌이 나는 게 꽤 만족스러웠다.

---

## 실제로 써보면서 느낀 점

로컬에서만 쓰던 수영 로그를 Vercel에 올려 보니, 생각보다 체감이 크다.

- 수영장 가는 길에 휴대폰으로 지난 기록을 바로 확인할 수 있고
- 세션이 끝난 직후 락커룸에서 오늘 훈련 내용을 바로 정리할 수 있고
- 혼자 쓰는 서비스지만, 배포를 한 번 해두니 “진짜 제품”처럼 느껴진다

무엇보다도, **“Next.js + Supabase + Vercel” 조합 하나만 익혀두면**  
비슷한 사이드 프로젝트 아이디어가 떠올랐을 때  
“이걸 실제 서비스처럼 만들어볼까?”라는 생각을 부담 없이 실행으로 옮길 수 있다는 점이 좋았다.
