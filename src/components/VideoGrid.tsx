"use client";
import { motion } from "framer-motion";
import styles from "./video-grid.module.css";

const projects = [
    { id: 1, title: "Cyberpunk Edit", category: "Video Editing", size: "large" },
    { id: 2, title: "AI Fashion Ad", category: "AI Video", size: "medium" },
    { id: 3, title: "React Dashboard", category: "Web Dev", size: "medium" },
    { id: 4, title: "Music Video VFX", category: "VFX", size: "tall" },
    { id: 5, title: "Corporate Promo", category: "Video Editing", size: "medium" },
    { id: 6, title: "E-commerce Site", category: "Web Dev", size: "large" },
];

export default function VideoGrid() {
    return (
        <section className={styles.section} id="work">
            <h2 className={styles.heading}>SELECTED <span className={styles.accent}>WORK</span></h2>
            <div className={styles.grid}>
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        className={`${styles.card} ${styles[project.size]}`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.content}>
                            <div className={styles.overlay}>
                                <h3>{project.title}</h3>
                                <p>{project.category}</p>
                            </div>
                            <div className={styles.placeholder} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
