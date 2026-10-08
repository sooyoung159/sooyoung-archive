import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 수영장 (Sooyoung Archive)",
  description: "수영장의 댓글, 로그인, 문의 및 Google 광고 관련 개인정보 처리 안내.",
  alternates: { canonical: "/privacy" },
};

const linkStyle = "underline underline-offset-4 hover:text-foreground";

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-8 py-4 text-sm leading-7 text-muted-foreground [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:pl-1 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2">
      <header className="space-y-3 border-b pb-6">
        <h1 className="text-3xl font-bold text-foreground">개인정보처리방침</h1>
        <p>수영장(Sooyoung Archive)은 개발 기록을 제공하는 개인 블로그입니다. 이 안내는 sooyoung.pe.kr에 적용되며, 연결된 이번캠 등 외부 서비스의 개인정보 처리는 각 서비스의 방침을 따릅니다.</p>
        <p>최종 수정일: <time dateTime="2026-10-08">2026년 10월 8일</time></p>
      </header>
      <section>
        <h2>1. 기능별 수집 정보와 이용 목적</h2>
        <ul>
          <li><strong>댓글:</strong> 닉네임, 댓글 내용, 삭제용 비밀번호의 해시, 작성 시각과 대상 글 주소를 저장합니다. 닉네임과 댓글, 작성 시각은 공개됩니다. 비밀번호 원문은 저장하지 않으며, 다른 서비스에서 사용하는 비밀번호를 입력하지 마세요.</li>
          <li><strong>GitHub 로그인:</strong> GitHub에서 전달하는 계정 이름, 사용자 이름, 이메일, 프로필 이미지와 로그인 세션 정보를 이용합니다. 세션 쿠키로 로그인을 유지하고 운영자의 글 관리 권한을 확인합니다.</li>
          <li><strong>이메일 문의:</strong> 문의자가 보낸 이메일 주소와 본문, 첨부 자료를 문의 답변에 이용합니다. 연락처 페이지에 별도 수집 양식은 없으며 메일 서비스로 문의를 보냅니다.</li>
          <li><strong>운영 및 보안:</strong> 호스팅 제공자가 요청 IP, 브라우저 정보와 접속 시각 등 기술 정보를 처리할 수 있습니다. 반복 댓글과 삭제 시도를 제한하기 위해 요청 IP에서 만든 일방향 식별자와 요청 횟수를 저장합니다. 이 제한용 저장소에는 IP 원문을 저장하지 않습니다.</li>
          <li><strong>광고:</strong> 현재 광고 게재용 스크립트는 비활성화되어 있습니다. 사이트 확인용 AdSense 메타 태그와 ads.txt만 유지합니다. 향후 광고를 활성화하면 Google과 광고 제공자가 쿠키, IP, 기기 및 방문 정보를 광고 게재, 측정과 부정 이용 방지에 처리할 수 있습니다.</li>
        </ul>
      </section>
      <section>
        <h2>2. 정보 보관과 삭제</h2>
        <p>댓글은 작성자가 삭제하거나 운영자가 삭제할 때까지 해당 글과 함께 보관됩니다. 글 삭제 시 연결된 댓글도 삭제됩니다. 삭제 비밀번호를 잊었다면 운영자에게 문의할 수 있으며, 타인의 댓글이 삭제되지 않도록 필요한 확인을 거칩니다.</p>
        <p className="mt-3">요청 제한 식별자는 제한 시간이 지나면 이후 요청 처리 과정에서 정리됩니다. 로그인 세션은 만료되거나 로그아웃하면 사용할 수 없게 됩니다. 이메일 문의와 호스팅·광고 서비스의 기록은 해당 서비스의 보관 설정 및 정책에 따라 관리됩니다. 이 블로그가 모든 방문 기록을 6개월 후 자동 삭제하는 것은 아닙니다.</p>
      </section>
      <section>
        <h2>3. 이용하는 외부 서비스</h2>
        <ul>
          <li><a className={linkStyle} href="https://supabase.com/privacy">Supabase</a>: 게시글, 댓글과 업로드 파일의 저장 및 데이터 처리.</li>
          <li><a className={linkStyle} href="https://vercel.com/legal/privacy-policy">Vercel</a>: 웹사이트 호스팅, 요청 처리와 운영 로그.</li>
          <li><a className={linkStyle} href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub</a>: 이용자가 선택한 GitHub 로그인과 계정 정보 제공.</li>
          <li><a className={linkStyle} href="https://policies.google.com/privacy?hl=ko">Google 및 광고 제공자</a>: AdSense 광고 요청, 게재·측정 및 부정 이용 방지.</li>
        </ul>
        <p className="mt-3">서비스 제공 과정에서 각 제공자의 서버에 정보가 처리될 수 있습니다. 제공자별 데이터 처리 위치와 보관 방식은 위 개인정보 안내를 확인해 주세요. 광고 제공자를 추가하거나 운영 방식을 변경하면 이 안내도 갱신합니다.</p>
      </section>
      <section>
        <h2>4. 쿠키와 광고 선택</h2>
        <p>필수 세션 쿠키는 로그인 유지에 사용합니다. 광고를 활성화하는 경우 Google을 포함한 제3자 공급업체는 이용자가 이 사이트 또는 다른 웹사이트를 방문한 기록을 바탕으로 광고를 게재할 수 있습니다. Google의 광고 쿠키는 Google과 파트너가 이러한 방문 기록에 따른 맞춤형 광고를 제공하는 데 사용될 수 있습니다.</p>
        <ul className="mt-3">
          <li><a className={linkStyle} href="https://www.google.com/settings/ads">Google 광고 설정</a>에서 맞춤형 광고 사용을 해제할 수 있습니다.</li>
          <li><a className={linkStyle} href="https://www.aboutads.info/choices/">광고 업계의 선택 도구</a>에서 참여하는 제3자 공급업체의 맞춤형 광고 설정을 관리할 수 있습니다.</li>
          <li>브라우저 설정에서 쿠키를 차단하거나 삭제할 수 있습니다. 쿠키를 차단하면 로그인 등 일부 기능이 제한될 수 있으며, 맞춤형 광고를 해제해도 광고 자체가 모두 사라지는 것은 아닙니다.</li>
        </ul>
        <p className="mt-3"><a className={linkStyle} href="https://policies.google.com/technologies/partner-sites?hl=ko">Google이 파트너 사이트의 정보를 사용하는 방법</a>과 <a className={linkStyle} href="https://support.google.com/adsense/answer/1348695?hl=ko">AdSense 개인정보 공개 안내</a>도 참고할 수 있습니다.</p>
      </section>
      <section>
        <h2>5. 개인정보 보호와 이용자의 요청</h2>
        <p>HTTPS 통신, 서버 전용 데이터베이스 연결, 관리자 로그인 확인과 댓글 비밀번호 해시를 사용합니다. 본인 정보의 열람·정정·삭제 또는 처리 정지는 아래 이메일로 요청할 수 있습니다. 요청 내용과 본인 확인에 필요한 최소 정보만 보내 주세요. 확인 후 처리 가능 범위와 결과를 안내합니다.</p>
      </section>
      <section>
        <h2>6. 운영자 및 문의</h2>
        <p>운영자: 수영<br />이메일: <a className={linkStyle} href="mailto:sooyoung159@naver.com">sooyoung159@naver.com</a></p>
        <p className="mt-3">개인정보 처리 방식이 바뀌면 이 페이지의 내용과 수정일을 갱신하고, 중요한 변경 사항은 사이트에서 안내합니다.</p>
      </section>
    </article>
  );
}
