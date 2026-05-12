import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './Letter.css';

const letterParagraphs = [
  {
    type: 'greeting',
    text: 'My Dearest Neha,',
  },
  {
    type: 'body',
    text: "Can you believe it? From annoying each other as kids to getting married! It's been 8 years since I proposed to you on my birthday, and it's still the best decision I ever made.",
  },
  {
    type: 'body',
    text: "Even though we've only met 3-4 times since then, our bond has only grown stronger. The distance was tough, but knowing you were at the other end made it all worth it.",
  },
  {
    type: 'body',
    text: "I can't wait to finally close the distance forever and wake up next to my best friend every day.",
  },
  {
    type: 'closing',
    text: 'Forever yours,',
  },
];

const TypewriterText = ({ text, speed = 35, onComplete }) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
        if (onComplete) onComplete();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && <span className="typewriter-cursor">|</span>}
    </span>
  );
};

const Letter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [finishedParagraphs, setFinishedParagraphs] = useState([]);
  const [showSignature, setShowSignature] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Fire heart-shaped confetti
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 20,
      colors: ['#FFB7B2', '#D90429', '#E2858E', '#ff69b4'],
    };
    confetti({ ...defaults, particleCount: 50, origin: { x: 0.5, y: 0.4 } });
    setTimeout(() => {
      confetti({ ...defaults, particleCount: 30, origin: { x: 0.3, y: 0.5 } });
    }, 300);
    setTimeout(() => {
      confetti({ ...defaults, particleCount: 30, origin: { x: 0.7, y: 0.5 } });
    }, 600);
  };

  const handleParagraphComplete = () => {
    setFinishedParagraphs((prev) => [...prev, currentParagraph]);
    if (currentParagraph < letterParagraphs.length - 1) {
      setTimeout(() => {
        setCurrentParagraph((prev) => prev + 1);
      }, 400);
    } else {
      // All paragraphs done, show signature
      setTimeout(() => setShowSignature(true), 500);
    }
  };

  return (
    <div className="container animate-fade-in letter-page">
      <h1 className="page-title text-center">A Special Note</h1>
      
      <div className="letter-container">
        {!isOpen ? (
          <div className="envelope glass-panel animate-float" onClick={handleOpen}>
            <div className="wax-seal">
              <Heart size={24} color="white" fill="white" />
            </div>
            <p className="envelope-text">Tap to open</p>
          </div>
        ) : (
          <motion.div
            className="open-letter"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {/* Finished paragraphs shown as static text */}
            {finishedParagraphs.map((idx) => {
              const para = letterParagraphs[idx];
              return (
                <p key={idx} className={para.type === 'greeting' ? 'greeting' : para.type === 'closing' ? 'closing' : 'letter-body'}>
                  {para.text}
                </p>
              );
            })}

            {/* Currently typing paragraph */}
            {currentParagraph < letterParagraphs.length && !finishedParagraphs.includes(currentParagraph) && (
              <p className={
                letterParagraphs[currentParagraph].type === 'greeting' ? 'greeting' :
                letterParagraphs[currentParagraph].type === 'closing' ? 'closing' : 'letter-body'
              }>
                <TypewriterText
                  text={letterParagraphs[currentParagraph].text}
                  speed={currentParagraph === 0 ? 50 : 30}
                  onComplete={handleParagraphComplete}
                />
              </p>
            )}

            {/* Signature fades in after all typing completes */}
            <AnimatePresence>
              {showSignature && (
                <motion.p
                  className="closing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <span className="signature">Saurabh Bansal</span>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Letter;
