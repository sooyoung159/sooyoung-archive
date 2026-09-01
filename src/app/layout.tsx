import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sooyoung.pe.kr"),
  alternates: {
    canonical: "/",
  },
  title: "수영장 (Sooyoung Archive) - 1인 개발자 스튜디오 & 기술 블로그",
  description:
    "아이디어를 만난 수영, 마음껏 헤엄치는 공간. 이번캠(MyCamp) 등 1인 개발 프로젝트와 실전 개발일지(Devlog) 아카이브.",
  keywords: [
    "개발 블로그",
    "프로그래밍",
    "웹 개발",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "개발 일지",
    "코딩",
    "프론트엔드",
  ],
  authors: [{ name: "수영" }],
  openGraph: {
    title: "수영장 (Sooyoung Archive)",
    description: "아이디어를 만난 수영, 마음껏 헤엄치는 공간. 1인 개발자 수영의 프로젝트 & 개발 일지",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "https://sooyoung.pe.kr/api/og?title=아이디어를 만난 수영, 마음껏 헤엄치는 공간.&category=Studio",
        width: 1200,
        height: 630,
        alt: "수영장 (Sooyoung Archive)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "수영장 (Sooyoung Archive)",
    description: "아이디어를 만난 수영, 마음껏 헤엄치는 공간. 1인 개발자 수영의 프로젝트 & 개발 일지",
    images: ["https://sooyoung.pe.kr/api/og?title=아이디어를 만난 수영, 마음껏 헤엄치는 공간.&category=Studio"],
  },
  other: {
    "google-adsense-account": "ca-pub-6835019974856590",
  },
  verification: {
    google: "_JzFEPubFPVB6TNk4cD8LK169RVQwcgOJmxvZyEkIFw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)||(!t)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
