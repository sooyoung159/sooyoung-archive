Search Console에서 ‘적절한 표준 태그가 포함된 대체 페이지’라는 알림을 받았을 때, 먼저 확인할 것은 **제외된 주소가 원래 검색에 표시돼야 하는 대표 페이지인지**다. 같은 글의 다른 주소가 표준 페이지로 선택됐다면 대체 주소가 제외되는 것은 정상일 수 있다.

이 블로그에서는 Next.js App Router의 메타데이터 상속과 글별 대표 주소를 함께 점검했다. 이 글은 현재 저장소의 설정과 재현 가능한 확인 방법을 정리한 기록이다. 표준 주소 설정을 바로잡는 일과 Google의 실제 색인 생성은 구분해서 다룬다.

> 2026년 10월 8일 정정: 실제 Search Console 캡처가 아니었던 외부 사진을 제거했다. canonical이 Google의 선택을 강제한다는 설명과 수정 후 며칠 안에 반드시 색인된다는 설명도 바로잡았다.

## 대체 페이지는 언제 문제가 되는가

`rel="canonical"`은 중복되거나 유사한 페이지 중 선호하는 대표 주소를 제안하는 신호다. 리디렉션과 canonical은 강한 신호이고 사이트맵은 상대적으로 약한 신호지만, Google은 페이지 내용과 다른 신호도 고려해 표준 URL을 선택한다.

| 확인한 주소 | 점검 방향 |
| --- | --- |
| 같은 글에 추적 파라미터가 붙은 주소 | 대표 글 주소가 색인되어 있다면 대체 주소 제외가 의도와 맞는지 확인 |
| HTTP 또는 이전 배포 도메인의 주소 | HTTPS 대표 도메인으로 이동하는지와 최종 페이지를 확인 |
| 서로 다른 내용의 글 상세 주소 | canonical이 홈이나 다른 글로 잘못 지정되지 않았는지 확인 |
| 사용자 선언과 Google 선택 표준이 다른 주소 | 두 페이지의 내용, 내부 링크, 리디렉션과 사이트맵의 일관성을 확인 |

메일 제목만으로 ‘글 품질이 낮다’거나 ‘모든 글이 색인에서 빠졌다’고 판단하지 않는다. URL 검사에서 사용자 선언 표준과 Google 선택 표준을 확인하고, 대표 페이지의 색인 상태까지 함께 본다.

## 이 프로젝트의 메타데이터 배치

루트 `src/app/layout.tsx`에는 `metadataBase`가 있고 공통 canonical은 없다. 홈페이지에는 `/`를, 글 상세에는 해당 글의 경로를 지정한다. 상위 레이아웃에 홈 canonical을 넣고 하위 페이지가 이를 덮어쓰지 않으면 잘못된 주소가 상속될 수 있기 때문이다.

다만 상위 canonical 자체가 항상 잘못인 것은 아니다. 실제로 중복인 여러 페이지가 같은 대표 페이지를 가리키는 설계도 가능하다. 이 블로그처럼 내용이 다른 글들은 개별 대표 주소가 필요하다.

```typescript
// src/app/layout.tsx - 공통 도메인 기준만 설정
export const metadata: Metadata = {
  metadataBase: new URL("https://sooyoung.pe.kr"),
  // 공통 title, description 등은 생략
};
```

```typescript
// src/app/(main)/page.tsx - 홈에만 홈 주소 지정
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};
```

동적 글은 라우트 매개변수만 조합하지 않고 데이터베이스에서 찾은 `post.slug`를 사용한다. 이전 제목에서 파생된 주소로 글을 찾더라도 저장된 대표 경로를 일관되게 표시하기 위해서다. 아래는 핵심 부분만 줄인 예시다.

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const path = `/post/${encodeURIComponent(post.slug)}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: path },
    openGraph: { type: "article", url: `https://sooyoung.pe.kr${path}` },
  };
}
```

카테고리, 블로그 목록, 소개와 개인정보 페이지도 각각의 대표 경로를 지정한다. 카테고리 목록에 페이지 번호가 있다면 페이지마다 내용과 링크가 어떻게 달라지는지도 따로 검토해야 한다. 모든 목록 페이지를 무조건 첫 페이지로 통합하는 방식은 목적에 따라 적합하지 않을 수 있다.

## 한글 주소를 다룰 때의 확인 기준

한글 슬러그에는 `encodeURIComponent(post.slug)`를 적용해 URL 경로를 만들고, 사이트맵과 메타데이터에서 같은 생성 규칙을 사용한다. 이미 인코딩된 값을 다시 인코딩해 `%25`가 생기거나 다른 글로 연결되는 실수를 막는 것이 목적이다.

한글 표시 주소와 퍼센트 인코딩 주소가 화면에서 다르게 보인다는 것만으로 중복 문제가 있다고 판단하지 않는다. 중요한 것은 최종적으로 같은 글을 가리키는지, 이중 인코딩이 없는지, 대표 도메인·경로·리디렉션 신호가 서로 충돌하지 않는지다.

## 배포된 HTML에서 확인하는 방법

코드에 설정이 있다는 것과 실제 응답이 맞는 것은 별개다. 터미널에서 최종 응답을 확인하거나 브라우저 개발자 도구에서 canonical 요소를 검사한다. 아래 명령은 이 블로그에서 반복할 수 있는 점검 예시이며 출력 결과를 미리 가정하지 않는다.

```bash
# 첫 응답과 리디렉션 확인
curl -I https://sooyoung.pe.kr/post/first-meeting

# 최종 HTML에서 canonical 요소 확인
curl -sL https://sooyoung.pe.kr/post/first-meeting \
  | grep -o '<link[^>]*rel="canonical"[^>]*>'

# 사이트맵 확인
curl -sL https://sooyoung.pe.kr/sitemap.xml
```

확인할 결과는 세 가지다. 글 URL이 접근 가능한 최종 응답을 반환하고, canonical이 이 글의 대표 주소를 가리키며, 사이트맵과 내부 링크도 같은 대표 주소를 사용해야 한다. 글이 없거나 이동된 경우에는 정상 글처럼 처리하지 않고 적절한 오류 또는 리디렉션을 반환해야 한다.

## Search Console에서 확인할 것

1. 영향을 받은 URL을 URL 검사에 넣고 마지막 크롤링 시각을 확인한다.
2. 사용자 선언 표준과 Google 선택 표준을 비교한다. Google이 선택한 표준 URL도 검사한다.
3. 수정한 대표 페이지는 실시간 URL 테스트로 접근 가능 여부를 확인한다. 실시간 테스트는 현재 접근 상태를 보여 주는 것이며 이미 색인됐다는 뜻은 아니다.
4. 의도하지 않은 설정을 실제로 고친 경우에만 해당 문제의 수정 결과 확인을 진행한다. 중요한 대표 페이지에는 가능한 경우 색인 생성 요청을 할 수 있다.
5. 재크롤링 후 보고서가 갱신되었는지 다시 확인한다. 의도된 대체 페이지와 리디렉션 주소까지 모두 색인시키려 하지 않는다.

검증 성공은 해당 문제의 수정 확인이지 모든 페이지의 색인 보장이나 애드센스 승인 보장이 아니다. 콘텐츠 심사는 별도로 진행되며, 중복 신호를 정리한 뒤에도 Google이 다른 표준 URL을 선택하거나 색인하지 않을 수 있다.

## 참고 자료와 연결된 기록

- [Google: 중복 URL의 표준화](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=ko)
- [Google: URL 검사 도구](https://support.google.com/webmasters/answer/9012289?hl=ko)
- [Next.js: 메타데이터 생성](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [이 블로그의 배포 설정과 점검](/post/블로그-배포)
- [애드센스 승인 시도 기록](/post/개인-블로그-만들기부터-adsense-수익화까지-완벽-가이드)
