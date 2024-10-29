import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../styles/Features.css';

gsap.registerPlugin(ScrollTrigger);

function Features() {
  useEffect(() => {
    gsap.to('.feature-card', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.features',
        start: 'top center'
      }
    });
  }, []);

  return (
    <section className="features" id="features">
      <h2>Why Choose Agile To-Do?</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Works Everywhere</h3>
          <p>Access your tasks from any device, anytime, anywhere.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Stay Focused</h3>
          <p>Organize tasks by project and priority to maintain clarity.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🤝</div>
          <h3>Collaborate</h3>
          <p>Share lists and assign tasks to team members easily.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;