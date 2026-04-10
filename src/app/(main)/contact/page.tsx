
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '연락처 | 수영의 개발 아카이브',
  description: '블로그 운영, 콘텐츠 관련 등 다양한 문의를 위한 연락처 페이지입니다.',
};

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-4xl px-0 py-4">
        <h1 className="mb-8 text-3xl font-bold">연락처</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>문의 및 연락</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="mb-4 text-xl font-semibold">이메일 문의</h2>
              <p className="mb-4 text-muted-foreground">
                블로그 운영, 콘텐츠 관련 문의사항이 있으시면 아래 이메일로 연락해 주세요.
              </p>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium">이메일 주소</p>
                  <p className="text-lg">sooyoung159@naver.com</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Button asChild>
                  <a href="mailto:sooyoung159@naver.com">
                    <Mail className="mr-2 h-4 w-4" />
                    이메일 보내기
                  </a>
                </Button>
              </div>
            </section>

            <section className="pt-6 border-t">
              <h2 className="mb-4 text-xl font-semibold">문의 가능한 내용</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 블로그 콘텐츠 관련 문의</li>
                <li>• 협업 및 제휴 문의</li>
                <li>• 기술적 문제 신고</li>
                <li>• 개인정보처리방침 관련 문의</li>
                <li>• 기타 일반 문의사항</li>
              </ul>
            </section>

            <section className="pt-6 border-t">
              <h2 className="mb-4 text-xl font-semibold">답변 안내</h2>
              <p className="text-muted-foreground">
                문의주신 내용은 확인 후 2-3일 내에 답변드리도록 하겠습니다.
                다만, 문의량이 많거나 주말/공휴일의 경우 답변이 지연될 수 있습니다.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
