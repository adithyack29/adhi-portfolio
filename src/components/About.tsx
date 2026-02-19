"use client";
import React from "react";
import DisplayCards from "@/components/ui/display-cards";
import { Video, Globe, FileVideo, Code2, Clapperboard } from "lucide-react";

const skillsCards = [
    {
        icon: <Video className="size-4 text-blue-300" />,
        title: "AI Video Ads",
        description: "High-converting UGC & AI commercials",
        date: "",
        iconClassName: "text-blue-500",
        titleClassName: "text-blue-500",
        className: "[grid-area:stack] hover:-translate-y-24 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
        icon: <Code2 className="size-4 text-green-300" />,
        title: "Web Development",
        description: "Modern, high-performance websites",
        date: "",
        iconClassName: "text-green-500",
        titleClassName: "text-green-500",
        className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
        icon: <Clapperboard className="size-4 text-purple-300" />,
        title: "Video Editing",
        description: "Engaging short-form storytelling",
        date: "",
        iconClassName: "text-purple-500",
        titleClassName: "text-purple-500",
        descriptionClassName: "text-base",
        className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    },
];


export default function About() {
    return (
        <section id="about" className="min-h-screen bg-[#050505] text-white py-24 px-6 md:px-20 flex flex-col md:flex-row gap-16 items-center justify-center overflow-hidden">

            {/* Left: Intro */}
            <div className="md:w-1/2 z-10">
                <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-8">
                    I help brands and creators grow using <strong className="text-white">AI-powered video ads</strong> and <strong className="text-white">high-performance websites</strong>.
                    It's not just about making things look good—it's about making them work.
                </p>
                {/* <div className="hidden md:block">
                     <p className="text-sm text-gray-500 uppercase tracking-widest">Hover the cards →</p>
                </div> */}
            </div>

            {/* Right: Display Cards */}
            <div className="md:w-1/2 w-full flex items-center justify-center">
                <DisplayCards cards={skillsCards} />
            </div>

        </section>
    );
}
