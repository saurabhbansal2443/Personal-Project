import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import './Question.css';

const Question = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Lock body scroll on the entire question page
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

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

  // --- Step 3: Memory Check with Shuffle & Roasts ---
  const roastMessages = [
    "Seriously Neha? 🤦‍♂️ Try again...",
    "Babe... I'm starting to worry 😤",
    "Should I call your mom and ask? 📞",
    "Google it if you have to, but get it right! 😭"
  ];

  const initialOptions = [
    { id: 'wrong1', label: 'On my birthday next year', correct: false },
    { id: 'correct', label: 'On my birthday 8 years ago', correct: true },
    { id: 'wrong2', label: "On Valentine's Day", correct: false },
  ];

  const shuffleArray = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [quizOptions, setQuizOptions] = useState(() => shuffleArray(initialOptions));
  const [wrongCount, setWrongCount] = useState(0);
  const [roastText, setRoastText] = useState('');
  const [shakeAll, setShakeAll] = useState(false);

  const handleQuizPick = (option) => {
    if (option.correct) {
      nextStep();
      return;
    }
    const newCount = wrongCount + 1;
    setWrongCount(newCount);
    setRoastText(roastMessages[Math.min(newCount - 1, roastMessages.length - 1)]);
    setShakeAll(true);
    setTimeout(() => {
      setShakeAll(false);
      setQuizOptions(shuffleArray(initialOptions));
    }, 500);
  };

  // ... (rest of state below)

  // --- Step 4: Slider ---
  const [sliderValue, setSliderValue] = useState(0);

  // --- Step 5: Drag to Lock ---
  const [isUnlocked, setIsUnlocked] = useState(false);
  const handleDragEnd = (event, info) => {
    // If the heart is dragged significantly to the right towards the lock
    if (info.offset.x > 60) {
      setIsUnlocked(true);
      // Fire celebration confetti!
      const colors = ['#FFB7B2', '#D90429', '#E2858E', '#ff69b4', '#ffffff'];
      const end = Date.now() + 2500;
      const frame = () => {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
      setTimeout(() => navigate('/welcome'), 2500);
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
              {quizOptions.map((option) => (
                <motion.button
                  key={option.id}
                  className="btn-secondary quiz-btn"
                  onClick={() => handleQuizPick(option)}
                  animate={shakeAll ? {
                    x: [-8, 8, -8, 8, 0],
                    backgroundColor: ['#ffffff', '#ffcccb', '#ffffff'],
                  } : {}}
                  transition={{ duration: 0.4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
            {roastText && (
              <motion.p
                key={wrongCount}
                className="roast-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {roastText}
              </motion.p>
            )}
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
                className="btn-primary" 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={nextStep}
                style={{ marginTop: '15px' }}
              >
                I Promise! 🥺
              </motion.button>
            )}
          </motion.div>
        )}

        {step === 5 && (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} style={{ width: '100%' }}>
            {!isUnlocked ? (
              <>
                <h1>Final Step 🔐</h1>
                <h2>Drag my heart to unlock!</h2>
                
                <div className="drag-game-area">
                  <motion.div 
                    className="draggable-heart"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.9}
                    onDragEnd={handleDragEnd}
                  >
                    <Heart size={40} color="var(--accent)" fill="var(--accent)" />
                    <p style={{fontSize: '0.75rem', marginTop: '4px', color: 'var(--accent)', fontWeight: 'bold'}}>Drag me →</p>
                  </motion.div>

                  <div className="lock-target">
                    <Lock size={40} color="var(--primary)" />
                  </div>
                </div>
              </>
            ) : (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
              >
                <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Access Granted! 🎉</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--accent)' }}>Entering our world...</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Question;
