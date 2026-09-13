'use client';
import { useEffect, useState, type ReactNode } from 'react';
import SplitText from './react-bits/SplitText/SplitText';
import AnimatedContent from './react-bits/AnimatedContent/AnimatedContent';
import SpotlightCard from './react-bits/SpotlightCard';
import './site-motion-bits.css';

function useMotionEnabled(pointer = false) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = matchMedia(pointer ? '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)' : '(prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [pointer]);
  return enabled;
}
export function HeroLine({ text, entranceDelay = 0.32 }: { text: string; entranceDelay?: number }) {
  const enabled = useMotionEnabled();
  const desktop = useMotionEnabled(true);
  const [complete, setComplete] = useState(false);
  return enabled ? <SplitText text={text} tag="span" className={`site-hero-line site-hero-reveal ${complete ? 'has-shone' : ''}`} splitType="lines" delay={150} entranceDelay={entranceDelay} duration={0.95} ease="power3.out" from={{opacity:0,yPercent:105,rotationX:desktop ? -18 : 0,transformOrigin:'50% 100%',clipPath:'inset(0 0 100% 0)'}} to={{opacity:1,yPercent:0,rotationX:0,clipPath:'inset(0 0 0% 0)'}} textAlign="left" rootMargin="0px" threshold={0} onLetterAnimationComplete={() => setComplete(true)} /> : <span className="site-hero-line">{text}</span>;
}
export function RevealImage({ children, className = '' }: { children: ReactNode; className?: string }) {
  const enabled = useMotionEnabled();
  return enabled ? <AnimatedContent className={`site-image-reveal ${className}`} distance={28} duration={0.75} ease="power3.out" animateOpacity initialOpacity={0.25} threshold={0.05}>{children}</AnimatedContent> : <div className={`site-image-reveal ${className}`}>{children}</div>;
}
export function ProductSpotlight({ children }: { children: ReactNode }) {
  const enabled = useMotionEnabled(true);
  return <SpotlightCard className={`site-product-spotlight ${enabled ? 'is-enabled' : ''}`} spotlightColor="rgba(78, 180, 221, 0.22)">{children}</SpotlightCard>;
}
