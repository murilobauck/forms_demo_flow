import React, { useRef, useState, useEffect } from 'react';
import './MainLayout.css';

export function MainLayout({ children }) {
  const contentRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const totalScrollableHeight = scrollHeight - clientHeight;
      const currentScrollPercentage = (scrollTop / totalScrollableHeight) * 100;
      setScrollPercentage(currentScrollPercentage);
    }
  };

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // O thumb de 55px deve se mover dentro de uma trilha de 190px.
  // Espaço disponível para o thumb "correr": 190 - 55 = 135px.
  const thumbOffset = (scrollPercentage / 100) * (190 - 55);

  return (
    <main className="main-layout-container">
      <div className="content-wrapper" ref={contentRef}>
        {children}
      </div>
      
      {/* Indicador de Scroll Customizado para corresponder aos detalhes do Figma */}
      <div className="custom-scroll-container">
        <div className="scroll-track-pill">
          <div 
            className="scroll-thumb-pill"
            style={{ transform: `translateY(${thumbOffset}px)` }}
          />
        </div>
      </div>
    </main>
  );
}
