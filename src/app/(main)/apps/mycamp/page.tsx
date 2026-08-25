import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPosts, getPostsCount } from "@/lib/posts";
import { getCategoryBySlug } from "@/lib/categories";
import {
  ExternalLink,
  MapPin,
  Camera,
  Smartphone,
  Compass,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Layers,
} from "lucide-react";

export const dynamic = "force-dynamic";

const ogImageUrl = `https://sooyoung.pe.kr/api/og?title=${encodeURIComponent("이번캠 (MyCamp) - 캠핑 갈 곳, 혼자 고민하지 말고 같이 고르기")}&category=App%20Showcase`;

export const metadata: Metadata = {
  title: "이번캠 (MyCamp) - 캠핑 기록과 플랜 공유 서비스 | 수영장",
  description:
    "전국 2,000+ 캠핑장 검색, 광고 없는 찐후기 피드, 지도 기반 플랜 저장, iOS/Android 모바일 앱까지. 1인 개발자 수영의 캠핑 플랫폼 이번캠(MyCamp).",
  openGraph: {
    title: "이번캠 (MyCamp) - 캠핑 기록과 플랜 공유 서비스",
    description: "전국 캠핑장 검색부터 찐후기 피드, 지도 기반 플랜 저장까지.",
    url: "https://sooyoung.pe.kr/apps/mycamp",
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "이번캠 (MyCamp)" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "이번캠 (MyCamp) - 캠핑 기록과 플랜 공유 서비스",
    description: "전국 캠핑장 검색부터 찐후기 피드, 지도 기반 플랜 저장까지.",
    images: [ogImageUrl],
  },
};

function renderThumbnail(post: { thumbnail?: string; title: string }) {
  if (!post.thumbnail) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-muted">
      {post.thumbnail.startsWith("/") ? (
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.thumbnail} alt={post.title} className="h-full w-full object-cover" />
      )}
    </div>
  );
}

export default async function MyCampAppPage() {
  const category = await getCategoryBySlug("my-camp-log");
  const categoryIds = category ? [category.id] : undefined;

  const [devlogPosts] = await Promise.all([
    getPosts(1, 6, categoryIds),
    getPostsCount(categoryIds),
  ]);

  return (
    <div className="space-y-16 py-4">
      {/* 1. Hero Marketing Banner */}
      <section className="relative rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 via-card to-card p-8 sm:p-14 overflow-hidden shadow-md">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
              <Sparkles className="size-3.5" />
              <span>LIVE WEB & NATIVE APP SERVICE</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-stone-900/80 px-3.5 py-1 text-xs font-semibold text-stone-200">
              <span>🍎 Apple App Store 출시 완료</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
              이번캠 <span className="text-emerald-500">(MyCamp)</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-emerald-400">
              &ldquo;캠핑 갈 곳, 혼자 고민하지 말고 같이 고르기&rdquo;
            </p>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            마음에 드는 캠핑장을 지도 위 플랜으로 저장하고 비교한 뒤, 다녀온 순간은 감성 포토 피드와 찐후기로 기록해 보세요.
            PC/모바일 웹 서비스뿐만 아니라 Apple App Store(iOS) 앱까지 출시 완료된 1인 개발자 수영의 캠퍼 전용 올인원 플랫폼입니다.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Button size="lg" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-900/20" asChild>
              <a href="https://camp.sooyoung.pe.kr" target="_blank" rel="noreferrer">
                웹 서비스 접속하기 (PC/Web) <ExternalLink className="ml-2 size-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-stone-700 bg-stone-900/50 hover:bg-stone-800 text-white font-medium" asChild>
              <a href="https://apps.apple.com/kr/app/%EC%9D%B4%EB%B2%88%EC%BA%A0/id6790258305" target="_blank" rel="noreferrer">
                🍎 App Store에서 받기
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Core Features Highlight Grid */}
      <section id="features" className="space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
            Core Features
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            기록하면 더 즐거워지는 캠핑
          </h2>
          <p className="text-muted-foreground">
            흩어져 있던 캠핑장 후보와 다녀온 기억을 한곳에 모아 관리해 보세요.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="h-full border-emerald-500/20 bg-card/60 transition-all hover:border-emerald-500/40 hover:shadow-md">
            <CardHeader className="space-y-3">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <Compass className="size-6" />
              </div>
              <CardTitle className="text-lg">전국 캠핑장 검색</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                GoCamping 공공 API 연동으로 전국 2,000여 개 캠핑장의 위치, 부대시설, 주소 및 스펙을 실시간으로 탐색하고 비교합니다.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="h-full border-emerald-500/20 bg-card/60 transition-all hover:border-emerald-500/40 hover:shadow-md">
            <CardHeader className="space-y-3">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <Camera className="size-6" />
              </div>
              <CardTitle className="text-lg">광고 없는 찐후기 피드</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                광고 없는 진짜 캠퍼들의 후기 피드. 날짜, 날씨, 온습도, 장비 세팅, 사이트 간격과 그늘 정보까지 생생하게 기록합니다.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="h-full border-emerald-500/20 bg-card/60 transition-all hover:border-emerald-500/40 hover:shadow-md">
            <CardHeader className="space-y-3">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <MapPin className="size-6" />
              </div>
              <CardTitle className="text-lg">캠핑 지도 & 컬렉션</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                가보고 싶은 곳을 지도에 북마크하고 자신만의 테마별 플랜 컬렉션(`/collections`)으로 묶어 동료와 공유하세요.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="h-full border-emerald-500/20 bg-card/60 transition-all hover:border-emerald-500/40 hover:shadow-md">
            <CardHeader className="space-y-3">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <Smartphone className="size-6" />
              </div>
              <CardTitle className="text-lg">iOS / Android 네이티브 앱</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                Capacitor 크로스플랫폼 지원으로 웹과 모바일 앱 환경 모두에서 동일하게 동기화되는 네이티브 경험을 선사합니다.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Tech Architecture Section */}
      <section className="rounded-3xl border bg-muted/40 p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-500">
          <Layers className="size-4" />
          <span>Tech Architecture & Specs</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              모던 풀스택 1인 개발 아키텍처
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Next.js 16과 Supabase의 매끄러운 통합으로 백엔드 인프라 공수를 극소화하고, 
              Capacitor 앱 셸로 iOS/Android 빌드를 단일 코드베이스에서 안정적으로 관리합니다.
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>Next.js 16 (App Router)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>React 19 & TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>Supabase Auth & Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>Capacitor Native Shell</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>Tailwind CSS & shadcn/ui</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>GoCamping API 연동</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="text-xs font-mono text-emerald-500">SERVICE URL</div>
              <div className="text-xl font-bold font-mono text-foreground">
                https://camp.sooyoung.pe.kr
              </div>
              <p className="text-xs text-muted-foreground">
                Vercel Production SSL 배포 완료 · 모바일 PWA & 웹뷰 완벽 지원
              </p>
            </div>
            <Button size="lg" className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold" asChild>
              <a href="https://camp.sooyoung.pe.kr" target="_blank" rel="noreferrer">
                지금 이번캠 접속하기 <ExternalLink className="ml-2 size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Related Devlog Articles */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
              Development Story
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              이번캠 개발 비하인드 스토리
            </h2>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/category/my-camp-log">
              개발기 전체보기 <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        {devlogPosts.length === 0 ? (
          <p className="text-muted-foreground">아직 작성된 관련 개발기가 없습니다.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {devlogPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`}>
                <Card className="h-full overflow-hidden transition-all hover:border-emerald-500/40 hover:shadow-md">
                  {renderThumbnail({ thumbnail: post.thumbnail, title: post.title })}
                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-base sm:text-lg">{post.title}</CardTitle>
                    {post.excerpt && (
                      <CardDescription className="line-clamp-2 text-sm leading-6">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <time className="text-xs text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                      {" · "}
                      {post.viewCount ?? 0}회 조회
                    </time>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
