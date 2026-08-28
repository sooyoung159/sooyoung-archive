import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Code,
  ExternalLink,
  Github,
  Mail,
  Sparkles,
  Smartphone,
  CheckCircle2,
  Calendar,
  Layers,
  Heart,
  ArrowRight,
  Flame,
} from "lucide-react";

const ogImageUrl = `https://sooyoung.pe.kr/api/og?title=${encodeURIComponent("개발자 수영 소개 - 수영장 프로젝트 아카이브")}&category=About`;

export const metadata: Metadata = {
  title: "소개 (About) | 수영장 (Sooyoung Archive)",
  description:
    "1인 개발자 수영의 프로젝트 아카이브 '수영장' 소개, 기술 스택, 이번캠(MyCamp) App Store 출시 여정 및 개발 철학입니다.",
  openGraph: {
    title: "소개 (About) | 수영장 (Sooyoung Archive)",
    description: "아이디어를 만난 수영, 마음껏 헤엄치는 공간. 1인 개발자 수영의 프로젝트 & 개발 일지.",
    url: "https://sooyoung.pe.kr/about",
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "수영장 소개" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "소개 (About) | 수영장 (Sooyoung Archive)",
    description: "아이디어를 만난 수영, 마음껏 헤엄치는 공간. 1인 개발자 수영의 프로젝트 & 개발 일지.",
    images: [ogImageUrl],
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-12 py-2">
      {/* 1. Hero Identity Header */}
      <section className="relative rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-emerald-950/20 p-8 sm:p-12 shadow-sm overflow-hidden">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-500">
            <Sparkles className="size-3.5" />
            <span>1-PERSON DEVELOPER STUDIO</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
              안녕하세요, <span className="text-emerald-500">개발자 수영</span>입니다.
            </h1>
            <p className="text-lg sm:text-xl font-medium text-emerald-400">
              &ldquo;아이디어를 만난 수영, 마음껏 헤엄치는 공간&rdquo;
            </p>
          </div>

          <p className="text-base text-muted-foreground leading-relaxed">
            머릿속에 떠오른 아이디어를 직접 설계하고 구현하여 실제 유저가 사용하는 프로덕트로 세상에 내놓는 1인 개발자입니다.
            단순히 코드를 작성하는 것을 넘어, 기획부터 UI 디자인, 프론트엔드/백엔드 아키텍처, 그리고 애플 앱스토어 배포까지 모든 제품의 생애주기를 직접 경험하며 성장하고 있습니다.
          </p>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
              <div className="text-2xl font-bold text-emerald-500">1개+</div>
              <div className="text-xs text-muted-foreground mt-0.5">상용 프로덕트 출시</div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
              <div className="text-2xl font-bold text-emerald-500">App Store</div>
              <div className="text-xs text-muted-foreground mt-0.5">iOS 공식 출시 완료</div>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-2xl border border-border/60 bg-background/50 p-4">
              <div className="text-2xl font-bold text-emerald-500">20+ 편</div>
              <div className="text-xs text-muted-foreground mt-0.5">실전 개발 일지 기록</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Flagship Project Highlight */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-500">
          <Smartphone className="size-4" />
          <span>Flagship Product</span>
        </div>

        <Card className="border-emerald-500/30 bg-card/70 overflow-hidden shadow-sm">
          <CardHeader className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏕️</span>
                <CardTitle className="text-2xl font-bold">이번캠 (MyCamp)</CardTitle>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-500">
                🍎 App Store 출시 & 웹 서비스 운영 중
              </span>
            </div>
            <CardDescription className="text-base text-muted-foreground">
              캠핑 갈 곳을 고르고, 저장하고, 공유하는 캠퍼 전용 올인원 로그 플랫폼
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              전국 2,000+ 캠핑장 공공 데이터(GoCamping API) 연동, 광고 없는 생생한 찐후기 피드, 지도 기반 플랜 저장 및
              Next.js 16과 Capacitor를 활용한 크로스플랫폼 iOS 앱까지 단일 코드베이스로 직접 구현했습니다.
            </p>

            <div className="flex flex-wrap gap-2.5">
              <Button size="sm" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold" asChild>
                <a href="https://camp.sooyoung.pe.kr" target="_blank" rel="noreferrer">
                  웹 서비스 바로가기 <ExternalLink className="ml-1.5 size-3.5" />
                </a>
              </Button>
              <Button size="sm" variant="outline" className="rounded-full" asChild>
                <a href="https://apps.apple.com/kr/app/%EC%9D%B4%EB%B2%88%EC%BA%A0/id6790258305" target="_blank" rel="noreferrer">
                  🍎 App Store 다운로드
                </a>
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full" asChild>
                <Link href="/apps/mycamp">
                  프로덕트 상세 소개 <ArrowRight className="ml-1.5 size-3.5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Tech Stack Grid */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-500">
          <Layers className="size-4" />
          <span>Tech Stack & Tooling</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="bg-card/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Code className="size-4 text-emerald-500" />
                Frontend & Mobile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>Next.js 16 (App Router) & React 19</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>TypeScript & Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>Capacitor (iOS / Android Native App Shell)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Layers className="size-4 text-emerald-500" />
                Backend & Infrastructure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>Supabase (PostgreSQL, Auth, Storage, RLS)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>NextAuth / OAuth (Apple, Kakao, GitHub)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                <span>Vercel Edge Network & Production CI/CD</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Journey Milestones Timeline */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-500">
          <Calendar className="size-4" />
          <span>Milestones & Timeline</span>
        </div>

        <Card className="bg-card/60">
          <CardContent className="p-6">
            <div className="space-y-6 border-l-2 border-emerald-500/30 pl-5 ml-2">
              <div className="relative">
                <div className="absolute -left-[27px] top-1 size-3 rounded-full bg-emerald-500 ring-4 ring-background" />
                <div className="text-xs font-mono font-semibold text-emerald-500">2026. 08</div>
                <div className="text-base font-bold text-foreground mt-0.5">
                  '이번캠(MyCamp)' Apple App Store 공식 출시 & 1인 스튜디오 리브랜딩
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Capacitor를 활용해 웹 서비스를 iOS 앱스토어에 정식 출시하고, 블로그를 '수영장' 1인 개발 스튜디오로 전면 개편.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] top-1 size-3 rounded-full bg-muted-foreground ring-4 ring-background" />
                <div className="text-xs font-mono font-semibold text-muted-foreground">2026. 07</div>
                <div className="text-base font-bold text-foreground mt-0.5">
                  개인 도메인(sooyoung.pe.kr) 도입 및 색인 최적화
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Vercel 기본 도메인의 한계를 극복하고 독립 개인 도메인을 연결하여 구글 서치콘솔 및 SEO 환경 구축.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] top-1 size-3 rounded-full bg-muted-foreground ring-4 ring-background" />
                <div className="text-xs font-mono font-semibold text-muted-foreground">2026. 03</div>
                <div className="text-base font-bold text-foreground mt-0.5">
                  그림톡(GrimTalk) 및 삼문판결 MVP 서비스 실험
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  사용자 경험 중심의 인터랙션과 실전 트러블슈팅을 다룬 기술 블로그 시리즈 연재.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] top-1 size-3 rounded-full bg-muted-foreground ring-4 ring-background" />
                <div className="text-xs font-mono font-semibold text-muted-foreground">2026. 02</div>
                <div className="text-base font-bold text-foreground mt-0.5">
                  캠핑 소셜 서비스 '캠핑인스타' 개발 착수
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Next.js, Supabase, 공공 API를 활용한 캠핑 로그 플랫폼 프로토타입 구축 시작.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 5. Philosophy */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-500">
          <Heart className="size-4" />
          <span>Development Philosophy</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="bg-card/60">
            <CardHeader className="pb-2">
              <Flame className="size-5 text-emerald-500 mb-1" />
              <CardTitle className="text-base font-bold">생각을 현실로</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">
                구상에 머물지 않고 실제로 작동하는 프로덕트를 만들어 유저에게 빠르게 검증받는 실행력을 지향합니다.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/60">
            <CardHeader className="pb-2">
              <Code className="size-5 text-emerald-500 mb-1" />
              <CardTitle className="text-base font-bold">기록이 곧 자산</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">
                개발 과정에서 마주친 버그와 트러블슈팅을 솔직하게 기록하여 같은 문제를 겪는 동료 개발자들과 나눕니다.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/60">
            <CardHeader className="pb-2">
              <Sparkles className="size-5 text-emerald-500 mb-1" />
              <CardTitle className="text-base font-bold">사용자 중심 가치</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">
                기술적 화려함보다는 실제 사용자가 느끼는 편리함과 직관적인 UI 경험을 최우선으로 고민합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 6. Contact & Socials */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-500">
          <Mail className="size-4" />
          <span>Connect</span>
        </div>

        <Card className="bg-card/60">
          <CardContent className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              새로운 프로젝트 제안, 기술적 토론, 협업 문의 등은 언제든 환영합니다!
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="mailto:sooyoung159@naver.com"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-border/80 bg-background/50 hover:border-emerald-500/40 hover:bg-muted/50 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Mail className="size-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">이메일</div>
                  <div className="text-sm font-semibold text-foreground group-hover:text-emerald-500 transition-colors">
                    sooyoung159@naver.com
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/sooyoung159"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-border/80 bg-background/50 hover:border-emerald-500/40 hover:bg-muted/50 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Github className="size-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">GitHub</div>
                  <div className="text-sm font-semibold text-foreground group-hover:text-emerald-500 transition-colors">
                    github.com/sooyoung159
                  </div>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
