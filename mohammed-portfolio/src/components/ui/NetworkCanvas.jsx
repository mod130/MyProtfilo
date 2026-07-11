import { useEffect, useRef } from 'react';

/**
 * Signature visual: a slowly drifting network topology (nodes + links),
 * echoing the networking/infrastructure subject matter rather than a
 * generic decorative blob. Pauses automatically for reduced-motion users
 * and when the tab is hidden, to stay performant and accessible.
 */
export default function NetworkCanvas({ className = '', nodeCount = 46 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes = [];
    let frameId;
    let running = true;
    const mouse = { x: null, y: null };

    const palette = ['#6C63FF', '#8B5CF6', '#22D3EE'];

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeNodes() {
      const count = prefersReducedMotion ? Math.round(nodeCount / 2) : nodeCount;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 1,
        color: palette[Math.floor(Math.random() * palette.length)],
      }));
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (mouse.x !== null) {
            const dx = node.x - mouse.x;
            const dy = node.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 110) {
              const force = (110 - dist) / 110;
              node.x += (dx / (dist || 1)) * force * 0.6;
              node.y += (dy / (dist || 1)) * force * 0.6;
            }
          }

          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < -20) node.y = height + 20;
          if (node.y > height + 20) node.y = -20;
        }
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          const maxDist = 130;
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - dist / maxDist) * 0.35})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.85;
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      if (running && !prefersReducedMotion) {
        frameId = requestAnimationFrame(step);
      }
    }

    function handleMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouse.x = null;
      mouse.y = null;
    }

    function handleVisibility() {
      running = document.visibilityState === 'visible';
      if (running && !prefersReducedMotion) {
        frameId = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(frameId);
      }
    }

    resize();
    makeNodes();
    step();

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [nodeCount]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
