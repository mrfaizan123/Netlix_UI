

import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";

export default React.memo(function CardSlider({ data, title }) {
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cardWidth, setCardWidth] = useState(216);
  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const calculateDimensions = () => {
      const width = window.innerWidth;
      const mobile = width <= 768;
      setIsMobile(mobile);
      
      let newCardWidth, newVisibleCards;
      
      if (width <= 480) {
        newCardWidth = 162;
        newVisibleCards = Math.floor(width / newCardWidth);
      } else if (width <= 768) {
        newCardWidth = 172;
        newVisibleCards = Math.floor(width / newCardWidth);
      } else {
        newCardWidth = 216;
        newVisibleCards = Math.floor((width - 100) / newCardWidth);
      }
      
      setCardWidth(newCardWidth);
      setVisibleCards(Math.max(1, newVisibleCards));
    };
    
    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    
    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  const handleDirection = (direction) => {
    if (!listRef.current) return;

    const totalSlides = Math.ceil(data.length / visibleCards) - 1;
    let newPosition = sliderPosition;

    if (direction === "left" && sliderPosition > 0) {
      newPosition = sliderPosition - 1;
    } else if (direction === "right" && sliderPosition < totalSlides) {
      newPosition = sliderPosition + 1;
    } else {
      return;
    }

    const moveDistance = -newPosition * cardWidth * visibleCards;
    listRef.current.style.transform = `translateX(${moveDistance}px)`;
    setSliderPosition(newPosition);
  };

  const totalSlides = Math.ceil(data.length / visibleCards) - 1;
  const canScrollLeft = sliderPosition > 0;
  const canScrollRight = sliderPosition < totalSlides;

  return (
    <Container
      className="flex column"
      showControls={showControls}
      onMouseEnter={() => !isMobile && setShowControls(true)}
      onMouseLeave={() => !isMobile && setShowControls(false)}
      $isMobile={isMobile}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        {canScrollLeft && (showControls || isMobile) && (
          <div 
            className={`slider-action left flex j-center a-center ${
              isMobile ? 'mobile-visible' : ''
            }`}
            onClick={() => handleDirection("left")}
          >
            <AiOutlineLeft />
          </div>
        )}
        
        <div className="slider-container">
          <div className="slider flex" ref={listRef}>
            {data.map((movie, index) => {
              return <Card movieData={movie} index={index} key={movie.id} />;
            })}
          </div>
        </div>

        {canScrollRight && (showControls || isMobile) && (
          <div 
            className={`slider-action right flex j-center a-center ${
              isMobile ? 'mobile-visible' : ''
            }`}
            onClick={() => handleDirection("right")}
          >
            <AiOutlineRight />
          </div>
        )}
      </div>
      
      {isMobile && data.length > visibleCards && (
        <ScrollIndicator>
          <div className="dots">
            {Array.from({ length: Math.ceil(data.length / visibleCards) }).map((_, index) => (
              <div 
                key={index} 
                className={`dot ${index === sliderPosition ? 'active' : ''}`}
              />
            ))}
          </div>
        </ScrollIndicator>
      )}
    </Container>
  );
});

const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 1rem 0;
  width: 100%;
  overflow: hidden;
  z-index: 2;

  h1 {
    margin-left: ${props => props.$isMobile ? '1rem' : '3rem'};
    font-size: ${props => props.$isMobile ? '1.3rem' : '1.5rem'};
    margin-bottom: 0.5rem;
  }

  .wrapper {
    position: relative;
    width: 100%;
    
    .slider-container {
      width: 100%;
      overflow: hidden;
      padding: ${props => props.$isMobile ? '0 1rem' : '0 3rem'};
    }

    .slider {
      width: max-content;
      gap: ${props => props.$isMobile ? '0.8rem' : '1rem'};
      transform: translateX(0px);
      transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      padding: 0.5rem 0;
    }

    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: ${props => props.$isMobile ? '40px' : '50px'};
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      border: none;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
      
      svg {
        font-size: ${props => props.$isMobile ? '1.5rem' : '2rem'};
        color: white;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
      }

      &:hover {
        background: rgba(0, 0, 0, 0.8);
        
        svg {
          transform: scale(1.1);
        }
      }

      &.left {
        left: 0;
        border-radius: 0 8px 8px 0;
      }

      &.right {
        right: 0;
        border-radius: 8px 0 0 8px;
      }

      &.mobile-visible {
        background: rgba(0, 0, 0, 0.7);
        
        &:active {
          background: rgba(0, 0, 0, 0.9);
          transform: scale(0.95);
        }
      }

      @media (max-width: 480px) {
        width: 35px;
        
        svg {
          font-size: 1.3rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0;
    
    .wrapper {
      .slider-container {
        padding: 0 0.5rem;
      }
      
      .slider {
        gap: 0.6rem;
      }
    }
  }

  @media (max-width: 480px) {
    h1 {
      margin-left: 0.8rem;
      font-size: 1.2rem;
    }
    
    .wrapper {
      .slider-container {
        padding: 0 0.8rem;
      }
    }
  }
`;

const ScrollIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  padding: 0 1rem;

  .dots {
    display: flex;
    gap: 0.5rem;
    
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
      
      &.active {
        background: #e50914;
        transform: scale(1.2);
      }
    }
  }

  @media (max-width: 480px) {
    .dots {
      gap: 0.3rem;
      
      .dot {
        width: 5px;
        height: 5px;
      }
    }
  }
`;
