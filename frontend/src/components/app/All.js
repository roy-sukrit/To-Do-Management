import React from 'react';
import Navbar from '../Navbar';
import Hero from '../Hero';
import Features from '../Features';
import Demo from '../Demo';
import '../../styles/All.css';

function All() {
  return (
    <div className="all">
      <Navbar />
      <Hero />
      <Features />
      <Demo />
    </div>
  );
}

export default All;