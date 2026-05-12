import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './ScrollHint.css';

const ScrollHint = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if page is scrollable
    const checkScrollable = () => {
      const isScrollable = document.documentElement.scrollHeight > window.innerHeight + 50;
      setVisible(isScrollable);
    };

    // Check on mount and after images/content load
    checkScrollable();
    const timer = setTimeout(checkScrollable, 500);

    const handleScroll = () => {
      // Hide after user scrolls down a bit
      if (window.scrollY > 80) {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScrollable);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollable);
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="scroll-hint" onClick={() => window.scrollBy({ top: 300, behavior: 'smooth' })}>
      <span className="scroll-hint-text">Scroll down</span>
      <ChevronDown size={22} />
    </div>
  );
};

export default ScrollHint;
