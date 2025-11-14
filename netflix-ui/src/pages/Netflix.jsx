




// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import Navbar from "../components/Navbar";
// import backgroundImage from "../assets/home.jpg";
// import MovieLogo from "../assets/homeTitle.webp";

// import { onAuthStateChanged } from "firebase/auth";
// import { firebaseAuth } from "../utils/firebase-config";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchMovies, getGenres } from "../store";
// import { FaPlay } from "react-icons/fa";
// import { AiOutlineInfoCircle } from "react-icons/ai";
// import Slider from "../components/Slider";

// function Netflix() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const movies = useSelector((state) => state.netflix.movies);
//   const genres = useSelector((state) => state.netflix.genres);
//   const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getGenres());
//   }, []);

//   useEffect(() => {
//     if (genresLoaded) {
//       dispatch(fetchMovies({ genres, type: "all" }));
//     }
//   }, [genresLoaded]);

//   onAuthStateChanged(firebaseAuth, (currentUser) => {
//     if (!currentUser) navigate("/login");
//   });

//   window.onscroll = () => {
//     setIsScrolled(window.pageYOffset === 0 ? false : true);
//     return () => (window.onscroll = null);
//   };

//   const handlePlay = () => {
//     navigate("/player");
//   };

//   const handleMoreInfo = () => {
//     // Add more info functionality here
//     console.log("More info clicked");
//   };

//   return (
//     <Container>
//       <Navbar isScrolled={isScrolled} />
//       <div className="hero">
//         <img
//           src={backgroundImage}
//           alt="background"
//           className="background-image"
//         />
//         <div className="container">
//           <div className="logo">
//             <img src={MovieLogo} alt="Movie Logo" />
//           </div>
//           <div className="buttons flex">
//             <Button
//               onClick={handlePlay}
//               className="play-btn flex j-center a-center"
//               aria-label="Play movie"
//             >
//               <FaPlay />
//               <span>Play</span>
//             </Button>
//             <Button
//               onClick={handleMoreInfo}
//               className="info-btn flex j-center a-center"
//               aria-label="More information"
//             >
//               <AiOutlineInfoCircle />
//               <span>More Info</span>
//             </Button>
//           </div>
//         </div>
//       </div>
//       <Slider movies={movies} />
//     </Container>
//   );
// }

// const Container = styled.div`
//   background-color: black;
  
//   .hero {
//     position: relative;
//     height: 100vh;
//     overflow: hidden;
    
//     .background-image {
//       filter: brightness(60%);
//       width: 100%;
//       height: 100%;
//       object-fit: cover;
      
//       /* Mobile optimization */
//       @media (max-width: 768px) {
//         filter: brightness(50%);
//       }
      
//       @media (max-width: 480px) {
//         filter: brightness(45%);
//       }
//     }
    
//     .container {
//       position: absolute;
//       bottom: 5rem;
//       left: 0;
//       right: 0;
//       width: 100%;
      
//       /* Mobile positioning */
//       @media (max-width: 768px) {
//         bottom: 3rem;
//       }
      
//       @media (max-width: 480px) {
//         bottom: 2rem;
//       }
      
//       .logo {
//         margin-left: 5rem;
//         margin-bottom: 2rem;
//         max-width: 600px;
        
//         img {
//           width: 100%;
//           height: auto;
//           max-width: 100%;
//         }
        
//         /* Tablet */
//         @media (max-width: 1024px) {
//           margin-left: 3rem;
//           margin-bottom: 1.5rem;
//           max-width: 500px;
//         }
        
//         /* Mobile */
//         @media (max-width: 768px) {
//           margin-left: 2rem;
//           margin-bottom: 1rem;
//           max-width: 400px;
//         }
        
//         /* Small Mobile */
//         @media (max-width: 480px) {
//           margin-left: 1rem;
//           margin-bottom: 0.8rem;
//           max-width: 280px;
//         }
        
//         /* Extra Small Mobile */
//         @media (max-width: 320px) {
//           max-width: 220px;
//           margin-left: 0.5rem;
//         }
//       }
      
//       .buttons {
//         margin-left: 5rem;
//         gap: 1.5rem;
//         flex-wrap: wrap;
        
//         /* Tablet */
//         @media (max-width: 1024px) {
//           margin-left: 3rem;
//           gap: 1.2rem;
//         }
        
//         /* Mobile */
//         @media (max-width: 768px) {
//           margin-left: 2rem;
//           gap: 1rem;
//         }
        
//         /* Small Mobile */
//         @media (max-width: 480px) {
//           margin-left: 1rem;
//           gap: 0.8rem;
//         }
        
//         /* Extra Small Mobile */
//         @media (max-width: 320px) {
//           margin-left: 0.5rem;
//           gap: 0.6rem;
//         }
//       }
//     }
//   }
// `;

// const Button = styled.button`
//   border: none;
//   cursor: pointer;
//   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   font-weight: 600;
//   border-radius: 4px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.8rem;
//   position: relative;
//   overflow: hidden;
  
//   /* Base button styles */
//   font-size: 1.4rem;
//   padding: 0.8rem 2rem;
//   min-height: 54px;
  
//   /* Desktop hover effects */
//   @media (hover: hover) {
//     &:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      
//       &::after {
//         transform: translateX(0);
//       }
//     }
    
//     &:active {
//       transform: translateY(0);
//     }
//   }
  
//   /* Play Button */
//   &.play-btn {
//     background: rgba(255, 255, 255, 0.95);
//     color: #000;
    
//     &:hover {
//       background: #fff;
//       opacity: 0.9;
//     }
    
//     @media (max-width: 768px) {
//       background: rgba(255, 255, 255, 0.98);
//     }
//   }
  
//   /* Info Button */
//   &.info-btn {
//     background: rgba(109, 109, 110, 0.7);
//     color: white;
//     backdrop-filter: blur(10px);
    
//     svg {
//       font-size: 1.6rem;
//     }
    
//     &:hover {
//       background: rgba(109, 109, 110, 0.9);
//     }
//   }
  
//   /* Tablet Styles */
//   @media (max-width: 1024px) {
//     font-size: 1.2rem;
//     padding: 0.7rem 1.8rem;
//     min-height: 50px;
//     gap: 0.7rem;
    
//     &.info-btn svg {
//       font-size: 1.4rem;
//     }
//   }
  
//   /* Mobile Styles */
//   @media (max-width: 768px) {
//     font-size: 1.1rem;
//     padding: 0.6rem 1.5rem;
//     min-height: 46px;
//     gap: 0.6rem;
//     border-radius: 3px;
    
//     &.info-btn svg {
//       font-size: 1.3rem;
//     }
//   }
  
//   /* Small Mobile Styles */
//   @media (max-width: 480px) {
//     font-size: 1rem;
//     padding: 0.5rem 1.2rem;
//     min-height: 42px;
//     gap: 0.5rem;
//     border-radius: 3px;
    
//     &.info-btn svg {
//       font-size: 1.2rem;
//     }
//   }
  
//   /* Extra Small Mobile */
//   @media (max-width: 320px) {
//     font-size: 0.9rem;
//     padding: 0.4rem 1rem;
//     min-height: 38px;
//     gap: 0.4rem;
    
//     &.info-btn svg {
//       font-size: 1.1rem;
//     }
//   }
  
//   /* Touch device optimizations */
//   @media (hover: none) and (pointer: coarse) {
//     &:active {
//       transform: scale(0.98);
//       opacity: 0.8;
//     }
    
//     /* Larger touch targets for mobile */
//     @media (max-width: 768px) {
//       min-height: 44px;
//       min-width: 120px;
//     }
//   }
  
//   /* Reduced motion support */
//   @media (prefers-reduced-motion: reduce) {
//     transition: none;
    
//     &:hover {
//       transform: none;
//     }
//   }
  
//   /* Focus styles for accessibility */
//   &:focus {
//     outline: 2px solid #e50914;
//     outline-offset: 2px;
//   }
  
//   /* Disabled state */
//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//     transform: none !important;
//   }
  
//   span {
//     white-space: nowrap;
//   }
// `;

// export default Netflix;









































import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay, FaMagic, FaStar, FaRegStar } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import Slider from "../components/Slider";

function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handlePlay = () => {
    navigate("/player");
  };

  const handleRecommendations = () => {
    window.open(
      "https://moviereccomendation-qsrweix7x4shmjye3kbydh.streamlit.app/",
      "_blank"
    );
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <Button
              onClick={handlePlay}
              className="play-btn flex j-center a-center"
              aria-label="Play movie"
            >
              <FaPlay />
              <span>Play</span>
            </Button>
            <RecommendationButton
              onClick={handleRecommendations}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="recommendation-btn flex j-center a-center"
              aria-label="Get AI Recommendations"
              isHovered={isHovered}
            >
              <div className="btn-content">
                <div className="icon-container">
                  <FaMagic className="main-icon" />
                  {isHovered && (
                    <>
                      <IoSparkles className="sparkle sparkle-1" />
                      <IoSparkles className="sparkle sparkle-2" />
                      <IoSparkles className="sparkle sparkle-3" />
                    </>
                  )}
                </div>
                <div className="text-container">
                  <span className="btn-text">Movie Recommendations</span>
                  <span className="btn-subtext">Smart Movie Picks</span>
                </div>
              </div>
              <div className="pulse-ring"></div>
              <div className="glow-effect"></div>
            </RecommendationButton>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}

// Animations
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const sparkle = keyframes`
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: scale(0) rotate(360deg);
    opacity: 0;
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.6);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Container = styled.div`
  background-color: black;

  .hero {
    position: relative;
    height: 100vh;
    overflow: hidden;

    .background-image {
      filter: brightness(60%);
      width: 100%;
      height: 100%;
      object-fit: cover;

      @media (max-width: 768px) {
        filter: brightness(50%);
      }

      @media (max-width: 480px) {
        filter: brightness(45%);
      }
    }

    .container {
      position: absolute;
      bottom: 5rem;
      left: 0;
      right: 0;
      width: 100%;

      @media (max-width: 768px) {
        bottom: 3rem;
      }

      @media (max-width: 480px) {
        bottom: 2rem;
      }

      .logo {
        margin-left: 5rem;
        margin-bottom: 2rem;
        max-width: 600px;

        img {
          width: 100%;
          height: auto;
          max-width: 100%;
        }

        @media (max-width: 1024px) {
          margin-left: 3rem;
          margin-bottom: 1.5rem;
          max-width: 500px;
        }

        @media (max-width: 768px) {
          margin-left: 2rem;
          margin-bottom: 1rem;
          max-width: 400px;
        }

        @media (max-width: 480px) {
          margin-left: 1rem;
          margin-bottom: 0.8rem;
          max-width: 280px;
        }

        @media (max-width: 320px) {
          max-width: 220px;
          margin-left: 0.5rem;
        }
      }

      .buttons {
        margin-left: 5rem;
        gap: 1.5rem;
        flex-wrap: wrap;
        align-items: center;

        @media (max-width: 1024px) {
          margin-left: 3rem;
          gap: 1.2rem;
        }

        @media (max-width: 768px) {
          margin-left: 2rem;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        }

        @media (max-width: 480px) {
          margin-left: 1rem;
          gap: 0.8rem;
        }

        @media (max-width: 320px) {
          margin-left: 0.5rem;
          gap: 0.6rem;
        }
      }
    }
  }
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  position: relative;
  overflow: hidden;

  font-size: 1.4rem;
  padding: 0.8rem 2rem;
  min-height: 54px;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }
    &:active {
      transform: translateY(0);
    }
  }

  &.play-btn {
    background: rgba(255, 255, 255, 0.95);
    color: #000;
    border: 2px solid transparent;
    
    &:hover {
      background: #fff;
      border-color: rgba(255, 255, 255, 0.8);
    }
  }

  @media (max-width: 1024px) {
    font-size: 1.2rem;
    padding: 0.7rem 1.8rem;
    min-height: 50px;
    gap: 0.7rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.6rem 1.5rem;
    min-height: 46px;
    gap: 0.6rem;
    border-radius: 6px;
    width: 200px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.5rem 1.2rem;
    min-height: 42px;
    gap: 0.5rem;
    border-radius: 6px;
    width: 180px;
  }

  @media (max-width: 320px) {
    font-size: 0.9rem;
    padding: 0.4rem 1rem;
    min-height: 38px;
    gap: 0.4rem;
    width: 160px;
  }

  &:focus {
    outline: 2px solid #e50914;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  span {
    white-space: nowrap;
  }
`;

const RecommendationButton = styled.button`
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 700;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, 
    rgba(255, 215, 0, 0.9) 0%, 
    rgba(255, 165, 0, 0.9) 50%, 
    rgba(255, 69, 0, 0.9) 100%);
  color: #000;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  animation: ${glow} 2s ease-in-out infinite;
  padding: 0.9rem 2rem;
  min-height: 60px;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    animation: ${pulse} 0.6s ease-in-out, ${glow} 2s ease-in-out infinite;
    background: linear-gradient(135deg, 
      rgba(255, 215, 0, 1) 0%, 
      rgba(255, 165, 0, 1) 50%, 
      rgba(255, 69, 0, 1) 100%);
    box-shadow: 0 15px 35px rgba(255, 215, 0, 0.4);
  }

  &:active {
    transform: translateY(-1px) scale(1);
  }

  .btn-content {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    z-index: 2;
    position: relative;
  }

  .icon-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${float} 3s ease-in-out infinite;
  }

  .main-icon {
    font-size: 1.6rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  .sparkle {
    position: absolute;
    font-size: 0.8rem;
    color: #fff;
    animation: ${sparkle} 1.5s ease-in-out infinite;
    
    &.sparkle-1 {
      top: -8px;
      right: -5px;
      animation-delay: 0s;
    }
    
    &.sparkle-2 {
      bottom: -6px;
      left: -8px;
      animation-delay: 0.5s;
    }
    
    &.sparkle-3 {
      top: -4px;
      left: -4px;
      animation-delay: 1s;
    }
  }

  .text-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.1rem;
  }

  .btn-text {
    font-size: 1.3rem;
    font-weight: 700;
    white-space: nowrap;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    animation: ${slideIn} 0.5s ease-out;
  }

  .btn-subtext {
    font-size: 0.75rem;
    font-weight: 500;
    opacity: 0.9;
    white-space: nowrap;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .pulse-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
    animation: ${pulse} 2s ease-in-out infinite;
  }

  .glow-effect {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, 
      rgba(255, 255, 255, 0.4) 0%, 
      transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 10px;
  }

  &:hover .glow-effect {
    opacity: 1;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    padding: 0.8rem 1.8rem;
    min-height: 55px;
    
    .btn-text {
      font-size: 1.2rem;
    }
    
    .btn-subtext {
      font-size: 0.7rem;
    }
    
    .main-icon {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    padding: 0.7rem 1.5rem;
    min-height: 50px;
    border-radius: 10px;
    width: 240px;
    
    .btn-content {
      gap: 0.6rem;
    }
    
    .btn-text {
      font-size: 1.1rem;
    }
    
    .btn-subtext {
      font-size: 0.65rem;
    }
    
    .main-icon {
      font-size: 1.4rem;
    }
    
    .sparkle {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    min-height: 45px;
    border-radius: 8px;
    width: 220px;
    
    .btn-content {
      gap: 0.5rem;
    }
    
    .btn-text {
      font-size: 1rem;
    }
    
    .btn-subtext {
      font-size: 0.6rem;
    }
    
    .main-icon {
      font-size: 1.3rem;
    }
    
    .sparkle {
      font-size: 0.6rem;
    }
  }

  @media (max-width: 320px) {
    padding: 0.5rem 1rem;
    min-height: 40px;
    width: 200px;
    
    .btn-text {
      font-size: 0.9rem;
    }
    
    .btn-subtext {
      font-size: 0.55rem;
    }
    
    .main-icon {
      font-size: 1.2rem;
    }
  }

  &:focus {
    outline: 3px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    animation: none;
  }
`;

export default Netflix;
