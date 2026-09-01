"use client";

import { useEffect, useState, useRef } from "react";
import { Heart, Sparkles } from "lucide-react";

interface PostLikeButtonProps {
  slug: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export function PostLikeButton({ slug }: PostLikeButtonProps) {
  const [likes, setLikes] = useState<number>(0);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 1. Fetch current likes
    async function fetchLikes() {
      try {
        const res = await fetch(`/api/posts/${encodeURIComponent(slug)}/like`);
        if (res.ok) {
          const data = await res.json();
          setLikes(data.count);
        }
      } catch (err) {
        console.error("Failed to fetch likes:", err);
      }
    }

    // 2. Check local storage if user already reacted
    try {
      const hasLiked = localStorage.getItem(`liked_${slug}`);
      if (hasLiked) {
        setUserLiked(true);
      }
    } catch {
      // ignore
    }

    fetchLikes();
  }, [slug]);

  const handleLike = async () => {
    // 1. Trigger bounce animation
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);

    // 2. Create floating particles
    const emojis = ["❤️", "💖", "🔥", "✨", "👏", "🎉"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 40,
      y: 0,
      emoji: randomEmoji,
    };

    setParticles((prev) => [...prev, newParticle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1200);

    // 3. Optimistic count update
    setLikes((prev) => prev + 1);
    setUserLiked(true);

    try {
      localStorage.setItem(`liked_${slug}`, "true");
    } catch {
      // ignore
    }

    // 4. Send to server
    try {
      const res = await fetch(`/api/posts/${encodeURIComponent(slug)}/like`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setLikes(data.count);
      }
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  return (
    <div className="relative my-8 flex flex-col items-center justify-center text-center">
      {/* Floating particles container */}
      <div className="pointer-events-none absolute bottom-14 flex items-center justify-center">
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              transform: `translate(${p.x}px, -45px)`,
              animation: "floatUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
            }}
            className="absolute text-xl select-none"
          >
            {p.emoji}
          </span>
        ))}
      </div>

      <button
        ref={buttonRef}
        type="button"
        onClick={handleLike}
        className={`group relative flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 shadow-sm select-none active:scale-95 ${
          userLiked
            ? "border-rose-500/40 bg-gradient-to-r from-rose-500/15 via-rose-500/10 to-rose-500/15 text-rose-500 hover:border-rose-500/60 hover:shadow-rose-500/20"
            : "border-border/80 bg-card hover:border-rose-500/40 hover:text-rose-500 hover:shadow-md"
        } border ${isBouncing ? "scale-110" : ""}`}
      >
        <span className="relative flex items-center justify-center">
          <Heart
            className={`size-5 transition-all duration-300 ${
              userLiked
                ? "fill-rose-500 text-rose-500 scale-110"
                : "text-muted-foreground group-hover:text-rose-500 group-hover:scale-110"
            } ${isBouncing ? "scale-125" : ""}`}
          />
          {userLiked && (
            <span className="absolute -top-1 -right-1 size-2 rounded-full bg-rose-500 animate-ping opacity-75" />
          )}
        </span>

        <span className="flex items-center gap-1.5">
          <span>{userLiked ? "응원 감사합니다!" : "글이 도움되었나요? 응원하기"}</span>
          <span
            className={`ml-1 rounded-full px-2 py-0.5 text-xs font-bold transition-colors ${
              userLiked
                ? "bg-rose-500 text-white"
                : "bg-muted text-foreground group-hover:bg-rose-500/20 group-hover:text-rose-500"
            }`}
          >
            {likes}
          </span>
        </span>
      </button>

      <p className="mt-2 text-xs text-muted-foreground">
        클릭할 때마다 작가에게 따뜻한 응원이 전달됩니다 ❤️
      </p>

      <style jsx global>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(0.8);
          }
          50% {
            opacity: 0.9;
            transform: translate(var(--tw-translate-x, 0), -40px) scale(1.3);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tw-translate-x, 0), -80px) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}
