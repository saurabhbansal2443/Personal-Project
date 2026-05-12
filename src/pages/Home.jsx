import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import './Home.css';

const PROPOSAL_DATE = new Date('2018-05-11T00:00:00');

const Home = () => {
  const navigate = useNavigate();
  const [elapsed, setElapsed] = useState({});

  // Fire confetti on mount
  useEffect(() => {
    const end = Date.now() + 2000;
    const colors = ['#FFB7B2', '#D90429', '#E2858E', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  // Live counter
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      let diff = now - PROPOSAL_DATE;

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      diff -= years * (1000 * 60 * 60 * 24 * 365.25);
      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
      diff -= months * (1000 * 60 * 60 * 24 * 30.44);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * (1000 * 60 * 60 * 24);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);
      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * (1000 * 60);
      const seconds = Math.floor(diff / 1000);

      setElapsed({ years, months, days, hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container container animate-fade-in">
      <div className="glass-panel hero-card">
        <div className="hero-icon animate-float">
          <Sparkles size={48} color="var(--accent)" />
        </div>
        <h1 className="hero-title">For My Favorite Headache, Neha ❤️</h1>
        <p className="hero-subtitle">
          From childhood best friends to getting married... I wanted to make something special just for you. Every pixel here is filled with love by Saurabh.
        </p>

        {elapsed.years !== undefined && (
          <div className="love-counter">
            <p className="counter-label">We've been in love for</p>
            <div className="counter-grid">
              <div className="counter-unit">
                <span className="counter-number">{elapsed.years}</span>
                <span className="counter-text">Years</span>
              </div>
              <div className="counter-unit">
                <span className="counter-number">{elapsed.months}</span>
                <span className="counter-text">Months</span>
              </div>
              <div className="counter-unit">
                <span className="counter-number">{elapsed.days}</span>
                <span className="counter-text">Days</span>
              </div>
              <div className="counter-unit">
                <span className="counter-number">{elapsed.hours}</span>
                <span className="counter-text">Hours</span>
              </div>
              <div className="counter-unit">
                <span className="counter-number">{elapsed.minutes}</span>
                <span className="counter-text">Mins</span>
              </div>
              <div className="counter-unit">
                <span className="counter-number tick">{elapsed.seconds}</span>
                <span className="counter-text">Secs</span>
              </div>
            </div>
          </div>
        )}

        <button 
          className="btn-primary mt-6" 
          onClick={() => navigate('/timeline')}
        >
          Explore Our Journey
        </button>
      </div>
    </div>
  );
};

export default Home;
