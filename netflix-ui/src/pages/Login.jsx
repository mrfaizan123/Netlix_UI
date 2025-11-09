import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim()) {
      setErrorMessage("Email is required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email.");
      return false;
    }
    if (!password.trim()) {
      setErrorMessage("Password is required.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMessage("No account exists with this email.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password. Try again.");
      } else {
        setErrorMessage("Something went wrong. Try again.");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>

            {errorMessage && <p className="error">{errorMessage}</p>}

            <div className="container flex column">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button onClick={handleLogin}>Login to your account</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;

  .error {
    color: #ff6b6b;
    background: rgba(255, 50, 50, 0.15);
    padding: 0.6rem 1rem;
    border-radius: 6px;
    font-size: 0.95rem;
    text-align: center;
    width: 100%;
    max-width: 300px;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    display: flex;
    flex-direction: column;

    .form-container {
      gap: 2rem;
      height: 85vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;

      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 90%;
        max-width: 400px;
        min-width: 280px;
        gap: 2rem;
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

        @media (min-width: 768px) {
          width: 25vw;
          min-width: 300px;
          max-width: 450px;
        }

        @media (min-width: 1200px) {
          width: 25vw;
          max-width: 500px;
        }

        .title {
          text-align: center;
          width: 100%;

          h3 {
            margin: 0;
            font-size: clamp(1.5rem, 4vw, 2rem);
            font-weight: 600;
          }
        }

        .container {
          gap: 1.5rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          input {
            padding: 0.8rem 1rem;
            width: 100%;
            max-width: 300px;
            border: none;
            border-radius: 4px;
            background-color: #333;
            color: white;
            font-size: 1rem;
            transition: all 0.3s ease;

            &:focus {
              outline: none;
              background-color: #444;
              box-shadow: 0 0 0 2px #e50914;
            }

            &::placeholder {
              color: #8c8c8c;
            }
          }

          button {
            padding: 0.8rem 1.5rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 4px;
            font-weight: 600;
            font-size: 1rem;
            width: 100%;
            max-width: 300px;
            transition: 0.3s;

            &:hover {
              background-color: #f40612;
              transform: translateY(-1px);
            }
          }
        }
      }
    }
  }
`;

export default Login;
