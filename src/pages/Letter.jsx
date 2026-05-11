import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import './Letter.css';

const Letter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container animate-fade-in letter-page">
      <h1 className="page-title text-center">A Special Note</h1>
      
      <div className="letter-container">
        {!isOpen ? (
          <div className="envelope glass-panel animate-float" onClick={() => setIsOpen(true)}>
            <div className="wax-seal">
              <Heart size={24} color="white" fill="white" />
            </div>
            <p className="envelope-text">Tap to open</p>
          </div>
        ) : (
          <div className="open-letter animate-fade-in">
            <p className="greeting">My Dearest Neha,</p>
            <p className="letter-body">
              Can you believe it? From annoying each other as kids to getting married! 
              It's been 8 years since I proposed to you on my birthday, and it's still the best decision I ever made.
            </p>
            <p className="letter-body">
              Even though we've only met 3-4 times since then, our bond has only grown stronger. 
              The distance was tough, but knowing you were at the other end made it all worth it.
            </p>
            <p className="letter-body">
              I can't wait to finally close the distance forever and wake up next to my best friend every day.
            </p>
            <p className="closing">
              Forever yours, <br/>
              <span className="signature">Saurabh Bansal</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Letter;
