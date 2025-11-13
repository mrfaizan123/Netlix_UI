import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const { email, password } = formValues;

    if (!email.trim()) {
      setErrorMessage("Email is required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email.");
      return false;
    }

    if (showPassword && password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("This email is already registered.");
      } else {
        setErrorMessage("Something went wrong. Try again.");
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
  }, [navigate]);

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership.
            </h6>
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <div className="form">
            <input
              type="email"
              placeholder="Email address"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
            />

            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({ ...formValues, password: e.target.value })
                }
              />
            )}

            {!showPassword && (
              <button onClick={() => validateForm() && setShowPassword(true)}>
                Get Started
              </button>
            )}
          </div>

          {showPassword && <button onClick={handleSignUp}>Sign Up</button>}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  z-index: 2;

  .error {
    color: #ff6767;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    background: rgba(255, 0, 0, 0.15);
    padding: 0.4rem 1rem;
    border-radius: 5px;
    text-align: center;
  }

  .content {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;

    .body {
      gap: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .text {
        gap: 1rem;
        text-align: center;
        color: white;
        padding: 0 2rem;

        h1 {
          font-size: 2.5rem;
          line-height: 1.2;
        }

        h4 {
          font-size: 1.2rem;
          font-weight: 400;
        }

        h6 {
          font-size: 1rem;
          font-weight: 300;
          color: #ccc;
        }
      }

      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        max-width: 700px;
        gap: 0.5rem;

        input {
          padding: 1rem;
          font-size: 1.1rem;
          border: none;
          border-radius: 0.2rem;
          outline: none;
        }

        button {
          background-color: #e50914;
          color: white;
          cursor: pointer;
          border: none;
          font-size: 1.05rem;
          border-radius: 0.2rem;
          transition: 0.3s;

          &:hover {
            background-color: #f6121d;
          }
        }
      }

      button {
        padding: 0.7rem 1.2rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        font-weight: bold;
        border-radius: 0.2rem;
        font-size: 1.1rem;
        transition: 0.3s;

        &:hover {
          background-color: #f6121d;
        }
      }
    }
  }

  /* ✅ Responsive Styles */

  @media (max-width: 1024px) {
    .content .body .text h1 {
      font-size: 2rem;
    }
    .content .body .form {
      width: 70%;
    }
  }

  @media (max-width: 768px) {
    .content {
      grid-template-rows: 12vh 88vh;
    }

    .content .body .text h1 {
      font-size: 1.8rem;
    }

    .content .body .text h4 {
      font-size: 1rem;
    }

    .content .body .text h6 {
      font-size: 0.9rem;
    }

    .content .body .form {
      width: 85%;
      grid-template-columns: 1fr;
    }

    .content .body .form input,
    .content .body .form button {
      width: 100%;
    }

    .content .body button {
      width: 85%;
    }
  }

  @media (max-width: 480px) {
    .content .body .text {
      padding: 0 1rem;
    }

    .content .body .text h1 {
      font-size: 1.5rem;
    }

    .content .body .text h4 {
      font-size: 0.9rem;
    }

    .content .body .text h6 {
      font-size: 0.8rem;
    }

    .content .body .form {
      width: 90%;
    }

    .error {
      font-size: 0.9rem;
      width: 90%;
    }
  }
`;

export default Signup;
































// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import BackgroundImage from "../components/BackgroundImage";
// import Header from "../components/Header";
// import { firebaseAuth } from "../utils/firebase-config";

// function Signup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formValues, setFormValues] = useState({
//     email: "",
//     password: "",
//   });
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const { email, password } = formValues;

//     if (!email.trim()) {
//       setErrorMessage("Email is required.");
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setErrorMessage("Please enter a valid email.");
//       return false;
//     }

//     if (showPassword && password.length < 6) {
//       setErrorMessage("Password must be at least 6 characters.");
//       return false;
//     }

//     setErrorMessage("");
//     return true;
//   };

//   const handleSignUp = async () => {
//     if (!validateForm()) return;

//     try {
//       const { email, password } = formValues;
//       await createUserWithEmailAndPassword(firebaseAuth, email, password);
//     } catch (error) {
//       if (error.code === "auth/email-already-in-use") {
//         setErrorMessage("This email is already registered.");
//       } else {
//         setErrorMessage("Something went wrong. Try again.");
//       }
//     }
//   };

//   useEffect(() => {
//     onAuthStateChanged(firebaseAuth, (currentUser) => {
//       if (currentUser) navigate("/");
//     });
//   }, [navigate]);

//   return (
//     <Container showPassword={showPassword}>
//       <BackgroundImage />
//       <div className="content">
//         <Header login />
//         <div className="body flex column a-center j-center">
//           <div className="text flex column">
//             <h1>Unlimited movies, TV shows and more.</h1>
//             <h4>Watch anywhere. Cancel anytime.</h4>
//             <h6>
//               Ready to watch? Enter your email to create or restart membership.
//             </h6>
//           </div>

//           {errorMessage && <p className="error">{errorMessage}</p>}

//           <div className="form">
//             <input
//               type="email"
//               placeholder="Email address"
//               value={formValues.email}
//               onChange={(e) =>
//                 setFormValues({ ...formValues, email: e.target.value })
//               }
//             />

//             {showPassword && (
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={formValues.password}
//                 onChange={(e) =>
//                   setFormValues({ ...formValues, password: e.target.value })
//                 }
//               />
//             )}

//             {!showPassword && (
//               <button onClick={() => validateForm() && setShowPassword(true)}>
//                 Get Started
//               </button>
//             )}
//           </div>

//           {showPassword && <button onClick={handleSignUp}>Sign Up</button>}
//         </div>
//       </div>
//     </Container>
//   );
// }

// const Container = styled.div`
//   position: relative;
//   z-index: 2;

//   .error {
//     color: #ff6767;
//     font-size: 1rem;
//     margin-bottom: 0.5rem;
//     background: rgba(255, 0, 0, 0.15);
//     padding: 0.4rem 1rem;
//     border-radius: 5px;
//   }

//   .content {
//     background-color: rgba(0, 0, 0, 0.6);
//     height: 100vh;
//     width: 100vw;
//     display: grid;
//     grid-template-rows: 15vh 85vh;

//     .body {
//       gap: 1.5rem;

//       .text {
//         gap: 1rem;
//         text-align: center;
//         color: white;
//       }

//       .form {
//         display: grid;
//         grid-template-columns: ${({ showPassword }) =>
//           showPassword ? "1fr 1fr" : "2fr 1fr"};
//         width: 60%;

//         input {
//           padding: 1rem;
//           font-size: 1.1rem;
//         }

//         button {
//           background-color: #e50914;
//           color: white;
//           cursor: pointer;
//           border: none;
//           font-size: 1.05rem;
//         }
//       }

//       button {
//         padding: 0.7rem 1.2rem;
//         background-color: #e50914;
//         border: none;
//         cursor: pointer;
//         color: white;
//         font-weight: bold;
//         border-radius: 0.2rem;
//         font-size: 1.1rem;
//       }
//     }
//   }
// `;

// export default Signup;
