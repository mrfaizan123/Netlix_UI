



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
// import NotAvailable from "../components/NotAvailable";

// function MoviePage() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const movies = useSelector((state) => state.netflix.movies);
//   const genres = useSelector((state) => state.netflix.genres);
//   const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log("MoviePage: Dispatching getGenres");
//     dispatch(getGenres());
//   }, [dispatch]);

//   useEffect(() => {
//     console.log("MoviePage: genresLoaded changed", genresLoaded);
//     console.log("MoviePage: genres length", genres.length);
    
//     if (genresLoaded && genres.length > 0) {
//       console.log("MoviePage: Fetching movies");
//       setIsLoading(true);
//       dispatch(fetchMovies({ genres, type: "movie" }));
//       const timer = setTimeout(() => {
//         console.log("MoviePage: Movies loaded", movies.length);
//         setIsLoading(false);
//       }, 1500);
//       return () => clearTimeout(timer);
//     }
//   }, [genresLoaded, genres, dispatch]);

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
      
//       <div className="hero-section">
//         <div className="hero-content">
//           <div className="hero-text">
//             <h1>Unlimited Movies</h1>
//             <p>Watch anywhere. Cancel anytime.</p>
//             <div className="hero-stats">
//               <div className="stat">
//                 <span className="stat-number">{movies?.length || 0}+</span>
//                 <span className="stat-label">Movies</span>
//               </div>
//               <div className="stat">
//                 <span className="stat-number">{genres?.length || 0}+</span>
//                 <span className="stat-label">Genres</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="hero-overlay"></div>
//       </div>

//       <div className="content-wrapper">
//         <div className="genre-section">
//           <div className="section-header">
//             <h2>Browse by Genre</h2>
//             <p>Discover movies from your favorite genres</p>
//           </div>
//           <SelectGenre genres={genres} type="movie" />
//         </div>

//         {isLoading ? (
//           <div className="loading-container">
//             <div className="loading-spinner"></div>
//             <p>Loading amazing movies...</p>
//           </div>
//         ) : movies && movies.length > 0 ? (
//           <div className="movies-section">
//             <div className="section-header">
//               <h2>Featured Movies</h2>
//               <p>Curated selection of top-rated films</p>
//             </div>
//             <Slider movies={movies} />
//           </div>
//         ) : (
//           <NotAvailable />
//         )}

//         <div className="features-section">
//           <div className="features-grid">
//             <div className="feature-card">
//               <div className="feature-icon">🎬</div>
//               <h3>4K Quality</h3>
//               <p>Experience movies in stunning 4K resolution</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">📱</div>
//               <h3>Watch Anywhere</h3>
//               <p>Stream on your phone, tablet, or TV</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">🚫</div>
//               <h3>No Ads</h3>
//               <p>Enjoy uninterrupted movie streaming</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">📥</div>
//               <h3>Download & Go</h3>
//               <p>Watch offline wherever you are</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="footer">
//         <p>© 2024 Netflix Clone. All rights reserved.</p>
//       </div>
//     </Container>
//   );
// }

// const Container = styled.div`
//   background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
//   min-height: 100vh;
//   color: white;
//   position: relative;

//   .hero-section {
//     position: relative;
//     height: 70vh;
//     background: linear-gradient(
//         to right,
//         rgba(0, 0, 0, 0.8) 0%,
//         rgba(0, 0, 0, 0.4) 50%,
//         rgba(0, 0, 0, 0.8) 100%
//       ),
//       url('https://images.unsplash.com/photo-1489599809505-7c8c62a0bb51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
//     background-size: cover;
//     background-position: center;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     overflow: hidden;

//     @media (max-width: 768px) {
//       height: 60vh;
//     }

//     @media (max-width: 480px) {
//       height: 50vh;
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
//       rgba(0, 0, 0, 0.3) 0%,
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
//     max-width: 800px;
//     margin: 0 auto;

//     h1 {
//       font-size: clamp(2.5rem, 5vw, 4rem);
//       font-weight: 800;
//       margin-bottom: 1rem;
//       background: linear-gradient(45deg, #e50914, #ff6b6b);
//       -webkit-background-clip: text;
//       -webkit-text-fill-color: transparent;
//       background-clip: text;
//       line-height: 1.1;
//     }

//     p {
//       font-size: clamp(1.2rem, 2.5vw, 1.5rem);
//       margin-bottom: 2rem;
//       color: #ccc;
//       line-height: 1.4;
//     }
//   }

//   .hero-stats {
//     display: flex;
//     justify-content: center;
//     gap: 4rem;
//     margin-top: 2rem;

//     @media (max-width: 768px) {
//       gap: 2rem;
//     }

//     @media (max-width: 480px) {
//       gap: 1.5rem;
//       flex-wrap: wrap;
//     }
//   }

//   .stat {
//     text-align: center;
//     padding: 1rem;

//     .stat-number {
//       display: block;
//       font-size: 2.5rem;
//       font-weight: 700;
//       color: #e50914;
//       line-height: 1;

//       @media (max-width: 480px) {
//         font-size: 2rem;
//       }
//     }

//     .stat-label {
//       font-size: 1rem;
//       color: #999;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       margin-top: 0.5rem;
//     }
//   }

//   .content-wrapper {
//     max-width: 1400px;
//     margin: 0 auto;
//     padding: 2rem;

//     @media (max-width: 768px) {
//       padding: 1rem;
//     }
//   }

//   .genre-section,
//   .movies-section {
//     margin-bottom: 4rem;
//   }

//   .section-header {
//     text-align: center;
//     margin-bottom: 3rem;

//     h2 {
//       font-size: clamp(1.8rem, 3vw, 2.5rem);
//       margin-bottom: 1rem;
//       color: #fff;
//       font-weight: 600;
//     }

//     p {
//       font-size: 1.2rem;
//       color: #ccc;
//       max-width: 500px;
//       margin: 0 auto;
//       line-height: 1.5;

//       @media (max-width: 480px) {
//         font-size: 1rem;
//       }
//     }
//   }

//   .loading-container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 4rem 2rem;
//     gap: 1rem;

//     .loading-spinner {
//       width: 50px;
//       height: 50px;
//       border: 4px solid #333;
//       border-top: 4px solid #e50914;
//       border-radius: 50%;
//       animation: spin 1s linear infinite;
//     }

//     p {
//       color: #ccc;
//       font-size: 1.2rem;
//       margin: 0;
//     }

//     @keyframes spin {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }
//   }

//   .features-section {
//     margin: 6rem 0 4rem;
//     padding: 4rem 0;
//     background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
//     border-radius: 20px;

//     @media (max-width: 768px) {
//       margin: 4rem 0 2rem;
//       padding: 3rem 0;
//     }
//   }

//   .features-grid {
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

//   .feature-card {
//     text-align: center;
//     padding: 2rem 1.5rem;
//     background: rgba(255, 255, 255, 0.05);
//     border-radius: 15px;
//     transition: all 0.3s ease;
//     border: 1px solid rgba(255, 255, 255, 0.1);
//     backdrop-filter: blur(10px);

//     &:hover {
//       transform: translateY(-5px);
//       background: rgba(255, 255, 255, 0.1);
//       box-shadow: 0 10px 30px rgba(229, 9, 20, 0.2);
//     }

//     .feature-icon {
//       font-size: 3rem;
//       margin-bottom: 1rem;
//     }

//     h3 {
//       font-size: 1.5rem;
//       margin-bottom: 1rem;
//       color: #fff;
//       font-weight: 600;
//     }

//     p {
//       color: #ccc;
//       line-height: 1.6;
//       margin: 0;
//     }
//   }

//   .footer {
//     text-align: center;
//     padding: 2rem;
//     background: #0c0c0c;
//     border-top: 1px solid #333;

//     p {
//       color: #666;
//       margin: 0;
//       font-size: 0.9rem;
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
//     background: #e50914;
//     border-radius: 4px;
//   }

//   ::-webkit-scrollbar-thumb:hover {
//     background: #ff6b6b;
//   }
// `;

// export default MoviePage;




import { Link } from "react-router-dom";
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
import NotAvailable from "../components/NotAvailable";
import { FaPlay, FaStar, FaHeart, FaDownload, FaMobileAlt, FaTv, FaFilm } from "react-icons/fa";

function MoviePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Memoized functions
  const handleGetGenres = useCallback(() => {
    console.log("MoviePage: Dispatching getGenres");
    dispatch(getGenres());
  }, [dispatch]);

  const handleFetchMovies = useCallback(() => {
    if (genresLoaded && genres.length > 0) {
      console.log("MoviePage: Fetching movies");
      setIsLoading(true);
      dispatch(fetchMovies({ genres, type: "movie" }));
      const timer = setTimeout(() => {
        console.log("MoviePage: Movies loaded", movies?.length);
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [genresLoaded, genres, dispatch, movies?.length]);

  // Effects
  useEffect(() => {
    handleGetGenres();
  }, [handleGetGenres]);

  useEffect(() => {
    handleFetchMovies();
  }, [handleFetchMovies]);

  useEffect(() => {
    // Set a random featured movie when movies are loaded
    if (movies && movies.length > 0 && !featuredMovie) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setFeaturedMovie(randomMovie);
    }
  }, [movies, featuredMovie]);

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
    if (featuredMovie) {
      navigate("/player", { state: { movie: featuredMovie } });
    }
  };

  const handleExploreMovies = () => {
    document.getElementById("movies-section")?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      
      {/* Enhanced Hero Section */}
      <HeroSection>
        <div className={`hero-background ${heroImageLoaded ? 'loaded' : ''}`}>
          {featuredMovie && (
            <img
              src={`https://image.tmdb.org/t/p/w1280${featuredMovie.image}`}
              alt={featuredMovie.name}
              onLoad={() => setHeroImageLoaded(true)}
            />
          )}
          <div className="hero-gradient"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <div className="badges">
              <span className="badge premium">PREMIUM</span>
              <span className="badge hd">4K UHD</span>
            </div>
            
            <h1>
              Unlimited <span className="highlight">Movies</span>
              <br />
              Endless Entertainment
            </h1>
            
            <p className="hero-description">
              Dive into a world of cinematic excellence with thousands of movies 
              at your fingertips. From blockbuster hits to indie gems.
            </p>

            {featuredMovie && (
              <div className="featured-movie">
                <div className="movie-meta">
                  <span className="rating">
                    <FaStar className="star-icon" />
                    {featuredMovie.rating || '8.5'}/10
                  </span>
                  <span className="year">{featuredMovie.year || '2024'}</span>
                  <span className="duration">2h 18m</span>
                </div>
                <p className="featured-description">
                  {featuredMovie.desc || 'An epic adventure awaits in this stunning cinematic masterpiece.'}
                </p>
              </div>
            )}

            <div className="hero-actions">
              <button className="play-btn" onClick={handlePlayFeatured}>
                <FaPlay className="btn-icon" />
                Watch Now
              </button>
              <button className="explore-btn" onClick={handleExploreMovies}>
                <FaFilm className="btn-icon" />
                Explore Movies
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <div className="stat-icon">
                  <FaHeart />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{movies?.length || 0}+</span>
                  <span className="stat-label">Premium Movies</span>
                </div>
              </div>
              <div className="stat">
                <div className="stat-icon">
                  <FaStar />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{genres?.length || 0}</span>
                  <span className="stat-label">Genres</span>
                </div>
              </div>
              <div className="stat">
                <div className="stat-icon">
                  <FaDownload />
                </div>
                <div className="stat-content">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">Uptime</span>
                </div>
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
            <p>Discover movies tailored to your taste across multiple genres</p>
          </SectionHeader>
          <SelectGenre genres={genres} type="movie" />
        </Section>

        {/* Movies Section */}
        <Section id="movies-section" className="movies-section">
          {isLoading ? (
            <LoadingContainer>
              <div className="loading-animation">
                <div className="film-reel">
                  <div className="film-frame"></div>
                  <div className="film-frame"></div>
                  <div className="film-frame"></div>
                  <div className="film-frame"></div>
                </div>
                <h3>Curating Your Movie Experience</h3>
                <p>Loading amazing movies just for you...</p>
              </div>
            </LoadingContainer>
          ) : movies && movies.length > 0 ? (
            <>
              <SectionHeader>
                <div className="title-group">
                  <h2>Featured Collection</h2>
                  <div className="accent-line"></div>
                </div>
                <p>Handpicked selection of critically acclaimed films</p>
                <div className="collection-stats">
                  <span>{movies.length} movies available</span>
                </div>
              </SectionHeader>
              <Slider movies={movies} />
            </>
          ) : (
            <NotAvailable />
          )}
        </Section>

        {/* Enhanced Features Section */}
        <FeaturesSection>
          <SectionHeader>
            <div className="title-group">
              <h2>Why Choose Us</h2>
              <div className="accent-line"></div>
            </div>
            <p>Experience movie streaming like never before</p>
          </SectionHeader>
          
          <FeaturesGrid>
            <FeatureCard className="feature-card premium">
              <div className="feature-icon">
                <FaTv />
              </div>
              <h3>4K Ultra HD</h3>
              <p>Experience crystal-clear picture quality with stunning 4K resolution and HDR support</p>
              <div className="feature-badge">Best Quality</div>
            </FeatureCard>

            <FeatureCard className="feature-card">
              <div className="feature-icon">
                <FaMobileAlt />
              </div>
              <h3>Watch Anywhere</h3>
              <p>Stream on all your devices - phone, tablet, laptop, or smart TV with seamless sync</p>
            </FeatureCard>

            <FeatureCard className="feature-card">
              <div className="feature-icon">
                <FaDownload />
              </div>
              <h3>Download & Go</h3>
              <p>Download your favorite movies and watch offline without internet connection</p>
            </FeatureCard>

            <FeatureCard className="feature-card">
              <div className="feature-icon">
                <FaHeart />
              </div>
              <h3>Personalized</h3>
              <p>Smart recommendations based on your watching history and preferences</p>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesSection>

        {/* CTA Section */}
        <CTASection>
          <div className="cta-content">
            <h2>Ready to Start Streaming?</h2>
            <p>Join millions of movie lovers enjoying premium content</p>
            <button className="cta-button" onClick={handlePlayFeatured}>
              <FaPlay className="btn-icon" />
              Start Watching Free
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
            <p>The ultimate destination for movie lovers. Premium content, exceptional quality.</p>
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
            <h5>Support</h5>
            <ul>
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 StreamVibe. All rights reserved. Made with ❤️ for movie lovers.</p>
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

const filmRoll = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
      filter: brightness(0.7);
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
      rgba(0, 0, 0, 0.4) 50%,
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

      .badge {
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;

        &.premium {
          background: linear-gradient(45deg, #e50914, #ff6b6b);
          color: white;
        }

        &.hd {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
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

  .featured-movie {
    margin: 2rem 0;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);

    .movie-meta {
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
    span {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      color: #aaa;
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

    .film-reel {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto 2rem;
      animation: ${filmRoll} 2s linear infinite;

      .film-frame {
        position: absolute;
        width: 20px;
        height: 20px;
        background: #e50914;
        border-radius: 2px;

        &:nth-child(1) { top: 0; left: 0; }
        &:nth-child(2) { top: 0; right: 0; }
        &:nth-child(3) { bottom: 0; right: 0; }
        &:nth-child(4) { bottom: 0; left: 0; }
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
    background: url('https://images.unsplash.com/photo-1489599809505-7c8c62a0bb51?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
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
export default MoviePage;
