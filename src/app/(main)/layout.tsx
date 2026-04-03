import Link from "next/link";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/Sidebar";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="mx-auto w-full max-w-7xl px-4 py-8 flex flex-col lg:flex-row gap-8">
        <Sidebar />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
      <footer className="border-t bg-background mt-auto">
        <div className="mx-auto w-full max-w-7xl px-4 py-4">
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-between">
            <p>© 2026 sooyoung archive. All rights reserved.</p>
            <div className="flex gap-4">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/contact"
                className="hover:text-foreground transition-colors"
              >
                연락처
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
