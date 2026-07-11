import { useEffect, useState } from 'react';

/**
 * Observes a list of section ids and returns whichever is currently most
 * visible in the viewport, so the nav bar can highlight the active link.
 */
export function useActiveSection(sectionIds, options = {}) {
  const [activeId, setActiveId] = useState(sectionIds[0] || null);

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const visibility = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.intersectionRatio);
        });

        let bestId = null;
        let bestRatio = 0;
        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestId && bestRatio > 0) {
          setActiveId(bestId);
        }
      },
      {
        threshold: [0.15, 0.3, 0.5, 0.7],
        rootMargin: '-96px 0px -55% 0px',
        ...options,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, options]);

  return activeId;
}
