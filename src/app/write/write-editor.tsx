"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ImagePlus, Upload } from "lucide-react";

export function WriteEditor() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const bodyImageInputRef = useRef<HTMLInputElement>(null);

  async function handleSave() {
    if (!title.trim() || !body.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          excerpt: excerpt.trim() || undefined,
          thumbnail: thumbnail.trim() || undefined,
          body: body.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "저장에 실패했습니다.");
        return;
      }
      const post = await res.json();
      setDone(post.slug);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Header />
      <main className="container max-w-6xl px-4 py-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="size-4" />
            목록
          </Link>
        </Button>

        {done ? (
          <div className="rounded-lg border bg-muted/50 p-6 text-center">
            <p className="mb-4 font-medium">글이 저장되었습니다.</p>
            <div className="flex justify-center gap-2">
              <Button asChild>
                <Link href={`/post/${done}`}>글 보기</Link>
              </Button>
              <Button variant="outline" onClick={() => { setDone(null); setTitle(""); setExcerpt(""); setThumbnail(""); setBody(""); }}>
                새 글 쓰기
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">제목</label>
              <Input
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">요약 (선택)</label>
              <Input
                placeholder="요약을 입력하세요"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">썸네일 (선택)</label>
              <div className="flex flex-wrap items-end gap-2">
                <Input
                  placeholder="썸네일 이미지 URL 또는 업로드 후 사용"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="flex-1 min-w-[200px]"
                />
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    try {
                      const form = new FormData();
                      form.append("file", file);
                      const res = await fetch("/api/upload", { method: "POST", body: form });
                      if (!res.ok) throw new Error("업로드 실패");
                      const { url } = await res.json();
                      setThumbnail(url);
                    } catch {
                      alert("이미지 업로드에 실패했습니다.");
                    } finally {
                      setUploading(false);
                      e.target.value = "";
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploading}
                  onClick={() => thumbnailInputRef.current?.click()}
                >
                  <Upload className="size-4" />
                  {uploading ? "업로드 중..." : "업로드"}
                </Button>
              </div>
              {thumbnail && (
                <div className="mt-2 relative w-24 h-24 rounded-md overflow-hidden border bg-muted">
                  {thumbnail.startsWith("/") ? (
                    <Image src={thumbnail} alt="썸네일 미리보기" fill className="object-cover" sizes="96px" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumbnail} alt="썸네일 미리보기" className="h-full w-full object-cover" />
                  )}
                </div>
              )}
            </div>

            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">본문 (마크다운)</span>
              <input
                ref={bodyImageInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploading(true);
                  try {
                    const form = new FormData();
                    form.append("file", file);
                    const res = await fetch("/api/upload", { method: "POST", body: form });
                    if (!res.ok) throw new Error("업로드 실패");
                    const { url } = await res.json();
                    setBody((prev) => prev + `\n![${file.name}](${url})\n`);
                  } catch {
                    alert("이미지 업로드에 실패했습니다.");
                  } finally {
                    setUploading(false);
                    e.target.value = "";
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploading}
                onClick={() => bodyImageInputRef.current?.click()}
              >
                <ImagePlus className="size-4" />
                {uploading ? "업로드 중..." : "이미지 삽입"}
              </Button>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">편집</label>
                <Textarea
                  placeholder="마크다운으로 작성하세요..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="min-h-[400px] font-mono text-sm resize-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">미리보기</label>
                <div className="min-h-[400px] rounded-md border bg-muted/30 p-6 overflow-auto">
                  {body ? (
                    <div className="prose prose-slate dark:prose-invert max-w-none prose-p:my-2 prose-headings:my-3">
                      <ReactMarkdown>{body}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">내용을 입력하면 미리보기가 표시됩니다.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} disabled={saving || !title.trim() || !body.trim()}>
                {saving ? "저장 중..." : "저장"}
              </Button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
