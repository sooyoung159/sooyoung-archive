
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 | 수영의 개발 아카이브',
  description: '수영의 개발 아카이브 블로그의 개인정보처리방침 안내입니다.',
};

export default function PrivacyPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-4xl px-0 py-4">
        <h1 className="mb-8 text-3xl font-bold">개인정보처리방침</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>개인정보처리방침</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="mb-3 text-xl font-semibold">
                  1. 개인정보의 수집 및 이용 목적
                </h2>
                <p className="text-muted-foreground mb-3">
                  본 블로그는 이용자의 개인정보를 다음과 같은 목적으로 수집 및
                  이용합니다.
                </p>
                <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                  <li>블로그 콘텐츠 제공 및 서비스 운영</li>
                  <li>문의사항에 대한 응대 및 처리</li>
                  <li>서비스 개선 및 신규 서비스 개발</li>
                  <li>댓글 및 소통 기능 제공</li>
                  <li>사이트 통계 및 분석 (Google Analytics)</li>
                  <li>보안 및 사이트 안정성 유지</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold">
                  2. 수집하는 개인정보의 항목
                </h2>
                <p className="text-muted-foreground mb-3">
                  본 블로그는 다음과 같은 최소한의 개인정보만을 수집합니다.
                </p>
                <div className="space-y-3">
                  <div>
                    <strong className="text-foreground">직접 수집 정보:</strong>
                    <ul className="mt-1 ml-6 list-disc space-y-1 text-muted-foreground">
                      <li>이메일 주소 (문의 및 연락 목적)</li>
                      <li>이름 (선택적, 문의 시)</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-foreground">자동 수집 정보:</strong>
                    <ul className="mt-1 ml-6 list-disc space-y-1 text-muted-foreground">
                      <li>IP 주소 (보안 및 통계 목적)</li>
                      <li>브라우저 정보 (호환성 개선)</li>
                      <li>방문 일시 및 페이지 (서비스 개선)</li>
                      <li>쿠키 정보 (사용자 경험 개선)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold">
                  3. 개인정보의 보관 및 파기
                </h2>
                <p className="text-muted-foreground mb-3">
                  이용자의 개인정보는 수집 및 이용목적이 달성된 후 지체 없이
                  파기됩니다. 다만, 관련 법령에 따라 보관해야 하는 경우에는
                  법령에서 정한 기간 동안 보관합니다.
                </p>
                <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                  <li>문의 내용: 처리 완료 후 1년 보관</li>
                  <li>방문 기록: 6개월 보관 후 자동 파기</li>
                  <li>법령 요구 시: 해당 법령에서 정한 기간까지 보관</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold">
                  4. 개인정보의 제3자 제공
                </h2>
                <p className="text-muted-foreground mb-3">
                  본 블로그는 이용자의 개인정보를 원칙적으로 외부에 제공하지
                  않습니다. 다만, 법령의 규정에 따라 필요한 경우에는 예외로
                  합니다.
                </p>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <strong className="text-foreground">제휴 서비스:</strong>
                  <ul className="mt-2 ml-6 list-disc space-y-1 text-muted-foreground">
                    <li>Google Analytics: 통계 분석 목적 (익명화된 데이터)</li>
                    <li>Vercel: 호스팅 서비스 제공 (필수 기술 정보)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold">
                  5. 쿠키(Cookie) 정책
                </h2>
                <p className="text-muted-foreground mb-3">
                  본 블로그는 사용자 경험 개선을 위해 쿠키를 사용합니다.
                </p>
                <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                  <li>필수 쿠키: 사이트 기능 유지 (세션 관리 등)</li>
                  <li>분석 쿠키: Google Analytics를 통한 통계 수집</li>
                  <li>사용자는 브라우저 설정으로 쿠키를 거부할 수 있음</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold">6. 이용자의 권리</h2>
                <p className="text-muted-foreground mb-3">
                  이용자는 언제든지 자신의 개인정보에 대해 다음 권리를 행사할 수
                  있습니다.
                </p>
                <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                  <li>개인정보 열람 요청</li>
                  <li>개인정보 정정 요청</li>
                  <li>개인정보 삭제 요청</li>
                  <li>처리 정지 요청</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  블로그 운영자는 요청받은 날로부터 10일 이내에 필요한 조치를
                  취합니다.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold">
                  7. 기술적 보안 조치
                </h2>
                <p className="text-muted-foreground mb-3">
                  본 블로그는 개인정보 보호를 위해 다음과 같은 기술적 조치를
                  취하고 있습니다.
                </p>
                <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                  <li>SSL/TLS 암호화 통신</li>
                  <li>정기적인 보안 패치 및 업데이트</li>
                  <li>접근 권한 제한</li>
                  <li>정기적인 데이터 백업 및 복구 시스템</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold">
                  8. 개인정보처리방침의 변경
                </h2>
                <p className="text-muted-foreground mb-3">
                  본 개인정보처리방침은 관련 법령 및 내부 운영 방침의 변경에
                  따라 변경될 수 있습니다. 변경될 경우 블로그를 통해 최소 7일
                  전에 공지합니다.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold">9. 문의</h2>
                <p className="text-muted-foreground mb-3">
                  개인정보처리방침에 대한 문의사항이 있으시면 아래 연락처로
                  문의해 주시기 바랍니다.
                </p>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-muted-foreground">
                    <strong>이메일:</strong> sooyoung159@naver.com
                    <br />
                    <strong>담당자:</strong> 블로그 운영자 수영
                    <br />
                    <strong>처리 기간:</strong> 문의 접수 후 3영업일 이내
                  </p>
                </div>
              </section>

              <section className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  본 개인정보처리방침은 2026년 3월 9일부터 시행됩니다.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  최종 수정일: 2026년 3월 9일
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
