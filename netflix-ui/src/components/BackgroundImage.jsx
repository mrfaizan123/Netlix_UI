




// import React from "react";
// import styled from "styled-components";
// import background from "../assets/login.jpg";

// export default function BackgroundImage() {
//   return (
//     <Container>
//       <picture>
//         {/* Multiple image sources for different screen sizes */}
//         <source 
//           media="(max-width: 480px)" 
//           srcSet={background}
//         />
//         <source 
//           media="(max-width: 768px)" 
//           srcSet={background}
//         />
//         <source 
//           media="(max-width: 1024px)" 
//           srcSet={background}
//         />
//         <img 
//           src={background} 
//           alt="Netflix background" 
//           className="background-image"
//           loading="eager"
//         />
//       </picture>
//       <div className="background-overlay"></div>
//     </Container>
//   );
// }

// const Container = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   z-index: -1;
//   overflow: hidden;

//   .background-image {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     object-position: center;
    
//     /* Optimize image rendering */
//     image-rendering: -webkit-optimize-contrast;
//     image-rendering: crisp-edges;
    
//     /* Prevent layout shift */
//     display: block;
    
//     /* Smooth scaling */
//     transition: transform 0.3s ease;
    
//     /* Mobile-first scaling */
//     @media (max-width: 480px) {
//       object-position: 65% center;
//       transform: scale(1.1);
//     }
    
//     @media (min-width: 481px) and (max-width: 768px) {
//       object-position: 60% center;
//       transform: scale(1.05);
//     }
    
//     @media (min-width: 769px) and (max-width: 1024px) {
//       object-position: center;
//       transform: scale(1.02);
//     }
    
//     @media (min-width: 1025px) and (max-width: 1440px) {
//       object-position: center;
//       transform: scale(1.01);
//     }
    
//     @media (min-width: 1441px) {
//       object-position: center;
//       transform: scale(1);
//     }
    
//     /* High-resolution displays */
//     @media only screen and (-webkit-min-device-pixel-ratio: 2),
//            only screen and (min-resolution: 192dpi) {
//       image-rendering: -webkit-optimize-contrast;
//     }
//   }

//   .background-overlay {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(
//       to bottom,
//       rgba(0, 0, 0, 0.3) 0%,
//       rgba(0, 0, 0, 0.6) 50%,
//       rgba(0, 0, 0, 0.8) 100%
//     );
    
//     /* Enhanced overlay for different screen sizes */
//     @media (max-width: 480px) {
//       background: linear-gradient(
//         to bottom,
//         rgba(0, 0, 0, 0.4) 0%,
//         rgba(0, 0, 0, 0.7) 50%,
//         rgba(0, 0, 0, 0.9) 100%
//       );
//     }
    
//     @media (min-width: 481px) and (max-width: 768px) {
//       background: linear-gradient(
//         to bottom,
//         rgba(0, 0, 0, 0.35) 0%,
//         rgba(0, 0, 0, 0.65) 50%,
//         rgba(0, 0, 0, 0.85) 100%
//       );
//     }

//     /* Add subtle gradient variations for different orientations */
//     @media (max-height: 600px) and (orientation: landscape) {
//       background: linear-gradient(
//         to right,
//         rgba(0, 0, 0, 0.4) 0%,
//         rgba(0, 0, 0, 0.7) 30%,
//         rgba(0, 0, 0, 0.9) 100%
//       );
//     }
//   }

//   /* Performance optimizations */
//   will-change: transform;
//   backface-visibility: hidden;
//   perspective: 1000;
  
//   /* Prevent image drag */
//   -webkit-user-drag: none;
//   -khtml-user-drag: none;
//   -moz-user-drag: none;
//   -o-user-drag: none;
//   user-drag: none;

//   /* Touch device optimizations */
//   @media (hover: none) and (pointer: coarse) {
//     .background-image {
//       transform: none; /* Remove scale on touch devices */
//     }
//   }

//   /* Reduced motion support */
//   @media (prefers-reduced-motion: reduce) {
//     .background-image {
//       transition: none;
//     }
//   }

//   /* Dark mode support */
//   @media (prefers-color-scheme: dark) {
//     .background-overlay {
//       background: linear-gradient(
//         to bottom,
//         rgba(0, 0, 0, 0.5) 0%,
//         rgba(0, 0, 0, 0.8) 50%,
//         rgba(0, 0, 0, 0.95) 100%
//       );
//     }
//   }

//   /* Print styles */
//   @media print {
//     display: none;
//   }
// `;




import React from "react";
import styled from "styled-components";
import background from "../assets/login.jpg";

export default function BackgroundImage() {
  return (
    <Container>
      <picture>
        {/* Multiple image sources for different screen sizes */}
        <source 
          media="(max-width: 320px)" 
          srcSet={background}
        />
        <source 
          media="(max-width: 480px)" 
          srcSet={background}
        />
        <source 
          media="(max-width: 768px)" 
          srcSet={background}
        />
        <source 
          media="(max-width: 1024px)" 
          srcSet={background}
        />
        <img 
          src={background} 
          alt="Netflix background" 
          className="background-image"
          loading="eager"
        />
      </picture>
      <div className="background-overlay"></div>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;

  /* Extra Small Mobile (320px and below) */
  @media (max-width: 320px) {
    height: 100vh;
    min-height: -webkit-fill-available; /* For mobile browsers */
  }

  /* Small Mobile (321px to 480px) */
  @media (min-width: 321px) and (max-width: 480px) {
    height: 100vh;
    min-height: -webkit-fill-available;
  }

  .background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    
    /* Mobile-First Scaling */
    
    /* Extra Small Devices (320px and below) - Very small phones */
    @media (max-width: 320px) {
      object-position: 75% center;
      transform: scale(1.15);
      min-height: 100vh;
    }
    
    /* Small Mobile (321px - 375px) - iPhone SE, small Android */
    @media (min-width: 321px) and (max-width: 375px) {
      object-position: 70% center;
      transform: scale(1.12);
    }
    
    /* Medium Mobile (376px - 480px) - Most smartphones */
    @media (min-width: 376px) and (max-width: 480px) {
      object-position: 65% center;
      transform: scale(1.08);
    }
    
    /* Large Mobile (481px - 768px) - Tablets, large phones */
    @media (min-width: 481px) and (max-width: 768px) {
      object-position: 60% center;
      transform: scale(1.05);
    }
    
    /* Small Tablets (769px - 1024px) */
    @media (min-width: 769px) and (max-width: 1024px) {
      object-position: center;
      transform: scale(1.02);
    }
    
    /* Desktop and larger */
    @media (min-width: 1025px) {
      object-position: center;
      transform: scale(1);
    }

    /* Landscape Mode Optimizations */
    @media (max-height: 500px) and (orientation: landscape) {
      object-position: 25% center;
      transform: scale(1.1);
      
      /* Very short landscape screens */
      @media (max-height: 400px) {
        object-position: 30% center;
        transform: scale(1.15);
      }
    }
  }

  .background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
    /* Default gradient */
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(0, 0, 0, 0.8) 100%
    );
    
    /* Mobile-specific overlays */
    
    /* Extra Small Mobile */
    @media (max-width: 320px) {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.75) 50%,
        rgba(0, 0, 0, 0.95) 100%
      );
    }
    
    /* Small to Medium Mobile */
    @media (min-width: 321px) and (max-width: 480px) {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.45) 0%,
        rgba(0, 0, 0, 0.7) 50%,
        rgba(0, 0, 0, 0.9) 100%
      );
    }
    
    /* Large Mobile */
    @media (min-width: 481px) and (max-width: 768px) {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0.65) 50%,
        rgba(0, 0, 0, 0.85) 100%
      );
    }

    /* Landscape Mode Overlays */
    @media (orientation: landscape) {
      @media (max-height: 500px) {
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(0, 0, 0, 0.75) 30%,
          rgba(0, 0, 0, 0.95) 100%
        );
      }
      
      @media (max-height: 400px) {
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0.6) 0%,
          rgba(0, 0, 0, 0.8) 25%,
          rgba(0, 0, 0, 0.98) 100%
        );
      }
    }
  }

  /* Performance Optimizations */
  will-change: transform;
  backface-visibility: hidden;
  
  /* Prevent image drag on all devices */
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;

  /* Touch Device Specific Optimizations */
  @media (hover: none) and (pointer: coarse) {
    .background-image {
      /* Slightly reduce scale on touch devices for performance */
      transform: scale(1.05);
      
      @media (max-width: 480px) {
        transform: scale(1.1);
      }
      
      @media (max-width: 320px) {
        transform: scale(1.12);
      }
    }
  }

  /* Foldable Devices Support */
  @media (spanning: single-fold-vertical) {
    height: 100vh;
    .background-image {
      object-fit: cover;
      object-position: center;
    }
  }

  /* Notch Support - Safe Area Insets */
  @supports (padding: max(0px)) {
    @media (max-width: 768px) {
      padding-top: env(safe-area-inset-top);
      padding-bottom: env(safe-area-inset-bottom);
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    }
  }

  /* Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    .background-image {
      transition: none;
      transform: none;
    }
  }

  /* High Contrast Mode Support */
  @media (prefers-contrast: high) {
    .background-overlay {
      background: rgba(0, 0, 0, 0.8);
    }
  }

  /* Dark Mode Enhancement */
  @media (prefers-color-scheme: dark) {
    .background-overlay {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.8) 50%,
        rgba(0, 0, 0, 0.95) 100%
      );
    }
  }

  /* Print Styles */
  @media print {
    display: none;
  }

  /* Very specific device optimizations */
  
  /* iPhone X/XS/11 Pro - Tall aspect ratio */
  @media (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .background-image {
      object-position: 65% center;
    }
  }
  
  /* Samsung Galaxy S8+ and similar */
  @media (device-width: 360px) and (device-height: 740px) {
    .background-image {
      object-position: 68% center;
    }
  }
`;