import styles from "./footer.module.css";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.socials}>
                    <a href="#" aria-label="Twitter"><FaTwitter /></a>
                    <a href="#" aria-label="Instagram"><FaInstagram /></a>
                    <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                    <a href="#" aria-label="GitHub"><FaGithub /></a>
                </div>
                <p className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Adithya CK. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
