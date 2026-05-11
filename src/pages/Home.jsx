import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

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
