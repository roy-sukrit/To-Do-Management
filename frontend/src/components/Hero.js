import React, { useEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/Hero.css';

function Hero() {
  useEffect(() => {
    gsap.to('.hero h1', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.2
    });

    gsap.to('.hero p', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.4
    });

    gsap.to('.cta-button', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.6
    });
  }, []);

  return (
    <section className="hero">
      <h1>Organize Your Life with Agile To-Do</h1>
      <p>The simple, powerful todo app that helps you get things done</p>
      <Link to="/home" className="cta-button">Get Started - It's Free</Link>
    </section>
  );
}

export default Hero;