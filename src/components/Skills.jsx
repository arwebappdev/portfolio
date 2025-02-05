import { useEffect, useRef, useState } from "react";
import TextPressure from "../Textanimations/TextPressure/TextPressure";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import html from "../assets/html.png";
import css from "../assets/css.png";
import javascript from "../assets/javascript.png";
import typescript from "../assets/typescript.png";
import tailwind from "../assets/tailwind.png";
import react from "../assets/react.png";
import gsapp from "../assets/gsap.png";
import next from "../assets/next.png";
import TiltedCard from "../components/TiltedCard/TiltedCard";

const Skills = () => {
  const skillRef = useRef();
  const pageRef = useRef();
  const blurRef = useRef();
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (event) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  useGSAP(() => {
    if (skillRef.current) {
      gsap.to(skillRef.current, {
        opacity: 1,
        textShadow: isDarkMode
          ? "0px 0px 10px rgba(255, 255, 255, 0.5)"
          : "0px 0px 10px rgba(0, 0, 0, 0.8)",
        scrollTrigger: {
          trigger: pageRef.current,
          scroller: "body",
          start: "top 60%",
          end: "top 10%",
          scrub: 1,
        },
      });
    }
  }, [isDarkMode]); // <- Re-run animation when theme changes

  useGSAP(() => {
    gsap.to(blurRef.current, {
      opacity: 1,
      scrollTrigger: {
        trigger: pageRef.current,
        scroller: "body",
        start: "top 60%",
        end: "top 10%",
        scrub: 1,
      },
    });
  });

  const images = [
    { id: 0, title: "HTML", image: html },
    { id: 1, title: "CSS", image: css },
    { id: 2, title: "Javascript", image: javascript },
    { id: 3, title: "Typescript", image: typescript },
    { id: 4, title: "Tailwind", image: tailwind },
    { id: 5, title: "React", image: react },
    { id: 6, title: "Next", image: next },
    { id: 7, title: "GSAP", image: gsapp },
  ];

  return (
    <div
      id="Skills"
      ref={pageRef}
      className="py-20 h-[1070px] sm:h-[800px] bg-white dark:bg-black"
    >
      <div
        ref={blurRef}
        className="absolute opacity-0 z-20 h-[1000px] sm:h-[750px] w-full backdrop-blur-xl"
      ></div>
      <div
        ref={skillRef}
        className="relative z-30 text-black dark:text-white place-self-center text-5xl border-t-2 border-gray-300 bg-gradient-to-b from-gray-200 dark:from-gray-600 from-1% via-white dark:via-black via-20% to-white dark:to-black opacity-0"
      >
        <TextPressure
          text="skills"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="currentColor"
          strokeColor="#ff0000"
          minFontSize={150}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {images.map(({ id, title, image }) => (
          <div
            key={id}
            className="text-black dark:text-white rounded-2xl p-4 m-6 flex flex-col items-center justify-center"
          >
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="absolute w-[90px] h-[90px] object-contain mb-2"
            />

            <div className="z-30">
              <TiltedCard
                imageSrc={image || "/placeholder.svg"}
                altText={title}
                captionText={title}
                containerHeight="100px"
                containerWidth="100px"
                imageHeight="100px"
                imageWidth="100px"
                rotateAmplitude={20}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">{title}</p>
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
