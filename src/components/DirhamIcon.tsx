import React from 'react';

const DirhamIcon = ({ className = "w-[0.9em] h-[0.9em] inline-block align-baseline" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="10 18 80 69" 
    fill="currentColor" 
    className={className}
  >
    {/* Main Stem with Serifs */}
    <path d="M 20 20 C 25 20, 28 22, 28 25 L 28 80 C 28 83, 25 85, 20 85 L 38 85 C 38 85, 38 82, 38 80 L 38 25 C 38 22, 38 20, 38 20 Z" />
    
    {/* The Bowl */}
    <path d="M 38 20 C 65 20, 85 30, 85 52 C 85 75, 65 85, 38 85 L 38 72 C 55 72, 68 65, 68 52 C 68 40, 55 33, 38 33 Z" />
    
    {/* Top Bar with flares */}
    <path d="M 15 42 C 20 40, 25 42, 28 42 L 85 42 C 87 42, 88 45, 85 46 L 28 46 C 25 46, 20 48, 15 46 C 12 45, 12 43, 15 42 Z" />
    
    {/* Bottom Bar with flares */}
    <path d="M 15 56 C 20 54, 25 56, 28 56 L 85 56 C 87 56, 88 59, 85 60 L 28 60 C 25 60, 20 62, 15 60 C 12 59, 12 57, 15 56 Z" />
  </svg>
);

export default DirhamIcon;
