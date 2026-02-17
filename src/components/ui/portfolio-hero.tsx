"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

// Inline Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className = "", children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

// BlurText animation component
interface BlurTextProps {
    text: string;
    delay?: number;
    animateBy?: "words" | "letters";
    direction?: "top" | "bottom";
    className?: string;
    style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
    text,
    delay = 50,
    animateBy = "words",
    direction = "top",
    className = "",
    style,
}) => {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const segments = useMemo(() => {
        return animateBy === "words" ? text.split(" ") : text.split("");
    }, [text, animateBy]);

    return (
        <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
            {segments.map((segment, i) => (
                <span
                    key={i}
                    style={{
                        display: "inline-block",
                        filter: inView ? "blur(0px)" : "blur(10px)",
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
                        transition: `all 0.5s ease-out ${i * delay}ms`,
                    }}
                >
                    {segment}
                    {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
                </span>
            ))}
        </p>
    );
};

export default function PortfolioHero() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Force dark mode on mount
    useEffect(() => {
        document.documentElement.classList.add("dark");
    }, []);

    // Active Section Observer
    useEffect(() => {
        const sections = document.querySelectorAll("section[id], div[id='home']");

        const observerOptions = {
            root: null,
            rootMargin: "-50% 0px -50% 0px", // Trigger when element crosses the center of the viewport
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const menuItems = [
        { label: "HOME", href: "#" },
        { label: "ABOUT", href: "#about" },
        { label: "PROJECTS", href: "#work" },
        { label: "CONTACT", href: "#contact" },
    ];

    return (
        <div
            id="home"
            className="min-h-screen text-foreground transition-colors relative"
            style={{
                backgroundColor: "hsl(0 0% 0%)",
                color: "hsl(0 0% 100%)",
            }}
        >
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300">
                <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
                    {/* Menu Button - Custom Aesthetic */}
                    <div className="relative">
                        <button
                            ref={buttonRef}
                            type="button"
                            className="group p-2 transition-colors duration-300 z-50 text-neutral-500 hover:text-white"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <X className="w-8 h-8 transition-colors duration-300" strokeWidth={1.5} />
                            ) : (
                                <div className="flex flex-col gap-1.5 items-start">
                                    <div className="w-8 h-0.5 bg-current transition-all duration-300 group-hover:w-10"></div>
                                    <div className="w-5 h-0.5 bg-current transition-all duration-300 group-hover:w-8"></div>
                                    <div className="w-8 h-0.5 bg-current transition-all duration-300 group-hover:w-6"></div>
                                </div>
                            )}
                        </button>

                        {isMenuOpen && (
                            <div
                                ref={menuRef}
                                className="absolute top-full left-0 w-[200px] md:w-[240px] border-none shadow-2xl mt-2 ml-4 p-4 rounded-lg z-[100]"
                                style={{
                                    backgroundColor: "hsl(0 0% 5%)",
                                    border: "1px solid rgba(255,255,255,0.1)"
                                }}
                            >
                                {menuItems.map((item) => {
                                    const isActive =
                                        item.href === "#"
                                            ? activeSection === "home"
                                            : activeSection === item.href.substring(1);

                                    return (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            className="block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-300 hover:text-white"
                                            style={{
                                                color: isActive ? "#C3E41D" : "hsl(0 0% 60%)",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = "#C3E41D";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = isActive ? "#C3E41D" : "hsl(0 0% 60%)";
                                            }}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Signature */}
                    <div className="text-4xl select-none pointer-events-none" style={{ color: "hsl(0 0% 100%)", fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>
                        A
                    </div>

                    {/* Placeholder for balance (Empty div where toggle used to be) */}
                    <div className="w-8"></div>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="relative min-h-screen flex flex-col overflow-hidden">
                {/* Centered Main Name - Always Perfectly Centered */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
                    <div className="relative flex items-baseline justify-center tracking-tighter">
                        <BlurText
                            text="Ad"
                            delay={100}
                            animateBy="letters"
                            direction="top"
                            className="font-bold text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px] leading-[0.8]"
                            style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
                        />

                        {/* Custom 'i' Manually Constructed */}
                        {/* Wrapper MUST have the exact font classes so em/ex units scale correctly */}
                        <div
                            className="relative inline-flex flex-col items-center mx-[-0.04em] font-bold text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px] leading-[0.8]"
                            style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
                        >
                            {/* Ghost 'i' creates the bounding box and baseline */}
                            <span className="opacity-0 pointer-events-none select-none">
                                i
                            </span>

                            {/* Manual Parts - Positioned Absolute over the ghost */}
                            <div className="absolute inset-0 flex flex-col items-center justify-end z-10 w-full h-full pb-0">
                                {/* Photo Container (Dot) */}
                                <div
                                    className="relative rounded-full overflow-hidden border-[3px] border-[#C3E41D]/20 bg-neutral-800 flex items-center justify-center text-[#C3E41D] font-bold"
                                    style={{
                                        width: "0.26em",
                                        height: "0.26em",
                                        marginBottom: "0.08em",
                                        transform: "translateY(5%)"
                                    }}
                                >
                                    {/* Replace this src with your actual photo URL */}
                                    <img
                                        src="/spiderman.png"
                                        alt="Profile"
                                        className="w-full h-full object-cover transform scale-[1.8]"
                                        style={{ objectPosition: "top center" }}
                                    />
                                </div>

                                {/* Stem - Uses 1ex to match x-height perfectly */}
                                <div
                                    className="bg-[#C3E41D] rounded-[1px] transform -translate-y-[-0.01em]"
                                    style={{
                                        width: "0.15em",
                                        height: "0.55em",
                                    }}
                                />
                            </div>
                        </div>

                        <BlurText
                            text="thya"
                            delay={300}
                            animateBy="letters"
                            direction="top"
                            className="font-bold text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px] leading-[0.8]"
                            style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
                        />
                    </div>
                </div>

                {/* Tagline - Proper Distance Below Hero */}
                <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-32 xl:bottom-36 left-1/2 -translate-x-1/2 w-full px-6">
                    <div className="flex justify-center">
                        <BlurText
                            text="Designing human experiences"
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white"
                            style={{ fontFamily: "'Antic', sans-serif" }}
                        />
                    </div>
                </div>

                {/* Scroll Indicator */}
                <button
                    type="button"
                    className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300 animate-bounce"
                    aria-label="Scroll down"
                >
                    <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-300" />
                </button>
            </main>
        </div>
    );
}
