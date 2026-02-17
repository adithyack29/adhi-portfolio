"use client";
import { useEffect, useState } from "react";
import styles from "./theme-toggle.module.css";
console.log("styles:", styles); // Debug
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    if (!mounted) return null;

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <button className={styles.toggle} onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
    );
}
