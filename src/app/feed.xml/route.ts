import { getPosts } from "@/lib/posts";

export const revalidate = 3600; // 1시간 캐싱

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET() {
  const posts = await getPosts(1, 50); // 최신 50개만 피드에 포함

  const baseUrl = "https://sooyoung-archive.vercel.app";
  const title = "수영의 개발 아카이브";
  const description = "웹 개발자 수영의 프로젝트, 학습, 회고 기록";
  
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(description)}</description>
    <language>ko-kr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
`;

  for (const post of posts) {
    const postUrl = `${baseUrl}/post/${encodeURIComponent(post.slug)}`;
    const postTitle = escapeXml(post.title);
    const postDescription = escapeXml(post.excerpt || post.title);
    const pubDate = new Date(post.createdAt).toUTCString();

    rss += `    <item>
      <title>${postTitle}</title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${postDescription}</description>
    </item>\n`;
  }

  rss += `  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
