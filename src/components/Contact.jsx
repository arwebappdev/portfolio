import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import TextPressure from "../Textanimations/TextPressure/TextPressure";
import SpotlightCard from "../components/SpotlightCard/SpotlightCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebookF,
  faGithub,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const contactRef = useRef();

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (section && cards.length) {
      // Animate title
      gsap.to(contactRef.current, {
        opacity: 1,
        textShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Adjusted for light mode
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: "body",
          start: "top 60%",
          end: "top 10%",
          scrub: 1,
        },
      });
      // Animate cards
      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });
    }
  }, []);

  //dark mode
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

  const contactMethods = [
    {
      title: "Gmail",
      value: "arwebappdev@gmail.com",
      color: "text-red-600",
      spot: "rgba(220, 38, 38, 0.2)",
      icon: faEnvelope,
      url: "mailto:arwebappdev@gmail.com",
    },
    {
      title: "LinkedIn",
      value: "linkedin.com/in/arwebappdev",
      color: "text-blue-500",
      spot: "rgba(59, 130, 246, 0.2)",
      icon: faLinkedin,
      url: "https://www.linkedin.com/in/arwebappdev",
    },
    {
      title: "GitHub",
      value: "github.com/arwebappdev",
      color: "text-black dark:text-white",
      spot: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
      icon: faGithub,
      url: "https://github.com/arwebappdev",
    },
    {
      title: "X",
      value: "@arwebappdev",
      color: "text-black dark:text-white",
      spot: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
      icon: faXTwitter,
      url: "https://x.com/arwebappdev",
    },
    {
      title: "Instagram",
      value: "@arwebappdev",
      color: "text-pink-500",
      spot: "rgba(236, 72, 153, 0.2)",
      icon: faInstagram,
      url: "https://www.instagram.com/arwebappdev",
    },
    {
      title: "Fiverr",
      value: "@arwebappdev",
      color: "text-green-500",
      spot: "rgba(16, 185, 129, 0.2)",
      icon: faFacebookF,
      url: "",
    },
  ];

  return (
    <section
      id="Contact"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-black transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div
          ref={contactRef}
          className="relative z-30 mb-10 text-black dark:text-white place-self-center text-5xl border-t-2 border-gray-300 bg-gradient-to-b from-gray-200 dark:from-gray-600 via-white dark:via-black to-white dark:to-black opacity-0"
        >
          <TextPressure
            text="contact-me"
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
        <div className="m-5 text-black dark:text-white font-light">
          Note: I only share my contact number with my clients. If you want to
          hire me, DM me on Fiverr, LinkedIn, Instagram or Gmail.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <div
              key={method.title}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <SpotlightCard
                className="custom-spotlight-card rounded-lg p-6 bg-gray-100 dark:bg-neutral-900 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                spotlightColor={method.spot}
              >
                <div className="flex items-center justify-center mb-4">
                  <FontAwesomeIcon
                    icon={method.icon}
                    className={`${method.color} text-5xl`}
                  />
                </div>
                <a href={method.url} target="_blank">
                  <h3 className="text-4xl font-normal font-[roboto] text-center text-black dark:text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    {method.value}
                  </p>
                </a>
              </SpotlightCard>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            Want your website?
          </p>
          <button
            className="px-8 py-3 bg-blue-500 dark:bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300"
            onClick={() =>
              (window.location.href = "mailto:arwebappdev@gmail.com")
            }
          >
            Let's Talk
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
