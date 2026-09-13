'use client';
/* oxlint-disable next/no-img-element -- project images are local lightbox assets */
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '@/lib/projects';
export default function ProjectGallery() {
  const [active, setActive] = useState(0);
  const item = projects[active];
  return (
    <div className="c-projects">
      <div className="c-project-tabs" role="tablist" aria-label="选择项目">
        {projects.map((p, i) => (
          <button
            key={p.title}
            type="button"
            role="tab"
            id={`project-tab-${i}`}
            aria-selected={i === active}
            aria-controls="project-detail"
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {p.title}
          </button>
        ))}
      </div>
      <article
        className="c-project-detail"
        id="project-detail"
        role="tabpanel"
        aria-labelledby={`project-tab-${active}`}
        aria-live="polite"
      >
        <figure>
          <img
            key={item.image}
            src={item.image}
            alt={item.title + '平台截图'}
            data-lightbox
          />
          <figcaption>项目平台截图 · 点击查看大图</figcaption>
        </figure>
        <div className="c-project-copy">
          <p className="c-kicker">{item.location}</p>
          <h3>{item.title}</h3>
          <p className="c-scene">{item.scene}</p>
          <p>{item.intro}</p>
          <h4>项目内容</h4>
          <ul>
            {item.work.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p className="c-note">资料来源：{item.source}</p>
          <a className="c-project-detail-link" href={`/cases/${item.slug}`}>查看完整案例 <ArrowRight size={18} /></a>
        </div>
      </article>
      <div className="c-project-controls">
        <span>{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        <div>
          <button
            type="button"
            aria-label="上一个项目"
            disabled={active === 0}
            onClick={() => setActive(active - 1)}
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            aria-label="下一个项目"
            disabled={active === projects.length - 1}
            onClick={() => setActive(active + 1)}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
