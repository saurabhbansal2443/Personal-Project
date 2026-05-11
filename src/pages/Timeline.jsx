import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import './Timeline.css';

const Timeline = () => {
  const navigate = useNavigate();
  const events = [
    { id: 1, date: 'Childhood', title: 'Best Friends First', desc: 'Who knew my annoying childhood best friend would become my wife?' },
    { id: 2, date: '8 Years Ago, On My Birthday', title: 'The Proposal', desc: 'The best birthday gift I ever gave myself was asking you to be mine.' },
    { id: 3, date: 'The Long Distance', title: 'Quality over Quantity', desc: 'We\'ve only met a few times since, but every second felt like a lifetime of happiness.' },
    { id: 4, date: 'Soon', title: 'Getting Married!', desc: 'I can\'t wait to finally annoy you in person, every single day.' },
  ];

  return (
    <div className="container animate-fade-in timeline-page">
      <h1 className="page-title text-center">Our Beautiful Journey</h1>
      <div className="timeline-container">
        {events.map((event, index) => (
          <div key={event.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-dot">
              <Heart size={16} color="white" />
            </div>
            <div className="glass-panel timeline-content">
              <span className="timeline-date">{event.date}</span>
              <h3>{event.title}</h3>
              <p>{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center" style={{ marginTop: '60px' }}>
        <button className="btn-primary" onClick={() => navigate('/reasons')}>
          Continue ❤️
        </button>
      </div>
    </div>
  );
};

export default Timeline;
