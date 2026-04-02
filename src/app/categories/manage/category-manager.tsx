"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Category } from "@/lib/types";

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Create / Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState("");
  const [order, setOrder] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setEditingId(null);
    setName("");
    setSlug("");
    setParentId("");
    setOrder(0);
  }

  function handleEdit(cat: Category) {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setParentId(cat.parent_id || "");
    setOrder(cat.order);
  }

  async function handleSave() {
    if (!name.trim() || !slug.trim()) return;
    
    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      parent_id: parentId || null,
      order,
    };

    try {
      if (editingId) {
        // Update
        const res = await fetch(`/api/categories/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          await fetchCategories();
          resetForm();
        } else {
          alert("수정 실패");
        }
      } else {
        // Create
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          await fetchCategories();
          resetForm();
        } else {
          alert("생성 실패 - 이미 있는 Slug인지 확인하세요");
        }
      }
    } catch (err) {
      alert("오류가 발생했습니다.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("정말 이 카테고리를 삭제하시겠습니까? (하위 카테고리도 함께 삭제될 수 있습니다)")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchCategories();
      } else {
        alert("삭제 실패");
      }
    } catch (err) {
      alert("오류가 발생했습니다.");
    }
  }

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* 폼 영역 */}
      <div className="rounded-lg border p-6 bg-card text-card-foreground">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "카테고리 수정" : "새 카테고리 추가"}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">카테고리 이름 (노출됨)</label>
            <Input value={name} onChange={e => {
              setName(e.target.value);
              if (!editingId && !slug) {
                // simple auto slug slugify placeholder
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9가-힣]/g, '-').replace(/-+/g, '-'));
              }
            }} placeholder="예: 프론트엔드" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">고유 주소 (Slug)</label>
            <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="예: frontend" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">상위 그룹</label>
            <select
              value={parentId}
              onChange={e => setParentId(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">(최상위 대분류)</option>
              {categories.filter(c => !c.parent_id && c.id !== editingId).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">정렬 순서(숫자가 작을수록 위로)</label>
            <Input type="number" value={order} onChange={e => setOrder(Number(e.target.value))} />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>취소</Button>
            )}
            <Button onClick={handleSave} disabled={!name || !slug}>
              저장
            </Button>
          </div>
        </div>
      </div>

      {/* 목록 영역 */}
      <div>
        <h2 className="text-xl font-semibold mb-4">카테고리 목록</h2>
        <div className="space-y-2">
          {categories.filter(c => !c.parent_id).sort((a,b) => a.order - b.order).map(main => (
            <div key={main.id} className="border rounded-md divide-y overflow-hidden">
              <div className="flex items-center justify-between p-3 bg-muted/30">
                <div className="font-semibold">{main.name} <span className="text-xs text-muted-foreground ml-2">/category/{main.slug}</span></div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(main)}>수정</Button>
                  <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(main.id)}>삭제</Button>
                </div>
              </div>
              {/* 하위 카테고리 렌더링 */}
              {categories.filter(c => c.parent_id === main.id).sort((a,b) => a.order - b.order).map(sub => (
                <div key={sub.id} className="flex items-center justify-between p-2 pl-8 border-t bg-background">
                  <div className="text-sm">└ {sub.name} <span className="text-xs text-muted-foreground ml-2">/category/{sub.slug}</span></div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(sub)}>수정</Button>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(sub.id)}>삭제</Button>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-muted-foreground text-sm">먼저 카테고리를 추가해주세요.</p>
          )}
        </div>
      </div>
    </div>
  );
}
