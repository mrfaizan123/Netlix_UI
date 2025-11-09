// import React from "react";
// import styled from "styled-components";
// import CardSlider from "./CardSlider";
// export default function Slider({ movies }) {
//   const getMoviesFromRange = (from, to) => {
//     return movies.slice(from, to);
//   };
//   return (
//     <Container>
//       <CardSlider data={getMoviesFromRange(0, 10)} title="Trending Now" />
//       <CardSlider data={getMoviesFromRange(10, 20)} title="New Releases" />
//       <CardSlider
//         data={getMoviesFromRange(20, 30)}
//         title="Blockbuster Movies"
//       />
//       <CardSlider
//         data={getMoviesFromRange(30, 40)}
//         title="Popular on Netflix"
//       />
//       <CardSlider data={getMoviesFromRange(40, 50)} title="Action Movies" />
//       <CardSlider data={getMoviesFromRange(50, 60)} title="Epics" />
//     </Container>
//   );
// }

// const Container = styled.div``;



// import React from "react";
// import styled from "styled-components";
// import CardSlider from "./CardSlider";
// export default function Slider({ movies }) {
//   const getMoviesFromRange = (from, to) => {
//     return movies.slice(from, to);
//   };
//   return (
//     <Container>
//       <CardSlider data={getMoviesFromRange(0, 10)} title="Trending Now" />
//       <CardSlider data={getMoviesFromRange(10, 20)} title="New Releases" />
//       <CardSlider
//         data={getMoviesFromRange(20, 30)}
//         title="Blockbuster Movies"
//       />
//       <CardSlider
//         data={getMoviesFromRange(30, 40)}
//         title="Popular on Netflix"
//       />
//       <CardSlider data={getMoviesFromRange(40, 50)} title="Action Movies" />
//       <CardSlider data={getMoviesFromRange(50, 60)} title="Epics" />
//     </Container>
//   );
// }

// const Container = styled.div``;





import React from "react";
import styled from "styled-components";
import CardSlider from "./CardSlider";
import { Link } from "react-router-dom";

export default function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  
  return (
    <Container>
      <CardSlider data={getMoviesFromRange(0, 10)} title="Trending Now" />
      <CardSlider data={getMoviesFromRange(10, 20)} title="New Releases" />
      <CardSlider
        data={getMoviesFromRange(20, 30)}
        title="Blockbuster Movies"
      />
      <CardSlider
        data={getMoviesFromRange(30, 40)}
        title="Popular on Netflix"
      />
      <CardSlider data={getMoviesFromRange(40, 50)} title="Action Movies" />
      <CardSlider data={getMoviesFromRange(50, 60)} title="Epics" />
      
      {/* Same Footer */}
      <Footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>StreamVibe</h4>
            <p>The ultimate destination for movie lovers. Premium content, exceptional quality, endless entertainment.</p>
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
            <h5>Features</h5>
            <ul>
              <li>4K Streaming</li>
              <li>Download Movies</li>
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
          <p>&copy; 2024 StreamVibe. All rights reserved. Made with ❤️ for movie lovers.</p>
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

const Container = styled.div``;

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





