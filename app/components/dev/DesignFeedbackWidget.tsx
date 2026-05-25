"use client";

import { type CSSProperties, type MouseEvent, useEffect, useMemo, useState } from "react";

import styles from "./DesignFeedbackWidget.module.css";

type ElementSnapshot = {
  height: number;
  selector: string;
  tagName: string;
  text: string;
  width: number;
  x: number;
  y: number;
};

type FeedbackStep = "idle" | "selecting" | "writing" | "saved";

type DesignFeedbackWidgetProps = {
  visibleByDefault?: boolean;
};

const FEEDBACK_STORAGE_KEY = "classit:design-feedback-visible";

function escapeSelectorPart(value: string) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(value);
  }

  return value.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}

function buildSelector(element: Element) {
  const parts: string[] = [];
  let current: Element | null = element;

  while (current && current !== document.body && parts.length < 4) {
    const tagName = current.tagName.toLowerCase();
    const id = current.id ? `#${escapeSelectorPart(current.id)}` : "";
    const className = Array.from(current.classList)
      .filter((name) => !name.includes("DesignFeedbackWidget"))
      .slice(0, 2)
      .map((name) => `.${escapeSelectorPart(name)}`)
      .join("");

    parts.unshift(`${tagName}${id}${className}`);
    current = current.parentElement;
  }

  return parts.join(" > ");
}

function snapshotElement(element: Element): ElementSnapshot {
  const rect = element.getBoundingClientRect();

  return {
    height: Math.round(rect.height),
    selector: buildSelector(element),
    tagName: element.tagName.toLowerCase(),
    text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 160),
    width: Math.round(rect.width),
    x: Math.round(rect.left + window.scrollX),
    y: Math.round(rect.top + window.scrollY),
  };
}

function getHighlightStyle(target: Element | null): CSSProperties | undefined {
  if (!target) {
    return undefined;
  }

  const rect = target.getBoundingClientRect();

  return {
    height: `${rect.height}px`,
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
  };
}

export function DesignFeedbackWidget({ visibleByDefault = false }: DesignFeedbackWidgetProps) {
  const [step, setStep] = useState<FeedbackStep>("idle");
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [selectedElement, setSelectedElement] = useState<ElementSnapshot | null>(null);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isVisible, setIsVisible] = useState(visibleByDefault);

  const highlightStyle = useMemo(
    () => getHighlightStyle(step === "writing" ? null : hoveredElement),
    [hoveredElement, step]
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const feedbackParam = params.get("design-feedback");

      if (feedbackParam === "1") {
        window.localStorage.setItem(FEEDBACK_STORAGE_KEY, "1");
        setIsVisible(true);
        return;
      }

      if (feedbackParam === "0") {
        window.localStorage.removeItem(FEEDBACK_STORAGE_KEY);
        setIsVisible(false);
        return;
      }

      if (!visibleByDefault && window.localStorage.getItem(FEEDBACK_STORAGE_KEY) === "1") {
        setIsVisible(true);
      }
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [visibleByDefault]);

  useEffect(() => {
    if (!isVisible || step !== "selecting") {
      return undefined;
    }

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;

      if (!target || target.closest('[data-design-feedback-widget="true"]')) {
        setHoveredElement(null);
        return;
      }

      setHoveredElement(target);
    };

    const handleClick = (event: globalThis.MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;

      if (!target || target.closest('[data-design-feedback-widget="true"]')) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      setSelectedElement(snapshotElement(target));
      setStep("writing");
      setHoveredElement(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setStep("idle");
        setHoveredElement(null);
      }
    };

    document.addEventListener("mousemove", handleMouseMove, true);
    document.addEventListener("click", handleClick, true);
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove, true);
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isVisible, step]);

  if (!isVisible) {
    return null;
  }

  const startSelection = () => {
    setComment("");
    setMessage("");
    setSelectedElement(null);
    setStep("selecting");
  };

  const cancelFeedback = () => {
    setStep("idle");
    setHoveredElement(null);
    setSelectedElement(null);
    setComment("");
    setMessage("");
  };

  const saveFeedback = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!selectedElement || !comment.trim() || isSaving) {
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/dev/design-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: comment.trim(),
          element: selectedElement,
          path: window.location.pathname,
          url: window.location.href,
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        setMessage(payload.message ?? "피드백 저장에 실패했습니다.");
        return;
      }

      setMessage("저장했습니다.");
      setStep("saved");
      setComment("");
      setSelectedElement(null);
    } catch {
      setMessage("피드백 저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.root} data-design-feedback-widget="true">
      {step === "selecting" && highlightStyle ? <div className={styles.highlight} style={highlightStyle} /> : null}
      {step === "selecting" ? <div className={styles.guide}>피드백을 남길 요소를 클릭하세요. ESC로 취소</div> : null}

      {step === "idle" || step === "saved" ? (
        <button className={styles.cta} type="button" onClick={startSelection}>
          디자인 피드백
        </button>
      ) : null}

      {step === "writing" && selectedElement ? (
        <section className={styles.panel} aria-label="디자인 피드백 작성">
          <div className={styles.panelHeader}>
            <strong>선택한 요소</strong>
            <button type="button" onClick={cancelFeedback}>
              닫기
            </button>
          </div>
          <p className={styles.selector}>{selectedElement.selector || selectedElement.tagName}</p>
          <p className={styles.rect}>
            {selectedElement.width} x {selectedElement.height} / x:{selectedElement.x} y:{selectedElement.y}
          </p>
          <p className={styles.text}>{selectedElement.text || selectedElement.tagName}</p>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="수정할 디자인 피드백을 입력해주세요."
            autoFocus
          />
          {message ? <p className={styles.message}>{message}</p> : null}
          <div className={styles.actions}>
            <button type="button" onClick={startSelection}>
              다시 선택
            </button>
            <button type="button" onClick={saveFeedback} disabled={!comment.trim() || isSaving}>
              {isSaving ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  <span>저장 중</span>
                </>
              ) : (
                "저장"
              )}
            </button>
          </div>
        </section>
      ) : null}

      {step === "saved" && message ? <p className={styles.toast}>{message}</p> : null}
    </div>
  );
}
