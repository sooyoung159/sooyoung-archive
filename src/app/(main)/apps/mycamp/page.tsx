import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ExternalLink, Smartphone, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageZoom } from "@/components/image-zoom";
import { SERIES_LIST } from "@/lib/series";
import { supabase } from "@/lib/supabase";
import type { Post } from "@/lib/types";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "이번캠 (MyCamp) - 캠핑장 검색, 플랜과 방문 기록 | 수영장",
  description: "직접 만든 이번캠의 실제 화면과 사용 흐름. 캠핑장 검색부터 후보 저장, 플랜 공유와 방문 기록까지 웹과 iOS·Android 앱에서 연결합니다.",
  alternates: { canonical: "/apps/mycamp" },
  openGraph: {
    title: "이번캠 (MyCamp)", description: "캠핑장 검색부터 플랜과 방문 기록까지, 실제 서비스 화면과 개발 기록.",
    url: "https://sooyoung.pe.kr/apps/mycamp",
    images: [{ url: "/images/mycamp/03-search.png", width: 540, height: 960, alt: "이번캠 캠핑장 검색 화면" }],
  },
};

const screens = [
  { file: "03-search.png", title: "캠핑장 검색", detail: "캠핑장 이름과 지역으로 후보를 찾습니다. 검색 결과에서 주소와 사진을 확인하고 상세 화면으로 이동합니다." },
  { file: "04-camp-detail.png", title: "상세 정보와 저장", detail: "주소, 지도와 외부 홈페이지를 확인한 뒤 관심 장소로 저장하거나 플랜에 담습니다. 예약 버튼은 캠핑장 측의 외부 안내로 연결됩니다." },
  { file: "02-plans.png", title: "후보를 모은 캠핑 플랜", detail: "이번 주말, 바다, 아이와 함께 등 주제별 플랜을 살펴보고 후보 캠핑장을 비교합니다. 내 플랜을 만들거나 공개 플랜을 참고할 수 있습니다." },
  { file: "01-feed.png", title: "다녀온 캠핑 기록", detail: "사진, 방문 날짜와 장소를 연결한 기록을 피드에서 확인합니다. 장소 정보와 후기를 함께 보되, 작성 시점과 작성자의 경험을 구분해 읽습니다." },
];

export default async function MyCampAppPage() {
  const slugs = SERIES_LIST.find((series) => series.id === "mycamp")?.posts.map((post) => post.slug) || [];
  const { data } = await supabase.from("posts").select("*, category:categories(*)").in("slug", slugs);
  const posts = ((data as Post[]) || []).sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug));
  return (
    <article className="space-y-12 py-4">
      <header className="space-y-5 border-b pb-8">
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">직접 만든 캠핑 서비스 · 웹 / iOS / Android</p>
        <h1 className="text-4xl font-bold sm:text-5xl">이번캠 <span className="text-muted-foreground">MyCamp</span></h1>
        <p className="max-w-2xl text-lg leading-8">캠핑 갈 곳을 고르고, 후보를 함께 비교하고, 다녀온 기억을 남기는 서비스입니다. 캠핑장 검색·플랜·방문 기록을 하나의 흐름으로 연결했습니다.</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild><a href="https://camp.sooyoung.pe.kr" target="_blank" rel="noreferrer">이번캠 열기 <ExternalLink className="size-4" /></a></Button>
          <Button asChild variant="outline"><a href="https://apps.apple.com/kr/app/%EC%9D%B4%EB%B2%88%EC%BA%A0/id6790258305" target="_blank" rel="noreferrer"><Smartphone className="size-4" /> App Store</a></Button>
          <Button asChild variant="outline"><a href="https://play.google.com/store/apps/details?id=com.mycamplog.app" target="_blank" rel="noreferrer"><Play className="size-4" /> Google Play</a></Button>
        </div>
      </header>
      <section className="space-y-6" aria-labelledby="screens-title">
        <div className="space-y-2">
          <h2 id="screens-title" className="text-2xl font-semibold">검색부터 기록까지</h2>
          <p className="text-sm leading-6 text-muted-foreground">이번캠의 실제 스토어 제출용 화면입니다. 표시된 후기·사진·건수는 캡처 당시의 예시이며 현재 데이터와 다를 수 있습니다.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {screens.map((screen, index) => (
            <figure key={screen.file} className="min-w-0 space-y-4">
              <div className="aspect-[9/16] overflow-hidden rounded-lg border bg-muted [&_img]:m-0 [&_img]:h-full [&_img]:max-h-none [&_img]:w-full [&_img]:object-contain [&_span[role=button]]:h-full [&_span[role=button]]:w-full [&_span[role=button]]:rounded-none [&_span[role=button]]:border-0">
                <ImageZoom src={`/images/mycamp/${screen.file}`} alt={`이번캠 ${screen.title} 실제 화면`} width={540} height={960} showCaption={false} figureClassName="m-0 h-full" />
              </div>
              <figcaption className="space-y-2">
                <h3 className="text-base font-semibold"><span className="mr-2 text-emerald-600 dark:text-emerald-400">0{index + 1}</span>{screen.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{screen.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="space-y-5 border-t pt-8">
        <h2 className="text-2xl font-semibold">출발 전에 확인할 것</h2>
        <dl className="divide-y text-sm leading-7">
          <div className="grid gap-2 py-4 sm:grid-cols-[140px_1fr]"><dt className="font-semibold">캠핑장 정보</dt><dd className="text-muted-foreground">고캠핑 공공데이터와 서비스에 저장된 정보를 활용합니다. 실시간 예약 가능 여부를 보장하지 않으며, 운영 시간·요금·시설은 캠핑장 홈페이지나 전화로 최종 확인해 주세요.</dd></div>
          <div className="grid gap-2 py-4 sm:grid-cols-[140px_1fr]"><dt className="font-semibold">로그인과 기록</dt><dd className="text-muted-foreground">내 장소 저장, 플랜 관리와 기록 작성에는 로그인이 필요합니다. 공개하는 기록에는 다른 사람의 개인정보나 공개를 원하지 않는 사진을 넣지 않도록 주의해 주세요.</dd></div>
          <div className="grid gap-2 py-4 sm:grid-cols-[140px_1fr]"><dt className="font-semibold">웹과 앱</dt><dd className="text-muted-foreground">웹 서비스와 iOS·Android 앱을 제공합니다. 기기와 권한 설정에 따라 사진 촬영·알림 등의 동작이 달라질 수 있습니다. 최신 지원 정보는 각 스토어 안내를 확인해 주세요.</dd></div>
        </dl>
      </section>
      <section className="space-y-5 border-t pt-8">
        <h2 className="text-2xl font-semibold">어떻게 만들었나</h2>
        <p className="text-sm leading-7 text-muted-foreground">Next.js와 React로 웹 화면을 만들고, Supabase로 인증·데이터·사진을 관리합니다. Capacitor 앱 셸에서 웹 경험을 모바일로 연결하며 로그인 복귀, 사진 업로드와 기기 화면 영역을 따로 점검했습니다. 구현 과정과 문제 해결 기록은 아래 개발기에 남겼습니다.</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium"><span>Next.js · TypeScript</span><span>Supabase Auth · Storage</span><span>Capacitor</span><span>고캠핑 공공데이터</span></div>
        <p className="text-sm text-muted-foreground">서비스 이용 문의는 <a className="underline underline-offset-4" href="mailto:sooyoung159@naver.com">sooyoung159@naver.com</a>으로 보내 주세요.</p>
      </section>
      <section className="space-y-5 border-t pt-8">
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-semibold">이번캠 개발 기록</h2><Link className="inline-flex items-center gap-2 text-sm" href="/category/project">프로젝트 글 <ArrowRight className="size-4" /></Link></div>
        <div className="grid gap-5 sm:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.slug}`} className="overflow-hidden rounded-lg border transition-colors hover:border-emerald-500">
              {post.thumbnail && <div className="relative aspect-video"><Image src={post.thumbnail} alt="" fill unoptimized className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" /></div>}
              <div className="space-y-3 p-5"><h3 className="text-base font-semibold leading-6">{post.title}</h3><p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p><time className="text-xs text-muted-foreground" dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString("ko-KR")}</time></div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
