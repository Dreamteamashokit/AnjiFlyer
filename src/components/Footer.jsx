// Footer.jsx — Bottom of the page
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <p className="footer__brand">
        🌟 Holcomb Wood's Neighborhood Shine
      </p>
      <p className="footer__by">
        By <strong>Anjaney Pandey</strong> &amp; <strong>Ruthvik Erni</strong>
        &nbsp;|&nbsp; Holcomb Woods Neighborhood
      </p>
      <p className="footer__contact">
        <a href="tel:7044538444">📞 704-453-8444 & 980-417-9514</a>
        &nbsp;|&nbsp;
        <a href="mailto:anji02162012@gmail.com">📧 anji02162012@gmail.com</a>
      </p>
      <p className="footer__copy">&copy; {year} All rights reserved.</p>
    </footer>
  )
}
