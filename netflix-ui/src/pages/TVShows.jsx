// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import Navbar from "../components/Navbar";
// import CardSlider from "../components/CardSlider";
// import { onAuthStateChanged } from "firebase/auth";
// import { firebaseAuth } from "../utils/firebase-config";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchMovies, getGenres } from "../store";
// import SelectGenre from "../components/SelectGenre";
// import Slider from "../components/Slider";

// function TVShows() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const movies = useSelector((state) => state.netflix.movies);
//   const genres = useSelector((state) => state.netflix.genres);
//   const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
//   const dataLoading = useSelector((state) => state.netflix.dataLoading);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!genres.length) dispatch(getGenres());
//   }, []);

//   useEffect(() => {
//     if (genresLoaded) {
//       dispatch(fetchMovies({ genres, type: "tv" }));
//     }
//   }, [genresLoaded]);

//   const [user, setUser] = useState(undefined);

//   onAuthStateChanged(firebaseAuth, (currentUser) => {
//     if (currentUser) setUser(currentUser.uid);
//     else navigate("/login");
//   });

//   window.onscroll = () => {
//     setIsScrolled(window.pageYOffset === 0 ? false : true);
//     return () => (window.onscroll = null);
//   };

//   return (
//     <Container>
//       <Navbar isScrolled={isScrolled} />
//       <div className="data">
//         <SelectGenre genres={genres} type="tv" />
//         {movies.length ? (
//           <>
//             <Slider movies={movies} />
//           </>
//         ) : (
//           <h1 className="not-available">
//             No TV Shows avaialble for the selected genre. Please select a
//             different genre.
//           </h1>
//         )}
//       </div>
//     </Container>
//   );
// }

// const Container = styled.div`
//   .data {
//     margin-top: 8rem;
//     .not-available {
//       text-align: center;
//       margin-top: 4rem;
//     }
//   }
// `;
// export default TVShows;




// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import Navbar from "../components/Navbar";
// import { onAuthStateChanged } from "firebase/auth";
// import { firebaseAuth } from "../utils/firebase-config";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchMovies, getGenres } from "../store";
// import SelectGenre from "../components/SelectGenre";
// import Slider from "../components/Slider";
// import { FaTv, FaStar, FaPlay } from "react-icons/fa";

// function TVShows() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const movies = useSelector((state) => state.netflix.movies);
//   const genres = useSelector((state) => state.netflix.genres);
//   const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!genres.length) dispatch(getGenres());
//   }, [dispatch, genres.length]);

//   useEffect(() => {
//     if (genresLoaded) {
//       setIsLoading(true);
//       dispatch(fetchMovies({ genres, type: "tv" }));
//       const timer = setTimeout(() => setIsLoading(false), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [genresLoaded, dispatch, genres]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.pageYOffset > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   onAuthStateChanged(firebaseAuth, (currentUser) => {
//     if (!currentUser) navigate("/login");
//   });

//   return (
//     <Container>
//       <Navbar isScrolled={isScrolled} />
      
//       {/* Hero Section */}
//       <div className="hero-section">
//         <div className="hero-content">
//           <div className="hero-text">
//             <h1>TV Shows</h1>
//             <p>Discover amazing series from various genres and creators</p>
//             <div className="hero-stats">
//               <div className="stat">
//                 <FaTv className="stat-icon" />
//                 <div className="stat-info">
//                   <span className="stat-number">{movies.length}+</span>
//                   <span className="stat-label">TV Shows</span>
//                 </div>
//               </div>
//               <div className="stat">
//                 <FaStar className="stat-icon" />
//                 <div className="stat-info">
//                   <span className="stat-number">{genres.length}+</span>
//                   <span className="stat-label">Genres</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="hero-overlay"></div>
//       </div>

//       <div className="content-wrapper">
//         {/* Genre Selection Section */}
//         <div className="genre-section">
//           <div className="section-header">
//             <h2>Browse by Genre</h2>
//             <p>Find your next favorite series by genre</p>
//           </div>
//           <div className="genre-selector">
//             <SelectGenre genres={genres} type="tv" />
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading ? (
//           <div className="loading-container">
//             <div className="loading-spinner"></div>
//             <p>Loading amazing TV shows...</p>
//           </div>
//         ) : movies.length ? (
//           <div className="shows-section">
//             <div className="section-header">
//               <h2>Featured TV Shows</h2>
//               <p>Curated selection of top-rated series</p>
//             </div>
//             <Slider movies={movies} />
            
//             {/* Additional Info Section */}
//             <div className="info-section">
//               <div className="info-grid">
//                 <div className="info-card">
//                   <div className="info-icon">🎬</div>
//                   <h3>4K Streaming</h3>
//                   <p>Watch in stunning 4K quality</p>
//                 </div>
//                 <div className="info-card">
//                   <div className="info-icon">📱</div>
//                   <h3>Watch Anywhere</h3>
//                   <p>Stream on all your devices</p>
//                 </div>
//                 <div className="info-card">
//                   <div className="info-icon">🚫</div>
//                   <h3>No Ads</h3>
//                   <p>Enjoy uninterrupted streaming</p>
//                 </div>
//                 <div className="info-card">
//                   <div className="info-icon">💾</div>
//                   <h3>Download</h3>
//                   <p>Watch offline anytime</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="not-available">
//             <div className="not-available-content">
//               <FaTv className="not-available-icon" />
//               <h3>No TV Shows Available</h3>
//               <p>No TV shows found for the selected genre. Please select a different genre.</p>
//               <button 
//                 className="browse-btn"
//                 onClick={() => navigate("/")}
//               >
//                 <FaPlay />
//                 Browse All Content
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </Container>
//   );
// }

// const Container = styled.div`
//   background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
//   min-height: 100vh;
//   color: white;

//   .hero-section {
//     position: relative;
//     height: 500px;
//     background: linear-gradient(
//         135deg,
//         rgba(229, 9, 20, 0.1) 0%,
//         rgba(229, 9, 20, 0.05) 50%,
//         rgba(0, 0, 0, 0.8) 100%
//       ),
//       url('https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2056&q=80');
//     background-size: cover;
//     background-position: center;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     overflow: hidden;

//     @media (max-width: 768px) {
//       height: 400px;
//     }

//     @media (max-width: 480px) {
//       height: 350px;
//     }
//   }

//   .hero-overlay {
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: linear-gradient(
//       to bottom,
//       rgba(0, 0, 0, 0.4) 0%,
//       rgba(0, 0, 0, 0.7) 100%
//     );
//   }

//   .hero-content {
//     position: relative;
//     z-index: 2;
//     text-align: center;
//     padding: 0 2rem;
//     max-width: 1200px;
//     width: 100%;
//   }

//   .hero-text {
//     h1 {
//       font-size: clamp(2.5rem, 5vw, 4rem);
//       font-weight: 800;
//       margin-bottom: 1rem;
//       background: linear-gradient(45deg, #ffffff 30%, #e50914 100%);
//       -webkit-background-clip: text;
//       -webkit-text-fill-color: transparent;
//       background-clip: text;
//       text-shadow: 0 4px 20px rgba(229, 9, 20, 0.3);
//     }

//     p {
//       font-size: clamp(1.1rem, 2vw, 1.3rem);
//       color: #cccccc;
//       margin-bottom: 3rem;
//       line-height: 1.5;
//       max-width: 500px;
//       margin-left: auto;
//       margin-right: auto;
//     }
//   }

//   .hero-stats {
//     display: flex;
//     justify-content: center;
//     gap: 4rem;
//     flex-wrap: wrap;

//     @media (max-width: 480px) {
//       gap: 2rem;
//     }
//   }

//   .stat {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     background: rgba(255, 255, 255, 0.05);
//     backdrop-filter: blur(10px);
//     padding: 1.5rem;
//     border-radius: 12px;
//     border: 1px solid rgba(255, 255, 255, 0.1);
//     transition: all 0.3s ease;

//     &:hover {
//       transform: translateY(-5px);
//       background: rgba(255, 255, 255, 0.08);
//       box-shadow: 0 10px 30px rgba(229, 9, 20, 0.2);
//     }

//     .stat-icon {
//       font-size: 2rem;
//       color: #e50914;
//     }

//     .stat-info {
//       display: flex;
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     .stat-number {
//       font-size: 1.8rem;
//       font-weight: 700;
//       color: #ffffff;
//       line-height: 1;
//     }

//     .stat-label {
//       font-size: 0.9rem;
//       color: #cccccc;
//       text-transform: uppercase;
//       letter-spacing: 0.5px;
//       margin-top: 0.3rem;
//     }
//   }

//   .content-wrapper {
//     max-width: 1400px;
//     margin: 0 auto;
//     padding: 3rem 2rem;

//     @media (max-width: 768px) {
//       padding: 2rem 1rem;
//     }
//   }

//   .genre-section {
//     margin-bottom: 4rem;
//     text-align: center;
//   }

//   .section-header {
//     margin-bottom: 2rem;

//     h2 {
//       font-size: clamp(1.8rem, 3vw, 2.5rem);
//       margin-bottom: 0.5rem;
//       color: #ffffff;
//       font-weight: 600;
//     }

//     p {
//       font-size: 1.1rem;
//       color: #cccccc;
//       margin: 0;
//     }
//   }

//   .genre-selector {
//     display: flex;
//     justify-content: center;
//     margin-top: 1rem;
//   }

//   .loading-container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 4rem 2rem;
//     gap: 1.5rem;

//     .loading-spinner {
//       width: 60px;
//       height: 60px;
//       border: 4px solid rgba(255, 255, 255, 0.1);
//       border-top: 4px solid #e50914;
//       border-radius: 50%;
//       animation: spin 1s linear infinite;
//     }

//     p {
//       color: #cccccc;
//       font-size: 1.2rem;
//       margin: 0;
//     }

//     @keyframes spin {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }
//   }

//   .shows-section {
//     .section-header {
//       text-align: center;
//       margin-bottom: 3rem;
//     }
//   }

//   .info-section {
//     margin-top: 6rem;
//     padding: 4rem 0;
//     background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
//     border-radius: 20px;

//     @media (max-width: 768px) {
//       margin-top: 4rem;
//       padding: 3rem 0;
//     }
//   }

//   .info-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//     gap: 2rem;
//     max-width: 1200px;
//     margin: 0 auto;
//     padding: 0 2rem;

//     @media (max-width: 480px) {
//       grid-template-columns: 1fr;
//       gap: 1.5rem;
//       padding: 0 1rem;
//     }
//   }

//   .info-card {
//     text-align: center;
//     padding: 2.5rem 1.5rem;
//     background: rgba(255, 255, 255, 0.05);
//     border-radius: 16px;
//     transition: all 0.3s ease;
//     border: 1px solid rgba(255, 255, 255, 0.1);
//     backdrop-filter: blur(10px);

//     &:hover {
//       transform: translateY(-8px);
//       background: rgba(255, 255, 255, 0.08);
//       box-shadow: 0 15px 35px rgba(229, 9, 20, 0.2);
//     }

//     .info-icon {
//       font-size: 3.5rem;
//       margin-bottom: 1.5rem;
//     }

//     h3 {
//       font-size: 1.4rem;
//       margin-bottom: 1rem;
//       color: #ffffff;
//       font-weight: 600;
//     }

//     p {
//       color: #cccccc;
//       line-height: 1.5;
//       margin: 0;
//       font-size: 1rem;
//     }
//   }

//   .not-available {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 6rem 2rem;
//     text-align: center;

//     .not-available-content {
//       max-width: 500px;

//       .not-available-icon {
//         font-size: 5rem;
//         color: #e50914;
//         margin-bottom: 2rem;
//         opacity: 0.7;
//       }

//       h3 {
//         font-size: 2rem;
//         margin-bottom: 1rem;
//         color: #ffffff;
//         font-weight: 600;
//       }

//       p {
//         color: #cccccc;
//         font-size: 1.1rem;
//         line-height: 1.6;
//         margin-bottom: 2.5rem;
//       }

//       .browse-btn {
//         background: linear-gradient(135deg, #e50914, #ff6b6b);
//         color: white;
//         border: none;
//         padding: 1rem 2.5rem;
//         border-radius: 8px;
//         cursor: pointer;
//         font-weight: 600;
//         font-size: 1.1rem;
//         display: flex;
//         align-items: center;
//         gap: 0.8rem;
//         margin: 0 auto;
//         transition: all 0.3s ease;

//         &:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 25px rgba(229, 9, 20, 0.4);
//         }
//       }
//     }
//   }

//   /* Custom scrollbar */
//   ::-webkit-scrollbar {
//     width: 8px;
//   }

//   ::-webkit-scrollbar-track {
//     background: #1a1a1a;
//   }

//   ::-webkit-scrollbar-thumb {
//     background: linear-gradient(135deg, #e50914, #ff6b6b);
//     border-radius: 4px;
//   }

//   ::-webkit-scrollbar-thumb:hover {
//     background: linear-gradient(135deg, #f40612, #ff8a8a);
//   }

//   /* Smooth animations */
//   * {
//     box-sizing: border-box;
//   }

//   html {
//     scroll-behavior: smooth;
//   }
// `;

// export default TVShows;
















import React, { useEffect, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import { FaTv, FaStar, FaPlay, FaDownload, FaMobileAlt, FaFilm, FaHeart, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";

function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [featuredShow, setFeaturedShow] = useState(null);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Memoized functions
  const handleGetGenres = useCallback(() => {
    if (!genres.length) dispatch(getGenres());
  }, [dispatch, genres.length]);

  const handleFetchMovies = useCallback(() => {
    if (genresLoaded) {
      setIsLoading(true);
      dispatch(fetchMovies({ genres, type: "tv" }));
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [genresLoaded, dispatch, genres]);

  // Effects
  useEffect(() => {
    handleGetGenres();
  }, [handleGetGenres]);

  useEffect(() => {
    handleFetchMovies();
  }, [handleFetchMovies]);

  useEffect(() => {
    // Set a random featured TV show when movies are loaded
    if (movies && movies.length > 0 && !featuredShow) {
      const randomShow = movies[Math.floor(Math.random() * movies.length)];
      setFeaturedShow(randomShow);
    }
  }, [movies, featuredShow]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  // Handlers
  const handlePlayFeatured = () => {
    if (featuredShow) {
      navigate("/player", { state: { movie: featuredShow } });
    }
  };

  const handleExploreShows = () => {
    document.getElementById("shows-section")?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleDownloadShow = (show) => {
    // Download logic here
    console.log("Downloading:", show.name);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      
      {/* Enhanced Hero Section */}
      <HeroSection>
        <div className={`hero-background ${heroImageLoaded ? 'loaded' : ''}`}>
          {featuredShow && (
            <img
              src={`https://image.tmdb.org/t/p/w1280${featuredShow.image}`}
              alt={featuredShow.name}
              onLoad={() => setHeroImageLoaded(true)}
            />
          )}
          <div className="hero-gradient"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <div className="badges">
              <span className="badge series">TV SERIES</span>
              <span className="badge hd">4K UHD</span>
              <span className="badge trending">TRENDING</span>
            </div>
            
            <h1>
              Epic <span className="highlight">TV Shows</span>
              <br />
              Unlimited Entertainment
            </h1>
            
            <p className="hero-description">
              Binge-watch your favorite series and discover new obsessions. 
              From gripping dramas to hilarious comedies, your next TV addiction awaits.
            </p>

            {featuredShow && (
              <div className="featured-show">
                <div className="show-meta">
                  <span className="rating">
                    <FaStar className="star-icon" />
                    {featuredShow.rating || '8.5'}/10
                  </span>
                  <span className="seasons">{featuredShow.seasons || '3'} Seasons</span>
                  <span className="year">{featuredShow.year || '2024'}</span>
                </div>
                <p className="featured-description">
                  {featuredShow.desc || 'A captivating series that will keep you on the edge of your seat.'}
                </p>
              </div>
            )}

            <div className="hero-actions">
              <button className="play-btn" onClick={handlePlayFeatured}>
                <FaPlay className="btn-icon" />
                Watch Now
              </button>
              <button className="explore-btn" onClick={handleExploreShows}>
                <FaTv className="btn-icon" />
                Explore Shows
              </button>
              {/* {featuredShow && (
                <button className="download-btn" onClick={() => handleDownloadShow(featuredShow)}>
                  <FaDownload className="btn-icon" />
                  Download
                </button>
              )} */}
            </div>

            <div className="hero-stats">
              <div className="stat">
                {/* <div className="stat-icon">
                  <FaTv />
                </div> */}
                {/* <div className="stat-content">
                  <span className="stat-number">{movies?.length || 0}+</span>
                  <span className="stat-label">TV Series</span>
                </div> */}
              </div>
              <div className="stat">
                {/* <div className="stat-icon">
                  <FaStar />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{genres?.length || 0}</span>
                  <span className="stat-label">Genres</span>
                </div> */}
              </div>
              <div className="stat">
                {/* <div className="stat-icon">
                  <FaHeart />
                </div>
                <div className="stat-content">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Streaming</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </HeroSection>

      {/* Main Content */}
      <ContentWrapper>
        {/* Genre Selection */}
        <Section className="genre-section">
          <SectionHeader>
            <div className="title-group">
              <h2>Browse by Genre</h2>
              <div className="accent-line"></div>
            </div>
            <p>Discover TV shows tailored to your taste across multiple genres</p>
          </SectionHeader>
          <SelectGenre genres={genres} type="tv" />
        </Section>

        {/* TV Shows Section */}
        <Section id="shows-section" className="shows-section">
          {isLoading ? (
            <LoadingContainer>
              <div className="loading-animation">
                <div className="tv-loader">
                  <div className="tv-screen">
                    <div className="tv-content"></div>
                  </div>
                </div>
                <h3>Loading Amazing TV Shows</h3>
                <p>Getting your binge-watch list ready...</p>
              </div>
            </LoadingContainer>
          ) : movies && movies.length > 0 ? (
            <>
              <SectionHeader>
                <div className="title-group">
                  <h2>Featured Collection</h2>
                  <div className="accent-line"></div>
                </div>
                <p>Handpicked selection of critically acclaimed TV series</p>
                <div className="collection-stats">
                  <span>{movies.length} shows available</span>
                  <span className="divider">•</span>
                  <span>Download all episodes</span>
                </div>
              </SectionHeader>
              <Slider movies={movies} />
            </>
          ) : (
            <NotAvailable>
              <div className="not-available-content">
                <FaTv className="not-available-icon" />
                <h3>No TV Shows Available</h3>
                <p>No TV shows found for the selected genre. Please select a different genre or check back later for new additions.</p>
                <div className="not-available-actions">
                  <button className="browse-btn primary" onClick={() => navigate("/")}>
                    <FaPlay className="btn-icon" />
                    Browse Movies
                  </button>
                  <button className="browse-btn secondary" onClick={handleGetGenres}>
                    <FaTv className="btn-icon" />
                    Refresh Shows
                  </button>
                </div>
              </div>
            </NotAvailable>
          )}
        </Section>

        {/* Enhanced Features Section */}
        <FeaturesSection>
          <SectionHeader>
            <div className="title-group">
              <h2>Why Stream With Us</h2>
              <div className="accent-line"></div>
            </div>
            <p>Experience TV show streaming like never before</p>
          </SectionHeader>
          
          <FeaturesGrid>
            <FeatureCard className="feature-card premium">
              <div className="feature-icon">
                <FaTv />
              </div>
              <h3>4K Ultra HD</h3>
              <p>Experience crystal-clear picture quality with stunning 4K resolution and HDR support for all episodes</p>
              <div className="feature-badge">Best Quality</div>
            </FeatureCard>

            <FeatureCard className="feature-card">
              <div className="feature-icon">
                <FaDownload />
              </div>
              <h3>Download Episodes</h3>
              <p>Download entire seasons and watch offline without internet connection on all your devices</p>
            </FeatureCard>

            <FeatureCard className="feature-card">
              <div className="feature-icon">
                <FaMobileAlt />
              </div>
              <h3>Watch Anywhere</h3>
              <p>Stream on all your devices - phone, tablet, laptop, or smart TV with seamless episode sync</p>
            </FeatureCard>

            <FeatureCard className="feature-card">
              <div className="feature-icon">
                <FaHeart />
              </div>
              <h3>Personalized</h3>
              <p>Smart recommendations based on your watching history and favorite genres</p>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesSection>

        {/* CTA Section */}
        <CTASection>
          <div className="cta-content">
            <h2>Ready to Start Binge-Watching?</h2>
            <p>Join millions of TV lovers enjoying premium series and exclusive content</p>
            <button className="cta-button" onClick={handlePlayFeatured}>
              <FaPlay className="btn-icon" />
              Start Streaming Free
            </button>
          </div>
          <div className="cta-background"></div>
        </CTASection>
      </ContentWrapper>

      {/* Enhanced Footer */}
      <Footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>StreamVibe</h4>
            <p>The ultimate destination for TV show lovers. Premium series, exceptional quality, endless entertainment.</p>
            <div className="social-links">
              <span>Follow us:</span>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="Instagram">📷</a>
              </div>
            </div>
          </div>
          <div className="footer-section">
            <h5>Navigation</h5>
            <ul>
               <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/movies">Movies</Link>
    </li>
    <li>
      <Link to="/tv">TV Shows</Link>
    </li>
    <li>
      <Link to="/mylist">My List</Link>
    </li>
            </ul>
          </div>
          <div className="footer-section">
            <h5>TV Features</h5>
            <ul>
              <li>4K Streaming</li>
              <li>Download Episodes</li>
              <li>Watch Offline</li>
              <li>Multiple Devices</li>
              <li>No Ads</li>
            </ul>
          </div>
          <div className="footer-section">
            <h5>Support</h5>
            <ul>
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Download Help</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 StreamVibe. All rights reserved. Made with ❤️ for TV lovers.</p>
          <div className="footer-badges">
            <span className="badge">4K Ready</span>
            <span className="badge">HD Quality</span>
            <span className="badge">Offline Viewing</span>
          </div>
        </div>
      </Footer>
    </Container>
  );
}

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const tvStatic = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
`;

// Styled Components
const Container = styled.div`
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%);
  min-height: 100vh;
  color: white;
  position: relative;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 1s ease-in-out;

    &.loaded {
      opacity: 1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.6);
    }
  }

  .hero-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(229, 9, 20, 0.2) 50%,
      rgba(0, 0, 0, 0.8) 100%
    );
  }

  .hero-content {
    position: relative;
    z-index: 3;
    max-width: 1200px;
    width: 100%;
    padding: 0 2rem;
    animation: ${fadeIn} 1s ease-out;
  }

  .hero-text {
    max-width: 800px;

    .badges {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;

      .badge {
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;

        &.series {
          background: linear-gradient(45deg, #e50914, #ff6b6b);
          color: white;
        }

        &.hd {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        &.trending {
          background: linear-gradient(45deg, #ff6b00, #ffa500);
          color: white;
        }
      }
    }

    h1 {
      font-size: clamp(3rem, 6vw, 5rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;

      .highlight {
        background: linear-gradient(45deg, #e50914, #ff6b6b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }

    .hero-description {
      font-size: 1.3rem;
      color: #ccc;
      margin-bottom: 2rem;
      line-height: 1.6;
      max-width: 600px;
    }
  }

  .featured-show {
    margin: 2rem 0;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);

    .show-meta {
      display: flex;
      gap: 2rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;

      span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #ccc;

        &.rating {
          color: #ffd700;
        }

        .star-icon {
          color: #ffd700;
        }
      }
    }

    .featured-description {
      color: #aaa;
      line-height: 1.5;
      margin: 0;
    }
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    margin: 2rem 0 3rem;
    flex-wrap: wrap;

    .play-btn {
      background: linear-gradient(45deg, #e50914, #ff6b6b);
      border: none;
      padding: 1rem 2rem;
      border-radius: 50px;
      color: white;
      font-weight: 600;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 8px 25px rgba(229, 9, 20, 0.4);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 35px rgba(229, 9, 20, 0.6);
      }

      .btn-icon {
        font-size: 0.9rem;
      }
    }

    .explore-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 1rem 2rem;
      border-radius: 50px;
      color: white;
      font-weight: 600;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      backdrop-filter: blur(10px);

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
      }
    }

    .download-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 1rem 2rem;
      border-radius: 50px;
      color: white;
      font-weight: 600;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
      }
    }
  }

  .hero-stats {
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;

    .stat {
      display: flex;
      align-items: center;
      gap: 1rem;

      .stat-icon {
        background: rgba(229, 9, 20, 0.2);
        padding: 0.8rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #e50914;
        font-size: 1.2rem;
      }

      .stat-content {
        .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 0.3rem;
        }
      }
    }
  }

  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    animation: ${float} 2s ease-in-out infinite;

    .scroll-arrow {
      width: 2px;
      height: 30px;
      background: rgba(255, 255, 255, 0.5);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 10px;
        height: 10px;
        border-right: 2px solid rgba(255, 255, 255, 0.5);
        border-bottom: 2px solid rgba(255, 255, 255, 0.5);
        transform: rotate(45deg);
      }
    }
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Section = styled.section`
  margin-bottom: 6rem;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  .title-group {
    display: inline-block;
    position: relative;
    margin-bottom: 1rem;

    h2 {
      font-size: clamp(2rem, 4vw, 3rem);
      margin-bottom: 1rem;
      color: #fff;
      font-weight: 700;
    }

    .accent-line {
      height: 4px;
      background: linear-gradient(45deg, #e50914, #ff6b6b);
      border-radius: 2px;
      animation: ${slideIn} 1s ease-out;
    }
  }

  p {
    font-size: 1.2rem;
    color: #ccc;
    max-width: 500px;
    margin: 0 auto 1rem;
    line-height: 1.5;
  }

  .collection-stats {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;

    span {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      color: #aaa;

      &.divider {
        background: none;
        padding: 0;
        color: #e50914;
      }
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6rem 2rem;

  .loading-animation {
    text-align: center;

    .tv-loader {
      width: 120px;
      height: 80px;
      margin: 0 auto 2rem;
      position: relative;
      background: #1a1a1a;
      border-radius: 10px;
      border: 3px solid #333;

      .tv-screen {
        width: 100px;
        height: 60px;
        background: linear-gradient(45deg, #333 25%, #444 25%, #444 50%, #333 50%, #333 75%, #444 75%);
        background-size: 20px 20px;
        animation: ${tvStatic} 0.5s linear infinite;
        margin: 10px auto;
        border-radius: 5px;
        position: relative;

        .tv-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          border: 3px solid #e50914;
          border-top: 3px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      }
    }

    h3 {
      color: white;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    p {
      color: #aaa;
      margin: 0;
    }

    @keyframes spin {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
  }
`;

const NotAvailable = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  text-align: center;

  .not-available-content {
    max-width: 500px;

    .not-available-icon {
      font-size: 5rem;
      color: #e50914;
      margin-bottom: 2rem;
      opacity: 0.7;
    }

    h3 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #ffffff;
      font-weight: 600;
    }

    p {
      color: #cccccc;
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2.5rem;
    }

    .not-available-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;

      .browse-btn {
        padding: 1rem 2rem;
        border: none;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        &.primary {
          background: linear-gradient(45deg, #e50914, #ff6b6b);
          color: white;
          box-shadow: 0 4px 20px rgba(229, 9, 20, 0.4);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(229, 9, 20, 0.6);
          }
        }

        &.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);

          &:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
          }
        }
      }
    }
  }
`;

const FeaturesSection = styled(Section)`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  margin: 8rem -2rem 4rem;
  padding: 6rem 2rem;
  border-radius: 30px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #e50914, transparent);
  }

  @media (max-width: 768px) {
    margin: 6rem -1rem 2rem;
    padding: 4rem 1rem;
    border-radius: 20px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 40px rgba(229, 9, 20, 0.2);
  }

  &.premium {
    border-color: #e50914;
    
    &::before {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      height: 3px;
      background: linear-gradient(45deg, #e50914, #ff6b6b);
      border-radius: 20px 20px 0 0;
    }
  }

  .feature-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    background: linear-gradient(135deg, #e50914, #ff6b6b);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #fff;
    font-weight: 600;
  }

  p {
    color: #ccc;
    line-height: 1.6;
    margin: 0;
  }

  .feature-badge {
    position: absolute;
    top: -10px;
    right: 20px;
    background: #e50914;
    color: white;
    padding: 0.3rem 1rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const CTASection = styled.section`
  position: relative;
  margin: 8rem 0 4rem;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #e50914 0%, #ff6b6b 100%);
  border-radius: 30px;
  text-align: center;
  overflow: hidden;

  .cta-content {
    position: relative;
    z-index: 2;

    h2 {
      font-size: clamp(2rem, 4vw, 3rem);
      margin-bottom: 1rem;
      color: white;
      font-weight: 700;
    }

    p {
      font-size: 1.3rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 2rem;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-button {
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.5);
      padding: 1.2rem 2.5rem;
      border-radius: 50px;
      color: white;
      font-weight: 600;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.8rem;
      backdrop-filter: blur(10px);

      &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-3px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
      }
    }
  }

  .cta-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2056&q=80');
    background-size: cover;
    background-position: center;
    opacity: 0.1;
  }
`;

const Footer = styled.footer`
  background: #0c0c0c;
  border-top: 1px solid #333;
  padding: 3rem 2rem 1rem;
  margin-top: 4rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }
  }

  .footer-section {
    h4 {
      color: #e50914;
      margin-bottom: 1rem;
      font-size: 1.5rem;
      font-weight: 700;
    }

    h5 {
      color: #fff;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      position: relative;
      display: inline-block;

      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 40px;
        height: 2px;
        background: linear-gradient(45deg, #e50914, #ff6b6b);
        border-radius: 2px;

        @media (max-width: 768px) {
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    p {
      color: #999;
      line-height: 1.6;
      margin: 0 0 1rem 0;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      li {
        margin-bottom: 0;
        
        a {
          color: #999;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0;
          position: relative;
          overflow: hidden;

          &::before {
            content: '';
            position: absolute;
            left: -5px;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 0;
            background: linear-gradient(45deg, #e50914, #ff6b6b);
            border-radius: 2px;
            transition: all 0.3s ease;
          }

          &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 1px;
            background: linear-gradient(45deg, #e50914, #ff6b6b);
            transition: all 0.3s ease;
          }

          &:hover {
            color: #fff;
            transform: translateX(8px);
            
            &::before {
              height: 20px;
            }
            
            &::after {
              width: 100%;
            }
          }

          /* Add icons for each link */
          &[href="/"]::before {
            content: '🏠';
            position: static;
            transform: none;
            background: none;
            font-size: 1rem;
          }

          &[href="/movies"]::before {
            content: '🎬';
            position: static;
            transform: none;
            background: none;
            font-size: 1rem;
          }

          &[href="/tv"]::before {
            content: '📺';
            position: static;
            transform: none;
            background: none;
            font-size: 1rem;
          }

          &[href="/mylist"]::before {
            content: '❤️';
            position: static;
            transform: none;
            background: none;
            font-size: 1rem;
          }
        }

        /* For non-link list items (like in Features and Support sections) */
        &:not(:has(a)) {
          color: #999;
          margin-bottom: 0.5rem;
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 0.5rem 0;
          position: relative;
          overflow: hidden;

          &::before {
            content: '';
            position: absolute;
            left: -5px;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 0;
            background: linear-gradient(45deg, #e50914, #ff6b6b);
            border-radius: 2px;
            transition: all 0.3s ease;
          }

          &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 1px;
            background: linear-gradient(45deg, #e50914, #ff6b6b);
            transition: all 0.3s ease;
          }

          &:hover {
            color: #fff;
            transform: translateX(8px);
            
            &::before {
              height: 20px;
            }
            
            &::after {
              width: 100%;
            }
          }
        }

        /* Active link styling */
        a.active {
          color: #e50914;
          font-weight: 600;
          
          &::before {
            height: 20px;
          }
        }
      }
    }

    .social-links {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;

      span {
        color: #999;
        font-size: 0.9rem;
      }

      .social-icons {
        display: flex;
        gap: 0.5rem;

        a {
          color: #999;
          text-decoration: none;
          font-size: 1.2rem;
          transition: color 0.3s ease;
          padding: 0.5rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            color: #e50914;
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
          }
        }
      }

      @media (max-width: 768px) {
        justify-content: center;
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid #333;
    padding-top: 2rem;
    text-align: center;

    p {
      color: #666;
      margin: 0 0 1rem 0;
      font-size: 0.9rem;
    }

    .footer-badges {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;

      .badge {
        background: rgba(255, 255, 255, 0.1);
        color: #ccc;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;

        &:hover {
          background: rgba(229, 9, 20, 0.2);
          border-color: #e50914;
          transform: translateY(-2px);
        }
      }
    }
  }

  /* Animation for list items */
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Stagger animation for list items */
  ul li {
    animation: slideIn 0.5s ease forwards;
    
    &:nth-child(1) { animation-delay: 0.1s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.3s; }
    &:nth-child(4) { animation-delay: 0.4s; }
    &:nth-child(5) { animation-delay: 0.5s; }
  }
`;
export default TVShows;