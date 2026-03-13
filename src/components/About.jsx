// About.jsx — Who we are section
import { useScrollReveal } from '../hooks/useScrollReveal'
import './About.css'

// Fun stats shown in the colored card
const STATS = [
  { number: '3',    label: 'Services Offered' },
  { number: '100%', label: 'Neighborhood Kids' },
  { number: '💛',   label: 'Community First' },
  { number: '✅',   label: 'Satisfaction Goal' },
]

export default function About() {
  const [leftRef, leftVisible]   = useScrollReveal()
  const [rightRef, rightVisible] = useScrollReveal(0.15, 150) // 150ms delay

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">

          {/* Left: text */}
          <div ref={leftRef} className={`fade-in ${leftVisible ? 'visible' : ''}`}>
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">Local Kids,<br />Real Work Ethic 💪</h2>
            <div className="title-underline" />
            <p className="section-desc">
              We are local kids in the Holcomb Woods neighborhood offering simple services
              like window cleaning, car washing, and garbage can cleaning to help neighbors
              while learning responsibility and earning money.
            </p>
            <p className="section-desc" style={{ marginTop: 14 }}>
              When you hire us, you're not just getting a clean car or sparkling windows —
              you're supporting young entrepreneurs right in your own neighborhood!
            </p>
          </div>

          {/* Right: colorful card with stats */}
          <div ref={rightRef} className={`fade-in ${rightVisible ? 'visible' : ''}`}>
            <div className="about-card">
              <h3 className="about-card__title">Why Choose Us?</h3>
              <p className="about-card__text">
                We work hard, care about our community, and always do our best to make
                you happy. Every dollar helps us learn the value of hard work!
              </p>
              <div className="about-stats">
                {STATS.map(({ number, label }) => (
                  <div key={label} className="stat-box">
                    <div className="stat-number">{number}</div>
                    <div className="stat-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
