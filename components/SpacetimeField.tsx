"use client";

import { useEffect, useRef } from "react";

export default function SpacetimeField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const container = wrap;
    const cv = canvas;
    const context = ctx;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const css = getComputedStyle(document.documentElement);
    const pick = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
    const cyan = pick("--lime", "#00B4D8");
    const violet = pick("--violet", "#7209B7");
    const amber = pick("--warm", "#F4A300");

    const rgba = (hex: string, alpha: number) => {
      let h = hex.replace("#", "");
      if (h.length === 3) h = h.split("").map((c) => c + c).join("");
      const n = parseInt(h, 16);
      return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
    };

    const tau = Math.PI * 2;
    const gap = 56;
    const pull = 8600;
    const scale = 320;
    const gravity = 1980;
    const soft = 44;
    const maxSpeed = 10.8;
    const trail = 30;

    type Mass = {
      m: number;
      ax: number;
      ay: number;
      wx: number;
      wy: number;
      px: number;
      py: number;
      x: number;
      y: number;
      color: string;
    };

    type Particle = { x: number; y: number; vx: number; vy: number; hist: number[] };

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let cols = 0;
    let rows = 0;
    let baseX = new Float32Array(0);
    let baseY = new Float32Array(0);
    let warpedX = new Float32Array(0);
    let warpedY = new Float32Array(0);
    let masses: Mass[] = [];
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, sx: 0, sy: 0, on: false };

    function rebuild() {
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = rect.width;
      height = rect.height;
      cx = width / 2;
      cy = height / 2;

      if (!width || !height) return;

      cv.width = Math.round(width * dpr);
      cv.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const padCols = Math.ceil((width * 0.32) / gap);
      const padRows = Math.ceil((height * 0.32) / gap);
      cols = Math.ceil(width / gap) + 1 + padCols * 2;
      rows = Math.ceil(height / gap) + 1 + padRows * 2;
      baseX = new Float32Array(cols * rows);
      baseY = new Float32Array(cols * rows);
      warpedX = new Float32Array(cols * rows);
      warpedY = new Float32Array(cols * rows);

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const k = row * cols + col;
          baseX[k] = (col - padCols) * gap;
          baseY[k] = (row - padRows) * gap;
        }
      }

      masses = [
        { m: 2.4, ax: width * 0.32, ay: height * 0.30, wx: 0.00019, wy: 0.00027, px: 0.0, py: 1.3, x: cx, y: cy, color: cyan },
        { m: 1.8, ax: width * 0.30, ay: height * 0.30, wx: 0.00015, wy: 0.00021, px: 2.1, py: 0.4, x: cx, y: cy, color: violet },
        { m: 1.3, ax: width * 0.24, ay: height * 0.22, wx: 0.00024, wy: 0.00017, px: 4.0, py: 2.6, x: cx, y: cy, color: amber },
      ];

      const count = Math.min(220, Math.round((width * height) / 6800));
      particles = [];
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * tau;
        const radius = 92 + Math.random() * Math.min(width, height) * 0.5;
        const speed = 1.0 + Math.random() * 1.35;
        particles.push({
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          vx: -Math.sin(angle) * speed,
          vy: Math.cos(angle) * speed,
          hist: [],
        });
      }
    }

    const resizeObserver = new ResizeObserver(rebuild);
    resizeObserver.observe(container);
    rebuild();

    const onMove = (event: PointerEvent) => {
      const rect = cv.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.on = true;
    };
    const onLeave = () => {
      mouse.on = false;
    };

    cv.addEventListener("pointermove", onMove, { passive: true });
    cv.addEventListener("pointerleave", onLeave);

    function activeMasses() {
      const list = masses.map((mass) => ({ x: mass.x, y: mass.y, m: mass.m, color: mass.color }));
      if (mouse.on) {
        mouse.sx += (mouse.x - mouse.sx) * 0.16;
        mouse.sy += (mouse.y - mouse.sy) * 0.16;
        list.push({ x: mouse.sx, y: mouse.sy, m: 3.2, color: "#FFFFFF" });
      }
      return list;
    }

    let raf = 0;
    const frame = (now: number) => {
      const t = reduceMotion ? now * 0.35 : now;

      for (const mass of masses) {
        mass.x = cx + Math.sin(t * mass.wx + mass.px) * mass.ax;
        mass.y = cy + Math.sin(t * mass.wy + mass.py) * mass.ay;
      }

      const massList = activeMasses();
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.globalCompositeOperation = "source-over";
      context.clearRect(0, 0, width, height);

      const bg = context.createRadialGradient(width * 0.48, height * 0.38, 0, width * 0.48, height * 0.38, Math.max(width, height) * 0.9);
      bg.addColorStop(0, "rgba(19, 33, 70, 0.98)");
      bg.addColorStop(0.58, "rgba(6, 10, 28, 0.98)");
      bg.addColorStop(1, "rgba(2, 3, 10, 1)");
      context.fillStyle = bg;
      context.fillRect(0, 0, width, height);

      for (let k = 0; k < warpedX.length; k += 1) {
        let x = baseX[k];
        let y = baseY[k];
        for (const mass of massList) {
          const dx = mass.x - x;
          const dy = mass.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy) + 0.001;
          let amount = (pull * mass.m) / (distance + scale);
          amount = Math.min(amount, distance * 0.92);
          x += (dx / distance) * amount;
          y += (dy / distance) * amount;
        }
        warpedX[k] = x;
        warpedY[k] = y;
      }

      context.strokeStyle = "rgba(130, 190, 245, 0.20)";
      context.lineWidth = 1.15;
      for (let row = 0; row < rows; row += 1) {
        context.beginPath();
        for (let col = 0; col < cols; col += 1) {
          const k = row * cols + col;
          col ? context.lineTo(warpedX[k], warpedY[k]) : context.moveTo(warpedX[k], warpedY[k]);
        }
        context.stroke();
      }
      for (let col = 0; col < cols; col += 1) {
        context.beginPath();
        for (let row = 0; row < rows; row += 1) {
          const k = row * cols + col;
          row ? context.lineTo(warpedX[k], warpedY[k]) : context.moveTo(warpedX[k], warpedY[k]);
        }
        context.stroke();
      }

      context.globalCompositeOperation = "lighter";
      for (const mass of massList) {
        const radius = 142 + mass.m * 88;
        const glow = context.createRadialGradient(mass.x, mass.y, 0, mass.x, mass.y, radius);
        glow.addColorStop(0, rgba(mass.color, 0.82));
        glow.addColorStop(0.18, rgba(mass.color, 0.42));
        glow.addColorStop(0.52, rgba(mass.color, 0.12));
        glow.addColorStop(1, rgba(mass.color, 0));
        context.fillStyle = glow;
        context.beginPath();
        context.arc(mass.x, mass.y, radius, 0, tau);
        context.fill();

        context.fillStyle = "rgba(248, 253, 255, 0.96)";
        context.beginPath();
        context.arc(mass.x, mass.y, 3.7, 0, tau);
        context.fill();
      }

      const dt = reduceMotion ? 0.58 : 1.02;
      for (const particle of particles) {
        let ax = 0;
        let ay = 0;
        for (const mass of massList) {
          const dx = mass.x - particle.x;
          const dy = mass.y - particle.y;
          const d2 = dx * dx + dy * dy + soft * soft;
          const inv = (gravity * mass.m) / (d2 * Math.sqrt(d2));
          ax += dx * inv;
          ay += dy * inv;
        }
        particle.vx += ax * dt;
        particle.vy += ay * dt;
        const speed = Math.hypot(particle.vx, particle.vy);
        if (speed > maxSpeed) {
          particle.vx *= maxSpeed / speed;
          particle.vy *= maxSpeed / speed;
        }
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;

        if (particle.x < -width * 0.5 || particle.x > width * 1.5 || particle.y < -height * 0.5 || particle.y > height * 1.5) {
          const angle = Math.random() * tau;
          const radius = Math.min(width, height) * (0.4 + Math.random() * 0.2);
          const speed = 1.0 + Math.random() * 1.35;
          particle.x = cx + Math.cos(angle) * radius;
          particle.y = cy + Math.sin(angle) * radius;
          particle.vx = -Math.sin(angle) * speed;
          particle.vy = Math.cos(angle) * speed;
          particle.hist.length = 0;
        }

        particle.hist.push(particle.x, particle.y);
        if (particle.hist.length > trail * 2) particle.hist.splice(0, 2);

        context.strokeStyle = rgba(cyan, 0.44);
        context.lineWidth = 1.25;
        context.beginPath();
        for (let h = 0; h < particle.hist.length; h += 2) {
          h ? context.lineTo(particle.hist[h], particle.hist[h + 1]) : context.moveTo(particle.hist[h], particle.hist[h + 1]);
        }
        context.stroke();

        context.fillStyle = "rgba(232, 244, 255, 0.95)";
        context.beginPath();
        context.arc(particle.x, particle.y, 1.9, 0, tau);
        context.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="spacetime-field" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
