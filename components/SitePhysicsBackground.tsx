"use client";

import { useEffect, useRef } from "react";

export default function SitePhysicsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cv = canvas;
    const context = ctx;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = ["#A855F7", "#EC4899", "#3B82F6", "#06B6D4", "#F59E0B"];
    const mouse = { x: -10000, y: -10000, radius: 150 };
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      density: number;
      color: string;
    }> = [];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = window.innerWidth;
      height = window.innerHeight;
      cv.width = Math.round(width * dpr);
      cv.height = Math.round(height * dpr);
      cv.style.width = `${width}px`;
      cv.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor((width * height) / 11000), 210);
      particles.length = 0;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.05,
          vy: (Math.random() - 0.5) * 1.05,
          radius: Math.random() * 2.1 + 0.9,
          density: Math.random() * 18 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    function onMove(event: PointerEvent) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    }

    function onTouch(event: TouchEvent) {
      const touch = event.touches[0];
      if (!touch) return;
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
    }

    function onLeave() {
      mouse.x = -10000;
      mouse.y = -10000;
    }

    function drawConnections() {
      for (let a = 0; a < particles.length; a += 1) {
        for (let b = a + 1; b < particles.length; b += 1) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 118) {
            const opacity = (1 - distance / 118) * 0.34;
            context.beginPath();
            context.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            context.lineWidth = 1;
            context.moveTo(particles[a].x, particles[a].y);
            context.lineTo(particles[b].x, particles[b].y);
            context.stroke();
          }
        }
      }
    }

    function frame() {
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const glow = context.createRadialGradient(width * 0.5, height * 0.35, 0, width * 0.5, height * 0.35, Math.max(width, height) * 0.65);
      glow.addColorStop(0, "rgba(168, 85, 247, 0.11)");
      glow.addColorStop(0.48, "rgba(6, 182, 212, 0.035)");
      glow.addColorStop(1, "rgba(3, 0, 20, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      drawConnections();

      for (const particle of particles) {
        if (!reduceMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        if (particle.x + particle.radius > width || particle.x - particle.radius < 0) particle.vx *= -1;
        if (particle.y + particle.radius > height || particle.y - particle.radius < 0) particle.vy *= -1;

        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (!reduceMotion && distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          particle.x -= (dx / Math.max(distance, 1)) * force * particle.density;
          particle.y -= (dy / Math.max(distance, 1)) * force * particle.density;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.shadowBlur = 10;
        context.shadowColor = particle.color;
        context.fillStyle = particle.color;
        context.fill();
        context.shadowBlur = 0;
      }

      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseout", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="site-physics-background" aria-hidden="true" />;
}
