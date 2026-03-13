// Hero.jsx — Big full-screen banner section at the top
import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero">

      {/* Decorative floating bubbles in the background */}
      <div className="hero-bubble hero-bubble--1" />
      <div className="hero-bubble hero-bubble--2" />
      <div className="hero-bubble hero-bubble--3" />

      <div className="hero-content">
        {/* Small badge above the title */}
        <span className="hero-badge">🏘️ Holcomb Woods Neighborhood</span>

        {/* Main big title */}
        <h1 className="hero-title">
          Holcomb Wood's<br />
          <span className="hero-title--accent">Neighborhood Shine</span>
        </h1>

        {/* Short tagline */}
        <p className="hero-subtitle">
          Local kids helping keep the neighborhood clean and shiny ✨
        </p>

        {/* Who runs the business */}
        <p className="hero-by">
          By: <strong>Anjaney Pandey</strong> &amp; <strong>Ruthvik Erni</strong>
        </p>

        {/* Action buttons */}
        <div className="hero-buttons">
          <a href="#contact" className="btn btn--primary">🙌 Request Service</a>
          <a href="#services" className="btn btn--outline">See What We Do</a>
        </div>

        {/* Photo placeholder — replace the emoji with a real <img> later! */}
        <div className="hero-image-box">
          <span className="hero-image-box__icon">🪣 🚗 🪟</span>
          <p>Photo coming soon — neighborhood kids in action!</p>
        </div>
      </div>
    </section>
  )
}
