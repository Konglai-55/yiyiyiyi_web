'use client';
import { useEffect, useRef, useState } from 'react';
import Waves from './react-bits/Waves';
import './hero-waves.css';

export default function HeroWaves() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    const update = () => setActive(visible && !document.hidden && !preference.matches);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    if (ref.current) observer.observe(ref.current);
    preference.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
    return () => { observer.disconnect(); preference.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); };
  }, []);
  return <div ref={ref} className="c-hero-waves" aria-hidden="true">{active && <Waves lineColor="rgba(86, 158, 191, 0.25)" backgroundColor="transparent" waveSpeedX={0.004} waveSpeedY={0.002} waveAmpX={18} waveAmpY={8} xGap={30} yGap={28} maxCursorMove={48} friction={0.91} tension={0.012} />}</div>;
}
