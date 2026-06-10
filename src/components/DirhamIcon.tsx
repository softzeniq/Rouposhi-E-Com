import React from 'react';

const DirhamIcon = ({ className = "" }: { className?: string }) => {
  const baseClasses = "h-[1em] inline-block align-baseline translate-y-[0.1em] object-contain mix-blend-multiply scale-[1.35]";
  const finalClass = className ? `${baseClasses} ${className}` : `${baseClasses} w-[1em]`;
  return <img src="/dirham.png" alt="Đ" className={finalClass} />;
};

export default DirhamIcon;
