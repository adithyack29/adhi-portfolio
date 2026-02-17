"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // We need a utils file for clsx/tailwind-merge

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Work", href: "#work" },
        { name: "Services", href: "#services" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 flex justify-between items-center",
                scrolled
                    ? "bg-black/80 backdrop-blur-md border-b border-white/10"
                    : "bg-transparent"
            )}
        >
            <Link href="/" className="text-2xl font-bold tracking-tighter uppercase">
                Adithya<span className="text-accent">.</span>
            </Link>

            <div className="hidden md:flex gap-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-sm font-medium uppercase tracking-widest text-gray-400 hover:text-white transition-colors relative group"
                    >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                    </Link>
                ))}
            </div>

            <Link
                href="#contact"
                className="px-5 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
                Let's Talk
            </Link>
        </nav>
    );
}
