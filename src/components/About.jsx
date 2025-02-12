import { useGSAP } from "@gsap/react";
import DecryptedText from "../Textanimations/DecryptedText/DecryptedText";
import TextPressure from "../Textanimations/TextPressure/TextPressure";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const aboutRef = useRef();
  const sectionRef = useRef();

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
    if (aboutRef.current) {
      gsap.to(aboutRef.current, {
        opacity: 1,
        textShadow: isDarkMode
          ? "0px 0px 10px rgba(255, 255, 255, 0.5)"
          : "0px 0px 10px rgba(0, 0, 0, 0.8)",
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: "body",
          start: "top 60%",
          end: "top 10%",
          scrub: 1,
        },
      });
    }
  }, [isDarkMode]); // <- Re-run animation when theme changes

  return (
    <div
      id="About"
      ref={sectionRef}
      className="h-fit bg-white dark:bg-black py-20"
    >
      <div
        ref={aboutRef}
        className="relative text-black dark:text-white place-self-center text-5xl border-t-2 border-gray-300 bg-gradient-to-b from-gray-200 dark:from-gray-600 from-1% via-white dark:via-black via-20% to-white dark:to-black opacity-0"
      >
        <TextPressure
          text="About-Me"
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

      <div className="relative left-0 top-0 mt-5 w-[70%] sm:w-1/2 h-fit text-center text-4xl sm:text-5xl font-mono p-5 text-black dark:text-white place-self-center">
        <DecryptedText
          text="Hi, I'm Abdul Rehman, a passionate Frontend Developer with a keen eye for design and a love for crafting interactive, visually stunning websites. I specialize in building creative UIs with smooth animations, ensuring an engaging user experience."
          animateOn="view"
          revealDirection="center"
          speed={50}
          maxIterations={20}
          className="revealed"
          encryptedClassName="encrypted"
        />
      </div>
    </div>
  );
};

export default About;
