// Contact.jsx — Contact info
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Contact.css'

export default function Contact() {
  const [leftRef,  leftVisible]  = useScrollReveal()

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-grid">

          {/* Left: contact info */}
          <div ref={leftRef} className={`fade-in ${leftVisible ? 'visible' : ''}`}>
            <span className="section-label contact-label">Get In Touch</span>
            <h2 className="section-title contact-title">Contact Us</h2>
            <div className="title-underline contact-underline" />

            <p className="contact-intro">
              Ready for a cleaner home, car, or garbage can? Give us a call,
              send an email, or fill out the form — we'll get back to you fast!
            </p>

            <ContactInfoItem icon="📞" label="Call or Text Us">
              <a href="tel:7044538444" className="contact-link">704-453-8444</a>
              <br></br>
              <a href="tel:9804179514" className="contact-link">980-417-9514</a>
            </ContactInfoItem>

            <ContactInfoItem icon="📧" label="Email Us">
              <a href="mailto:anji02162012@gmail.com" className="contact-link">
                anji02162012@gmail.com
              </a>
            </ContactInfoItem>

            <ContactInfoItem icon="📍" label="Our Area">
              <span>Holcomb Woods Neighborhood</span>
            </ContactInfoItem>

            <a href="tel:7044538444" className="btn btn--primary btn--large" style={{ marginTop: 8 }}>
              📞 Call to Request Service
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

// Reusable contact info row
function ContactInfoItem({ icon, label, children }) {
  return (
    <div className="contact-info-item">
      <div className="contact-icon-wrap">{icon}</div>
      <div>
        <h4 className="contact-info-label">{label}</h4>
        <p className="contact-info-value">{children}</p>
      </div>
    </div>
  )
}
