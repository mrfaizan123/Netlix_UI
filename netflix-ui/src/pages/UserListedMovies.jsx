
















// import React, { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { firebaseAuth } from "../utils/firebase-config";
// import Card from "../components/Card";
// import styled from "styled-components";
// import Navbar from "../components/Navbar";
// import { getUsersLikedMovies } from "../store";
// import { useDispatch, useSelector } from "react-redux";

// export default function UserListedMovies() {
//   const movies = useSelector((state) => state.netflix.movies);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [email, setEmail] = useState(undefined);
//   const [isLoading, setIsLoading] = useState(false);

//   // Safe authentication handler
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

//   // Safe data fetching
//   useEffect(() => {
//     if (email) {
//       setIsLoading(true);
//       try {
//         dispatch(getUsersLikedMovies(email));
//       } catch (error) {
//         console.error("Error fetching liked movies:", error);
//       } finally {
//         setTimeout(() => setIsLoading(false), 1000);
//       }
//     }
//   }, [email, dispatch]);

//   // Safe scroll handler
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.pageYOffset > 50);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Safe navigation functions
//   const handleBrowseMovies = () => {
//     try {
//       navigate("/");
//     } catch (error) {
//       console.error("Navigation error:", error);
//       // Fallback: redirect to home
//       window.location.href = "/";
//     }
//   };

//   const handleBrowseTVShows = () => {
//     try {
//       navigate("/tv");
//     } catch (error) {
//       console.error("Navigation error:", error);
//       // Fallback: redirect to TV shows
//       window.location.href = "/tv";
//     }
//   };

//   // Safe render function
//   const renderContent = () => {
//     if (isLoading) {
//       return (
//         <div className="loading">
//           <div className="spinner"></div>
//           <p>Loading your list...</p>
//         </div>
//       );
//     }

//     if (!movies || movies.length === 0) {
//       return (
//         <div className="empty-state">
//           <div className="empty-icon">❤️</div>
//           <h2>Your List is Empty</h2>
//           <p>You haven't added any movies or TV shows to your list yet.</p>
//           <div className="empty-actions">
//             <button onClick={handleBrowseMovies} className="browse-btn">
//               Browse Movies
//             </button>
//             <button onClick={handleBrowseTVShows} className="browse-btn secondary">
//               Browse TV Shows
//             </button>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="movies-container">
//         <div className="section-info">
//           <h2>Your Collection ({movies.length} items)</h2>
//           <p>All your saved movies and TV shows</p>
//         </div>
//         <div className="movies-grid">
//           {movies.map((movie, index) => (
//             <Card
//               key={movie.id}
//               movieData={movie}
//               index={index}
//               isLiked={true}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <Container>
//       <Navbar isScrolled={isScrolled} />
//       <div className="content">
//         <div className="header">
//           <h1>My List</h1>
//           <p>Your personal collection</p>
//         </div>
//         {renderContent()}
//       </div>
//     </Container>
//   );
// }

// const Container = styled.div`
//   background: #0c0c0c;
//   min-height: 100vh;
//   color: white;
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;

//   .content {
//     padding: 2rem;
//     margin-top: 80px;
//     max-width: 1400px;
//     margin-left: auto;
//     margin-right: auto;

//     @media (max-width: 768px) {
//       padding: 1rem;
//       margin-top: 70px;
//     }
//   }

//   .header {
//     text-align: center;
//     margin-bottom: 3rem;

//     h1 {
//       font-size: 2.5rem;
//       font-weight: 700;
//       margin-bottom: 0.5rem;
//       color: #e50914;
//     }

//     p {
//       font-size: 1.1rem;
//       color: #ccc;
//       margin: 0;
//     }
//   }

//   .loading {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 4rem 2rem;
//     gap: 1rem;

//     .spinner {
//       width: 40px;
//       height: 40px;
//       border: 3px solid #333;
//       border-top: 3px solid #e50914;
//       border-radius: 50%;
//       animation: spin 1s linear infinite;
//     }

//     p {
//       color: #ccc;
//       font-size: 1rem;
//     }

//     @keyframes spin {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }
//   }

//   .movies-container {
//     .section-info {
//       text-align: center;
//       margin-bottom: 2rem;

//       h2 {
//         font-size: 1.8rem;
//         color: #fff;
//         margin-bottom: 0.5rem;
//       }

//       p {
//         color: #ccc;
//         margin: 0;
//       }
//     }

//     .movies-grid {
//       display: grid;
//       grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//       gap: 1.5rem;
//       padding: 1rem 0;

//       @media (max-width: 768px) {
//         grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
//         gap: 1rem;
//       }
//     }
//   }

//   .empty-state {
//     text-align: center;
//     padding: 3rem 2rem;
//     background: rgba(255, 255, 255, 0.05);
//     border-radius: 8px;
//     border: 1px solid #333;
//     max-width: 500px;
//     margin: 0 auto;

//     .empty-icon {
//       font-size: 3rem;
//       margin-bottom: 1rem;
//     }

//     h2 {
//       font-size: 1.5rem;
//       margin-bottom: 1rem;
//       color: #fff;
//     }

//     p {
//       color: #ccc;
//       font-size: 1rem;
//       line-height: 1.5;
//       margin-bottom: 2rem;
//     }

//     .empty-actions {
//       display: flex;
//       gap: 1rem;
//       justify-content: center;
//       flex-wrap: wrap;

//       .browse-btn {
//         padding: 0.7rem 1.5rem;
//         border: none;
//         border-radius: 4px;
//         font-weight: 600;
//         cursor: pointer;
//         transition: all 0.2s ease;
//         font-size: 0.9rem;

//         &:first-child {
//           background: #e50914;
//           color: white;

//           &:hover {
//             background: #f40612;
//             transform: translateY(-1px);
//           }
//         }

//         &.secondary {
//           background: rgba(255, 255, 255, 0.1);
//           color: white;
//           border: 1px solid #333;

//           &:hover {
//             background: rgba(255, 255, 255, 0.2);
//             transform: translateY(-1px);
//           }
//         }
//       }

//       @media (max-width: 480px) {
//         flex-direction: column;
//         align-items: center;

//         .browse-btn {
//           width: 100%;
//           max-width: 200px;
//         }
//       }
//     }
//   }
// `;














import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import Card from "../components/Card";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";
import { getUsersLikedMovies } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaFilm, FaTv, FaSearch, FaPlus, FaRegSadTear } from "react-icons/fa";

export default function UserListedMovies() {
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Safe authentication handler
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

  // Safe data fetching
  useEffect(() => {
    if (email) {
      setIsLoading(true);
      try {
        dispatch(getUsersLikedMovies(email));
      } catch (error) {
        console.error("Error fetching liked movies:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    }
  }, [email, dispatch]);

  // Filter movies based on search
  useEffect(() => {
    if (movies && movies.length > 0) {
      const filtered = movies.filter(movie =>
        movie.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]);
    }
  }, [movies, searchTerm]);

  // Safe scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Safe navigation functions
  const handleBrowseMovies = () => {
    try {
      navigate("/");
    } catch (error) {
      console.error("Navigation error:", error);
      window.location.href = "/";
    }
  };

  const handleBrowseTVShows = () => {
    try {
      navigate("/tv");
    } catch (error) {
      console.error("Navigation error:", error);
      window.location.href = "/tv";
    }
  };

  // Stats calculation
  const getStats = () => {
    if (!movies) return { movies: 0, tvShows: 0 };
    
    const moviesCount = movies.filter(movie => movie.type === 'movie').length;
    const tvShowsCount = movies.filter(movie => movie.type === 'tv').length;
    
    return { movies: moviesCount, tvShows: tvShowsCount };
  };

  const stats = getStats();

  // Safe render function
  const renderContent = () => {
    if (isLoading) {
      return (
        <LoadingContainer>
          <div className="spinner-container">
            <div className="pulse-spinner">
              <div className="pulse-circle"></div>
              <div className="pulse-circle"></div>
              <div className="pulse-circle"></div>
            </div>
            <h3>Loading Your Collection</h3>
            <p>Getting your favorite movies and shows ready...</p>
          </div>
        </LoadingContainer>
      );
    }

    const displayMovies = searchTerm ? filteredMovies : movies;

    if (!displayMovies || displayMovies.length === 0) {
      return (
        <EmptyState>
          <div className="empty-art">
            <div className="heart-container">
              <FaRegSadTear className="sad-icon" />
              <div className="floating-hearts">
                <FaHeart className="floating-heart heart-1" />
                <FaHeart className="floating-heart heart-2" />
                <FaHeart className="floating-heart heart-3" />
              </div>
            </div>
          </div>
          <div className="empty-content">
            <h2>Your List is Looking Empty</h2>
            <p>Start building your personal collection by adding movies and TV shows you love</p>
            <div className="empty-actions">
              <button onClick={handleBrowseMovies} className="browse-btn primary">
                <FaFilm className="btn-icon" />
                Explore Movies
              </button>
              <button onClick={handleBrowseTVShows} className="browse-btn secondary">
                <FaTv className="btn-icon" />
                Discover TV Shows
              </button>
            </div>
          </div>
        </EmptyState>
      );
    }

    return (
      <MoviesContainer>
        <div className="content-header">
          <div className="stats-container">
            <div className="stat-card">
              <FaHeart className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">{displayMovies.length}</span>
                <span className="stat-label">Total Items</span>
              </div>
            </div>
            {/* <div className="stat-card">
              <FaFilm className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">{stats.movies}</span>
                <span className="stat-label">Movies</span>
              </div>
            </div> */}
            {/* <div className="stat-card">
              <FaTv className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">{stats.tvShows}</span>
                <span className="stat-label">TV Shows</span>
              </div>
            </div> */}
          </div>

          <div className="search-container">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search your collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="results-info">
          <h3>Your Personal Collection <span className="count-badge">{displayMovies.length} items</span></h3>
          {searchTerm && (
            <p className="search-results">
              Found {filteredMovies.length} results for "<strong>{searchTerm}</strong>"
            </p>
          )}
        </div>

        <div className="movies-grid">
          {displayMovies.map((movie, index) => (
            <Card
              key={movie.id}
              movieData={movie}
              index={index}
              isLiked={true}
            />
          ))}
        </div>
      </MoviesContainer>
    );
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content">
        <Header>
          <div className="header-content">
            <div className="title-section">
              <div className="icon-wrapper">
                <FaHeart className="title-icon" />
              </div>
              <div>
                <h1>My Collection</h1>
                <p>Your personal library of favorite content</p>
              </div>
            </div>
            <div className="header-actions">
              <button onClick={handleBrowseMovies} className="action-btn">
                <FaPlus className="btn-icon" />
                Add More
              </button>
            </div>
          </div>
        </Header>
        
        {renderContent()}
      </div>
    </Container>
  );
}

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(0.8); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(0.8); opacity: 0.7; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
`;

// Styled Components
const Container = styled.div`
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%);
  min-height: 100vh;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  position: relative;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: linear-gradient(180deg, rgba(229, 9, 20, 0.1) 0%, transparent 100%);
    pointer-events: none;
    z-index: 0;
  }

  .content {
    padding: 2rem;
    margin-top: 80px;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      padding: 1rem;
      margin-top: 70px;
    }
  }
`;

const Header = styled.div`
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.8s ease-out;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
      gap: 1rem;
    }
  }

  .title-section {
    display: flex;
    align-items: center;
    gap: 1rem;

    .icon-wrapper {
      background: linear-gradient(135deg, #e50914, #ff4757);
      padding: 1rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(229, 9, 20, 0.3);

      .title-icon {
        font-size: 2rem;
        color: white;
      }
    }

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #fff 0%, #ccc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    p {
      font-size: 1.2rem;
      color: #aaa;
      margin: 0;
      font-weight: 300;
    }
  }

  .header-actions {
    .action-btn {
      background: linear-gradient(135deg, #e50914, #ff4757);
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 50px;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 4px 20px rgba(229, 9, 20, 0.4);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 25px rgba(229, 9, 20, 0.6);
      }

      .btn-icon {
        font-size: 0.9rem;
      }
    }
  }
`;

const MoviesContainer = styled.div`
  animation: ${fadeIn} 0.6s ease-out;

  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    gap: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
  }

  .stats-container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    .stat-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        transform: translateY(-2px);
      }

      .stat-icon {
        font-size: 1.5rem;
        color: #e50914;
      }

      .stat-info {
        display: flex;
        flex-direction: column;

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #aaa;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
    }
  }

  .search-container {
    flex: 1;
    max-width: 400px;

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;

      .search-icon {
        position: absolute;
        left: 1rem;
        color: #666;
        font-size: 1rem;
      }

      .search-input {
        width: 100%;
        padding: 0.8rem 1rem 0.8rem 2.5rem;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50px;
        color: white;
        font-size: 0.9rem;
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          border-color: #e50914;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.2);
        }

        &::placeholder {
          color: #666;
        }
      }

      .clear-search {
        position: absolute;
        right: 1rem;
        background: none;
        border: none;
        color: #666;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          color: #e50914;
        }
      }
    }
  }

  .results-info {
    margin-bottom: 2rem;
    text-align: center;

    h3 {
      font-size: 1.5rem;
      color: white;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      .count-badge {
        background: linear-gradient(135deg, #e50914, #ff4757);
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
      }
    }

    .search-results {
      color: #aaa;
      font-size: 0.9rem;
    }
  }

  .movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.8rem;
    padding: 1rem 0;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 1.2rem;
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 1rem;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;

  .spinner-container {
    text-align: center;
    animation: ${fadeIn} 0.6s ease-out;

    h3 {
      color: white;
      margin-bottom: 0.5rem;
      font-size: 1.3rem;
    }

    p {
      color: #aaa;
      margin: 0;
    }
  }

  .pulse-spinner {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;

    .pulse-circle {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: linear-gradient(135deg, #e50914, #ff4757);
      animation: ${pulse} 1.5s ease-in-out infinite;

      &:nth-child(2) {
        animation-delay: 0.2s;
      }

      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  animation: ${fadeIn} 0.8s ease-out;

  .empty-art {
    margin-bottom: 2rem;

    .heart-container {
      position: relative;
      display: inline-block;

      .sad-icon {
        font-size: 4rem;
        color: #e50914;
        opacity: 0.7;
        animation: ${float} 3s ease-in-out infinite;
      }

      .floating-hearts {
        .floating-heart {
          position: absolute;
          color: #e50914;
          opacity: 0.3;
          font-size: 1.2rem;

          &.heart-1 {
            top: -20px;
            left: -30px;
            animation: ${float} 2s ease-in-out infinite;
          }

          &.heart-2 {
            top: -10px;
            right: -25px;
            animation: ${float} 2.5s ease-in-out infinite;
          }

          &.heart-3 {
            bottom: -15px;
            left: -10px;
            animation: ${float} 3.5s ease-in-out infinite;
          }
        }
      }
    }
  }

  .empty-content {
    h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: white;
      font-weight: 600;
    }

    p {
      color: #aaa;
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .empty-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;

    .browse-btn {
      padding: 0.8rem 1.8rem;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &.primary {
        background: linear-gradient(135deg, #e50914, #ff4757);
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

      .btn-icon {
        font-size: 0.9rem;
      }
    }

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: center;

      .browse-btn {
        width: 100%;
        max-width: 250px;
        justify-content: center;
      }
    }
  }
`;