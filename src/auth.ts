import { getServerSession, type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { isAdminSession } from "@/lib/auth";

const githubId = process.env.AUTH_GITHUB_ID;
const githubSecret = process.env.AUTH_GITHUB_SECRET;

// githubId / githubSecret 는 개발 단계에서만 없을 수 있으므로
// 별도 런타임 에러는 던지지 않고, NextAuth 설정에서 빈 문자열로 처리한다.

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: githubId ?? "",
      clientSecret: githubSecret ?? "",
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    // 로그인은 누구나 허용 (GitHub 계정만 있으면 됨)
    // 실제 권한 체크는 API 라우트에서 isAdminSession()으로 처리
    async jwt({ token, profile }) {
      if (profile && typeof profile === "object" && "login" in profile) {
        token.login = String((profile as { login?: string }).login ?? "");
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: import("next-auth").Session;
      token: Record<string, unknown>;
    }) {
      if (session.user && "login" in token && token.login) {
        (session.user as { login?: string }).login = String(
          token.login as string
        );
      }
      // 세션에 관리자 여부 플래그 추가
      (session as { isAdmin?: boolean }).isAdmin = isAdminSession(session);
      return session;
    },
  },
};

export function getServerAuthSession() {
  return getServerSession(authOptions);
}
