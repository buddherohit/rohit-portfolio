import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GooeyCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfigFast = { stiffness: 300, damping: 30, mass: 1 };
    const springConfigMid = { stiffness: 200, damping: 35, mass: 1.5 };
    const springConfigSlow = { stiffness: 150, damping: 40, mass: 2 };

    const x1 = useSpring(mouseX, springConfigFast);
    const y1 = useSpring(mouseY, springConfigFast);
    
    const x2 = useSpring(mouseX, springConfigMid);
    const y2 = useSpring(mouseY, springConfigMid);
    
    const x3 = useSpring(mouseX, springConfigSlow);
    const y3 = useSpring(mouseY, springConfigSlow);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden gooey-cursor-container">
            {/* SVG Filter for Gooey Effect */}
            <svg className="absolute w-0 h-0">
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="20" />
                    <feColorMatrix
                        in="blur"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -8"
                    />
                </filter>
            </svg>

            <div
                className="w-full h-full opacity-80"
                style={{ filter: "url(#goo)", willChange: "transform" }}
            >
               
                <motion.div
                    className="absolute w-52 h-52 bg-amber-400 -translate-x-1/2 -translate-y-1/2"
                    style={{ x: x3, y: y3, willChange: "transform" }}
                    animate={{
                        rotate: [0, 360],
                        borderRadius: [
                            "50% 50% 50% 50%",
                            "40% 60% 60% 40%",
                            "60% 40% 40% 60%",
                            "50% 50% 50% 50%"
                        ]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                
                
                <motion.div
                    className="absolute w-60 h-60 bg-amber-400 -translate-x-1/2 -translate-y-1/2"
                    style={{ x: x2, y: y2, willChange: "transform" }}
                    animate={{
                        rotate: [360, 0],
                        borderRadius: [
                            "50% 50% 50% 50%",
                            "45% 55% 55% 45%",
                            "55% 45% 45% 55%",
                            "50% 50% 50% 50%"
                        ]
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                

                <motion.div
                    className="absolute w-72 h-72 bg-amber-400 -translate-x-1/2 -translate-y-1/2"
                    style={{ x: x1, y: y1, willChange: "transform" }}
                    animate={{
                        rotate: [0, 360],
                        borderRadius: [
                            "50% 50% 50% 50%",
                            "48% 52% 52% 48%",
                            "52% 48% 48% 52%",
                            "50% 50% 50% 50%"
                        ]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </div>
    );
}
