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

// Styled Components
const Container = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a1a 0%, #252525 50%, #1a1a1a 100%);
  padding: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin: 0;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    padding: 6px;
    margin-bottom: 4px;
    
    &:active {
      transform: scale(0.98);
    }
  }

  @media (max-width: 480px) {
    width: 150px;
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
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 2/3;
  background: linear-gradient(45deg, #1a1a1a 25%, #222 25%, #222 50%, #1a1a1a 50%, #1a1a1a 75%, #222 75%);
  background-size: 20px 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    
    &.loading {
      opacity: 0;
    }
    
    &.loaded {
      opacity: 1;
    }
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    transparent 100%
  );
  border-radius: 8px;
  pointer-events: none;
`;

const PlayButton = styled.button`
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(229, 9, 20, 0.95);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(229, 9, 20, 0.4);
  z-index: 3;

  svg {
    color: white;
    font-size: 1.8rem;
    margin-left: 2px;
  }

  &:hover {
    background: #e50914;
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(229, 9, 20, 0.6);
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    
    svg {
      font-size: 1.6rem;
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 3;

  @media (max-width: 768px) {
    top: 8px;
    right: 8px;
    gap: 6px;
  }
`;

const ActionButton = styled.button`
  background: rgba(0, 0, 0, 0.85);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.4);

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.1);
  }

  &.add:hover, &.remove:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    
    svg {
      font-size: 1.1rem;
    }
  }
`;

const RatingBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.85);
  color: #ffd700;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.3);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  z-index: 3;

  @media (max-width: 768px) {
    top: 8px;
    left: 8px;
    padding: 4px 8px;
    font-size: 0.75rem;
  }
`;

const MovieInfo = styled.div`
  padding: 0 4px 4px 4px;
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
  border-radius: 8px;
  z-index: 1;
`;

// Main Component
export default React.memo(function Card({ index, movieData, isLiked = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(undefined);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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

  const handleImageLoad = useCallback(() => setIsImageLoaded(true), []);

  const imageUrl = `https://image.tmdb.org/t/p/w500${movieData?.image}`;

  return (
    <Container>
      <CardContent>
        <ImageWrapper>
          <img
            src={imageUrl}
            alt={`Poster for ${movieData?.name || 'movie'}`}
            onClick={handlePlay}
            onLoad={handleImageLoad}
            loading="lazy"
            className={isImageLoaded ? "loaded" : "loading"}
          />
          {!isImageLoaded && <ImagePlaceholder />}
          
          {/* Gradient Overlay - Always visible */}
          <GradientOverlay />
          
          {/* Play Button - Always visible */}
          <PlayButton onClick={handlePlay}>
            <IoPlayCircleSharp />
          </PlayButton>

          {/* Action Buttons - Always visible */}
          <ActionButtons>
            {isLiked ? (
              <ActionButton 
                onClick={handleRemoveFromLiked}
                className="remove"
              >
                <BsCheck />
              </ActionButton>
            ) : (
              <ActionButton 
                onClick={addToList}
                className="add"
              >
                <AiOutlinePlus />
              </ActionButton>
            )}
          </ActionButtons>

          {/* Rating Badge - Always visible */}
          {movieData?.rating && (
            <RatingBadge>
              ⭐ {movieData.rating}
            </RatingBadge>
          )}
        </ImageWrapper>
        
        {/* Movie Info - Always visible */}
        <MovieInfo>
          <MovieTitle>{movieData?.name}</MovieTitle>
          <MovieMeta>
            {movieData?.year && <span>{movieData.year}</span>}
            {movieData?.duration && <span>{movieData.duration}</span>}
          </MovieMeta>
        </MovieInfo>
      </CardContent>
    </Container>
  );
});
