import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import RotatingText from "../Textanimations/RotatingText/RotatingText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextPressure from "../Textanimations/TextPressure/TextPressure";
import anarc from "../assets/anarc.webp";
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Layers-ANARC",
    description: "Layers Re-designed website with awesome animations.",
    image: anarc,
    url: "https://layers-ar.vercel.app",
  },
  {
    id: 2,
    title: "BMW M",
    description: "A 3D website showcasing BMW M3 E30.",
    image:
      "https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/topics/magazine-article-pool/2018/bmw-m3-e30/bmw-m3-e30-article-image-02.jpg",
    url: "https://r3f-car-showcase.vercel.app",
  },
];

const Projects = () => {
  const projectRef = useRef();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

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
    if (projectRef.current) {
      gsap.to(projectRef.current, {
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

  useGSAP(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (section && cards.length) {
      // Animate cards
      cards.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "power1.out",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          });
        }
      });
    }
  }, []);

  return (
    <section
      id="Projects"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-black transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div
          ref={projectRef}
          className="relative z-30 mb-10 text-black dark:text-white place-self-center text-5xl border-t-2 border-gray-300 bg-gradient-to-b from-gray-200 dark:from-gray-600 via-white dark:via-black to-white dark:to-black opacity-0"
        >
          <TextPressure
            text="projects"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div key={project.id} ref={(el) => (cardsRef.current[index] = el)}>
              <div className="relative bg-gray-200 dark:bg-neutral-900 p-3 rounded-lg shadow-lg overflow-hidden duration-300 hover:scale-105 hover:shadow-2xl">
                {/* Background Video as a Shadow */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute left-3 h-48 w-[93%] object-cover blur-md rounded-md"
                />

                {/* Main Video */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="relative z-10 w-full h-48 object-cover rounded-md"
                />

                <div className="p-2 relative z-20">
                  <h3 className="text-4xl font-bold font-[roboto] text-black dark:text-white my-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    className="mt-4 flex w-[120px] items-center justify-center px-2 py-1 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300"
                  >
                    <RotatingText
                      texts={["Go to", "Website"]}
                      mainClassName="px-2 sm:px-2 md:px-3 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                      staggerFrom="last"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 400,
                      }}
                      rotationInterval={2000}
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="relative -bottom-10 place-self-center text-black dark:text-white">
        More projects will be added soon...
      </p>
    </section>
  );
};

export default Projects;
