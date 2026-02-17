'use client';

import React from 'react';
import { RadialScrollGallery } from '@/components/ui/portfolio-and-image-gallery';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const projects = [
    { id: 1, title: "Ai Ads", cat: "AI Ads", video: "/motion UI.mov" },
    { id: 2, title: "Netflix Ad", cat: "Video Editing", video: "/Netflix Ad.mov" },
    { id: 3, title: "Ai Ads", cat: "AI Ads", video: "/Netflix Ad.mov" },
    { id: 4, title: "Motion Graphics", cat: "Motion", video: "/motion UI.mov" },
    { id: 5, title: "3D Motion Edit", cat: "Motion", video: "/motion UI.mov" },
];

export default function Work() {
    const [selectedProject, setSelectedProject] = React.useState<typeof projects[0] | null>(null);

    return (
        <section id="work" className="bg-black text-white min-h-screen py-0 relative">
            <div className="py-24 flex flex-col items-center">
                <h2 className="text-4xl md:text-6xl font-black uppercase mb-16 text-center">
                    Selected <span className="text-blue-500">Work</span>
                </h2>
                <div className="text-center text-gray-500 mb-8 animate-bounce uppercase tracking-widest text-xs">
                    ↓ Scroll to Rotate
                </div>
            </div>

            <RadialScrollGallery
                className="!min-h-[800px] w-full"
                baseRadius={500}
                mobileRadius={280}
                visiblePercentage={45}
                scrollDuration={3000}
                startTrigger="top top"
            >
                {(hoveredIndex) =>
                    projects.map((project, index) => {
                        const isActive = hoveredIndex === index;
                        return (
                            <div
                                key={project.id}
                                onClick={() => setSelectedProject(project)}
                                className="group relative w-[200px] h-[280px] sm:w-[240px] sm:h-[320px] overflow-hidden rounded-xl bg-gray-900 border border-white/10 shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                            >
                                <div className="absolute inset-0 overflow-hidden">
                                    <video
                                        src={project.video}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className={`h-full w-full object-cover transition-transform duration-700 ease-out ${isActive ? 'scale-110 blur-0' : 'scale-100 blur-[1px] grayscale-[30%]'
                                            }`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-60" />
                                </div>

                                <div className="absolute inset-0 flex flex-col justify-between p-4">
                                    <div className="flex justify-between items-start">
                                        <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-black/60 backdrop-blur text-white border border-white/20">
                                            {project.cat}
                                        </Badge>
                                        <div className={`w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center transition-all duration-500 ${isActive ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}>
                                            <ArrowUpRight size={12} />
                                        </div>
                                    </div>

                                    <div className={`transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-2'}`}>
                                        <h3 className="text-xl font-bold leading-tight text-white">{project.title}</h3>
                                        <div className={`h-0.5 bg-blue-600 mt-2 transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </RadialScrollGallery>

            {/* Video Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="relative w-full max-w-7xl max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
                            onClick={() => setSelectedProject(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <video
                            src={selectedProject.video}
                            autoPlay
                            controls
                            className="w-full h-full max-h-[90vh] object-contain"
                            playsInline
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
