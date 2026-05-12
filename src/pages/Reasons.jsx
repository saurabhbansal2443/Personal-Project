import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import ScrollHint from '../components/ScrollHint';
import './Reasons.css';

const Reasons = () => {
  const navigate = useNavigate();
  const reasonsList = [
    "Because you tolerated me since childhood.",
    "The way you look at me when we finally meet.",
    "Your beautiful smile that makes the long distance worth it.",
    "How our bond stays rock solid even when we're miles apart.",
    "Because you're going to be my beautiful wife soon.",
    "You are my best friend and the love of my life, Neha.",
  ];

  const [revealed, setRevealed] = useState(Array(reasonsList.length).fill(false));

  const toggleReveal = (index) => {
    const newRevealed = [...revealed];
    newRevealed[index] = !newRevealed[index];
    setRevealed(newRevealed);
  };

  return (
    <div className="container animate-fade-in reasons-page">
      <h1 className="page-title text-center">Reasons Why I Love You</h1>
      <p className="text-center subtitle">Click the cards to reveal!</p>
      
      <div className="reasons-grid">
        {reasonsList.map((reason, index) => (
          <div 
            key={index} 
            className={`reason-card ${revealed[index] ? 'revealed' : ''}`}
            onClick={() => toggleReveal(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                <Heart color="var(--accent)" fill="var(--accent)" size={32} />
                <span>Reason #{index + 1}</span>
              </div>
              <div className="card-back">
                <p>{reason}</p>
                <Star color="var(--primary)" size={16} style={{ marginTop: '10px' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center" style={{ marginTop: '60px' }}>
        <button className="btn-primary" onClick={() => navigate('/gallery')}>
          See Our Memories ❤️
        </button>
      </div>
      <ScrollHint />
    </div>
  );
};

export default Reasons;
