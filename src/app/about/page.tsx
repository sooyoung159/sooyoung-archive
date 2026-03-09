import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Github, Code, BookOpen, Coffee } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto w-full max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">소개</h1>

        <div className="space-y-8">
          {/* 프로필 카드 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                개발자 수영입니다
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                안녕하세요! 꾸준히 성장하는 웹 개발자 수영입니다. 이 블로그는 제
                개발 여정에서 마주치는 다양한 기술적 도전과 해결 과정을 기록하는
                공간입니다.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                매일 새로운 것을 배우고, 어려움을 겪고, 해결책을 찾는 과정을
                꾸준히 기록하며 같은 문제로 고민하는 다른 개발자들에게
                조금이나마 도움이 되고자 합니다. 실전 프로젝트 경험과 학습
                노하우를 솔직하게 공유하는 것이 저의 블로그 운영 철학입니다.
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                  웹 개발
                </span>
                <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                  프론트엔드
                </span>
                <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                  Next.js
                </span>
                <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                  React
                </span>
                <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                  TypeScript
                </span>
                <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                  꾸준한 학습
                </span>
              </div>
            </CardContent>
          </Card>

          {/* 블로그 소개 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />이 블로그에서 다루는 내용
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <div>
                    <strong>프로젝트 개발 일지:</strong> 실제 프로젝트를
                    만들면서 겪는 문제와 해결 과정
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <div>
                    <strong>기술 학습 노트:</strong> 새로운 기술을 배우고
                    정리하는 과정
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <div>
                    <strong>문제 해결 경험:</strong> 버그 수정, 최적화, 디버깅
                    경험 공유
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <div>
                    <strong>개발 도구 팁:</strong> 생산성 향상을 위한 도구와
                    방법론
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 개발 철학 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="w-5 h-5" />
                개발 철학
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                &ldquo;꾸준함이 실력을 만든다&rdquo;는 믿음으로 매일 코드를
                작성하고 기록합니다. 기록합니다. 완벽한 코드보다는 성장하는
                과정을 중요하게 생각하며, 실패와 실수를 두려워하지 않고 도전하는
                개발자가 되고자 합니다.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                기술은 빠르게 변하지만, 배우는 방법과 문제를 해결하는 능력은
                평생 가는 자산이라고 믿습니다. 이 블로그가 저의 성장 기록이면서
                다른 개발자들에게도 영감을 주는 공간이 되기를 바랍니다.
              </p>
            </CardContent>
          </Card>

          {/* 연락처 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                연락처
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                블로그 콘텐츠에 대한 질문, 기술적 의견 교환, 협업 문의 등은
                언제든 환영입니다. 아래 연락처로 편하게 연락주세요.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">이메일</p>
                    <p className="text-sm">sooyoung159@naver.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Github className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm">github.com/sooyoung159</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground pt-4">
                문의주신 내용은 확인 후 2-3일 내에 답변드리겠습니다. 기술적
                토론이나 코드 리뷰 요청도 환영합니다!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
