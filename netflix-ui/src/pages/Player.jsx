// import React from "react";
// import styled from "styled-components";
// import { BsArrowLeft } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import video from "../assets/video.mp4";
// export default function Player() {
//   const navigate = useNavigate();

//   return (
//     <Container>
//       <div className="player">
//         <div className="back">
//           <BsArrowLeft onClick={() => navigate(-1)} />
//         </div>
//         <video src={video} autoPlay loop controls muted />
//       </div>
//     </Container>
//   );
// }

// const Container = styled.div`
//   .player {
//     width: 100vw;
//     height: 100vh;
//     .back {
//       position: absolute;
//       padding: 2rem;
//       z-index: 1;
//       svg {
//         font-size: 3rem;
//         cursor: pointer;
//       }
//     }
//     video {
//       height: 100%;
//       width: 100%;
//       object-fit: cover;
//     }
//   }
// `;





import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";

export default function Player() {
  const navigate = useNavigate();
  const location = useLocation();
  const movie = location.state?.movie;

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        {movie ? (
          movie.videoUrl ? (
            <iframe
              width="100%"
              height="100%"
              src={movie.videoUrl.replace("watch?v=", "embed/")}
              title={movie.name}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          ) : (
            <video
              src="/fallback.mp4" // fallback local video
              autoPlay
              loop
              controls
            />
          )
        ) : (
          <p>No movie selected</p>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    video, iframe {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
