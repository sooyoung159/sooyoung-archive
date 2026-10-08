"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Trash2, Send, Loader2 } from "lucide-react";

interface Comment {
  id: string;
  post_slug: string;
  nickname: string;
  content: string;
  user_id: string | null;
  created_at: string;
}

export function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // 폼 상태
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loadError, setLoadError] = useState("");

  // 삭제 상태
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // 댓글 목록 불러오기
  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
        setLoadError("");
      } else {
        setLoadError("댓글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch {
      setLoadError("댓글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void Promise.resolve().then(fetchComments);
  }, [fetchComments]);

  // 댓글 작성
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !password || !content.trim()) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickname.trim(),
          password,
          content: content.trim(),
          post_slug: slug,
        }),
      });

      if (res.ok) {
        setContent("");
        setPassword("");
        await fetchComments();
      } else {
        const data = await res.json();
        setSubmitError(data.error || "댓글을 등록하지 못했습니다.");
      }
    } catch {
      setSubmitError("댓글을 등록하지 못했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  // 댓글 삭제
  const handleDelete = async () => {
    if (!deleteTarget || !deletePassword) return;

    setDeleting(true);
    setDeleteError("");
    try {
      const res = await fetch(`/api/comments/${deleteTarget}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: deletePassword }),
      });

      if (res.ok) {
        setDeleteTarget(null);
        setDeletePassword("");
        await fetchComments();
      } else {
        const data = await res.json();
        setDeleteError(data.error || "삭제에 실패했습니다.");
      }
    } catch {
      setDeleteError("삭제에 실패했습니다.");
    } finally {
      setDeleting(false);
    }
  };

  // 시간 포맷
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="mt-12">
      {/* 헤더 */}
      <div className="mb-6 flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">
          댓글 {comments.length > 0 && <span className="text-primary">({comments.length})</span>}
        </h2>
      </div>

      {/* 댓글 작성 폼 */}
      <form onSubmit={handleSubmit} className="mb-8 rounded-lg border bg-card/70 p-4 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="닉네임"
            aria-label="댓글 닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={30}
            required
            className="sm:flex-1"
          />
          <Input
            type="password"
            placeholder="삭제용 비밀번호 (8자 이상)"
            aria-label="댓글 삭제용 비밀번호"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={20}
            minLength={8}
            required
            className="sm:flex-1"
          />
        </div>
        <Textarea
          placeholder="댓글을 남겨보세요..."
          aria-label="댓글 내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={3000}
          required
          className="mb-4 min-h-24"
        />
        {submitError && <p role="alert" className="mb-3 text-sm text-destructive">{submitError}</p>}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <a href="/privacy" className="text-xs text-muted-foreground underline underline-offset-4">댓글 개인정보 안내</a>
          <Button type="submit" disabled={submitting} size="sm" className="gap-1.5">
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            등록
          </Button>
        </div>
      </form>

      {/* 댓글 목록 */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : loadError ? (
        <p role="alert" className="py-6 text-sm text-destructive">{loadError}</p>
      ) : comments.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          아직 댓글이 없어요. 첫 번째 댓글을 남겨보세요! ✨
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="group rounded-xl border bg-card/70 p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* 아바타 */}
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {comment.nickname.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold">{comment.nickname}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteTarget(comment.id);
                    setDeletePassword("");
                    setDeleteError("");
                  }}
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  aria-label="댓글 삭제"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground/90">
                {comment.content}
              </p>

              {/* 삭제 확인 UI */}
              {deleteTarget === comment.id && (
                <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    aria-label="삭제할 댓글의 비밀번호"
                    value={deletePassword}
                    onChange={(e) => {
                      setDeletePassword(e.target.value);
                      setDeleteError("");
                    }}
                    className="h-8 flex-1 text-sm"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="h-8 text-xs"
                  >
                    {deleting ? <Loader2 className="h-3 w-3 animate-spin" /> : "삭제"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleteTarget(null)}
                    className="h-8 text-xs"
                  >
                    취소
                  </Button>
                  {deleteError && (
                    <span className="text-xs text-destructive">{deleteError}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
