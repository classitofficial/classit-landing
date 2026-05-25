"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/blog/types";

export default function BlogFeaturedCarousel({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    suppressClick: false,
  });

  function moveSlide(direction: "prev" | "next") {
    setActiveIndex((current) => {
      if (direction === "prev") return (current - 1 + posts.length) % posts.length;
      return (current + 1) % posts.length;
    });
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (posts.length < 2) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      suppressClick: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragRef.current.pointerId !== event.pointerId) return;

    const distance = event.clientX - dragRef.current.startX;
    setDragOffset(distance);

    if (Math.abs(distance) > 8) {
      dragRef.current.suppressClick = true;
    }
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragRef.current.pointerId !== event.pointerId) return;

    const distance = event.clientX - dragRef.current.startX;
    if (Math.abs(distance) > 48) {
      moveSlide(distance > 0 ? "prev" : "next");
      dragRef.current.suppressClick = true;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current.pointerId = -1;
    setDragOffset(0);
  }

  function handleCardClick(post: BlogPost) {
    if (dragRef.current.suppressClick) {
      dragRef.current.suppressClick = false;
      return;
    }

    router.push(`/blog/${post.slug}`);
  }

  function handleCardKeyDown(event: ReactKeyboardEvent<HTMLDivElement>, post: BlogPost) {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    router.push(`/blog/${post.slug}`);
  }

  useEffect(() => {
    if (posts.length < 2) return;

    const timer = window.setInterval(() => {
      if (dragRef.current.pointerId !== -1) return;
      setActiveIndex((current) => (current + 1) % posts.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [posts.length]);

  if (posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragRef.current.pointerId = -1;
          setDragOffset(0);
        }}
        onDragStart={(event) => event.preventDefault()}
        className="overflow-hidden rounded-2xl cursor-grab select-none touch-pan-y active:cursor-grabbing"
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(${-activeIndex * 100}% + ${dragOffset}px))`,
            transitionDuration: dragOffset === 0 ? "300ms" : "0ms",
          }}
        >
          {posts.map((post) => {
            const imageUrl = post.featured_image_url || post.thumbnail_url;
            const title = post.featured_title || post.title;
            const description = post.featured_description || post.summary;

            return (
              <div key={post.id} className="w-full shrink-0">
                <div
                  role="link"
                  tabIndex={0}
                  onClick={() => handleCardClick(post)}
                  onKeyDown={(event) => handleCardKeyDown(event, post)}
                  className="group block outline-none"
                >
                  <article className="relative h-[350px] overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] md:h-[480px]">
                    {imageUrl ? (
                      <img src={imageUrl} alt="" draggable={false} className="absolute inset-0 size-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 size-full bg-[linear-gradient(135deg,#111827_0%,#0b0e14_48%,#123d91_100%)]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(61,130,245,0.45),transparent_38%)]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,18,18,0)] to-[#121212]" />
                    <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 md:bottom-10 md:left-10 md:right-10">
                      <h2 className="line-clamp-2 text-[20px] font-bold leading-7 tracking-[-0.5px] text-white md:text-[24px] md:leading-8">
                        {title}
                      </h2>
                      <p className="line-clamp-2 text-[14px] font-medium leading-[21px] tracking-[-0.35px] text-[#eaeaea] md:text-[16px] md:leading-6">
                        {description}
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {posts.length > 1 && (
        <div className="flex justify-center gap-1" aria-label="추천 블로그 슬라이드">
          {posts.map((post, index) => (
            <button
              key={post.id}
              type="button"
              aria-label={`${index + 1}번째 추천 블로그 보기`}
              aria-current={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded transition-all ${
                activeIndex === index ? "w-4 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
