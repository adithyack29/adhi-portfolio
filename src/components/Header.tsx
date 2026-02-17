import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import styles from "./header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    ADITHYA<span className={styles.dot}>.</span>
                </Link>
                <nav className={styles.nav}>
                    {/* Using span for scroll-to-id links for now, or Link with scroll={false} */}
                    <Link href="#work" className={styles.link}>WORK</Link>
                    <Link href="#about" className={styles.link}>ABOUT</Link>
                    <Link href="#contact" className={styles.link}>CONTACT</Link>
                </nav>
                <ThemeToggle />
            </div>
        </header>
    );
}
