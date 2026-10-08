import { readFileSync, writeFileSync } from "node:fs";
import { removeInaccessibleSourceLinks } from "./lib/review-markdown.mjs";

const backupPath = process.argv[2];
if (!backupPath) throw new Error("Provide the posts backup path");
const posts = JSON.parse(readFileSync(backupPath, "utf8"));
const replacements = new Map([
  ["nextjs-app-router-canonical-tag-search-console-fix", {
    body: readFileSync("content/canonical-review.md", "utf8"),
    title: "Next.js App Router canonical 점검: Search Console 대체 페이지를 구분하는 방법",
    excerpt: "이 블로그의 실제 메타데이터 구성을 기준으로 canonical 상속, 한글 주소와 Search Console 확인 절차를 정리했다. 색인 생성과 광고 승인은 별도 판단임을 구분한다.",
  }],
  ["vercelapp-도메인의-한계와-개인-도메인pekr-도입기-feat-구글-서치-콘솔-색인-문제-해결", {
    body: readFileSync("content/domain-review.md", "utf8"),
    title: "개인 도메인 도입기: DNS 연결부터 사이트맵과 로그인 설정 점검까지",
    excerpt: "sooyoung.pe.kr을 대표 도메인으로 연결하며 점검한 DNS, HTTPS, GitHub 로그인과 사이트맵 설정. 도메인 변경과 색인·애드센스 승인의 관계를 구분한다.",
  }],
]);
const updates = [];
for (const post of posts) {
  let body = post.body.replace(/^# [^\n]+\n+/, "");
  body = removeInaccessibleSourceLinks(body);
  if (post.slug.startsWith("캠핑인스타-만들기-5편-")) {
    body = body.replace(/## 🚀 향후 계획[\s\S]*$/, readFileSync("content/mycamp-release-evidence.md", "utf8"));
    body = body.replace("**증상:** 카카오/구글 로그인이 구현된 앱을 심사 제출하면 **Guideline 4.8 (Sign in with Apple)** 규정에 의해 리젝트된다.", "**확인할 규정:** 외부 소셜 로그인으로 주 계정을 만드는 앱은 Apple의 로그인 서비스 기준을 확인해야 한다. 예외 조건도 있으므로 모든 앱이 자동으로 반려된다고 단정하지 않는다. 이 프로젝트는 Apple 로그인을 함께 제공했다.");
    body = body.replace("width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no", "width=device-width, initial-scale=1, viewport-fit=cover");
    body += "\n\n참고: [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/), [Capacitor 설정 문서](https://capacitorjs.com/docs/config).\n";
  }
  let change = replacements.get(post.slug) || { body };
  if (post.slug === "블로그-배포") {
    change = { body: body.includes("SUPABASE_SERVICE_ROLE_KEY=") ? body : body.replace("NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY\nSUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_KEY") };
  }
  if (change.body !== post.body || change.title) updates.push({ id: post.id, slug: post.slug, previousUpdatedAt: post.updatedAt, previousBody: post.body, ...change });
}
writeFileSync("/private/tmp/sooyoung-content-review-20261008.json", JSON.stringify(updates, null, 2), { mode: 0o600 });
console.log(JSON.stringify(updates.map(({ slug, body }) => ({ slug, characters: body.length })), null, 2));
