import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';
import './Question.css';

const Question = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // --- Step 1: Dodging Button ---
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const handleNoHover = () => {
    const safePaddingX = 120;
    const safePaddingY = 180;
    const maxTranslateX = (window.innerWidth / 2) - safePaddingX;
    const maxTranslateY = (window.innerHeight / 2) - safePaddingY;
    let randomX = (Math.random() * maxTranslateX * 2) - maxTranslateX;
    let randomY = (Math.random() * maxTranslateY * 2) - maxTranslateY;
    if (Math.abs(randomX) < 100) randomX = randomX >= 0 ? 100 : -100;
    if (Math.abs(randomY) < 100) randomY = randomY >= 0 ? 100 : -100;
    setNoPosition({ x: randomX, y: randomY });
  };

  // --- Step 2: Shrinking Button ---
  const [nehaScale, setNehaScale] = useState(1);
  const handleNehaHover = () => {
    setNehaScale((prev) => Math.max(0, prev - 0.25));
  };

  // --- Step 3: Shaking Buttons ---
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const handleWrongAnswer = (controls) => {
    controls.start({
      x: [-10, 10, -10, 10, 0],
      transition: { duration: 0.4 },
      backgroundColor: "#ffcccb"
    }).then(() => controls.start({ backgroundColor: "#ffffff" }));
  };

  // --- Step 4: Slider ---
  const [sliderValue, setSliderValue] = useState(0);

  // --- Step 5: Drag to Lock ---
  const [isUnlocked, setIsUnlocked] = useState(false);
  const handleDragEnd = (event, info) => {
    // If the heart is dragged significantly to the right towards the lock
    if (info.offset.x > 80) {
      setIsUnlocked(true);
      setTimeout(() => navigate('/welcome'), 2000); // Wait for celebration animation, then navigate
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);

  return (
    <div className="question-container animate-fade-in">
      <div className="glass-panel question-card" style={{ position: 'relative' }}>
        
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h1>Hey Neha! 💖</h1>
            <p>Before I let you enter... I have a very important question.</p>
            <h2>Do you love Saurabh?</h2>
            <div className="buttons-container">
              <motion.button 
                className="btn-primary yes-btn" 
                onClick={nextStep}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                Yes, forever! 😍
              </motion.button>
              <motion.button 
                className="btn-secondary no-btn" 
                onHoverStart={handleNoHover}
                onClick={handleNoHover}
                onTouchStart={(e) => { e.preventDefault(); handleNoHover(); }}
                animate={{ x: noPosition.x, y: noPosition.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.8 }}
              >
                No 🙄
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <h1>Question 2 👀</h1>
            <h2>Be honest... Who is the better looking one?</h2>
            <div className="buttons-container">
              <motion.button 
                className="btn-secondary" 
                onHoverStart={handleNehaHover}
                onClick={handleNehaHover}
                onTouchStart={(e) => { e.preventDefault(); handleNehaHover(); }}
                animate={{ scale: nehaScale, opacity: nehaScale }}
                style={{ position: 'relative', zIndex: 10 }}
              >
                Me (Neha) 💅
              </motion.button>
              <motion.button 
                className="btn-primary yes-btn" 
                onClick={nextStep}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                Saurabh 😎
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <h1>Question 3 🧠</h1>
            <h2>When did I propose to you?</h2>
            <div className="buttons-column">
              <motion.button 
                className="btn-secondary quiz-btn" 
                onClick={() => handleWrongAnswer(controls1)}
                animate={controls1}
              >
                On my birthday next year
              </motion.button>
              <motion.button 
                className="btn-primary quiz-btn" 
                onClick={nextStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                On my birthday 8 years ago ❤️
              </motion.button>
              <motion.button 
                className="btn-secondary quiz-btn" 
                onClick={() => handleWrongAnswer(controls2)}
                animate={controls2}
              >
                On Valentine's Day
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <h1>Question 4 💍</h1>
            <h2>Are you ready to tolerate my annoying habits forever?</h2>
            <p>Prove it by sliding to 100%</p>
            <div className="slider-container">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderValue} 
                onChange={(e) => setSliderValue(e.target.value)}
                className="custom-slider"
                style={{
                  background: `linear-gradient(to right, var(--accent) ${sliderValue}%, rgba(255,255,255,0.8) ${sliderValue}%)`
                }}
              />
              <p className="slider-value">{sliderValue}%</p>
            </div>
            {sliderValue == 100 && (
              <motion.button 
                className="btn-primary mt-4" 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={nextStep}
                style={{ marginTop: '20px' }}
              >
                I Promise! 🥺
              </motion.button>
            )}
          </motion.div>
        )}

        {step === 5 && (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <h1>Final Step 🔐</h1>
            <h2>Drag my heart to unlock the surprise!</h2>
            
            <div className="drag-game-area" style={{ opacity: isUnlocked ? 0 : 1, transition: 'opacity 0.5s' }}>
              <motion.div 
                className="draggable-heart"
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.8}
                onDragEnd={handleDragEnd}
              >
                <Heart size={48} color="var(--accent)" fill="var(--accent)" />
                <p style={{fontSize: '0.8rem', marginTop: '5px', color: 'var(--accent)', fontWeight: 'bold'}}>Drag me!</p>
              </motion.div>

              <div className="lock-target">
                <Lock size={48} color="var(--primary)" />
              </div>
            </div>

            {isUnlocked && (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
              >
                <h2>Access Granted! 🎉</h2>
                <p>Entering our world...</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Question;
