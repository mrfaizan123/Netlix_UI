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
//             <button
//               onClick={() => navigate("/player")}
//               className="flex j-center a-center"
//             >
//               <FaPlay />
//               Play
//             </button>
//             <button className="flex j-center a-center">
//               <AiOutlineInfoCircle />
//               More Info
//             </button>
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
//     .background-image {
//       filter: brightness(60%);
//     }
//     img {
//       height: 100vh;
//       width: 100vw;
//     }
//     .container {
//       position: absolute;
//       bottom: 5rem;
//       .logo {
//         img {
//           width: 100%;
//           height: 100%;
//           margin-left: 5rem;
//         }
//       }
//       .buttons {
//         margin: 5rem;
//         gap: 2rem;
//         button {
//           font-size: 1.4rem;
//           gap: 1rem;
//           border-radius: 0.2rem;
//           padding: 0.5rem;
//           padding-left: 2rem;
//           padding-right: 2.4rem;
//           border: none;
//           cursor: pointer;
//           transition: 0.2s ease-in-out;
//           &:hover {
//             opacity: 0.8;
//           }
//           &:nth-of-type(2) {
//             background-color: rgba(109, 109, 110, 0.7);
//             color: white;
//             svg {
//               font-size: 1.8rem;
//             }
//           }
//         }
//       }
//     }
//   }
// `;
// export default Netflix;





import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";

function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
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

  const handleMoreInfo = () => {
    // Add more info functionality here
    console.log("More info clicked");
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
            <Button
              onClick={handleMoreInfo}
              className="info-btn flex j-center a-center"
              aria-label="More information"
            >
              <AiOutlineInfoCircle />
              <span>More Info</span>
            </Button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}

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
      
      /* Mobile optimization */
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
      
      /* Mobile positioning */
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
        
        /* Tablet */
        @media (max-width: 1024px) {
          margin-left: 3rem;
          margin-bottom: 1.5rem;
          max-width: 500px;
        }
        
        /* Mobile */
        @media (max-width: 768px) {
          margin-left: 2rem;
          margin-bottom: 1rem;
          max-width: 400px;
        }
        
        /* Small Mobile */
        @media (max-width: 480px) {
          margin-left: 1rem;
          margin-bottom: 0.8rem;
          max-width: 280px;
        }
        
        /* Extra Small Mobile */
        @media (max-width: 320px) {
          max-width: 220px;
          margin-left: 0.5rem;
        }
      }
      
      .buttons {
        margin-left: 5rem;
        gap: 1.5rem;
        flex-wrap: wrap;
        
        /* Tablet */
        @media (max-width: 1024px) {
          margin-left: 3rem;
          gap: 1.2rem;
        }
        
        /* Mobile */
        @media (max-width: 768px) {
          margin-left: 2rem;
          gap: 1rem;
        }
        
        /* Small Mobile */
        @media (max-width: 480px) {
          margin-left: 1rem;
          gap: 0.8rem;
        }
        
        /* Extra Small Mobile */
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
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  position: relative;
  overflow: hidden;
  
  /* Base button styles */
  font-size: 1.4rem;
  padding: 0.8rem 2rem;
  min-height: 54px;
  
  /* Desktop hover effects */
  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      
      &::after {
        transform: translateX(0);
      }
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  /* Play Button */
  &.play-btn {
    background: rgba(255, 255, 255, 0.95);
    color: #000;
    
    &:hover {
      background: #fff;
      opacity: 0.9;
    }
    
    @media (max-width: 768px) {
      background: rgba(255, 255, 255, 0.98);
    }
  }
  
  /* Info Button */
  &.info-btn {
    background: rgba(109, 109, 110, 0.7);
    color: white;
    backdrop-filter: blur(10px);
    
    svg {
      font-size: 1.6rem;
    }
    
    &:hover {
      background: rgba(109, 109, 110, 0.9);
    }
  }
  
  /* Tablet Styles */
  @media (max-width: 1024px) {
    font-size: 1.2rem;
    padding: 0.7rem 1.8rem;
    min-height: 50px;
    gap: 0.7rem;
    
    &.info-btn svg {
      font-size: 1.4rem;
    }
  }
  
  /* Mobile Styles */
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.6rem 1.5rem;
    min-height: 46px;
    gap: 0.6rem;
    border-radius: 3px;
    
    &.info-btn svg {
      font-size: 1.3rem;
    }
  }
  
  /* Small Mobile Styles */
  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.5rem 1.2rem;
    min-height: 42px;
    gap: 0.5rem;
    border-radius: 3px;
    
    &.info-btn svg {
      font-size: 1.2rem;
    }
  }
  
  /* Extra Small Mobile */
  @media (max-width: 320px) {
    font-size: 0.9rem;
    padding: 0.4rem 1rem;
    min-height: 38px;
    gap: 0.4rem;
    
    &.info-btn svg {
      font-size: 1.1rem;
    }
  }
  
  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    &:active {
      transform: scale(0.98);
      opacity: 0.8;
    }
    
    /* Larger touch targets for mobile */
    @media (max-width: 768px) {
      min-height: 44px;
      min-width: 120px;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    
    &:hover {
      transform: none;
    }
  }
  
  /* Focus styles for accessibility */
  &:focus {
    outline: 2px solid #e50914;
    outline-offset: 2px;
  }
  
  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
  
  span {
    white-space: nowrap;
  }
`;

export default Netflix;