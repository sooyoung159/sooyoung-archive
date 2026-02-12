import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto w-full max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">개인정보처리방침</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>개인정보처리방침</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="mb-3 text-xl font-semibold">1. 개인정보의 수집 및 이용 목적</h2>
              <p className="text-muted-foreground">
                본 블로그는 이용자의 개인정보를 다음과 같은 목적으로 수집 및 이용합니다.
              </p>
              <ul className="mt-2 ml-6 list-disc space-y-1 text-muted-foreground">
                <li>블로그 콘텐츠 제공 및 서비스 운영</li>
                <li>문의사항에 대한 응대 및 처리</li>
                <li>서비스 개선 및 신규 서비스 개발</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">2. 수집하는 개인정보의 항목</h2>
              <p className="text-muted-foreground">
                본 블로그는 다음과 같은 최소한의 개인정보만을 수집합니다.
              </p>
              <ul className="mt-2 ml-6 list-disc space-y-1 text-muted-foreground">
                <li>이메일 주소 (문의 및 연락 목적)</li>
                <li>방문 기록 (서비스 개선 목적)</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">3. 개인정보의 보관 및 파기</h2>
              <p className="text-muted-foreground">
                이용자의 개인정보는 수집 및 이용목적이 달성된 후 지체 없이 파기됩니다.
                다만, 관련 법령에 따라 보관해야 하는 경우에는 법령에서 정한 기간 동안 보관합니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">4. 개인정보의 제3자 제공</h2>
              <p className="text-muted-foreground">
                본 블로그는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
                다만, 법령의 규정에 따라 필요한 경우에는 예외로 합니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">5. 이용자의 권리</h2>
              <p className="text-muted-foreground">
                이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제를 요청할 수 있으며,
                블로그 운영자는 지체 없이 필요한 조치를 취합니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">6. 개인정보처리방침의 변경</h2>
              <p className="text-muted-foreground">
                본 개인정보처리방침은 관련 법령 및 내부 운영 방침의 변경에 따라 변경될 수 있습니다.
                변경될 경우 블로그를 통해 공지합니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">7. 문의</h2>
              <p className="text-muted-foreground">
                개인정보처리방침에 대한 문의사항이 있으시면 아래 연락처로 문의해 주시기 바랍니다.
              </p>
              <p className="mt-2 text-muted-foreground">
                이메일: sooyoung159@naver.com
              </p>
            </section>

            <section className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                본 개인정보처리방침은 2024년 2월 12일부터 시행됩니다.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
