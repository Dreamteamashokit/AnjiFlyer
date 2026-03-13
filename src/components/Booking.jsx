// Booking.jsx — Weekend-only appointment calendar
import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Booking.css'

const TIME_SLOTS = [
  { id: 'slot1', label: '9:00 AM – 11:00 AM' },
  { id: 'slot2', label: '11:00 AM – 1:00 PM' },
  { id: 'slot3', label: '1:00 PM – 3:00 PM' },
  { id: 'slot4', label: '3:00 PM – 5:00 PM' },
]

const SERVICES = ['Window Cleaning', 'Car Washing', 'Garbage Can Cleaning']

const ADMIN_PASSWORD = 'shine2024'
const STORAGE_KEY = 'anjibookings'

// Build a list of upcoming Saturday + Sunday dates for `weeks` weeks
function getUpcomingWeekends(weeks = 8) {
  const dates = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Move to this week's Saturday
  const d = new Date(today)
  const daysUntilSat = (6 - d.getDay() + 7) % 7
  d.setDate(d.getDate() + daysUntilSat)

  for (let w = 0; w < weeks; w++) {
    const sat = new Date(d)
    const sun = new Date(d)
    sun.setDate(sun.getDate() + 1)

    if (sat >= today) dates.push(sat)
    if (sun >= today) dates.push(sun)

    d.setDate(d.getDate() + 7)
  }
  return dates
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })
}

function shortDate(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function shortDay(date) {
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

function dateKey(date) {
  // Use local date parts so timezone doesn't shift the day
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

function slotKey(date, slotId) {
  return `${dateKey(date)}__${slotId}`
}

function loadBookings() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }
  catch { return {} }
}

export default function Booking() {
  const [titleRef, titleVisible] = useScrollReveal()

  const [bookings, setBookings] = useState(loadBookings)
  const [selectedDate, setSelectedDate] = useState(null)

  // Booking modal state
  const [bookingTarget, setBookingTarget] = useState(null) // { date, slot }
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: SERVICES[0] })
  const [formError, setFormError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Admin state
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminInput, setAdminInput] = useState('')
  const [adminError, setAdminError] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const weekends = getUpcomingWeekends(8)

  // ── Helpers ──────────────────────────────────────────────
  const save = (updated) => {
    setBookings(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const isSlotBooked = (date, slotId) => !!bookings[slotKey(date, slotId)]

  const openBooking = (date, slot) => {
    if (isSlotBooked(date, slot.id)) return
    setBookingTarget({ date, slot })
    setForm({ name: '', phone: '', email: '', service: SERVICES[0] })
    setFormError('')
  }

  // ── Confirm booking ──────────────────────────────────────
  const confirmBooking = () => {
    if (!form.name.trim()) return setFormError('Please enter your name.')
    if (!form.phone.trim()) return setFormError('Please enter your phone number.')

    const key = slotKey(bookingTarget.date, bookingTarget.slot.id)
    const updated = {
      ...bookings,
      [key]: { ...form, bookedAt: new Date().toISOString() },
    }
    save(updated)
    setSuccessMsg(
      `Booked! See you on ${formatDate(bookingTarget.date)} · ${bookingTarget.slot.label}`
    )
    setBookingTarget(null)
  }

  // ── Admin login ──────────────────────────────────────────
  const handleAdminLogin = () => {
    if (adminInput === ADMIN_PASSWORD) {
      setIsAdmin(true)
      setShowAdminLogin(false)
      setAdminInput('')
      setAdminError('')
    } else {
      setAdminError('Incorrect password.')
    }
  }

  const cancelBooking = (key) => {
    const updated = { ...bookings }
    delete updated[key]
    save(updated)
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <section id="booking" className="booking">
      <div className="container">

        {/* Section header */}
        <div ref={titleRef} className={`booking-header fade-in ${titleVisible ? 'visible' : ''}`}>
          <span className="section-label">Weekend Only</span>
          <h2 className="section-title">Book a Slot</h2>
          <div className="title-underline" />
          <p className="section-desc">
            We're available <strong>Saturdays &amp; Sundays</strong> only.
            Pick a date, choose a time, and we'll be there!
          </p>

          {/* Admin controls */}
          <div className="admin-area">
            {isAdmin ? (
              <button className="btn-admin-exit" onClick={() => setIsAdmin(false)}>
                🔓 Admin Mode — Click to Exit
              </button>
            ) : (
              <button
                className="btn-admin-toggle"
                onClick={() => setShowAdminLogin(v => !v)}
              >
                🔑 Admin Login
              </button>
            )}

            {showAdminLogin && !isAdmin && (
              <div className="admin-login-box">
                <input
                  type="password"
                  placeholder="Admin password"
                  value={adminInput}
                  onChange={e => setAdminInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAdminLogin()}
                />
                <button onClick={handleAdminLogin}>Login</button>
                {adminError && <p className="form-error">{adminError}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Success banner */}
        {successMsg && (
          <div className="success-banner">
            ✅ {successMsg}
            <button className="success-close" onClick={() => setSuccessMsg('')}>×</button>
          </div>
        )}

        {/* Admin booking table */}
        {isAdmin && (
          <div className="admin-panel">
            <h3 className="admin-panel-title">📋 All Bookings</h3>
            {Object.keys(bookings).length === 0 ? (
              <p className="no-bookings">No bookings yet.</p>
            ) : (
              <div className="table-wrap">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time Slot</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Service</th>
                      <th>Booked At</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(bookings)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([key, b]) => {
                        const [ds, slotId] = key.split('__')
                        const [y, mo, day] = ds.split('-').map(Number)
                        const date = new Date(y, mo - 1, day)
                        const slot = TIME_SLOTS.find(s => s.id === slotId)
                        return (
                          <tr key={key}>
                            <td>{formatDate(date)}</td>
                            <td>{slot?.label}</td>
                            <td>{b.name}</td>
                            <td>{b.phone}</td>
                            <td>{b.email || '—'}</td>
                            <td>{b.service}</td>
                            <td>{new Date(b.bookedAt).toLocaleString()}</td>
                            <td>
                              <button
                                className="btn-cancel"
                                onClick={() => cancelBooking(key)}
                              >
                                Cancel
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Weekend date cards */}
        <div className="weekend-grid">
          {weekends.map((date) => {
            const key = dateKey(date)
            const slots = TIME_SLOTS.map(slot => ({
              ...slot,
              booked: isSlotBooked(date, slot.id),
              booking: bookings[slotKey(date, slot.id)],
            }))
            const openCount = slots.filter(s => !s.booked).length
            const allBooked = openCount === 0
            const isSelected = selectedDate && dateKey(selectedDate) === key

            return (
              <div
                key={key}
                className={`date-card ${allBooked ? 'date-card--full' : ''} ${isSelected ? 'date-card--open' : ''}`}
              >
                {/* Card header — click to expand */}
                <div
                  className="date-card-header"
                  onClick={() => setSelectedDate(isSelected ? null : date)}
                >
                  <div className="date-info">
                    <span className="date-weekday">{shortDay(date)}</span>
                    <span className="date-label">{shortDate(date)}</span>
                  </div>
                  <div className={`date-badge ${allBooked ? 'badge--full' : 'badge--open'}`}>
                    {allBooked ? 'Full' : `${openCount} slot${openCount !== 1 ? 's' : ''} open`}
                  </div>
                  <span className="date-chevron">{isSelected ? '▲' : '▼'}</span>
                </div>

                {/* Slot list — shown when card is selected */}
                {isSelected && (
                  <div className="slot-list">
                    {slots.map(slot => (
                      <div
                        key={slot.id}
                        className={`slot ${slot.booked ? 'slot--booked' : 'slot--available'}`}
                        onClick={() => openBooking(date, slot)}
                      >
                        <span className="slot-time">{slot.label}</span>
                        {slot.booked ? (
                          <span className="slot-status status--booked">
                            {isAdmin ? `👤 ${slot.booking.name}` : 'Booked'}
                          </span>
                        ) : (
                          <span className="slot-status status--open">Book Now →</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Booking modal */}
      {bookingTarget && (
        <div
          className="modal-overlay"
          onClick={e => e.target === e.currentTarget && setBookingTarget(null)}
        >
          <div className="modal">
            <button className="modal-close" onClick={() => setBookingTarget(null)}>×</button>
            <h3 className="modal-title">Confirm Your Booking</h3>
            <p className="modal-subtitle">
              📅 {formatDate(bookingTarget.date)}<br />
              🕐 {bookingTarget.slot.label}
            </p>

            <div className="modal-fields">
              <label className="field-label">
                Your Name *
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Jane Smith"
                />
              </label>

              <label className="field-label">
                Phone Number *
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="704-555-0000"
                />
              </label>

              <label className="field-label">
                Email (optional)
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                />
              </label>

              <label className="field-label">
                Service
                <select
                  value={form.service}
                  onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                >
                  {SERVICES.map(s => <option key={s}>{s}</option>)}
                </select>
              </label>
            </div>

            {formError && <p className="form-error">{formError}</p>}

            <button className="btn btn--primary modal-submit" onClick={confirmBooking}>
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
