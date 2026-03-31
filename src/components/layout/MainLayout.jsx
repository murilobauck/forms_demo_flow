import React, { useRef, useState, useEffect, useCallback } from 'react';
import './MainLayout.css';

export function MainLayout({ children }) {
  const contentRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Constantes para fácil manutenção
  const TRACK_HEIGHT = 120;
  const THUMB_HEIGHT = 35;

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
    const availableSpace = TRACK_HEIGHT - THUMB_HEIGHT;
    
    let relativeY = e.clientY - trackRect.top;
    let newThumbPos = Math.max(0, Math.min(relativeY - (THUMB_HEIGHT / 2), availableSpace));
    
    const newPercentage = (newThumbPos / availableSpace) * 100;
    
    const { scrollHeight, clientHeight } = contentRef.current;
    contentRef.current.scrollTop = (newPercentage / 100) * (scrollHeight - clientHeight);
  }, [isDragging, TRACK_HEIGHT, THUMB_HEIGHT]);

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

  const scrollThumbPosition = (scrollPercentage / 100) * (TRACK_HEIGHT - THUMB_HEIGHT);

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
