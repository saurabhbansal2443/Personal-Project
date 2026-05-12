import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeartParticles from './components/HeartParticles';
import ScrollToTop from './components/ScrollToTop';
import Question from './pages/Question';

import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Reasons from './pages/Reasons';
import Gallery from './pages/Gallery';
import Letter from './pages/Letter';

// Eagerly resolve all photo URLs at module load time (using optimized/compressed images)
const photoModules = import.meta.glob('./assets/PhotosOptimized/*.{png,jpg,jpeg,JPG,JPEG,gif,GIF}', { eager: true });
const photoUrls = Object.values(photoModules).map((mod) => mod.default);

function App() {
  // Start preloading every gallery image the instant the app mounts
  // (while Neha is still on the quiz screens)
  useEffect(() => {
    photoUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <HeartParticles />
      <Routes>
        <Route path="/" element={<Question />} />
        <Route path="/welcome" element={<div className="page-wrapper"><Home /></div>} />
        <Route path="/timeline" element={<div className="page-wrapper"><Timeline /></div>} />
        <Route path="/reasons" element={<div className="page-wrapper"><Reasons /></div>} />
        <Route path="/gallery" element={<div className="page-wrapper"><Gallery /></div>} />
        <Route path="/letter" element={<div className="page-wrapper"><Letter /></div>} />
      </Routes>
    </Router>
  );
}

export default App;
