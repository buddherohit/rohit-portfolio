import React, { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef(null);
  const isMobile =
    typeof window !== "undefined" &&
    (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);

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

    // Handle DPR - Capped at 1.25 on mobile, 1.5 on desktop
    const setSize = () => {
      if (!canvas) return;
      const isMob = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
      const dpr = Math.min(window.devicePixelRatio || 1, isMob ? 1.25 : 1.5);
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

    // 1. STARFIELD CONFIGURATION
    // Desktop: ~240 stars. Mobile: ~75 stars (within 60-90 target)
    const isMob = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    const starCount = isMob ? 75 : 240;
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
      r: Math.random() * (isMob ? 0.6 : 0.95) + 0.2, // Delicate distant pinpoint radius
      baseAlpha: isMob
        ? Math.random() * 0.08 + 0.22 // Target mobile star opacity ~0.22 - 0.30
        : Math.random() * 0.12 + 0.25, // Target desktop star opacity ~0.25 - 0.37
      driftY: isMob
        ? Math.random() * 0.03 + 0.015 // Very slow, gentle downward drift
        : 0,
      driftX: isMob
        ? (Math.random() - 0.5) * 0.01
        : 0,
      twinkleSpeed: Math.random() * 0.015 + 0.006,
      twinklePhase: Math.random() * Math.PI * 2,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    // 2. SHOOTING STARS SETUP
    // Desktop: every 8-18s. Mobile: rare, every 20-35s with max 1 star
    const shootingStars = [];
    let nextSpawnTime = Date.now() + (isMob ? 20000 : 6000);

    const createShootingStar = () => {
      const angle = (Math.PI / 180) * (Math.random() * 20 + 35); // 35 to 55 degrees
      const speed = isMob ? Math.random() * 4 + 7 : Math.random() * 5 + 8;
      return {
        x: Math.random() * (width * 0.85),
        y: Math.random() * (height * 0.25),
        length: isMob ? Math.random() * 30 + 35 : Math.random() * 45 + 50,
        speed,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        life: 0,
        maxLife: isMob ? Math.random() * 20 + 25 : Math.random() * 25 + 35,
        color: Math.random() > 0.4 ? "#38bdf8" : "#c084fc",
      };
    };

    let time = 0;
    let lastRenderTime = 0;
    const mobileFrameInterval = 1000 / 35; // ~35fps cadence on mobile to prioritize touch scrolling

    // Render loop
    const render = (currentTime) => {
      // Throttle background animation frame cadence on mobile so native scrolling has 100% priority
      if (isMob && currentTime) {
        if (currentTime - lastRenderTime < mobileFrameInterval) {
          animationFrameId = requestAnimationFrame(render);
          return;
        }
        lastRenderTime = currentTime;
      }

      if (!prefersReducedMotion) {
        time += 0.0018; // Barely noticeable gentle cosmic drift
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

      // A. SUBTLE PERSPECTIVE / SCI-FI GRID (Desktop only)
      if (!isMob) {
        ctx.strokeStyle = "rgba(56, 189, 248, 0.035)";
        ctx.lineWidth = 0.5;
        const gridSize = 80;
        ctx.beginPath();
        for (let x = 0; x <= width; x += gridSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        for (let y = 0; y <= height; y += gridSize) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();
      }

      // B. FAINT ATMOSPHERIC NEBULA LAYERS (Desktop canvas; Mobile uses zero-CPU GPU CSS gradient)
      if (!isMob) {
        // Nebula 1: Top-Right Soft Purple Atmospheric Wash
        const neb1X = width * 0.82 + Math.sin(time * 0.3) * 15;
        const neb1Y = height * 0.20 + Math.cos(time * 0.25) * 12;
        const neb1Radius = Math.min(width, height) * 0.35;
        const neb1 = ctx.createRadialGradient(neb1X, neb1Y, 0, neb1X, neb1Y, neb1Radius);
        neb1.addColorStop(0, "rgba(139, 92, 246, 0.09)");
        neb1.addColorStop(0.5, "rgba(109, 40, 217, 0.03)");
        neb1.addColorStop(1, "rgba(139, 92, 246, 0)");
        ctx.fillStyle = neb1;
        ctx.fillRect(0, 0, width, height);

        // Nebula 2 & 3
        const neb2X = width * 0.14 + Math.cos(time * 0.25) * 15;
        const neb2Y = height * 0.55 + Math.sin(time * 0.3) * 15;
        const neb2Radius = Math.min(width, height) * 0.36;
        const neb2 = ctx.createRadialGradient(neb2X, neb2Y, 0, neb2X, neb2Y, neb2Radius);
        neb2.addColorStop(0, "rgba(6, 182, 212, 0.07)");
        neb2.addColorStop(0.5, "rgba(14, 116, 144, 0.02)");
        neb2.addColorStop(1, "rgba(6, 182, 212, 0)");
        ctx.fillStyle = neb2;
        ctx.fillRect(0, 0, width, height);

        const neb3X = width * 0.72 + Math.sin(time * 0.2) * 18;
        const neb3Y = height * 0.85 + Math.cos(time * 0.22) * 15;
        const neb3Radius = Math.min(width, height) * 0.30;
        const neb3 = ctx.createRadialGradient(neb3X, neb3Y, 0, neb3X, neb3Y, neb3Radius);
        neb3.addColorStop(0, "rgba(59, 130, 246, 0.06)");
        neb3.addColorStop(0.6, "rgba(30, 58, 138, 0.02)");
        neb3.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.fillStyle = neb3;
        ctx.fillRect(0, 0, width, height);
      }

      // C. DISTANT TWINKLING & DRIFTING STARS (High performance without ctx.save/restore)
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (!prefersReducedMotion) {
          star.twinklePhase += star.twinkleSpeed;
          if (isMob) {
            star.y += star.driftY;
            star.x += star.driftX;
            if (star.y > height) {
              star.y = 0;
              star.x = Math.random() * width;
            }
          }
        }
        const alpha = isMob
          ? Math.min(0.34, Math.max(0.20, star.baseAlpha * (0.82 + 0.25 * Math.sin(star.twinklePhase))))
          : Math.min(0.38, Math.max(0.20, star.baseAlpha * (0.8 + 0.2 * Math.sin(star.twinklePhase))));

        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // D. SHOOTING STARS (Desktop: every 8-18s, Mobile: rare 20-35s lightweight)
      if (!prefersReducedMotion) {
        const now = Date.now();
        if (now > nextSpawnTime && (!isMob || shootingStars.length < 1)) {
          shootingStars.push(createShootingStar());
          nextSpawnTime = now + (isMob ? (Math.random() * 15000 + 20000) : (Math.random() * 10000 + 8000));
        }

        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i];
          s.life++;
          s.x += s.vx;
          s.y += s.vy;

          const progress = s.life / s.maxLife;
          const currentAlpha = Math.sin(progress * Math.PI) * (isMob ? 0.30 : 0.44);

          if (progress >= 1 || s.x > width + 100 || s.y > height + 100) {
            shootingStars.splice(i, 1);
            continue;
          }

          const tailX = s.x - (s.vx / s.speed) * s.length;
          const tailY = s.y - (s.vy / s.speed) * s.length;

          if (isMob) {
            // Lightweight mobile render: single fast stroke without heavy gradient object
            ctx.save();
            ctx.globalAlpha = currentAlpha;
            ctx.strokeStyle = s.color;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();
            ctx.restore();
          } else {
            // Desktop high-fidelity render
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
        }
      }

      // E. DISTANT & SUBTLE PLANETS (Desktop canvas; Mobile uses lightweight SVG + GPU CSS transform)
      if (!isMob) {
        // ==========================================
        // PLANET 1: Subtle Purple Saturn-like Planet
        // ==========================================
        const p1BaseX = width * 0.10;
        const p1BaseY = height * 0.14;
        const p1X = p1BaseX + Math.sin(time * 0.2) * 6;
        const p1Y = p1BaseY + Math.cos(time * 0.18) * 4;
        const p1Radius = 19;

        ctx.save();
        ctx.globalAlpha = 0.22;

        // Back Ring
        ctx.save();
        ctx.translate(p1X, p1Y);
        ctx.rotate(-0.4);
        ctx.scale(1, 0.32);
        ctx.beginPath();
        ctx.arc(0, 0, p1Radius * 1.9, Math.PI, Math.PI * 2);
        ctx.strokeStyle = "rgba(192, 132, 252, 0.18)";
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.restore();

        // Outer Atmospheric Glow
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

        // Front Ring
        ctx.save();
        ctx.translate(p1X, p1Y);
        ctx.rotate(-0.4);
        ctx.scale(1, 0.32);
        ctx.beginPath();
        ctx.arc(0, 0, p1Radius * 1.9, 0, Math.PI);
        ctx.strokeStyle = "rgba(216, 180, 254, 0.25)";
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.restore();

        ctx.restore(); // Restore Planet 1 globalAlpha

        // ==========================================
        // PLANET 2: Subtle Warm Orange Planet (Mid-Right)
        // ==========================================
        const p2BaseX = width * 0.86;
        const p2BaseY = height * 0.30;
        const p2X = p2BaseX + Math.cos(time * 0.2) * 5;
        const p2Y = p2BaseY + Math.sin(time * 0.22) * 5;
        const p2Radius = 14;

        ctx.save();
        ctx.globalAlpha = 0.20;

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
        ctx.restore();

        // ==========================================
        // PLANET 3: Very Subtle Orbiting Moon
        // ==========================================
        const moonOrbitRadiusX = 34;
        const moonOrbitRadiusY = 16;
        const moonAngle = time * 0.6;
        const moonX = p2X + Math.cos(moonAngle) * moonOrbitRadiusX;
        const moonY = p2Y + Math.sin(moonAngle) * moonOrbitRadiusY;
        const moonRadius = 3;

        ctx.save();
        ctx.globalAlpha = 0.16;
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
        // PLANET 4: Subtle Icy Blue Planet (Lower-Right)
        // ==========================================
        const p4BaseX = width * 0.80;
        const p4BaseY = height * 0.80;
        const p4X = p4BaseX + Math.sin(time * 0.18) * 5;
        const p4Y = p4BaseY + Math.cos(time * 0.2) * 4;
        const p4Radius = 13;

        ctx.save();
        ctx.globalAlpha = 0.20;

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

        ctx.strokeStyle = "rgba(186, 230, 253, 0.14)";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.ellipse(p4X, p4Y, p4Radius * 1.4, p4Radius * 0.55, 0.35, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    const handleResize = () => {
      setSize();
      stars.forEach((star) => {
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      });
    };

    // Pause canvas animation when tab is hidden to save battery & CPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        cancelAnimationFrame(animationFrameId);
        lastRenderTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Mobile Lightweight Nebula Layer (Pure GPU CSS gradient, 0 canvas allocations, opacity 0.08) */}
      {isMobile && (
        <div
          className="absolute inset-0 pointer-events-none animate-nebula-breathe"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 80% 18%, rgba(139, 92, 246, 0.55), transparent 70%), radial-gradient(ellipse 60% 40% at 20% 75%, rgba(6, 182, 212, 0.45), transparent 70%)",
          }}
        />
      )}

      {/* Mobile Subtle Distant Planet Layer (Single Saturn-like planet with pure GPU CSS drift, opacity 0.16) */}
      {isMobile && (
        <div
          className="absolute top-[8%] left-[7%] w-11 h-11 pointer-events-none animate-cosmic-drift"
          style={{ opacity: 0.16 }}
        >
          <svg viewBox="0 0 60 60" className="w-full h-full">
            <defs>
              <radialGradient id="mobileSaturnGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#c4b5fd" />
                <stop offset="45%" stopColor="#7c3aed" />
                <stop offset="90%" stopColor="#3b0764" />
              </radialGradient>
            </defs>
            {/* Back Ring */}
            <ellipse
              cx="30"
              cy="30"
              rx="23"
              ry="7"
              transform="rotate(-22 30 30)"
              fill="none"
              stroke="rgba(192, 132, 252, 0.35)"
              strokeWidth="1.8"
            />
            {/* Planet Sphere */}
            <circle cx="30" cy="30" r="10.5" fill="url(#mobileSaturnGrad)" />
            {/* Front Ring */}
            <path
              d="M 9,30 A 23,7 0 0,0 51,30"
              transform="rotate(-22 30 30)"
              fill="none"
              stroke="rgba(216, 180, 254, 0.5)"
              strokeWidth="1.8"
            />
          </svg>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />
    </div>
  );
}
