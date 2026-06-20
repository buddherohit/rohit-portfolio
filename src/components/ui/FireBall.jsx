import { useEffect, useRef } from "react";

export function FireBall({
  // Visual defaults
  background = "transparent",
  particleColor = "#ffffff",
  particleOpacity = 0.85,
  particleRadiusRange = [1, 3],
  // Behavior
  maxParticles = 120,
  particlesPerBurst = 6,
  maxBurstsPerSecond = 12,
  particleLifeRange = [200, 400],
  speedRange = [0.3, 1.2],
  drift = 0.08,
  gravity = 0.02,
  decay = 0.92,
  // Cursor
  particleColors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"],
  cursorSize = 16,
  cursorOutlineWidth = 2,
  cursorOutlineColor = "rgba(59, 130, 246, 0.8)",
  cursorShadowBlur = 6,
  cursorShadowColor = "rgba(0,0,0,0.15)",
  fullScreen = true,
  className,
  style,
}) {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const frameRef = useRef(null);
  const particlesRef = useRef([]);
  const posRef = useRef({ x: -100, y: -100 });
  const prevPosRef = useRef({ x: -100, y: -100 });
  const sizeRef = useRef({ width: 0, height: 0 });
  const isVisibleRef = useRef(true);
  const lastBurstTimeRef = useRef(0);
  const isMovingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // Don't initialize if user prefers reduced motion
    }

    // Helpers
    const randFloat = (min, max) => Math.random() * (max - min) + min;
    const randInt = (min, max) => Math.round(Math.random() * (max - min) + min);

    const createParticle = () => {
      const [minR, maxR] = particleRadiusRange;
      const [minLife, maxLife] = particleLifeRange;
      const [minSpeed, maxSpeed] = speedRange;
      
      // Calculate direction from previous to current position (opposite direction for trail)
      const dx = prevPosRef.current.x - posRef.current.x;
      const dy = prevPosRef.current.y - posRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Add some randomness to the angle
      const baseAngle = distance > 0 ? Math.atan2(dy, dx) : Math.random() * Math.PI * 2;
      const angleSpread = Math.PI / 4; // 45 degree spread - tighter cone
      const angle = baseAngle + randFloat(-angleSpread, angleSpread);
      const speed = randFloat(minSpeed, maxSpeed);
      
      return {
        x: posRef.current.x, // Spawn exactly at cursor
        y: posRef.current.y,
        r: randFloat(minR, maxR),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: randInt(minLife, maxLife),
        maxLife: randInt(minLife, maxLife),
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        active: true,
      };
    };

    // Resize canvas for DPR and container size
    const resizeCanvas = () => {
      if (!canvas) return;

      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const parent = canvas.parentElement;
      const rect = fullScreen
        ? { width: window.innerWidth, height: window.innerHeight }
        : parent
        ? parent.getBoundingClientRect()
        : { width: 800, height: 600 };

      sizeRef.current = { width: rect.width, height: rect.height };
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    // Initialize sizes
    resizeCanvas();

    // Start positions off-screen
    posRef.current = { x: -100, y: -100 };

    // Initialize empty particle pool
    particlesRef.current = [];

    // Function to check if mouse is in hero section
    function checkHeroVisibility(clientX, clientY) {
      const heroSection = document.querySelector('section#hero') || document.getElementById('hero');
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        isVisibleRef.current = !(
          clientY >= heroRect.top &&
          clientY <= heroRect.bottom &&
          clientX >= heroRect.left &&
          clientX <= heroRect.right
        );
      }
    }

    function emitBurst() {
      if (!isMovingRef.current) return; // Only emit when moving
      
      const now = Date.now();
      const minInterval = 1000 / maxBurstsPerSecond;
      
      if (now - lastBurstTimeRef.current < minInterval) return;
      if (particlesRef.current.length >= maxParticles) return;
      
      lastBurstTimeRef.current = now;
      
      for (let i = 0; i < particlesPerBurst; i++) {
        if (particlesRef.current.length < maxParticles) {
          particlesRef.current.push(createParticle());
        }
      }
    }

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      const x = fullScreen ? e.clientX : e.clientX - rect.left;
      const y = fullScreen ? e.clientY : e.clientY - rect.top;
      
      // Store previous position before updating
      prevPosRef.current.x = posRef.current.x;
      prevPosRef.current.y = posRef.current.y;
      
      posRef.current.x = x;
      posRef.current.y = y;

      // Update custom cursor position
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      // Check if mouse is over hero section
      checkHeroVisibility(e.clientX, e.clientY);
      
      if (isVisibleRef.current) {
        // Calculate movement distance
        const dx = posRef.current.x - prevPosRef.current.x;
        const dy = posRef.current.y - prevPosRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Set moving flag only if there's actual movement
        isMovingRef.current = distance > 1;
        
        // Emit particles only during movement
        if (isMovingRef.current) {
          emitBurst();
          // Emit extra burst for fast movement
          if (distance > 10) {
            emitBurst();
          }
        }
      }
    }

    function onResize() {
      resizeCanvas();
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);

    const render = () => {
      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      ctx.save();
      const arr = particlesRef.current;
      
      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        
        if (!p.active) {
          arr.splice(i, 1);
          continue;
        }

        // Update particle physics
        p.vx += randFloat(-drift, drift);
        p.vy += gravity;
        p.vx *= decay;
        p.vy *= decay;
        
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        if (p.life <= 0) {
          p.active = false;
          continue;
        }

        // Calculate opacity based on life (exponential fade for quicker disappearance)
        const lifeAlpha = Math.pow(p.life / p.maxLife, 2);
        const alpha = lifeAlpha * particleOpacity;

        // Draw particle with individual color
        ctx.beginPath();
        const color = p.color || particleColor;
        if (color.startsWith('#')) {
          // Convert hex to rgba
          const r = parseInt(color.slice(1, 3), 16);
          const g = parseInt(color.slice(3, 5), 16);
          const b = parseInt(color.slice(5, 7), 16);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        }
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
    };
  }, [
    maxParticles,
    particlesPerBurst,
    maxBurstsPerSecond,
    particleLifeRange,
    particleRadiusRange,
    speedRange,
    drift,
    gravity,
    decay,
    particleColor,
    particleColors,
    particleOpacity,
    fullScreen,
  ]);

  return (
    <>
      <div
        className={className}
        style={{
          position: fullScreen ? "fixed" : "relative",
          inset: fullScreen ? 0 : undefined,
          width: fullScreen ? "100vw" : "100%",
          height: fullScreen ? "100vh" : "100%",
          overflow: "hidden",
          background,
          cursor: "none",
          ...style,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
      </div>
      
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: "fixed",
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          borderRadius: "50%",
          border: `${cursorOutlineWidth}px solid ${cursorOutlineColor}`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 10000,
          boxShadow: `0 0 ${cursorShadowBlur}px ${cursorShadowColor}`,
          transition: "opacity 0.2s ease",
        }}
        aria-hidden="true"
      />
    </>
  );
}
