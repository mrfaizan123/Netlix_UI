import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Card from "../components/Card";
import { FaSearch, FaFilm, FaTv, FaTimes } from "react-icons/fa";

function Search() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  // Get search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  // Filter movies based on search query
  useEffect(() => {
    if (searchQuery && movies.length > 0) {
      setIsLoading(true);
      
      // Simulate API call delay
      const timer = setTimeout(() => {
        const filtered = movies.filter(movie =>
          movie.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, movies]);

  const clearSearch = () => {
    navigate("/");
  };

  const getMoviesCount = () => searchResults.filter(movie => movie.type === 'movie').length;
  const getTVShowsCount = () => searchResults.filter(movie => movie.type === 'tv').length;

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      
      <div className="content">
        {/* Search Header */}
        <SearchHeader>
          <div className="search-info">
            <h1>Search Results</h1>
            {searchQuery && (
              <div className="query-display">
                <span>for: "{searchQuery}"</span>
                <button onClick={clearSearch} className="clear-search-btn">
                  <FaTimes />
                  Clear Search
                </button>
              </div>
            )}
          </div>
          
          {searchQuery && (
            <div className="search-stats">
              <div className="stat">
                <FaSearch className="stat-icon" />
                <span>{searchResults.length} results</span>
              </div>
              {/* <div className="stat">
                <FaFilm className="stat-icon" />
                <span>{getMoviesCount()} movies</span>
              </div>
              <div className="stat">
                <FaTv className="stat-icon" />
                <span>{getTVShowsCount()} TV shows</span>
              </div> */}
            </div>
          )}
        </SearchHeader>

        {/* Search Results */}
        {isLoading ? (
          <LoadingContainer>
            <div className="loading-spinner"></div>
            <p>Searching for "{searchQuery}"...</p>
          </LoadingContainer>
        ) : searchQuery ? (
          searchResults.length > 0 ? (
            <ResultsContainer>
              <div className="results-grid">
                {searchResults.map((movie, index) => (
                  <Card
                    key={movie.id}
                    movieData={movie}
                    index={index}
                    isLiked={false}
                  />
                ))}
              </div>
            </ResultsContainer>
          ) : (
            <NoResults>
              <div className="no-results-content">
                <FaSearch className="no-results-icon" />
                <h2>No results found for "{searchQuery}"</h2>
                <p>Try different keywords or check the spelling</p>
                <button onClick={clearSearch} className="browse-btn">
                  Browse All Content
                </button>
              </div>
            </NoResults>
          )
        ) : (
          <EmptySearch>
            <div className="empty-search-content">
              <FaSearch className="empty-search-icon" />
              <h2>Search for Movies and TV Shows</h2>
              <p>Use the search bar to find your favorite content</p>
            </div>
          </EmptySearch>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
  min-height: 100vh;
  color: white;

  .content {
    padding: 2rem;
    margin-top: 80px;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 768px) {
      padding: 1rem;
      margin-top: 70px;
    }
  }
`;

const SearchHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;

  .search-info {
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #fff;
    }

    .query-display {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;

      span {
        font-size: 1.2rem;
        color: #ccc;
      }

      .clear-search-btn {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
      }
    }
  }

  .search-stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
    flex-wrap: wrap;

    .stat {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.8rem 1.5rem;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);

      .stat-icon {
        color: #e50914;
        font-size: 1rem;
      }

      span {
        font-size: 0.9rem;
        color: #ccc;
      }
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1.5rem;

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top: 4px solid #e50914;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  p {
    color: #ccc;
    font-size: 1.2rem;
    margin: 0;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ResultsContainer = styled.div`
  .results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    padding: 1rem 0;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }
  }
`;

const NoResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;

  .no-results-content {
    max-width: 400px;

    .no-results-icon {
      font-size: 4rem;
      color: #e50914;
      margin-bottom: 1.5rem;
      opacity: 0.7;
    }

    h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: #fff;
    }

    p {
      color: #ccc;
      font-size: 1.1rem;
      margin-bottom: 2rem;
      line-height: 1.5;
    }

    .browse-btn {
      background: linear-gradient(45deg, #e50914, #ff6b6b);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(229, 9, 20, 0.4);
      }
    }
  }
`;

const EmptySearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  text-align: center;

  .empty-search-content {
    max-width: 400px;

    .empty-search-icon {
      font-size: 5rem;
      color: #e50914;
      margin-bottom: 2rem;
      opacity: 0.5;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #fff;
    }

    p {
      color: #ccc;
      font-size: 1.2rem;
      line-height: 1.5;
    }
  }
`;

export default Search;