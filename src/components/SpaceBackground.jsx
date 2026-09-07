import React, { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Handle DPR
    const setSize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setSize();

    // 1. STARFIELD SETUP (~240 distant pinpoint stars)
    const isMobile = width < 768;
    const starCount = isMobile ? 130 : 240;
    const starColors = [
      "#ffffff",
      "#e0f2fe", // soft icy cyan
      "#f3e8ff", // soft light purple
      "#fef3c7", // soft warm gold
      "#bae6fd", // soft sky blue
    ];

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * (isMobile ? 0.65 : 0.95) + 0.2, // Delicate distant pinpoint radius
      baseAlpha: Math.random() * 0.12 + 0.25, // Target opacity ~0.25 - 0.37 with subtle twinkle
      twinkleSpeed: Math.random() * 0.012 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    // 2. SHOOTING STARS SETUP (Occasional and subtle)
    const shootingStars = [];
    let nextSpawnTime = Date.now() + 6000;

    const createShootingStar = () => {
      const angle = (Math.PI / 180) * (Math.random() * 20 + 35); // 35 to 55 degrees
      const speed = Math.random() * 5 + 8;
      return {
        x: Math.random() * (width * 0.85),
        y: Math.random() * (height * 0.30),
        length: Math.random() * 45 + 50,
        speed,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 25 + 35,
        color: Math.random() > 0.4 ? "#38bdf8" : "#c084fc",
      };
    };

    // 3. PLANETS INITIAL STATE
    let time = 0;

    // Render loop
    const render = () => {
      if (!prefersReducedMotion) {
        time += 0.0018; // Barely noticeable gentle drift
      }

      ctx.clearRect(0, 0, width, height);

      // Deep Space Base Background Fill
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#030712");
      bgGrad.addColorStop(0.4, "#040916");
      bgGrad.addColorStop(0.75, "#050815");
      bgGrad.addColorStop(1, "#020512");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // A. SUBTLE PERSPECTIVE / SCI-FI GRID (Target opacity 0.03 - 0.05)
      ctx.save();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.035)";
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // B. FAINT ATMOSPHERIC NEBULA LAYERS (Target opacity 0.08 - 0.12)
      // Nebula 1: Top-Right Soft Purple Atmospheric Wash
      const neb1X = width * 0.82 + Math.sin(time * 0.3) * 15;
      const neb1Y = height * 0.20 + Math.cos(time * 0.25) * 12;
      const neb1Radius = Math.min(width, height) * (isMobile ? 0.40 : 0.35);
      const neb1 = ctx.createRadialGradient(
        neb1X,
        neb1Y,
        0,
        neb1X,
        neb1Y,
        neb1Radius
      );
      neb1.addColorStop(0, "rgba(139, 92, 246, 0.09)");
      neb1.addColorStop(0.5, "rgba(109, 40, 217, 0.03)");
      neb1.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      // Nebula 2: Center-Left Soft Cyan Atmospheric Wash
      const neb2X = width * 0.14 + Math.cos(time * 0.25) * 15;
      const neb2Y = height * 0.55 + Math.sin(time * 0.3) * 15;
      const neb2Radius = Math.min(width, height) * (isMobile ? 0.42 : 0.36);
      const neb2 = ctx.createRadialGradient(
        neb2X,
        neb2Y,
        0,
        neb2X,
        neb2Y,
        neb2Radius
      );
      neb2.addColorStop(0, "rgba(6, 182, 212, 0.07)");
      neb2.addColorStop(0.5, "rgba(14, 116, 144, 0.02)");
      neb2.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, width, height);

      // Nebula 3: Bottom-Right Subtle Indigo Atmosphere
      const neb3X = width * 0.72 + Math.sin(time * 0.2) * 18;
      const neb3Y = height * 0.85 + Math.cos(time * 0.22) * 15;
      const neb3Radius = Math.min(width, height) * 0.30;
      const neb3 = ctx.createRadialGradient(
        neb3X,
        neb3Y,
        0,
        neb3X,
        neb3Y,
        neb3Radius
      );
      neb3.addColorStop(0, "rgba(59, 130, 246, 0.06)");
      neb3.addColorStop(0.6, "rgba(30, 58, 138, 0.02)");
      neb3.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.fillStyle = neb3;
      ctx.fillRect(0, 0, width, height);

      // C. DISTANT TWINKLING STARS (Target opacity ~0.25 - 0.38, natural twinkle)
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (!prefersReducedMotion) {
          star.twinklePhase += star.twinkleSpeed;
        }
        const alpha = Math.min(
          0.38,
          Math.max(0.20, star.baseAlpha * (0.8 + 0.2 * Math.sin(star.twinklePhase)))
        );

        ctx.save();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // D. OCCASIONAL & SUBTLE SHOOTING STARS (Target opacity 0.35 - 0.45)
      const now = Date.now();
      if (!prefersReducedMotion && now > nextSpawnTime) {
        shootingStars.push(createShootingStar());
        nextSpawnTime = now + Math.random() * 10000 + 8000; // Occasional: every 8-18s
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;

        const progress = s.life / s.maxLife;
        const currentAlpha = Math.sin(progress * Math.PI) * 0.44; // Peak opacity 0.44

        if (progress >= 1 || s.x > width + 100 || s.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = s.x - (s.vx / s.speed) * s.length;
        const tailY = s.y - (s.vy / s.speed) * s.length;

        const meteorGrad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        meteorGrad.addColorStop(0, "#ffffff");
        meteorGrad.addColorStop(0.25, s.color);
        meteorGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 0.8;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Delicate spark at head
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, 0.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // E. DISTANT & SUBTLE PLANETS (Target opacity around 0.16 - 0.24)
      // ==========================================
      // PLANET 1: Subtle Purple Saturn-like Planet (Distant Upper-Left Corner)
      // ==========================================
      const p1BaseX = isMobile ? width * 0.08 : width * 0.10;
      const p1BaseY = isMobile ? height * 0.12 : height * 0.14;
      const p1X = p1BaseX + Math.sin(time * 0.2) * 6;
      const p1Y = p1BaseY + Math.cos(time * 0.18) * 4;
      const p1Radius = isMobile ? 13 : 19; // Distant scale

      ctx.save();
      ctx.globalAlpha = 0.22; // Controlled opacity to not overpower hero

      // Back Ring (under planet)
      ctx.save();
      ctx.translate(p1X, p1Y);
      ctx.rotate(-0.4);
      ctx.scale(1, 0.32);
      ctx.beginPath();
      ctx.arc(0, 0, p1Radius * 1.9, Math.PI, Math.PI * 2);
      ctx.strokeStyle = "rgba(192, 132, 252, 0.18)";
      ctx.lineWidth = isMobile ? 2.5 : 3.5;
      ctx.stroke();
      ctx.restore();

      // Outer Atmospheric Glow (Very faint)
      const p1Aura = ctx.createRadialGradient(
        p1X,
        p1Y,
        p1Radius * 0.8,
        p1X,
        p1Y,
        p1Radius * 1.6
      );
      p1Aura.addColorStop(0, "rgba(168, 85, 247, 0.05)");
      p1Aura.addColorStop(1, "rgba(147, 51, 234, 0)");
      ctx.fillStyle = p1Aura;
      ctx.beginPath();
      ctx.arc(p1X, p1Y, p1Radius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Planet Sphere
      const p1Grad = ctx.createRadialGradient(
        p1X - p1Radius * 0.35,
        p1Y - p1Radius * 0.35,
        p1Radius * 0.1,
        p1X,
        p1Y,
        p1Radius
      );
      p1Grad.addColorStop(0, "#c4b5fd");
      p1Grad.addColorStop(0.4, "#7c3aed");
      p1Grad.addColorStop(0.8, "#4c1d95");
      p1Grad.addColorStop(1, "#1e0a38");
      ctx.fillStyle = p1Grad;
      ctx.beginPath();
      ctx.arc(p1X, p1Y, p1Radius, 0, Math.PI * 2);
      ctx.fill();

      // Front Ring (over front of planet)
      ctx.save();
      ctx.translate(p1X, p1Y);
      ctx.rotate(-0.4);
      ctx.scale(1, 0.32);
      ctx.beginPath();
      ctx.arc(0, 0, p1Radius * 1.9, 0, Math.PI);
      ctx.strokeStyle = "rgba(216, 180, 254, 0.25)";
      ctx.lineWidth = isMobile ? 2.5 : 3.5;
      ctx.stroke();
      ctx.restore();

      ctx.restore(); // Restore Planet 1 globalAlpha

      // ==========================================
      // PLANET 2: Subtle Warm Orange Planet (Distant Mid-Right)
      // ==========================================
      const p2BaseX = isMobile ? width * 0.90 : width * 0.86;
      const p2BaseY = isMobile ? height * 0.28 : height * 0.30;
      const p2X = p2BaseX + Math.cos(time * 0.2) * 5;
      const p2Y = p2BaseY + Math.sin(time * 0.22) * 5;
      const p2Radius = isMobile ? 10 : 14; // Smaller & distant

      ctx.save();
      ctx.globalAlpha = 0.20; // Controlled opacity

      // Warm Solar Aura (Faint)
      const p2Aura = ctx.createRadialGradient(
        p2X,
        p2Y,
        p2Radius * 0.8,
        p2X,
        p2Y,
        p2Radius * 1.8
      );
      p2Aura.addColorStop(0, "rgba(249, 115, 22, 0.05)");
      p2Aura.addColorStop(1, "rgba(249, 115, 22, 0)");
      ctx.fillStyle = p2Aura;
      ctx.beginPath();
      ctx.arc(p2X, p2Y, p2Radius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Sphere Body
      const p2Grad = ctx.createRadialGradient(
        p2X - p2Radius * 0.4,
        p2Y - p2Radius * 0.4,
        p2Radius * 0.1,
        p2X,
        p2Y,
        p2Radius
      );
      p2Grad.addColorStop(0, "#fed7aa");
      p2Grad.addColorStop(0.4, "#c2410c");
      p2Grad.addColorStop(0.8, "#7c2d12");
      p2Grad.addColorStop(1, "#2b0b04");
      ctx.fillStyle = p2Grad;
      ctx.beginPath();
      ctx.arc(p2X, p2Y, p2Radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // Restore Planet 2 globalAlpha

      // ==========================================
      // PLANET 3: Very Subtle Orbiting Moon
      // ==========================================
      const moonOrbitRadiusX = isMobile ? 24 : 34;
      const moonOrbitRadiusY = isMobile ? 10 : 16;
      const moonAngle = time * 0.6;
      const moonX = p2X + Math.cos(moonAngle) * moonOrbitRadiusX;
      const moonY = p2Y + Math.sin(moonAngle) * moonOrbitRadiusY;
      const moonRadius = isMobile ? 2 : 3;

      ctx.save();
      ctx.globalAlpha = 0.16; // Very subtle

      const moonGrad = ctx.createRadialGradient(
        moonX - moonRadius * 0.3,
        moonY - moonRadius * 0.3,
        0.5,
        moonX,
        moonY,
        moonRadius
      );
      moonGrad.addColorStop(0, "#e2e8f0");
      moonGrad.addColorStop(0.6, "#475569");
      moonGrad.addColorStop(1, "#0f172a");
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ==========================================
      // PLANET 4: Subtle Icy Blue Planet (Distant Lower-Right)
      // ==========================================
      const p4BaseX = isMobile ? width * 0.88 : width * 0.80;
      const p4BaseY = isMobile ? height * 0.82 : height * 0.80;
      const p4X = p4BaseX + Math.sin(time * 0.18) * 5;
      const p4Y = p4BaseY + Math.cos(time * 0.2) * 4;
      const p4Radius = isMobile ? 10 : 13; // Smaller & distant

      ctx.save();
      ctx.globalAlpha = 0.20; // Controlled opacity

      // Icy Blue Atmosphere Aura
      const p4Aura = ctx.createRadialGradient(
        p4X,
        p4Y,
        p4Radius * 0.8,
        p4X,
        p4Y,
        p4Radius * 1.8
      );
      p4Aura.addColorStop(0, "rgba(56, 189, 248, 0.05)");
      p4Aura.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.fillStyle = p4Aura;
      ctx.beginPath();
      ctx.arc(p4X, p4Y, p4Radius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Icy Body
      const p4Grad = ctx.createRadialGradient(
        p4X - p4Radius * 0.35,
        p4Y - p4Radius * 0.35,
        p4Radius * 0.1,
        p4X,
        p4Y,
        p4Radius
      );
      p4Grad.addColorStop(0, "#bae6fd");
      p4Grad.addColorStop(0.4, "#0284c7");
      p4Grad.addColorStop(0.8, "#075985");
      p4Grad.addColorStop(1, "#082f49");
      ctx.fillStyle = p4Grad;
      ctx.beginPath();
      ctx.arc(p4X, p4Y, p4Radius, 0, Math.PI * 2);
      ctx.fill();

      // Thin Halo Ring
      ctx.strokeStyle = "rgba(186, 230, 253, 0.14)";
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.ellipse(p4X, p4Y, p4Radius * 1.4, p4Radius * 0.55, 0.35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      setSize();
      stars.forEach((star) => {
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />
    </div>
  );
}
