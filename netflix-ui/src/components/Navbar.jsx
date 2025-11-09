import { signOut } from "firebase/auth";
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../utils/firebase-config";
import { FaPowerOff, FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputHover, setInputHover] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  const isActiveLink = (link) => {
    return location.pathname === link;
  };

  // Handle search input focus and show/hide
  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery("");
    }
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
      closeMobileMenu();
    }
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        if (!inputHover) {
          setShowSearch(false);
          setSearchQuery("");
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputHover]);

  // Close search when route changes
  useEffect(() => {
    setShowSearch(false);
    setSearchQuery("");
  }, [location.pathname]);

  const handleSignOut = () => {
    signOut(firebaseAuth).catch((error) => {
      console.error("Sign out error:", error);
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="nav-content">
          {/* Left Section - Logo and Links */}
          <div className="left-section">
            <div className="logo">
              <img src={logo} alt="Netflix Logo" />
            </div>
            
            <ul className="desktop-links">
              {links.map(({ name, link }) => (
                <li key={name}>
                  <Link 
                    to={link} 
                    className={isActiveLink(link) ? "active" : ""}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Search and User Actions */}
          <div className="right-section">
            {/* Search Bar */}
            <div 
              className={`search-container ${showSearch ? "active" : ""}`}
              ref={searchContainerRef}
            >
              <form onSubmit={handleSearch} className="search-form">
                <button
                  type="button"
                  className="search-toggle"
                  onClick={handleSearchToggle}
                  aria-label="Search"
                >
                  <FaSearch />
                </button>
                <div className="search-input-wrapper">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search movies and TV shows..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onMouseEnter={() => setInputHover(true)}
                    onMouseLeave={() => setInputHover(false)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="clear-search"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Sign Out Button */}
            <button 
              className="sign-out-btn"
              onClick={handleSignOut}
              aria-label="Sign Out"
            >
              <FaPowerOff />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          {/* Mobile Search */}
          <div className="mobile-search">
            <form onSubmit={handleSearch} className="search-form">
              <div className="mobile-search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search movies and TV shows..."
                  className="mobile-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </form>
          </div>

          <ul className="mobile-links">
            {links.map(({ name, link }) => (
              <li key={name}>
                <Link 
                  to={link} 
                  className={isActiveLink(link) ? "active" : ""}
                  onClick={closeMobileMenu}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="mobile-actions">
            <button 
              className="mobile-sign-out"
              onClick={handleSignOut}
            >
              <FaPowerOff />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-overlay"
            onClick={closeMobileMenu}
          />
        )}
      </nav>
    </Container>
  );
}

const Container = styled.div`
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.4) 60%,
      transparent 100%
    );
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 1000;
    padding: 0;

    &.scrolled {
      background: rgba(0, 0, 0, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      max-width: 1920px;
      margin: 0 auto;
      padding: 0 4%;

      @media (max-width: 768px) {
        padding: 0 20px;
      }
    }

    /* Left Section */
    .left-section {
      display: flex;
      align-items: center;
      gap: 40px;

      @media (max-width: 1024px) {
        gap: 30px;
      }

      .logo {
        img {
          height: 36px;
          width: auto;
          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.05);
          }

          @media (max-width: 768px) {
            height: 28px;
          }
        }
      }

      .desktop-links {
        display: flex;
        list-style: none;
        gap: 24px;
        margin: 0;
        padding: 0;

        @media (max-width: 1024px) {
          gap: 20px;
        }

        @media (max-width: 768px) {
          display: none;
        }

        li {
          a {
            color: #e5e5e5;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
            padding: 8px 0;

            &:hover {
              color: #ffffff;
            }

            &.active {
              color: #ffffff;
              font-weight: 600;

              &::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                right: 0;
                height: 2px;
                background: #e50914;
                border-radius: 2px;
              }
            }
          }
        }
      }
    }

    /* Right Section */
    .right-section {
      display: flex;
      align-items: center;
      gap: 20px;

      @media (max-width: 768px) {
        gap: 16px;
      }

      /* Search Container */
      .search-container {
        display: flex;
        align-items: center;
        position: relative;
        transition: all 0.3s ease;

        &.active {
          .search-input-wrapper {
            width: 240px;
            opacity: 1;
            visibility: visible;

            @media (max-width: 768px) {
              width: 200px;
            }

            @media (max-width: 480px) {
              position: absolute;
              top: 100%;
              right: 0;
              width: 280px;
              margin-top: 10px;
            }
          }
        }

        .search-form {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .search-toggle {
          background: transparent;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }

          svg {
            font-size: 18px;

            @media (max-width: 768px) {
              font-size: 16px;
            }
          }
        }

        .search-input-wrapper {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          align-items: center;

          .search-input {
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 4px;
            color: #ffffff;
            padding: 8px 12px;
            font-size: 14px;
            width: 100%;
            transition: all 0.3s ease;
            padding-right: 35px;

            &::placeholder {
              color: rgba(255, 255, 255, 0.6);
            }

            &:focus {
              outline: none;
              border-color: #e50914;
              background: rgba(0, 0, 0, 0.9);
            }
          }

          .clear-search {
            position: absolute;
            right: 8px;
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.6);
            cursor: pointer;
            padding: 4px;
            border-radius: 50%;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
              color: #ffffff;
              background: rgba(255, 255, 255, 0.1);
            }

            svg {
              font-size: 12px;
            }
          }
        }
      }

      /* Sign Out Button */
      .sign-out-btn {
        background: transparent;
        border: none;
        color: #ffffff;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background: rgba(229, 9, 20, 0.2);
          color: #e50914;
        }

        svg {
          font-size: 18px;

          @media (max-width: 768px) {
            font-size: 16px;
          }
        }

        @media (max-width: 768px) {
          display: none;
        }
      }

      /* Mobile Menu Toggle */
      .mobile-menu-toggle {
        background: transparent;
        border: none;
        color: #ffffff;
        cursor: pointer;
        padding: 8px;
        display: none;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        svg {
          font-size: 20px;
        }

        @media (max-width: 768px) {
          display: flex;
        }
      }
    }

    /* Mobile Menu */
    .mobile-menu {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.98);
      backdrop-filter: blur(20px);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      z-index: 999;

      &.open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      /* Mobile Search */
      .mobile-search {
        padding: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        .mobile-search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;

          .search-icon {
            position: absolute;
            left: 12px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 16px;
            z-index: 1;
          }

          .mobile-search-input {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            color: #ffffff;
            padding: 12px 12px 12px 40px;
            font-size: 16px;
            width: 100%;
            transition: all 0.3s ease;

            &::placeholder {
              color: rgba(255, 255, 255, 0.6);
            }

            &:focus {
              outline: none;
              border-color: #e50914;
              background: rgba(255, 255, 255, 0.15);
            }
          }

          .clear-search {
            position: absolute;
            right: 12px;
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.6);
            cursor: pointer;
            padding: 4px;
            border-radius: 50%;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
              color: #ffffff;
              background: rgba(255, 255, 255, 0.1);
            }

            svg {
              font-size: 14px;
            }
          }
        }
      }

      .mobile-links {
        list-style: none;
        margin: 0;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 0;

        li {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);

          &:last-child {
            border-bottom: none;
          }

          a {
            display: block;
            color: #e5e5e5;
            text-decoration: none;
            font-size: 18px;
            font-weight: 500;
            padding: 16px 0;
            transition: all 0.3s ease;

            &:hover {
              color: #ffffff;
              padding-left: 10px;
            }

            &.active {
              color: #e50914;
              font-weight: 600;
            }
          }
        }
      }

      .mobile-actions {
        padding: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);

        .mobile-sign-out {
          display: flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          padding: 12px 20px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;

          &:hover {
            background: rgba(229, 9, 20, 0.2);
            border-color: #e50914;
          }

          svg {
            font-size: 16px;
          }

          span {
            font-size: 14px;
            font-weight: 500;
          }
        }
      }
    }

    /* Mobile Overlay */
    .mobile-overlay {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 998;
    }
  }
`;
