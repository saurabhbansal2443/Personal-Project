import React, { useEffect, useState } from 'react';

const HeartParticles = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate some random hearts for the background
    const colors = ['#FFB7B2', '#E2858E', '#ffffff', '#D90429'];
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 8 + 6}s`,
      animationDelay: `${Math.random() * 5}s`,
      fontSize: `${Math.random() * 1.5 + 0.5}rem`,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="hearts-bg">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-particle"
          style={{
            left: heart.left,
            animationDuration: heart.animationDuration,
            animationDelay: heart.animationDelay,
            fontSize: heart.fontSize,
            color: heart.color
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default HeartParticles;
