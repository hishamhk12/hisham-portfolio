import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

const email = 'hisham.hk12@gmail.com';
const linkedInUrl = 'https://linkedin.com/in/hisham-tamim-7626291ba';
const whatsappUrl = 'https://wa.me/966505990554?text=Hi%20Hisham%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20with%20you.';

function ContactFooter() {
  return (
    <section id="contact" className="contact-section px-5 pt-20 md:px-8 md:pt-28">
      <div className="contact-inner mx-auto max-w-7xl">
        <div className="contact-intro">
          <p className="section-label">05 / Contact</p>
          <h2>Let's build something that works.</h2>
          <p>Have a system, workflow, product, or operational challenge? Let's talk.</p>
        </div>

        <div className="contact-actions">
          <a className="contact-primary" href={whatsappUrl} target="_blank" rel="noreferrer noopener">
            Start a conversation
          </a>
          <a className="contact-link" href={`mailto:${email}`}>
            <Mail size={18} />
            <span>{email}</span>
          </a>
          <a className="contact-link" href={linkedInUrl} target="_blank" rel="noreferrer noopener">
            <Linkedin size={18} />
            <span>linkedin.com/in/hisham-tamim-7626291ba</span>
          </a>
        </div>

        <footer className="footer-bar">
          <p>© Hisham Tamim</p>
          <p>Software Engineer / Requirements Engineer</p>
          <a href="#top">Back to top</a>
        </footer>
      </div>
    </section>
  );
}

export default ContactFooter;
