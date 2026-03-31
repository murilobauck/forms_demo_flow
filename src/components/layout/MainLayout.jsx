import React from 'react';
import './MainLayout.css';

export function MainLayout({ children }) {
  return (
    <main className="main-layout-container">
      <div className="content-wrapper">
        {children}
      </div>
    </main>
  );
}
