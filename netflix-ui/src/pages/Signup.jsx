// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";
// import React, { useState } from "react";
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
//   const navigate = useNavigate();

//   const handleSignIn = async () => {
//     try {
//       const { email, password } = formValues;
//       await createUserWithEmailAndPassword(firebaseAuth, email, password);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   onAuthStateChanged(firebaseAuth, (currentUser) => {
//     if (currentUser) navigate("/");
//   });

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
//           <div className="form">
//             <input
//               type="email"
//               placeholder="Email address"
//               onChange={(e) =>
//                 setFormValues({
//                   ...formValues,
//                   [e.target.name]: e.target.value,
//                 })
//               }
//               name="email"
//               value={formValues.email}
//             />
//             {showPassword && (
//               <input
//                 type="password"
//                 placeholder="Password"
//                 onChange={(e) =>
//                   setFormValues({
//                     ...formValues,
//                     [e.target.name]: e.target.value,
//                   })
//                 }
//                 name="password"
//                 value={formValues.password}
//               />
//             )}
//             {!showPassword && (
//               <button onClick={() => setShowPassword(true)}>Get Started</button>
//             )}
//           </div>
//           {showPassword && <button onClick={handleSignIn}>Log In</button>}
//         </div>
//       </div>
//     </Container>
//   );
// }

// const Container = styled.div`
//   position: relative;
//   .content {
//     position: absolute;
//     top: 0;
//     left: 0;
//     background-color: rgba(0, 0, 0, 0.5);
//     height: 100vh;
//     width: 100vw;
//     display: grid;
//     grid-template-rows: 15vh 85vh;
//     .body {
//       gap: 1rem;
//       .text {
//         gap: 1rem;
//         text-align: center;
//         font-size: 2rem;
//         h1 {
//           padding: 0 25rem;
//         }
//       }
//       .form {
//         display: grid;
//         grid-template-columns: ${({ showPassword }) =>
//           showPassword ? "1fr 1fr" : "2fr 1fr"};
//         width: 60%;
//         input {
//           color: black;
//           border: none;
//           padding: 1.5rem;
//           font-size: 1.2rem;
//           border: 1px solid black;
//           &:focus {
//             outline: none;
//           }
//         }
//         button {
//           padding: 0.5rem 1rem;
//           background-color: #e50914;
//           border: none;
//           cursor: pointer;
//           color: white;
//           font-weight: bolder;
//           font-size: 1.05rem;
//         }
//       }
//       button {
//         padding: 0.5rem 1rem;
//         background-color: #e50914;
//         border: none;
//         cursor: pointer;
//         color: white;
//         border-radius: 0.2rem;
//         font-weight: bolder;
//         font-size: 1.05rem;
//       }
//     }
//   }
// `;

// export default Signup;









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
  }

  .content {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;

    .body {
      gap: 1.5rem;

      .text {
        gap: 1rem;
        text-align: center;
        color: white;
      }

      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;

        input {
          padding: 1rem;
          font-size: 1.1rem;
        }

        button {
          background-color: #e50914;
          color: white;
          cursor: pointer;
          border: none;
          font-size: 1.05rem;
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
      }
    }
  }
`;

export default Signup;
