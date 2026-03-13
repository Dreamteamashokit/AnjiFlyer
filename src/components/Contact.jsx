// Contact.jsx — Contact info + service request form (with real email via Formspree)
import { useForm, ValidationError } from '@formspree/react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Contact.css'

// ─────────────────────────────────────────────────────────────
// HOW TO ACTIVATE REAL EMAIL DELIVERY (takes 2 minutes, free):
//
//  1. Go to https://formspree.io  and sign up with Gmail
//  2. Click "New Form" → name it "Neighborhood Shine"
//  3. Copy the 8-character form ID (looks like: xpwzgkna)
//  4. Paste it below replacing YOUR_FORM_ID
//  5. Save — every submission now emails anjio2162012@gmail.com
// ─────────────────────────────────────────────────────────────
const FORMSPREE_ID = 'YOUR_FORM_ID'   // ← replace this

// Service dropdown options
const SERVICE_OPTIONS = [
  { value: '',         label: 'Choose a service...',             disabled: true },
  { value: 'window',   label: '🪟 Window Cleaning' },
  { value: 'car-ext',  label: '🚗 Car Wash — Exterior Only' },
  { value: 'car-int',  label: '🚗 Car Wash — Interior Only' },
  { value: 'car-both', label: '🚗 Car Wash — Interior & Exterior' },
  { value: 'garbage',  label: '🗑️ Garbage Can Cleaning' },
  { value: 'multiple', label: '📋 Multiple Services' },
]

export default function Contact() {
  // useForm from Formspree handles submission + tracks state
  const [state, handleSubmit] = useForm(FORMSPREE_ID)

  const [leftRef,  leftVisible]  = useScrollReveal()
  const [rightRef, rightVisible] = useScrollReveal(0.15, 150)

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
              <a href="mailto:anjio2162012@gmail.com" className="contact-link">
                anjio2162012@gmail.com
              </a>
            </ContactInfoItem>

            <ContactInfoItem icon="📍" label="Our Area">
              <span>Holcomb Woods Neighborhood</span>
            </ContactInfoItem>

            <a href="tel:7044538444" className="btn btn--primary btn--large" style={{ marginTop: 8 }}>
              📞 Call to Request Service
            </a>
          </div>

          {/* Right: request form */}
          <div ref={rightRef} className={`fade-in ${rightVisible ? 'visible' : ''}`}>
            <div className="contact-form-box">

              {/* Show thank-you after successful submission */}
              {state.succeeded ? (
                <div className="form-success">
                  <div className="form-success__icon">🎉</div>
                  <h3>Request Sent!</h3>
                  <p>
                    Thanks! We'll reach out soon to confirm your service.
                    You can also call us at <strong>704-453-8444</strong>.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="form-title">📋 Request a Service</h3>

                  {/* Show a notice if Formspree ID hasn't been set yet */}
                  {FORMSPREE_ID === 'YOUR_FORM_ID' && (
                    <div className="form-setup-notice">
                      ⚠️ To enable real email delivery, replace <code>YOUR_FORM_ID</code> in
                      Contact.jsx with your Formspree form ID (free at formspree.io).
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>

                    <FormGroup label="Your Name" htmlFor="name">
                      <input
                        type="text" id="name" name="name"
                        placeholder="e.g. John Smith" required
                      />
                      <ValidationError field="name" prefix="Name" errors={state.errors} className="field-error" />
                    </FormGroup>

                    <FormGroup label="Your Address" htmlFor="address">
                      <input
                        type="text" id="address" name="address"
                        placeholder="e.g. 123 Oak Lane, Holcomb Woods" required
                      />
                      <ValidationError field="address" prefix="Address" errors={state.errors} className="field-error" />
                    </FormGroup>

                    {/* Hidden email field so Formspree knows where to reply */}
                    <input type="hidden" name="_replyto" value="anjio2162012@gmail.com" />

                    <FormGroup label="Service Needed" htmlFor="service">
                      <select id="service" name="service" required defaultValue="">
                        {SERVICE_OPTIONS.map(({ value, label, disabled }) => (
                          <option key={value} value={value} disabled={disabled}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <ValidationError field="service" prefix="Service" errors={state.errors} className="field-error" />
                    </FormGroup>

                    <FormGroup label="Message / Details" htmlFor="message">
                      <textarea
                        id="message" name="message"
                        placeholder="Type of car, number of windows, best time to come, etc."
                      />
                      <ValidationError field="message" prefix="Message" errors={state.errors} className="field-error" />
                    </FormGroup>

                    <button
                      type="submit"
                      className="btn-submit"
                      disabled={state.submitting}
                    >
                      {state.submitting ? '⏳ Sending...' : '🚀 Send Request'}
                    </button>

                  </form>
                </>
              )}

            </div>
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

// Reusable form field wrapper
function FormGroup({ label, htmlFor, children }) {
  return (
    <div className="form-group">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  )
}
