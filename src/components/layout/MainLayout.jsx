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

  // Handle scroll events outside of the container
  useEffect(() => {
    let touchStartY = 0;

    const handleGlobalWheel = (e) => {
      if (!contentRef.current) return;
      // Allow native scroll if target is within content-wrapper
      if (contentRef.current.contains(e.target)) return;
      
      contentRef.current.scrollTop += e.deltaY;
    };

    const handleGlobalTouchStart = (e) => {
      if (!contentRef.current) return;
      if (contentRef.current.contains(e.target)) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleGlobalTouchMove = (e) => {
      if (!contentRef.current) return;
      if (contentRef.current.contains(e.target)) return;
      
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      
      contentRef.current.scrollTop += deltaY;
      touchStartY = touchY;
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: true });
    window.addEventListener('touchstart', handleGlobalTouchStart, { passive: true });
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
      window.removeEventListener('touchstart', handleGlobalTouchStart);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, []);

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
