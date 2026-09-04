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
import { getPosts } from "@/lib/posts";
import { PROJECTS } from "@/config/projects";
import { ArrowRight, Sparkles, MapPin, Notebook, Layers } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "수영장 (Sooyoung Archive) - 1인 개발자 스튜디오 & 개발일지",
  description:
    "아이디어를 만난 수영, 마음껏 헤엄치는 아카이브. 이번캠(MyCamp) 등 1인 개발 프로젝트와 기술 블로그 모음입니다.",
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

export default async function HomePage() {
  // Fetch top 6 latest posts for a rich devlog showcase
  const recentPosts = await getPosts(1, 6);
  const mainApp = PROJECTS[0]; // 이번캠 (MyCamp)

  return (
    <div className="space-y-16 py-2">
      {/* 1. Hero Section */}
      <section className="relative rounded-3xl border bg-gradient-to-br from-card via-card/90 to-primary/5 p-8 sm:p-12 overflow-hidden shadow-sm">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3.5 py-1 text-xs font-medium text-primary backdrop-blur">
            <Sparkles className="size-3.5" />
            <span>Sooyoung Studio & Archive</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[1.15]">
            아이디어를 만난 수영, <br />
            <span className="text-primary">마음껏 헤엄치는 공간.</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            1인 개발자 <strong className="text-foreground">수영</strong>의 프로젝트 스튜디오이자 아카이브입니다.
            직접 만드는 <strong className="text-foreground">이번캠(MyCamp)</strong> 등의 서비스 프로젝트와 
            그 과정에서 기록한 개발일지(Devlog)를 한곳에 담아두고 있습니다.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg" asChild className="rounded-full shadow-sm">
              <a href="#showcase">플래그십 앱 구경하기</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full">
              <Link href="/blog">
                개발일지 읽기 <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Flagship App Showcase (이번캠) */}
      <section id="showcase" className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Flagship Project
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            대표 앱 프로젝트
          </h2>
        </div>

        {mainApp && (
          <div className="group relative overflow-hidden rounded-3xl border bg-gradient-to-br from-card to-muted/40 p-6 sm:p-10 shadow-sm transition-all hover:shadow-md hover:border-emerald-500/30">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-4 lg:max-w-xl">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex rounded-full border px-3 py-0.5 text-xs font-medium ${mainApp.statusColor}`}>
                    {mainApp.status}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {mainApp.name} · {mainApp.subtitle}
                  </span>
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-foreground">
                  {mainApp.nameKo} <span className="text-xl font-normal text-muted-foreground">({mainApp.name})</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {mainApp.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 pt-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <MapPin className="size-4 text-emerald-500 shrink-0" />
                    <span>지도 기반의 캠핑장 탐색 & 위치별 기록</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Notebook className="size-4 text-emerald-500 shrink-0" />
                    <span>캠핑 장비 및 조과/날씨 자동 정리</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Layers className="size-4 text-emerald-500 shrink-0" />
                    <span>감성 사진 중심의 커스텀 포토 다이어리</span>
                  </li>
                </ul>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {mainApp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <Button variant="default" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                    <a href="https://camp.sooyoung.pe.kr" target="_blank" rel="noreferrer">
                      웹 서비스 접속 <ArrowRight className="ml-1.5 size-4" />
                    </a>
                  </Button>
                  <Button variant="outline" className="rounded-full" asChild>
                    <a href="https://apps.apple.com/kr/app/%EC%9D%B4%EB%B2%88%EC%BA%A0/id6790258305" target="_blank" rel="noreferrer">
                      🍎 App Store
                    </a>
                  </Button>
                  <Button variant="outline" className="rounded-full" asChild>
                    <Link href="/apps/mycamp">
                      소개 페이지
                    </Link>
                  </Button>
                  {mainApp.devlogCategorySlug && (
                    <Button variant="ghost" className="rounded-full" asChild>
                      <Link href={`/category/${mainApp.devlogCategorySlug}`}>
                        개발기 읽기
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              {/* Showcase Visual Card */}
              <div className="w-full lg:w-80 shrink-0">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-6 flex flex-col justify-between shadow-inner">
                  <div className="flex justify-between items-start">
                    <div className="h-12 w-12 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xl border border-emerald-500/30">
                      🏕️
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">App v0.1</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-foreground">MyCamp</div>
                    <div className="text-xs text-muted-foreground">Camp Log & Photo Journal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. Featured Devlog Series (연재 시리즈 정주행) */}
      <section className="space-y-6 pt-2">
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Featured Series
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            실전 개발 연재 시리즈
          </h2>
          <p className="text-sm text-muted-foreground">
            하나의 프로덕트를 처음부터 끝까지 직접 만들며 마주친 문제와 해결 과정을 기록한 심층 시리즈입니다.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Series 1: 이번캠 */}
          <Card className="flex flex-col justify-between border-emerald-500/30 bg-card/60 transition-all hover:border-emerald-500 hover:shadow-md">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🏕️</span>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-500">
                  총 5편 완결
                </span>
              </div>
              <CardTitle className="text-lg font-bold">이번캠 (MyCamp) 개발기</CardTitle>
              <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                아이디어 기획부터 GoCamping 공공데이터 연동, Supabase RLS 트러블슈팅, Capacitor로 Apple App Store 심사 통과까지.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="ghost" size="sm" asChild className="w-full justify-between text-xs text-emerald-500 hover:text-emerald-600">
                <Link href="/category/my-camp-log">
                  시리즈 5편 정주행하기 <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Series 2: 그림톡 */}
          <Card className="flex flex-col justify-between border-border/80 bg-card/60 transition-all hover:border-primary/50 hover:shadow-md">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🎨</span>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  총 3편 연재
                </span>
              </div>
              <CardTitle className="text-lg font-bold">그림톡 (GrimTalk) 제작기</CardTitle>
              <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                아이가 그린 그림이 말을 걸어주는 인터랙션 기획과 결과 화면 리디자인, 지속적인 대화 경험 설계 과정.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="ghost" size="sm" asChild className="w-full justify-between text-xs text-primary hover:text-primary/80">
                <Link href="/category/grimtalk">
                  시리즈 3편 보러가기 <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Series 3: 삼문판결 */}
          <Card className="flex flex-col justify-between border-border/80 bg-card/60 transition-all hover:border-primary/50 hover:shadow-md">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">⚖️</span>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  총 5편 완결
                </span>
              </div>
              <CardTitle className="text-lg font-bold">삼문판결 MVP & 회고</CardTitle>
              <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                3문장 판결문 아이디어 검증, 재심 장치 설계, 데이터 기반 운영 지표 분석과 프로젝트 피벗 기준 정립 이야기.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="ghost" size="sm" asChild className="w-full justify-between text-xs text-primary hover:text-primary/80">
                <Link href="/category/develop">
                  시리즈 5편 보러가기 <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Recent Devlogs */}
      <section className="space-y-6 pt-4">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Latest Devlogs
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              최신 개발 일지
            </h2>
          </div>
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/blog">
              전체글 보기 <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        {recentPosts.length === 0 ? (
          <p className="text-muted-foreground">아직 작성된 글이 없습니다.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`}>
                <Card className="h-full overflow-hidden transition-all hover:border-primary/50 hover:shadow-md flex flex-col justify-between">
                  <div>
                    {renderThumbnail({ thumbnail: post.thumbnail, title: post.title })}
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-base sm:text-lg">{post.title}</CardTitle>
                      {post.excerpt && (
                        <CardDescription className="line-clamp-2 text-sm leading-6">
                          {post.excerpt}
                        </CardDescription>
                      )}
                    </CardHeader>
                  </div>
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

        <div className="text-center pt-2 sm:hidden">
          <Button variant="outline" size="sm" asChild className="w-full">
            <Link href="/blog">
              개발일지 전체 보기 <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
