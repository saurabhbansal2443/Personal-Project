import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeartParticles from './components/HeartParticles';
import Question from './pages/Question';

import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Reasons from './pages/Reasons';
import Gallery from './pages/Gallery';
import Letter from './pages/Letter';

function App() {
  return (
    <Router>
      <HeartParticles />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Question />} />
          <Route path="/welcome" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/reasons" element={<Reasons />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/letter" element={<Letter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
