'use client';

import React, { useEffect, useRef } from 'react';

export const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#2c3691', '#ec2028', '#12b76a', '#f59e0b', '#3b82f6'];
    const particles = Array.from({ length: 60 }).map(() => ({
      x: canvas.width / 2,
      y: canvas.height / 2 - 100,
      r: Math.random() * 5 + 3,
      dx: (Math.random() - 0.5) * 12,
      dy: (Math.random() - 0.8) * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      tilt: Math.random() * 10,
      tiltAngle: Math.random() * Math.PI,
    }));

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeParticles = 0;
      particles.forEach((p) => {
        if (p.alpha <= 0.01) return;
        activeParticles++;

        p.x += p.dx;
        p.y += p.dy;
        p.dy += 0.22; // gravity
        p.alpha -= 0.014;
        p.tiltAngle += 0.1;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (activeParticles > 0) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-60"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
