import { useState } from "react";
import "./HomePage.css";

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

export default function HomePage() {
  const [activeModel, setActiveModel] = useState(0);

  const prev = () => setActiveModel((i) => (i - 1 + models.length) % models.length);
  const next = () => setActiveModel((i) => (i + 1) % models.length);

  return (
    <div className="home">

      {/* NAVBAR */}
      <nav className="navbar">
        <span className="logo">Porsche</span>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">About</a>
        </div>

        <div className="nav-icons">
          <span>🛒 0</span>
          <span>👤</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Pure Driving<br />Emotion</h1>
          <p>
            Built for performance. Driven by passion. The Porsche 911 delivers pure driving excitement.
          </p>
          <button className="btn-dark">Shop now</button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <h2>Shop by Category</h2>

        <div className="category-grid">
          {categories.map((cat) => (
            <div className="category-card" key={cat.label}>
              <img src={cat.img} alt={cat.label} />
              <div className="overlay"></div>
              <div className="category-info">
                <span>{cat.label}</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODELS */}
      <section className="models">
        <h2>MODELS</h2>

        <div className="carousel">
          <button onClick={prev} className="arrow left">‹</button>

          <div className="model-content">
            <p className="model-name">{models[activeModel].name}</p>
            <img src={models[activeModel].img} alt="" className="model-img" />

            <div className="buttons">
              <button className="btn-dark">Explore</button>
              <button className="btn-outline">Discover</button>
            </div>
          </div>

          <button onClick={next} className="arrow right">›</button>
        </div>
      </section>

    </div>
  );
}