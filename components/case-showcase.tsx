"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MoveHorizontal } from "lucide-react";

export type CaseItem = {
  image: string;
  location: string;
  title: string;
  scene: string;
  service: string;
  result: string;
};

type CaseShowcaseProps = {
  cases: CaseItem[];
};

export default function CaseShowcase({ cases }: CaseShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-case-slide]"));
    if (!slides.length) return;

    const wheelListener = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      const atStart = track.scrollLeft <= 1;
      const atEnd = track.scrollLeft >= maxScroll - 1;
      if ((event.deltaY < 0 && atStart) || (event.deltaY > 0 && atEnd)) return;

      event.preventDefault();
      track.scrollLeft += event.deltaY;
    };
    track.addEventListener("wheel", wheelListener, { passive: false });

    if (!("IntersectionObserver" in window)) {
      return () => track.removeEventListener("wheel", wheelListener);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const nextIndex = Number((visible.target as HTMLElement).dataset.caseIndex ?? 0);
        setActiveIndex(nextIndex);
      },
      { root: track, threshold: [0.55, 0.75] },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => {
      observer.disconnect();
      track.removeEventListener("wheel", wheelListener);
    };
  }, [cases.length]);

  const moveTo = (index: number) => {
    const safeIndex = Math.max(0, Math.min(index, cases.length - 1));
    slideRefs.current[safeIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveIndex(safeIndex);
  };

  return (
    <div className="cases-showcase">
      <section
        className="case-track"
        ref={trackRef}
        aria-label="落地项目案例滚动展示"
      >
        {cases.map((item, index) => (
          <article
            className="case-slide"
            data-case-slide
            data-case-index={index}
            data-reveal="scale"
            data-delay={(index % 3) + 1}
            key={item.title}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
          >
            <img src={item.image} alt={`${item.title}智慧消防项目现场`} />
            <div className="case-slide-overlay" />
            <div className="case-slide-top" data-reveal="down" data-delay="1">
              <span className="case-slide-index">0{index + 1}</span>
              <span className="case-slide-label">项目实景 · 服务结果</span>
            </div>
            <div className="case-slide-copy" data-reveal="left" data-delay="2">
              <span className="case-slide-location">{item.location}</span>
              <h3>{item.title}</h3>
              <p className="case-slide-scene">{item.scene}</p>
              <div className="case-slide-details">
                <p><b>服务内容</b>{item.service}</p>
                <p><b>运行结果</b>{item.result}</p>
              </div>
            </div>
            <div className="case-slide-footer" data-reveal="up" data-delay="3">
              <span>壹消智慧消防 · 全周期代运维</span>
              <span>{String(index + 1).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}</span>
            </div>
          </article>
        ))}
      </section>

      <aside className="case-navigation" aria-label="案例切换导航" data-reveal="right" data-delay="2">
        <div className="case-navigation-heading">
          <span>案例切换</span>
          <strong>{String(activeIndex + 1).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}</strong>
        </div>
        <div className="case-navigation-list">
          {cases.map((item, index) => (
            <button
              className={index === activeIndex ? "case-navigation-item active" : "case-navigation-item"}
              data-reveal="right"
              data-delay={String(index + 1)}
              type="button"
              aria-label={`查看${item.title}案例`}
              aria-pressed={index === activeIndex}
              key={item.title}
              onClick={() => moveTo(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              <small>{item.location}</small>
            </button>
          ))}
        </div>
        <div className="case-navigation-bottom">
          <span><MoveHorizontal aria-hidden="true" />滚动 / 拖动查看项目</span>
          <div>
            <button type="button" aria-label="上一个案例" onClick={() => moveTo(activeIndex - 1)} disabled={activeIndex === 0}><ArrowLeft aria-hidden="true" /></button>
            <button type="button" aria-label="下一个案例" onClick={() => moveTo(activeIndex + 1)} disabled={activeIndex === cases.length - 1}><ArrowRight aria-hidden="true" /></button>
          </div>
        </div>
      </aside>
    </div>
  );
}
