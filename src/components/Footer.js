import React from 'react';
import './Footer.css';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us Section */}
        <div className="footer-about">
          <h3>About Watchsy</h3>
          <p>
            Watchsy is a free OTT platform where you can enjoy movies, anime, and other content in a safe, enjoyable environment. It's your personal entertainment zone!
          </p>
        </div>

        {/* Contact Us Section */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Phone: +91 8592805065</p>
          <div className="footer-follow">
            <span>Follow us:</span>
            <span className="footer-icons">
              <a href="https://www.instagram.com/mxh.______" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="icon" />
              </a>
              <a href="http://www.linkedin.com/in/al-mehaboob-ss-556703298" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="icon" />
              </a>
              <a href="https://x.com/AAlmehbub?t=l6WmC_97A5zTgnF6KkJHVg&s=09" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="icon" />
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
