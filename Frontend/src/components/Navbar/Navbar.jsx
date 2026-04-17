import { useEffect, useState } from "react";
import styles from './Navbar.module.css';
import cartIcon from '../../assets/icons/cart.png';
import accountIcon from '../../assets/icons/account.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`container-fluid ${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      
      {/* LOGO */}
      <a className={`fs-3 mx-4 ${styles.logo}`} href="#">
        Porsche
      </a>

      {/* LINKS */}
      <div className="d-flex justify-content-center align-items-center">
        <a className={`mx-4 ${styles.link}`} href="#">Home</a>
        <a className={`mx-4 ${styles.link}`} href="#">Shop</a>
        <a className={`mx-4 ${styles.link}`} href="#">About</a>
      </div>

      {/* ICONS */}
      <div className="d-flex align-items-center">
        <a href="#" className={styles.iconBox}>
          <img src={cartIcon} alt="cart" />
          <span>0</span>
        </a>

        <a href="#" className={`${styles.iconBox} mx-3`}>
          <img src={accountIcon} alt="account" />
        </a>
      </div>

    </nav>
  );
}