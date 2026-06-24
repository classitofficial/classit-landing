"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getBlogContentPreview } from "@/lib/blog/preview";
import type { BlogPost } from "@/lib/blog/types";

const CLICK_SUPPRESSION_DISTANCE = 16;
const SLIDE_MOVE_DISTANCE = 48;

export function shouldSuppressCarouselClick(distanceX: number) {
  return Math.abs(distanceX) > CLICK_SUPPRESSION_DISTANCE;
}

export function getCarouselClickTargetPost(posts: BlogPost[], activeIndex: number, distanceX: number) {
  if (posts.length === 0 || shouldSuppressCarouselClick(distanceX)) return null;
  return posts[activeIndex % posts.length] ?? null; 
}

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
    if (posts.length > 1) {
      setDragOffset(distance);
    }

    if (shouldSuppressCarouselClick(distance)) {
      dragRef.current.suppressClick = true;
    }
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragRef.current.pointerId !== event.pointerId) return;

    const distance = event.clientX - dragRef.current.startX;
    const clickTargetPost = getCarouselClickTargetPost(posts, activeIndex, distance);

    if (event.pointerType === "mouse" && event.button !== 0) {
      dragRef.current.pointerId = -1;
      setDragOffset(0);
      event.currentTarget.releasePointerCapture(event.pointerId);
      return;
    }

    if (clickTargetPost) {
      dragRef.current.suppressClick = true;
      router.push(`/blog/${clickTargetPost.slug}`);
    } else if (posts.length > 1 && Math.abs(distance) > SLIDE_MOVE_DISTANCE) {
      moveSlide(distance > 0 ? "prev" : "next");
      dragRef.current.suppressClick = true;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current.pointerId = -1;
    setDragOffset(0);
  }

  function handleLinkClick(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (dragRef.current.suppressClick) {
      event.preventDefault();
      dragRef.current.suppressClick = false;
    }
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
          dragRef.current.suppressClick = false;
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
            const imageUrl = post.thumbnail_url;
            const title = post.title;
            const description = getBlogContentPreview(post);

            return (
              <div key={post.id} className="w-full shrink-0">
                <Link href={`/blog/${post.slug}`} draggable={false} onClick={handleLinkClick} className="group block outline-none">
                  <article className="relative h-[350px] overflow-hidden md:h-[480px]">
                    {imageUrl ? (
                      <img src={imageUrl} alt={`${title}에 관한 대표 이미지`} draggable={false} className="absolute inset-0 size-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 size-full bg-[linear-gradient(135deg,#111827_0%,#0b0e14_48%,#123d91_100%)]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(61,130,245,0.45),transparent_38%)]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,14,20,0)_0%,rgba(11,14,20,0.58)_55%,#0B0E14_100%)]" />
                    <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 md:bottom-10 md:left-10 md:right-10">
                      <h2 className="line-clamp-2 text-[20px] font-bold leading-7 tracking-[-0.5px] text-white md:text-[24px] md:leading-8">
                        {title}
                      </h2>
                      <p className="line-clamp-2 text-[14px] font-medium leading-[21px] tracking-[-0.35px] text-[#eaeaea] md:text-[16px] md:leading-6">
                        {description}
                      </p>
                    </div>
                  </article>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {posts.length > 1 && (
        <div className="flex justify-center gap-1" aria-label="추천 아티클 슬라이드">
          {posts.map((post, index) => (
            <button
              key={post.id}
              type="button"
              aria-label={`${index + 1}번째 추천 아티클 보기`}
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
