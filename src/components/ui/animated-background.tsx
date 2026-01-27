"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Generate random particles
    const particles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 300 + 50,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        color: i % 2 === 0 ? "bg-primary/20" : "bg-secondary/20",
    }));

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-neutral-900/50 via-background to-background" />

            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className={`absolute rounded-full blur-3xl ${particle.color}`}
                    initial={{
                        x: `${particle.x}vw`,
                        y: `${particle.y}vh`,
                        width: particle.size,
                        height: particle.size,
                        opacity: 0,
                    }}
                    animate={{
                        x: [
                            `${particle.x}vw`,
                            `${(particle.x + Math.random() * 20 - 10 + 100) % 100}vw`,
                            `${(particle.x + Math.random() * 20 - 10 + 100) % 100}vw`,
                            `${particle.x}vw`,
                        ],
                        y: [
                            `${particle.y}vh`,
                            `${(particle.y + Math.random() * 20 - 10 + 100) % 100}vh`,
                            `${(particle.y + Math.random() * 20 - 10 + 100) % 100}vh`,
                            `${particle.y}vh`,
                        ],
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: particle.delay,
                    }}
                />
            ))}

            {/* Grid Overlay */}
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"
                style={{ maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)" }}
            />
        </div>
    );
}
