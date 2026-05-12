import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import ScrollHint from '../components/ScrollHint';
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
          <motion.div
            key={event.id}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay: 0.1,
            }}
          >
            <motion.div
              className="timeline-dot"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 15,
                delay: 0.3,
              }}
            >
              <Heart size={16} color="white" />
            </motion.div>
            <div className="glass-panel timeline-content">
              <span className="timeline-date">{event.date}</span>
              <h3>{event.title}</h3>
              <p>{event.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center" style={{ marginTop: '60px' }}>
        <button className="btn-primary" onClick={() => navigate('/reasons')}>
          Continue ❤️
        </button>
      </div>
      <ScrollHint />
    </div>
  );
};

export default Timeline;
