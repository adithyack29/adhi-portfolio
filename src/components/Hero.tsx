"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const textRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Glitch Text Animation
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

        // Simple reveal for now, complex glitch logic is hefty
        tl.fromTo(
            textRef.current,
            { opacity: 0, y: 100, skewY: 10 },
            { opacity: 1, y: 0, skewY: 0, duration: 1.5, ease: "power4.out" }
        );

        gsap.to(containerRef.current, {
            backgroundPosition: "50% 100%",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black"
        >
            {/* Background Gradient/Video Placeholder */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black opacity-50" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="z-10 text-center px-4">
                <h1
                    ref={textRef}
                    className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6 mix-blend-difference"
                >
                    I Create Videos <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        That Sell.
                    </span>
                </h1>

                <p className="text-gray-400 text-sm md:text-xl uppercase tracking-[0.2em] mb-10">
                    AI-Powered Ads &bull; Cinematic Edits &bull; Modern Websites
                </p>

                <div className="flex gap-4 justify-center">
                    <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                        View Work
                    </button>
                    <button className="px-8 py-3 border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                        Contact Me
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
            </div>
        </section>
    );
}
