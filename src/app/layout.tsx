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
  title: "수영의 개발 아카이브 - 프로그래밍 일지 & 기술 블로그",
  description:
    "웹 개발자 수영의 프로그래밍 학습 일지. Next.js, React, TypeScript 등 최신 웹 기술 개발 경험과 노하우를 공유합니다. 실전 프로젝트 개발 과정과 문제 해결 경험을 담은 개인 기술 블로그.",
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
    title: "수영의 개발 아카이브",
    description: "웹 개발자의 프로그래밍 학습 일지와 기술 노하우 공유 블로그",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "수영의 개발 아카이브",
    description: "웹 개발자의 프로그래밍 학습 일지와 기술 노하우 공유 블로그",
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
        {/* next/script(afterInteractive)가 sitemap.xml 등에 <script/>가 섞이는 경우가 있어 head의 일반 script로 로드 */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6835019974856590"
          crossOrigin="anonymous"
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
