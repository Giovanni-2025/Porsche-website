import { useState } from "react";
import styles from "./Home.module.css";

const categories = [
  { label: "SUV", img: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=300&q=80" },
  { label: "Sports", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&q=80" },
  { label: "Electric", img: "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=300&q=80" },
  { label: "Sedan", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&q=80" },
];

const models = [
  { name: "911", img: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=500&q=80" },
  { name: "Taycan", img: "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=500&q=80" },
  { name: "Cayenne", img: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=500&q=80" },
];

export default function Home() {
  const [activeModel, setActiveModel] = useState(0);
  const prev = () => setActiveModel((i) => (i - 1 + models.length) % models.length);
  const next = () => setActiveModel((i) => (i + 1) % models.length);

  return (
    <div className={styles.home}>
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <span className={styles.logo}>Porsche</span>
        <div className={styles.navLinks}>
          <a href="./HomePage.jsx">Home</a>
          <a href="#">Shop</a>
          <a href="#">About</a>
        </div>
        <div className={styles.navIcons}>
          <span>🛒 0</span>
          <span>👤 Account</span>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Pure Driving<br />Emotion</h1>
          <p>
            Built for performance. Driven by passion. The Porsche 911 delivers pure driving excitement.
          </p>
          <button className={styles.btnDark}>Shop now</button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={styles.categories}>
        <h2>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          {categories.map((cat) => (
            <div className={styles.categoryCard} key={cat.label}>
              <img src={cat.img} alt={cat.label} />
              <div className={styles.overlay}></div>
              <div className={styles.categoryInfo}>
                <span>{cat.label}</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODELS */}
      <section className={styles.models}>
        <h2>MODELS</h2>
        <div className={styles.carousel}>
          <button onClick={prev} className={`${styles.arrow} ${styles.left}`}>‹</button>
          <div className={styles.modelContent}>
            <p className={styles.modelName}>{models[activeModel].name}</p>
            <img src={models[activeModel].img} alt="" className={styles.modelImg} />
            <div className={styles.buttons}>
              <button className={styles.btnDark}>Explore</button>
              <button className={styles.btnOutline}>Discover</button>
            </div>
          </div>
          <button onClick={next} className={`${styles.arrow} ${styles.right}`}>›</button>
        </div>
      </section>
    </div>
  );
}