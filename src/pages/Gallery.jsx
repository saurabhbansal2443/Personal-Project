import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Gallery.css';

// Using Vite's import.meta.glob to dynamically load optimized images
const photoModules = import.meta.glob('../assets/PhotosOptimized/*.{png,jpg,jpeg,JPG,JPEG,gif,GIF}', { eager: true });

const photos = Object.keys(photoModules).map((key, index) => {
  return {
    id: index,
    url: photoModules[key].default,
    caption: `Memory #${index + 1}`
  };
});

// Individual image card with shimmer loading
const PhotoCard = ({ photo, index, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      className="polaroid glass-panel"
      onClick={() => onClick(index)}
      whileHover={{ scale: 1.05, rotate: 0 }}
      style={{ cursor: 'pointer' }}
    >
      <div className="polaroid-img-wrapper">
        {!loaded && <div className="img-skeleton" />}
        <img
          src={photo.url}
          alt={photo.caption}
          onLoad={() => setLoaded(true)}
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease-in'
          }}
        />
      </div>
      <div className="polaroid-caption">
        {photo.caption}
      </div>
    </motion.div>
  );
};

const Lightbox = ({ photoIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          <X size={28} />
        </button>

        {photos.length > 1 && (
          <button
            className="lightbox-nav lightbox-nav-prev"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        <motion.img
          key={photoIndex}
          src={photos[photoIndex].url}
          alt={photos[photoIndex].caption}
          className="lightbox-image"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />

        {photos.length > 1 && (
          <button
            className="lightbox-nav lightbox-nav-next"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next photo"
          >
            <ChevronRight size={32} />
          </button>
        )}

        <div className="lightbox-counter">
          {photoIndex + 1} / {photos.length}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const goPrev = () => setSelectedIndex((i) => (i - 1 + photos.length) % photos.length);
  const goNext = () => setSelectedIndex((i) => (i + 1) % photos.length);

  return (
    <div className="container animate-fade-in gallery-page">
      <h1 className="page-title text-center">Our Memories</h1>
      <p className="text-center subtitle">A collection of our moments. Even though we meet rarely, every picture is precious.</p>

      <div className="masonry-grid">
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            index={index}
            onClick={openLightbox}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <Lightbox
          photoIndex={selectedIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}

      <div className="text-center" style={{ marginTop: '60px' }}>
        <button className="btn-primary" onClick={() => navigate('/letter')}>
          One Last Thing... ❤️
        </button>
      </div>
    </div>
  );
};

export default Gallery;
