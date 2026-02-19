"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import React, { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Project {
    id: number;
    title: string;
    cat: string;
    video: string;
}

interface MobileProjectGalleryProps {
    projects: Project[];
    onProjectSelect: (project: Project) => void;
}

export function MobileProjectGallery({ projects, onProjectSelect }: MobileProjectGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current || !wrapperRef.current) return;

            const cards = gsap.utils.toArray<HTMLElement>(".mobile-project-card");
            if (cards.length === 0) return;

            // Calculate total width to scroll
            // We want to scroll until the last card is fully visible + some padding
            const totalWidth = wrapperRef.current.scrollWidth - window.innerWidth + 48; // +48 for padding

            gsap.to(wrapperRef.current, {
                x: -totalWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    // Snap to each card
                    snap: 1 / (cards.length - 1),
                    end: () => "+=" + wrapperRef.current!.offsetWidth,
                },
            });
        },
        { scope: containerRef, dependencies: [projects] }
    );

    const [activeProject, setActiveProject] = useState<number | null>(null);

    return (
        <div ref={containerRef} className="h-screen w-full flex items-center overflow-hidden">
            <div
                ref={wrapperRef}
                className="flex items-center gap-8 px-8 w-max"
            >
                {projects.map((project, index) => {
                    const isActive = activeProject === project.id;
                    return (
                        <div
                            key={project.id}
                            className="mobile-project-card group relative w-[80vw] h-[60vh] overflow-hidden rounded-2xl bg-gray-900 border border-white/10 shadow-lg cursor-pointer transition-transform duration-300"
                            onClick={() => {
                                setActiveProject(project.id);
                                onProjectSelect(project);
                            }}
                        >
                            <div className="absolute inset-0 overflow-hidden">
                                <video
                                    src={project.video}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-60" />
                            </div>

                            <div className="absolute inset-0 flex flex-col justify-between p-6">
                                <div className="flex justify-between items-start">
                                    <Badge variant="secondary" className="text-xs px-3 py-1 bg-black/60 backdrop-blur text-white border border-white/20">
                                        {project.cat}
                                    </Badge>
                                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                        <ArrowUpRight size={16} />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold leading-tight text-white mb-2">{project.title}</h3>
                                    <div className="h-1 w-12 bg-blue-600 rounded-full" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
