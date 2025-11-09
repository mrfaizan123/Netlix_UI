













// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { IoPlayCircleSharp } from "react-icons/io5";
// import { AiOutlinePlus } from "react-icons/ai";
// import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
// import { BiChevronDown } from "react-icons/bi";
// import { BsCheck } from "react-icons/bs";
// import axios from "axios";
// import { onAuthStateChanged } from "firebase/auth";
// import { firebaseAuth } from "../utils/firebase-config";
// import { useDispatch } from "react-redux";
// import { removeMovieFromLiked } from "../store";

// export default React.memo(function Card({ index, movieData, isLiked = false }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isHovered, setIsHovered] = useState(false);
//   const [email, setEmail] = useState(undefined);

//   onAuthStateChanged(firebaseAuth, (currentUser) => {
//     if (currentUser) setEmail(currentUser.email);
//     else navigate("/login");
//   });

//   const addToList = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/user/add", {
//         email,
//         data: movieData,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handlePlay = () => {
//     navigate("/player", { state: { movie: movieData } });
//   };

//   return (
//     <Container
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <img
//         src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
//         alt="card"
//         onClick={handlePlay}
//       />
//       {isHovered && (
//         <div className="hover">
//           <div className="image-video-container">
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
//               alt="card"
//               onClick={handlePlay}
//             />
//           </div>
//           <div className="info-container flex column">
//             <h3 className="name" onClick={handlePlay}>
//               {movieData.name}
//             </h3>
//             <div className="icons flex j-between">
//               <div className="controls flex">
//                 <IoPlayCircleSharp title="Play" onClick={handlePlay} />
//                 <RiThumbUpFill title="Like" />
//                 <RiThumbDownFill title="Dislike" />
//                 {isLiked ? (
//                   <BsCheck
//                     title="Remove from List"
//                     onClick={() =>
//                       dispatch(
//                         removeMovieFromLiked({ movieId: movieData.id, email })
//                       )
//                     }
//                   />
//                 ) : (
//                   <AiOutlinePlus title="Add to my list" onClick={addToList} />
//                 )}
//               </div>
//               <div className="info">
//                 <BiChevronDown title="More Info" />
//               </div>
//             </div>
//             <div className="genres flex">
//               <ul className="flex">
//                 {movieData.genres.map((genre, idx) => (
//                   <li key={idx}>{genre}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </Container>
//   );
// });

// const Container = styled.div`
//   max-width: 230px;
//   width: 230px;
//   height: 100%;
//   cursor: pointer;
//   position: relative;
//   img {
//     border-radius: 0.2rem;
//     width: 100%;
//     height: 100%;
//     z-index: 10;
//   }
//   .hover {
//     z-index: 99;
//     height: max-content;
//     width: 20rem;
//     position: absolute;
//     top: -18vh;
//     left: 0;
//     border-radius: 0.3rem;
//     box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
//     background-color: #181818;
//     transition: 0.3s ease-in-out;
//     .info-container {
//       padding: 1rem;
//       gap: 0.5rem;
//     }
//   }
// `;



// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { IoPlayCircleSharp } from "react-icons/io5";
// import { AiOutlinePlus } from "react-icons/ai";
// import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
// import { BiChevronDown } from "react-icons/bi";
// import { BsCheck } from "react-icons/bs";
// import axios from "axios";
// import { onAuthStateChanged } from "firebase/auth";
// import { firebaseAuth } from "../utils/firebase-config";
// import { useDispatch } from "react-redux";
// import { removeMovieFromLiked } from "../store";

// export default React.memo(function Card({ index, movieData, isLiked = false }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isHovered, setIsHovered] = useState(false);
//   const [email, setEmail] = useState(undefined);
//   const [isImageLoaded, setIsImageLoaded] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
//       if (currentUser) {
//         setEmail(currentUser.email);
//       } else {
//         navigate("/login");
//       }
//     });

//     return () => unsubscribe();
//   }, [navigate]);

//   const addToList = useCallback(async () => {
//     try {
//       await axios.post("http://localhost:5000/api/user/add", {
//         email,
//         data: movieData,
//       });
//     } catch (error) {
//       console.error("Error adding to list:", error);
//     }
//   }, [email, movieData]);

//   const handlePlay = useCallback(() => {
//     navigate("/player", { state: { movie: movieData } });
//   }, [navigate, movieData]);

//   const handleRemoveFromLiked = useCallback(() => {
//     if (email && movieData?.id) {
//       dispatch(removeMovieFromLiked({ movieId: movieData.id, email }));
//     }
//   }, [dispatch, email, movieData]);

//   const handleMouseEnter = useCallback(() => setIsHovered(true), []);
//   const handleMouseLeave = useCallback(() => setIsHovered(false), []);
//   const handleImageLoad = useCallback(() => setIsImageLoaded(true), []);

//   const imageUrl = `https://image.tmdb.org/t/p/w500${movieData?.image}`;

//   return (
//     <Container
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       aria-label={`Movie card: ${movieData?.name || 'Unknown'}`}
//       $isHovered={isHovered}
//     >
//       <ImageWrapper>
//         <img
//           src={imageUrl}
//           alt={`Poster for ${movieData?.name || 'movie'}`}
//           onClick={handlePlay}
//           onLoad={handleImageLoad}
//           loading="lazy"
//           className={isImageLoaded ? "loaded" : "loading"}
//         />
//         {!isImageLoaded && <ImagePlaceholder />}
        
//         {/* Play overlay on main image */}
//         <PlayOverlay className="play-overlay" onClick={handlePlay}>
//           <IoPlayCircleSharp />
//           <span>Play</span>
//         </PlayOverlay>
//       </ImageWrapper>
      
//       {isHovered && (
//         <HoverCard role="dialog" aria-label="Movie actions">
//           <div className="image-video-container">
//             <img
//               src={imageUrl}
//               alt={`Poster for ${movieData?.name || 'movie'}`}
//               className={isImageLoaded ? "loaded" : "loading"}
//             />
//             <HoverPlayButton onClick={handlePlay}>
//               <IoPlayCircleSharp />
//               Play
//             </HoverPlayButton>
//           </div>
          
//           <div className="info-container">
//             <h3 className="name">{movieData?.name}</h3>
            
//             <div className="icons-container">
//               <div className="controls">
//                 <IconButton 
//                   onClick={handlePlay}
//                   aria-label="Play movie"
//                   title="Play"
//                   className="play-btn"
//                 >
//                   <IoPlayCircleSharp />
//                 </IconButton>
//                 {/* <IconButton aria-label="Like movie" title="Like">
//                   <RiThumbUpFill />
//                 </IconButton>
//                 <IconButton aria-label="Dislike movie" title="Dislike">
//                   <RiThumbDownFill />
//                 </IconButton> */}
//                 {isLiked ? (
//                   <IconButton 
//                     onClick={handleRemoveFromLiked}
//                     aria-label="Remove from list"
//                     title="Remove from List"
//                     className="remove-btn"
//                   >
//                     <BsCheck />
//                   </IconButton>
//                 ) : (
//                   <IconButton 
//                     onClick={addToList}
//                     aria-label="Add to my list"
//                     title="Add to my list"
//                     className="add-btn"
//                   >
//                     <AiOutlinePlus />
//                   </IconButton>
//                 )}
//               </div>
              
//               <div className="info">
//                 <IconButton aria-label="More info" title="More Info">
//                   <BiChevronDown />
//                 </IconButton>
//               </div>
//             </div>
            
//             {movieData?.genres && movieData.genres.length > 0 && (
//               <div className="genres">
//                 <ul>
//                   {movieData.genres.map((genre, idx) => (
//                     <li key={`${genre}-${idx}`}>{genre}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </HoverCard>
//       )}
//     </Container>
//   );
// });

// // Styled Components
// const Container = styled.div`
//   max-width: 230px;
//   width: 230px;
//   height: 100%;
//   cursor: pointer;
//   position: relative;
//   transition: all 0.3s ease-in-out;
//   border-radius: 0.5rem;
//   overflow: visible;

//   &:hover {
//     transform: scale(1.05);
//     z-index: 100;
//   }
// `;

// const ImageWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   height: 100%;
//   border-radius: 0.5rem;
//   overflow: hidden;
  
//   img {
//     border-radius: 0.5rem;
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: all 0.3s ease;
    
//     &.loading {
//       opacity: 0;
//     }
    
//     &.loaded {
//       opacity: 1;
//     }
//   }

//   &:hover .play-overlay {
//     opacity: 1;
//   }
// `;

// const PlayOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(
//     to bottom,
//     rgba(0, 0, 0, 0.2) 0%,
//     rgba(0, 0, 0, 0.4) 50%,
//     rgba(0, 0, 0, 0.8) 100%
//   );
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   opacity: 0;
//   transition: all 0.3s ease;
//   border-radius: 0.5rem;
//   cursor: pointer;

//   svg {
//     font-size: 3rem;
//     color: white;
//     margin-bottom: 0.5rem;
//     filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
//   }

//   span {
//     color: white;
//     font-weight: 600;
//     font-size: 1rem;
//     text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
//   }

//   &:hover {
//     background: linear-gradient(
//       to bottom,
//       rgba(0, 0, 0, 0.3) 0%,
//       rgba(0, 0, 0, 0.5) 50%,
//       rgba(0, 0, 0, 0.9) 100%
//     );
    
//     svg {
//       transform: scale(1.1);
//     }
//   }
// `;

// const HoverCard = styled.div`
//   z-index: 100;
//   height: max-content;
//   width: 320px;
//   position: absolute;
//   top: -200px;
//   left: 50%;
//   transform: translateX(-50%);
//   border-radius: 0.8rem;
//   box-shadow: 
//     rgba(0, 0, 0, 0.8) 0px 10px 30px,
//     rgba(255, 255, 255, 0.1) 0px 0px 0px 1px;
//   background: linear-gradient(135deg, #181818 0%, #2d2d2d 100%);
//   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   animation: slideUp 0.3s ease-out;
//   overflow: hidden;

//   @keyframes slideUp {
//     from { 
//       opacity: 0;
//       transform: translateX(-50%) translateY(20px);
//     }
//     to { 
//       opacity: 1;
//       transform: translateX(-50%) translateY(0);
//     }
//   }

//   .image-video-container {
//     position: relative;
//     width: 100%;
//     height: 180px;
//     overflow: hidden;

//     img {
//       width: 100%;
//       height: 100%;
//       object-fit: cover;
//     }
//   }

//   .info-container {
//     padding: 1.2rem;
//     gap: 0.8rem;
//     display: flex;
//     flex-direction: column;

//     .name {
//       font-size: 1.2rem;
//       font-weight: 700;
//       color: white;
//       margin: 0;
//       line-height: 1.3;
//     }
//   }

//   .icons-container {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;

//     .controls {
//       display: flex;
//       gap: 0.5rem;
//       align-items: center;
//     }
//   }

//   .genres {
//     margin-top: 0.5rem;

//     ul {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 0.5rem;
//       margin: 0;
//       padding: 0;
//       list-style: none;

//       li {
//         color: #d2d2d2;
//         font-size: 0.8rem;
//         padding: 0.2rem 0.6rem;
//         background: rgba(255, 255, 255, 0.1);
//         border-radius: 12px;
//         border: 1px solid rgba(255, 255, 255, 0.2);
//       }
//     }
//   }
// `;

// const HoverPlayButton = styled.button`
//   position: absolute;
//   bottom: 1rem;
//   left: 1rem;
//   background: rgba(255, 255, 255, 0.95);
//   color: #000;
//   border: none;
//   border-radius: 4px;
//   padding: 0.5rem 1rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   font-weight: 600;
//   font-size: 0.9rem;
//   cursor: pointer;
//   transition: all 0.2s ease;
//   z-index: 10;

//   svg {
//     font-size: 1.2rem;
//   }

//   &:hover {
//     background: white;
//     transform: scale(1.05);
//   }

//   &:active {
//     transform: scale(0.95);
//   }
// `;

// const IconButton = styled.button`
//   background: rgba(255, 255, 255, 0.1);
//   border: 1px solid rgba(255, 255, 255, 0.3);
//   color: white;
//   cursor: pointer;
//   padding: 0.5rem;
//   border-radius: 50%;
//   transition: all 0.2s ease;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   backdrop-filter: blur(10px);

//   &:hover {
//     background: rgba(255, 255, 255, 0.2);
//     border-color: rgba(255, 255, 255, 0.5);
//     transform: scale(1.15);
//   }

//   &:focus {
//     outline: 2px solid #e50914;
//     outline-offset: 2px;
//   }

//   svg {
//     font-size: 1.2rem;
//   }

//   &.play-btn:hover {
//     background: rgba(229, 9, 20, 0.8);
//     border-color: #e50914;
//   }

//   &.add-btn:hover,
//   &.remove-btn:hover {
//     background: rgba(255, 255, 255, 0.3);
//   }
// `;

// const ImagePlaceholder = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(45deg, #2a2a2a 25%, #333 25%, #333 50%, #2a2a2a 50%, #2a2a2a 75%, #333 75%);
//   background-size: 20px 20px;
//   border-radius: 0.5rem;
//   z-index: 1;
// `;










import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";

export default React.memo(function Card({ index, movieData, isLiked = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const addToList = useCallback(async () => {
    try {
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
    } catch (error) {
      console.error("Error adding to list:", error);
    }
  }, [email, movieData]);

  const handlePlay = useCallback(() => {
    navigate("/player", { state: { movie: movieData } });
  }, [navigate, movieData]);

  const handleRemoveFromLiked = useCallback(() => {
    if (email && movieData?.id) {
      dispatch(removeMovieFromLiked({ movieId: movieData.id, email }));
    }
  }, [dispatch, email, movieData]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const handleTouchStart = useCallback(() => {
    setIsTouched(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => setIsTouched(false), 300);
  }, []);

  const handleImageLoad = useCallback(() => setIsImageLoaded(true), []);

  const showActions = isHovered || isTouched;
  const imageUrl = `https://image.tmdb.org/t/p/w500${movieData?.image}`;

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label={`Movie card: ${movieData?.name || 'Unknown'}`}
      $isHovered={showActions}
      $isMobile={isMobile}
    >
      <CardContent>
        <ImageWrapper $isMobile={isMobile}>
          <img
            src={imageUrl}
            alt={`Poster for ${movieData?.name || 'movie'}`}
            onClick={handlePlay}
            onLoad={handleImageLoad}
            loading="lazy"
            className={isImageLoaded ? "loaded" : "loading"}
          />
          {!isImageLoaded && <ImagePlaceholder />}
          
          {/* Gradient Overlay */}
          <GradientOverlay $isMobile={isMobile} />
          
          {/* Play Button - Always visible on mobile */}
          <PlayButton 
            onClick={handlePlay}
            $isMobile={isMobile}
            className="play-btn"
          >
            <IoPlayCircleSharp />
          </PlayButton>

          {/* Action Buttons */}
          <ActionButtons $isMobile={isMobile}>
            {isLiked ? (
              <ActionButton 
                onClick={handleRemoveFromLiked}
                className="remove"
                $isMobile={isMobile}
              >
                <BsCheck />
              </ActionButton>
            ) : (
              <ActionButton 
                onClick={addToList}
                className="add"
                $isMobile={isMobile}
              >
                <AiOutlinePlus />
              </ActionButton>
            )}
          </ActionButtons>

          {/* Rating Badge */}
          {movieData?.rating && (
            <RatingBadge $isMobile={isMobile}>
              ⭐ {movieData.rating}
            </RatingBadge>
          )}
        </ImageWrapper>
        
        {/* Movie Info */}
        <MovieInfo $isMobile={isMobile}>
          <MovieTitle>{movieData?.name}</MovieTitle>
          <MovieMeta>
            {movieData?.year && <span>{movieData.year}</span>}
            {movieData?.duration && <span>{movieData.duration}</span>}
          </MovieMeta>
        </MovieInfo>
      </CardContent>
      
      {/* Desktop Hover Card */}
      {showActions && !isMobile && (
        <HoverCard role="dialog" aria-label="Movie actions">
          <HoverImageContainer>
            <img
              src={imageUrl}
              alt={`Poster for ${movieData?.name || 'movie'}`}
              onLoad={handleImageLoad}
              className={isImageLoaded ? "loaded" : "loading"}
            />
            <HoverPlayButton onClick={handlePlay}>
              <IoPlayCircleSharp />
              Play Now
            </HoverPlayButton>
          </HoverImageContainer>
          
          <HoverInfoContainer>
            <h3 className="name">{movieData?.name}</h3>
            
            <HoverActions>
              <div className="controls">
                <HoverIconButton 
                  onClick={handlePlay}
                  aria-label="Play movie"
                  title="Play"
                  className="play-btn"
                >
                  <IoPlayCircleSharp />
                </HoverIconButton>
                {isLiked ? (
                  <HoverIconButton 
                    onClick={handleRemoveFromLiked}
                    aria-label="Remove from list"
                    title="Remove from List"
                    className="remove-btn"
                  >
                    <BsCheck />
                  </HoverIconButton>
                ) : (
                  <HoverIconButton 
                    onClick={addToList}
                    aria-label="Add to my list"
                    title="Add to my list"
                    className="add-btn"
                  >
                    <AiOutlinePlus />
                  </HoverIconButton>
                )}
              </div>
              
              <HoverIconButton aria-label="More info" title="More Info">
                <BiChevronDown />
              </HoverIconButton>
            </HoverActions>
            
            {movieData?.genres && movieData.genres.length > 0 && (
              <HoverGenres>
                {movieData.genres.map((genre, idx) => (
                  <GenreTag key={`${genre}-${idx}`}>{genre}</GenreTag>
                ))}
              </HoverGenres>
            )}
          </HoverInfoContainer>
        </HoverCard>
      )}
    </Container>
  );
});

// Styled Components
const Container = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 12px;
  overflow: visible;
  background: ${props => props.$isMobile ? 
    'linear-gradient(135deg, #1a1a1a 0%, #252525 50%, #1a1a1a 100%)' : 
    'transparent'};
  padding: ${props => props.$isMobile ? '8px' : '0'};
  box-shadow: ${props => props.$isMobile ? 
    '0 6px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)' : 
    'none'};
  border: ${props => props.$isMobile ? '1px solid rgba(255, 255, 255, 0.08)' : 'none'};
  margin: 0;

  ${props => !props.$isMobile && `
    &:hover {
      transform: scale(1.05) translateY(-8px);
      z-index: 100;
    }
  `}

  @media (max-width: 768px) {
    margin-bottom: 4px;
    &:active {
      transform: scale(0.96);
    }
  }

  /* Mobile-specific sizing */
  @media (max-width: 480px) {
    width: 150px;
    padding: 6px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 160px;
  }

  @media (min-width: 769px) {
    width: 200px;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 12px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 2/3;
  background: linear-gradient(45deg, #1a1a1a 25%, #222 25%, #222 50%, #1a1a1a 50%, #1a1a1a 75%, #222 75%);
  background-size: 20px 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
    border-radius: 10px;
    
    &.loading {
      opacity: 0;
    }
    
    &.loaded {
      opacity: 1;
    }
  }

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
    
    .play-btn {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    border-radius: 8px;
    
    img {
      border-radius: 8px;
    }
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
  opacity: ${props => props.$isMobile ? 0.6 : 0};
  transition: opacity 0.3s ease;
  border-radius: 10px;
  pointer-events: none;

  ${ImageWrapper}:hover & {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    opacity: 0.6;
  }
`;

const PlayButton = styled.button`
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(229, 9, 20, 0.95);
  border: none;
  border-radius: 50%;
  width: ${props => props.$isMobile ? '44px' : '50px'};
  height: ${props => props.$isMobile ? '44px' : '50px'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(229, 9, 20, 0.4);
  opacity: ${props => props.$isMobile ? 1 : 0};
  z-index: 3;

  svg {
    color: white;
    font-size: ${props => props.$isMobile ? '1.6rem' : '1.8rem'};
    margin-left: 2px;
  }

  &:hover {
    background: #e50914;
    transform: scale(1.15);
    box-shadow: 0 6px 25px rgba(229, 9, 20, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    opacity: 1;
    
    &:active {
      transform: scale(0.9);
    }
  }
`;

const ActionButtons = styled.div`
  position: absolute;
  top: ${props => props.$isMobile ? '8px' : '12px'};
  right: ${props => props.$isMobile ? '8px' : '12px'};
  display: flex;
  flex-direction: column;
  gap: ${props => props.$isMobile ? '6px' : '8px'};
  z-index: 3;
  opacity: ${props => props.$isMobile ? 1 : 0};
  transition: all 0.3s ease;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  background: rgba(0, 0, 0, 0.85);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 50%;
  width: ${props => props.$isMobile ? '36px' : '40px'};
  height: ${props => props.$isMobile ? '36px' : '40px'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.4);

  svg {
    font-size: ${props => props.$isMobile ? '1.1rem' : '1.2rem'};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.15);
  }

  &:active {
    transform: scale(0.9);
  }

  &.add:hover, &.remove:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    &:active {
      transform: scale(0.85);
    }
  }
`;

const RatingBadge = styled.div`
  position: absolute;
  top: ${props => props.$isMobile ? '8px' : '12px'};
  left: ${props => props.$isMobile ? '8px' : '12px'};
  background: rgba(0, 0, 0, 0.85);
  color: #ffd700;
  padding: ${props => props.$isMobile ? '4px 8px' : '6px 10px'};
  border-radius: 20px;
  font-size: ${props => props.$isMobile ? '0.75rem' : '0.8rem'};
  font-weight: 700;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.3);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  z-index: 3;
`;

const MovieInfo = styled.div`
  padding: ${props => props.$isMobile ? '0 4px 4px 4px' : '8px 0 0 0'};
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MovieTitle = styled.h3`
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    -webkit-line-clamp: 2;
  }
`;

const MovieMeta = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  
  span {
    color: #b0b0b0;
    font-size: 0.8rem;
    font-weight: 500;
    
    &:not(:last-child) {
      position: relative;
      &:after {
        content: "•";
        margin-left: 8px;
        color: #666;
      }
    }
  }
  
  @media (max-width: 480px) {
    gap: 8px;
    span {
      font-size: 0.75rem;
    }
  }
`;

const ImagePlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #1a1a1a 25%, #222 25%, #222 50%, #1a1a1a 50%, #1a1a1a 75%, #222 75%);
  background-size: 20px 20px;
  border-radius: 10px;
  z-index: 1;
`;

// Hover Card Styles for Desktop - COMPLETELY FIXED
const HoverCard = styled.div`
  z-index: 1000;
  height: auto;
  width: 320px;
  position: absolute;
  top: -280px; /* Increased to ensure full visibility */
  left: 50%;
  transform: translateX(-50%);
  border-radius: 12px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.9),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  background: #181818;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideUp 0.3s ease-out;
  overflow: hidden; /* Changed back to hidden for proper border-radius */
  border: 1px solid rgba(255, 255, 255, 0.15);
  pointer-events: auto;

  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  /* Ensure hover card doesn't get cut off */
  @media (min-width: 769px) {
    &:before {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 100px;
      background: transparent;
      z-index: -1;
    }
  }
`;

const HoverImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden; /* Ensure image stays within container */
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
    display: block;
    
    &.loading {
      opacity: 0;
    }
    
    &.loaded {
      opacity: 1;
    }
  }
`;

const HoverPlayButton = styled.button`
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: #e50914;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(229, 9, 20, 0.4);

  svg {
    font-size: 1.3rem;
  }

  &:hover {
    background: #f40612;
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(229, 9, 20, 0.6);
  }
`;

const HoverInfoContainer = styled.div`
  padding: 20px;
  background: #181818;
  border-radius: 0 0 12px 12px;

  .name {
    font-size: 1.3rem;
    font-weight: 700;
    color: white;
    margin: 0 0 12px 0;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const HoverActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;

  .controls {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;

const HoverIconButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.15);
  }

  svg {
    font-size: 1.3rem;
  }

  &.play-btn:hover {
    background: #e50914;
    border-color: #e50914;
  }
`;

const HoverGenres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const GenreTag = styled.span`
  color: #d2d2d2;
  font-size: 0.8rem;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  white-space: nowrap;
`;

// Global Styles
const GlobalStyle = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;

// Container styles
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  padding: 0 !important;
  margin: 0 !important;
  width: 100%;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
    padding: 0 !important;
    margin: 0 !important;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 14px;
    padding: 0 !important;
    margin: 0 !important;
  }

  @media (min-width: 769px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
    padding: 0 !important;
    margin: 0 !important;
  }
`;

// Parent container that holds the cards
const MoviesSection = styled.section`
  padding: 0 !important;
  margin: 0 !important;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 0 !important;
  }
  
  @media (min-width: 769px) {
    padding: 0 !important;
  }
`;