import React, { useState } from 'react';

const AnimatedButton = ({ link, firstText, secondText }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyles = {
    background: isHovered ? '#D9FFFF' : '#9AE5D9',
    color: isHovered ? '#A3C1FC' : '#55706D',
    borderRadius: '40px',
    padding: '15px 35px',
    overflow: 'hidden',
    width: isHovered ? `${calculateWidth(firstText, secondText)}px` : '175px',
    transition: 'all 1.2s, border 0.5s 1.2s, box-shadow 0.3s 1.5s',
    whiteSpace: 'nowrap',
    textIndent: '10px',
    fontWeight: 'bold',
  };

  const spanStyles = {
    display: 'inline-block',
    transform: isHovered ? 'translateX(0)' : 'translateX(300px)',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.1s 0.5s, transform 0.4s 0.5s',
    fontWeight: 'normal',
  };

  function calculateWidth(text1, text2) {
    const buttonWidth = 200;
    const padding = 60;
    const textWidth = text1.length * 2+ text2.length * 2;
    return buttonWidth + padding + textWidth;
  }

  return (
    <a href={link} style={{ textDecoration: 'none' }}>
      <div className="container">
        <div>
          <button
            style={buttonStyles}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {firstText}
            <span style={spanStyles}>{secondText}</span>
          </button>
        </div>
      </div>
    </a>
  );
};

export default AnimatedButton;
