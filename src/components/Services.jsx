// Services.jsx — Shows each service as a hoverable card
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Services.css'

// Data for the three service cards
const SERVICES = [
  {
    icon:  '🪟',
    title: 'Window Cleaning',
    desc:  "We'll scrub and shine your windows until they sparkle! Choose whole-house cleaning or just selected windows.",
    tag:   '⭐ Most Popular',
    color: 'teal',
  },
  {
    icon:  '🚗',
    title: 'Car Washing & Detailing',
    desc:  'Full wash and detail — inside and out! We handle sedans, SUVs, trucks, vans, and even motorcycles.',
    tag:   '🔥 Fan Favorite',
    color: 'blue',
  },
  {
    icon:  '🗑️',
    title: 'Garbage Can Cleaning',
    desc:  "Smelly garbage cans? No problem! We'll clean them out and leave them fresh and sanitized.",
    tag:   '💚 Great Deal',
    color: 'green',
  },
]

export default function Services() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="services" className="services">
      <div className="container">

        {/* Section heading */}
        <div ref={headRef} className={`services-head fade-in ${headVisible ? 'visible' : ''}`}>
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Our Services</h2>
          <div className="title-underline" style={{ margin: '16px auto 24px' }} />
          <p className="section-desc" style={{ margin: '0 auto' }}>
            We keep it simple and do it well. Here's everything we can help you with!
          </p>
        </div>

        {/* Three service cards */}
        <div className="services-grid">
          {SERVICES.map(({ icon, title, desc, tag, color }, i) => (
            <ServiceCard key={title} icon={icon} title={title} desc={desc} tag={tag} color={color} delay={i * 120} />
          ))}
        </div>

      </div>
    </section>
  )
}

// Individual service card component
function ServiceCard({ icon, title, desc, tag, color, delay }) {
  const [ref, visible] = useScrollReveal(0.15, delay)

  return (
    <div ref={ref} className={`service-card service-card--${color} fade-in ${visible ? 'visible' : ''}`}>
      <span className="service-card__icon">{icon}</span>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{desc}</p>
      <span className="service-tag">{tag}</span>
    </div>
  )
}
