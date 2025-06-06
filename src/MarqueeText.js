import React, { useRef, useEffect, useState } from 'react';

const MarqueeText = ({ text }) => {
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const textWidth = container.scrollWidth;
        const containerWidth = container.clientWidth;
        setIsOverflowing(textWidth > containerWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  return (
    <div className="marquee-wrapper" ref={containerRef}>
      <div className={`marquee-content ${isOverflowing ? 'animate' : ''}`}>
        <span>{text}</span>
        {isOverflowing && <span>{text}</span>}
      </div>
    </div>
  );
};

export default MarqueeText;