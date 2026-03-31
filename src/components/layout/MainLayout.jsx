import React, { useRef, useState, useEffect, useCallback } from 'react';
import './MainLayout.css';

export function MainLayout({ children }) {
  const contentRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const updateScrollFromElement = useCallback(() => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const totalScrollableHeight = scrollHeight - clientHeight;
      if (totalScrollableHeight > 0) {
        setScrollPercentage((scrollTop / totalScrollableHeight) * 100);
      } else {
        setScrollPercentage(0);
      }
    }
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      const handleScroll = () => updateScrollFromElement();
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, [updateScrollFromElement]);

  const handleDrag = useCallback((e) => {
    if (!isDragging || !trackRef.current || !contentRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const trackHeight = 190;
    const thumbHeight = 55;
    
    // Calcula a posição do mouse relativa ao topo da track
    let relativeY = e.clientY - trackRect.top;
    
    // Centraliza o clique no thumb para um feeling melhor ou usa a posição exata?
    // Vamos apenas mapear a posição do mouse no espaço de 135px (190 - 55)
    // Subtrai metade da altura do thumb para que o mouse fique no meio dele
    let availableSpace = trackHeight - thumbHeight;
    let newThumbPos = Math.max(0, Math.min(relativeY - (thumbHeight / 2), availableSpace));
    
    const newPercentage = (newThumbPos / availableSpace) * 100;
    
    // Atualiza o scroll do elemento real
    const { scrollHeight, clientHeight } = contentRef.current;
    contentRef.current.scrollTop = (newPercentage / 100) * (scrollHeight - clientHeight);
  }, [isDragging]);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', stopDragging);
    } else {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', stopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging, handleDrag, stopDragging]);

  const startDragging = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const scrollThumbPosition = (scrollPercentage / 100) * (190 - 55);

  return (
    <main className="main-layout-container">
      <div className="content-wrapper" ref={contentRef}>
        {children}
      </div>
      
      <div className="custom-scroll-container">
        <div 
          className="scroll-track-pill" 
          ref={trackRef}
          onMouseDown={(e) => {
            // Se clicar na trilha, já move o scroll para lá e começa o drag
            setIsDragging(true);
            handleDrag(e);
          }}
        >
          <div 
            className="scroll-thumb-pill"
            onMouseDown={startDragging}
            style={{ transform: `translateY(${scrollThumbPosition}px)` }}
          />
        </div>
      </div>
    </main>
  );
}
