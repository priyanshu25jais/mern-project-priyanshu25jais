import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>&copy; {new Date().getFullYear()} Mentor Mentee Portal. All rights reserved.</p>
        <nav className="footer__links">
          <a href="mailto:support@mentormentee.com">Support</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            Twitter
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer

