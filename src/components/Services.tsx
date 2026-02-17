"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "AI Video Ads",
        description: "High-converting, AI-generated video creatives that stop the scroll.",
        icon: "🤖",
    },
    {
        title: "Video Editing",
        description: "Cinematic storytelling for Reels, YouTube, and brand documentaries.",
        icon: "🎬",
    },
    {
        title: "Web Development",
        description: "Lightning-fast, SEO-optimized portfolios and landing pages.",
        icon: "💻",
    },
];

export default function Services() {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from(".service-card", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 75%",
            },
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
        });
    }, { scope: container });

    return (
        <section ref={container} id="services" className="min-h-screen bg-black text-white py-24 px-6 md:px-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-16 text-center">
                What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Do</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="service-card group p-10 border border-white/10 rounded-2xl bg-gradient-to-b from-white/5 to-transparent hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2"
                    >
                        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                            {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold uppercase mb-4">{service.title}</h3>
                        <p className="text-gray-400 leading-relaxed font-light">{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
