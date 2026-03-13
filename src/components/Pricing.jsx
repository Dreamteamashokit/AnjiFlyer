// Pricing.jsx — All price cards in a grid
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Pricing.css'

// Each card's data
const PRICING_CARDS = [
  {
    icon: '🪟',
    title: 'Window Cleaning',
    featured: false,
    rows: [
      { label: 'Maximum Price',      amount: '$30' },
      { label: 'Negotiable?',        amount: '✅ Yes!' },
      { label: 'Whole House',        amount: 'Up to $30' },
      { label: 'Selected Windows',   amount: 'Less than $30' },
    ],
  },
  {
    icon: '🗑️',
    title: 'Garbage Can',
    featured: true, // highlighted card
    rows: [
      { label: 'Per Can',        amount: '$10' },
      { label: 'Multiple Cans', amount: 'Ask Us!' },
    ],
    badge: '💰 Best Value!',
  },
  {
    icon: '🚗',
    title: 'Car Washing',
    featured: false,
    groups: [
      {
        heading: 'Small Cars (Sedan, Coupe, Hatchback)',
        rows: [
          { label: 'Exterior', amount: '$30' },
          { label: 'Interior', amount: '$15' },
        ],
      },
      {
        heading: 'Larger Cars (SUV, Truck, Van, Minivan)',
        rows: [
          { label: 'Exterior', amount: '$40' },
          { label: 'Interior', amount: '$25' },
        ],
      },
      {
        heading: 'Motorcycles / ATVs',
        rows: [
          { label: 'Full Wash', amount: '$25' },
        ],
      },
    ],
  },
]

export default function Pricing() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="pricing" className="pricing">
      <div className="container">

        {/* Section heading */}
        <div ref={headRef} className={`fade-in ${headVisible ? 'visible' : ''}`}>
          <span className="section-label">Pricing</span>
          <h2 className="section-title">Simple, Fair Prices</h2>
          <div className="title-underline" />
          <p className="section-desc">
            We keep prices fair for neighbors. Prices can be negotiated depending
            on the size and difficulty of the job!
          </p>
        </div>

        {/* Pricing cards */}
        <div className="pricing-grid">
          {PRICING_CARDS.map((card, i) => (
            <PricingCard key={card.title} {...card} delay={i * 120} />
          ))}
        </div>

        {/* Bottom note */}
        <PricingNote />

      </div>
    </section>
  )
}

// Single pricing card
function PricingCard({ icon, title, featured, rows, groups, badge, delay }) {
  const [ref, visible] = useScrollReveal(0.15, delay)

  return (
    <div
      ref={ref}
      className={`pricing-card ${featured ? 'pricing-card--featured' : ''} fade-in ${visible ? 'visible' : ''}`}
    >
      <h3 className="pricing-card__title">{icon} {title}</h3>

      {/* Simple row list */}
      {rows && rows.map(({ label, amount }) => (
        <div key={label} className="price-row">
          <span className="price-row__label">{label}</span>
          <span className="price-row__amount">{amount}</span>
        </div>
      ))}

      {/* Grouped row list (for cars) */}
      {groups && groups.map(({ heading, rows: groupRows }) => (
        <div key={heading}>
          <p className="price-group-heading">{heading}</p>
          {groupRows.map(({ label, amount }) => (
            <div key={label} className="price-row">
              <span className="price-row__label">{label}</span>
              <span className="price-row__amount">{amount}</span>
            </div>
          ))}
        </div>
      ))}

      {/* Optional badge */}
      {badge && <div className="pricing-badge">{badge}</div>}
    </div>
  )
}

// Yellow note at the bottom
function PricingNote() {
  const [ref, visible] = useScrollReveal()
  return (
    <div ref={ref} className={`pricing-note fade-in ${visible ? 'visible' : ''}`}>
      📝 <strong>Please Note:</strong> Window cleaning and car washing prices may vary
      depending on the size and condition of the job. We're always happy to talk and
      find a price that works for you!
    </div>
  )
}
