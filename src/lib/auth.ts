import type { Session } from "next-auth";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.toLowerCase();
const ADMIN_GITHUB = process.env.ADMIN_GITHUB?.toLowerCase();

// 관리자 여부 판별: GitHub 계정 하나만 관리자
// - ADMIN_EMAIL: GitHub 계정 이메일
// - ADMIN_GITHUB: GitHub username (권장)
export function isAdminSession(session: Session | null) {
  if (!session?.user) return false;

  const email = session.user.email?.toLowerCase();
  const login = (session.user as { login?: string }).login?.toLowerCase();

  if (ADMIN_EMAIL && email && email === ADMIN_EMAIL) return true;
  if (ADMIN_GITHUB && login && login === ADMIN_GITHUB) return true;

  return false;
}
