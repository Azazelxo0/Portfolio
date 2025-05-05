import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./RollingGallery.css";

const IMGS = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOiVWSWZQcgO8ckDCUFwKEpNUziIO5yhU4RdPlGZvcm7WecbZCtUJsERpZX4J-8SjrUww&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeB0Kf8bAgxekAzMETw0PwdbibAGCa2FrfDQ&s",
  "https://static-00.iconduck.com/assets.00/react-icon-512x512-u6e60ayf.png",
  "https://cdn-icons-png.freepik.com/512/5968/5968292.png",
  "https://iconape.com/wp-content/png_logo_vector/node-js-2.png",
  "https://ih1.redbubble.net/image.438908244.6144/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg",
  "https://miro.medium.com/v2/resize:fit:512/1*doAg1_fMQKWFoub-6gwUiQ.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEAmAZJkl49wqGmS0dWhlGo-CYpaAT-g_WCA&s",
  "https://www.svgrepo.com/show/374118/tailwind.svg",
  "https://www.ejable.com/wp-content/uploads/2022/04/Framer-Motion-1200x1159.webp",
];

const RollingGallery = ({ autoplay = true, pauseOnHover = true, images = [] }) => {
  images = IMGS;
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 640);

  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const galleryControls = useAnimation();
  const headingControls = useAnimation();

  const autoplayRef = useRef();
  const [ref, inView] = useInView({ threshold: 0.5 });

  // Smooth autoplay (rolling effect)
  useEffect(() => {
    if (inView && autoplay && galleryVisible) {
      autoplayRef.current = setInterval(() => {
        rotation.set(rotation.get() - 0.5); // Smooth roll, 1° at a time
      }, 25); // Lower = smoother, faster

      return () => clearInterval(autoplayRef.current);
    }
  }, [inView, autoplay, rotation, galleryVisible]);

  // On hover pause/resume
  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) clearInterval(autoplayRef.current);
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover && galleryVisible) {
      autoplayRef.current = setInterval(() => {
        rotation.set(rotation.get() - 0.5);
      }, 25);
    }
  };

  // Text fade-in first, then gallery after delay
  useEffect(() => {
    if (inView) {
      headingControls.start({ opacity: 1, y: 0, transition: { duration: 0.7 } });
      setTimeout(() => {
        setGalleryVisible(true);
        galleryControls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
      }, 800); // Delay gallery until heading finishes
    } else {
      headingControls.start({ opacity: 0, y: 10 });
      galleryControls.start({ opacity: 0, y: 20 });
      setGalleryVisible(false);
    }
  }, [inView, headingControls, galleryControls]);

  // Responsive
  useEffect(() => {
    const handleResize = () => {
      setIsScreenSizeSm(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transform = useTransform(rotation, (r) => `rotate3d(0, 1, 0, ${r}deg)`);

  return (
    <>
      {/* Text section */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={headingControls}
        className="text-center fw-bold "
      >
        <h1 className="fw-bold">My Skills</h1>
      </motion.div>

      {/* Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={galleryControls}
        className="gallery-container"
      >
        <div className="gallery-gradient"></div>
        <div className="gallery-gradient"></div>
        <div className="gallery-content">
          <motion.div
            className="gallery-track"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: transform,
              rotateY: rotation,
              width: cylinderWidth,
              transformStyle: "preserve-3d",
            }}
          >
            {images.map((url, i) => (
              <div
                key={i}
                className="gallery-item"
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                }}
              >
                <img src={url} alt="gallery" className="gallery-img" />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default RollingGallery;
