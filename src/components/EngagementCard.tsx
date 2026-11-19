import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { canTriggerInitialPlay } from '../utils/engagementCardTrigger';
import './EngagementCard.css';

interface EngagementCardProps {
  videoEnded: boolean;
  isOverlayBlocking: boolean;
}

export function EngagementCard({
  videoEnded,
  isOverlayBlocking,
}: EngagementCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const hasTriggeredRef = useRef(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            setIsIntersecting(true);
            break;
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (
      canTriggerInitialPlay({
        hasTriggered: hasTriggeredRef.current,
        isOverlayBlocking,
        videoEnded,
        isIntersecting,
      })
    ) {
      hasTriggeredRef.current = true;
      el.classList.add('play');
    }
  }, [isOverlayBlocking, videoEnded, isIntersecting]);

  return (
    <section id="engagement-card" dir="ltr" lang="en">
      <main ref={cardRef} className="card" id="card">
        <img
          className="fl"
          alt=""
          aria-hidden="true"
          src="images/flower-1.webp"
          style={
            {
              left: '0.000%',
              top: '0.000%',
              width: '10.970%',
              transformOrigin: '0% 0%',
              '--a': 2.1,
              '--t': '5.5s',
              '--dl': '-0.0s',
            } as CSSProperties
          }
        />
        <img
          className="fl"
          alt=""
          aria-hidden="true"
          src="images/flower-2.webp"
          style={
            {
              left: '7.388%',
              top: '0.000%',
              width: '20.896%',
              transformOrigin: '50% 0%',
              '--a': 2.1,
              '--t': '6.2s',
              '--dl': '-1.3s',
            } as CSSProperties
          }
        />
        <img
          className="fl"
          alt=""
          aria-hidden="true"
          src="images/flower-3.webp"
          style={
            {
              left: '55.746%',
              top: '0.000%',
              width: '44.254%',
              transformOrigin: '100% 0%',
              '--a': 1.2,
              '--t': '6.9s',
              '--dl': '-2.6s',
            } as CSSProperties
          }
        />
        <img
          className="fl"
          alt=""
          aria-hidden="true"
          src="images/flower-4.webp"
          style={
            {
              left: '0.000%',
              top: '10.000%',
              width: '23.582%',
              transformOrigin: '0% 50%',
              '--a': 1.2,
              '--t': '7.6s',
              '--dl': '-3.9s',
            } as CSSProperties
          }
        />
        <img
          className="fl"
          alt=""
          aria-hidden="true"
          src="images/flower-5.webp"
          style={
            {
              left: '93.284%',
              top: '34.500%',
              width: '6.716%',
              transformOrigin: '100% 50%',
              '--a': 2.1,
              '--t': '8.3s',
              '--dl': '-5.2s',
            } as CSSProperties
          }
        />
        <img
          className="fl"
          alt=""
          aria-hidden="true"
          src="images/flower-6.webp"
          style={
            {
              left: '92.836%',
              top: '42.750%',
              width: '7.164%',
              transformOrigin: '100% 50%',
              '--a': 2.1,
              '--t': '9.0s',
              '--dl': '-6.5s',
            } as CSSProperties
          }
        />
        <img
          className="fl"
          alt=""
          aria-hidden="true"
          src="images/flower-7.webp"
          style={
            {
              left: '0.000%',
              top: '51.600%',
              width: '6.567%',
              transformOrigin: '0% 50%',
              '--a': 2.1,
              '--t': '9.7s',
              '--dl': '-7.8s',
            } as CSSProperties
          }
        />
        <img
          className="fl"
          alt=""
          aria-hidden="true"
          src="images/flower-8.webp"
          style={
            {
              left: '82.090%',
              top: '56.600%',
              width: '17.910%',
              transformOrigin: '100% 50%',
              '--a': 1.2,
              '--t': '10.4s',
              '--dl': '-9.1s',
            } as CSSProperties
          }
        />
        <img
          className="fl"
          alt=""
          aria-hidden="true"
          src="images/flower-9.webp"
          style={
            {
              left: '0.000%',
              top: '73.550%',
              width: '28.657%',
              transformOrigin: '0% 100%',
              '--a': 1.2,
              '--t': '11.1s',
              '--dl': '-10.4s',
            } as CSSProperties
          }
        />
        <img
          className="fl"
          alt=""
          aria-hidden="true"
          src="images/flower-10.webp"
          style={
            {
              left: '87.985%',
              top: '88.500%',
              width: '12.015%',
              transformOrigin: '100% 50%',
              '--a': 2.1,
              '--t': '11.8s',
              '--dl': '-11.7s',
            } as CSSProperties
          }
        />
        <span
          className="petal"
          style={{ '--s': '7cqw', '--x': '12%', '--t': '19s', '--d': '4s' } as CSSProperties}
        />
        <span
          className="petal"
          style={{ '--s': '5cqw', '--x': '38%', '--t': '23s', '--d': '9s' } as CSSProperties}
        />
        <span
          className="petal"
          style={{ '--s': '6cqw', '--x': '62%', '--t': '21s', '--d': '2s' } as CSSProperties}
        />
        <span
          className="petal"
          style={{ '--s': '4.5cqw', '--x': '84%', '--t': '25s', '--d': '12s' } as CSSProperties}
        />
        <span
          className="petal"
          style={{ '--s': '5.5cqw', '--x': '50%', '--t': '27s', '--d': '16s' } as CSSProperties}
        />
        <p className="kicker">The Engagment of</p>
        <h1 className="name name-1">Omar Faryabi</h1>
        <p className="and">and</p>
        <h2 className="name name-2">Ms. Shuaibi</h2>
        <div className="venue-img" role="img" aria-label="Taj Continental hall building">
          <img className="bld bld-sketch" src="images/building-sketch.webp" alt="" />
          <img className="bld bld-color" src="images/building.webp" alt="" />
        </div>
        <p className="date">Friday, October 16, 2026</p>
        <p className="venue">
          Taj Continental
          <br />
          Faryal Hall
        </p>
      </main>
    </section>
  );
}
