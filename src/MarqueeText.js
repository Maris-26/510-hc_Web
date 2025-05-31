import React, { useRef, useEffect, useState } from 'react';

const MarqueeText = ({ children, className = '', ...props }) => {
  const spanRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = spanRef.current;
    if (el) {
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    }
  }, [children]);

  return (
    <span
      ref={spanRef}
      className={`${className} ${isOverflowing ? 'marquee' : ''}`}
      style={{ display: 'inline-block', width: '100%' }}
      {...props}
    >
      {children}
    </span>
  );
};

export default MarqueeText;