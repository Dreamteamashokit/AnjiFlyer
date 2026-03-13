// Navbar.jsx — Top navigation bar, stays fixed while scrolling
import { useState, useEffect } from 'react'
import './Navbar.css'

// Links shown in the nav
const NAV_LINKS = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'Book',     href: '#booking' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  // Track whether the mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false)
  // Track whether user has scrolled (to add a shadow)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu when a link is clicked
  const handleLinkClick = () => setMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Brand logo on the left */}
      <a href="#hero" className="nav-logo" onClick={handleLinkClick}>
        🌟 Neighborhood Shine
      </a>

      {/* Desktop links */}
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <a href={href} onClick={handleLinkClick}>{label}</a>
          </li>
        ))}
        <li>
          <a href="#contact" className="nav-cta" onClick={handleLinkClick}>
            Request Service
          </a>
        </li>
      </ul>

      {/* Hamburger button — only visible on mobile */}
      <button
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="Toggle Menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
