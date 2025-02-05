import { useEffect, useRef, useState } from "react";
import arlogo from "../assets/arlogo.jpg";
import ShinyText from "../Textanimations/ShinyText/ShinyText";
import BlurText from "../Textanimations/BlurText/BlurText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
const Navbar = () => {
  const [menu, setMenu] = useState(0);
  const [activeSection, setActiveSection] = useState("About"); // Default active sectio
  const isHovered = useRef(false); // Track hover state

  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const imgRef = useRef();
  const nameRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (menu === 1 || isHovered.current) return; // Don't hide if menu is open or hovered

      const currentScrollY = window.scrollY;
      const heroSection = document.getElementById("Hero");

      if (heroSection) {
        const heroTop = heroSection.offsetTop;
        const heroBottom = heroTop + heroSection.offsetHeight;

        // Ensure navbar is fully visible while inside Hero section
        if (currentScrollY >= heroTop && currentScrollY <= heroBottom) {
          gsap.to(navRef.current, { y: 0, duration: 0.3, ease: "power2.out" });
          return;
        }
      }

      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current) {
        gsap.to(navRef.current, {
          y: "-100%",
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(navRef.current, { y: "0%", duration: 0.5, ease: "power2.out" });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menu]);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const sections = ["Hero", "About", "Skills", "Projects", "Contact"];

    sections.forEach((id) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center", // Adjusted to fire earlier
        end: "bottom center",

        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });
  }, []);

  const mm = gsap.matchMedia();
  /**Image Animation */
  useGSAP(() => {
    mm.add("(max-width:639px)", () => {
      gsap.from(imgRef.current, {
        xPercent: -50,
        yPercent: -50,
        left: "50vw",
        top: "25vh",
        position: "absolute",
        scale: 5,
        duration: 1,
        scrollTrigger: {
          trigger: "#Hero",
          scroller: "body",
          start: "center center",
          end: "center top",
          scrub: 1,
        },
      });
      gsap.from(nameRef.current, {
        xPercent: -50,
        yPercent: -50,
        left: "50vw",
        top: "47vh",
        position: "absolute",
        scale: 1.7,
        duration: 1,
        scrollTrigger: {
          trigger: "#Hero",
          scroller: "body",
          start: "center center",
          end: "center top",
          scrub: 1,
        },
      });
    });
    mm.add("(min-width:640px)", () => {
      gsap.from(imgRef.current, {
        xPercent: -50,
        yPercent: -50,
        left: "30vw",
        top: "25vh",
        position: "absolute",
        scale: 5,
        duration: 1,
        scrollTrigger: {
          trigger: "#Hero",
          scroller: "body",
          start: "center center",
          end: "center top",
          scrub: 1,
        },
      });
      gsap.from(nameRef.current, {
        xPercent: -50,
        yPercent: -50,
        left: "30vw",
        top: "50vh",
        position: "absolute",
        scale: 1.7,
        duration: 1,
        scrollTrigger: {
          trigger: "#Hero",
          scroller: "body",
          start: "center center",
          end: "center top",
          scrub: 1,
        },
      });
    });
  });
  return (
    <div className="w-full h-screen overflow-hidden">
      <div
        ref={navRef}
        className="flex z-50 backdrop-blur-sm fixed top-0 h-16 w-full p-2 bg-gradient-to-b from-white from-20% via-white/65 via-70% to-white/40 dark:from-black dark:via-black/65 dark:to-black/40"
        onMouseEnter={() => (isHovered.current = true)}
        onMouseLeave={() => (isHovered.current = false)}
      >
        <img
          ref={imgRef}
          src={arlogo || "/placeholder.svg"}
          className="absolute left-2 w-12 rounded-full ring-1 ring-neutral-400 dark:ring-neutral-600 invert-0 dark:invert-0"
        ></img>

        <div
          ref={nameRef}
          className="absolute left-16 text-2xl place-self-center"
        >
          <a href="#Hero" onClick={(e) => handleScroll(e, "Hero")}>
            <ShinyText
              text="ΛBꓛUL ꝚΞHMΛN"
              disabled={false}
              speed={3}
              className=""
            />
          </a>
        </div>

        {/**Right menu */}
        <div className=" hidden sm:flex place-self-center absolute right-5">
          <ul className="flex gap-7 font-[roboto] font-light text-gray-600 dark:text-gray-400">
            <a
              href="#About"
              className="h-fit w-fit"
              onClick={(e) => handleScroll(e, "About")}
            >
              <li
                onClick={() => setActiveSection("About")}
                className={`hover:text-black dark:hover:text-white active:scale-95 duration-200 ${
                  activeSection === "About"
                    ? "text-black dark:text-white scale-105"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                About Me
              </li>
            </a>
            <a
              href="#Skills"
              className="h-fit w-fit"
              onClick={(e) => handleScroll(e, "Skills")}
            >
              <li
                onClick={() => setActiveSection("Skills")}
                className={`hover:text-black dark:hover:text-white active:scale-95 duration-200 ${
                  activeSection === "Skills"
                    ? "text-black dark:text-white scale-105"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Skills
              </li>
            </a>
            <a
              href="#Projects"
              className="h-fit w-fit"
              onClick={(e) => handleScroll(e, "Projects")}
            >
              <li
                onClick={() => setActiveSection("Projects")}
                className={`hover:text-black dark:hover:text-white active:scale-95 duration-200 ${
                  activeSection === "Projects"
                    ? "text-black dark:text-white scale-105"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Projects
              </li>
            </a>
            <a
              href="#Contact"
              className="h-fit w-fit"
              onClick={(e) => handleScroll(e, "Contact")}
            >
              <li
                onClick={() => setActiveSection("Contact")}
                className={`hover:text-black dark:hover:text-white active:scale-95 duration-200 ${
                  activeSection === "Contact"
                    ? "text-black dark:text-white scale-105"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Contact
              </li>
            </a>
          </ul>
        </div>
        <div
          onClick={() => setMenu(!menu)}
          onMouseEnter={() => setMenu(1)}
          onMouseLeave={() => setMenu(0)}
          className={`sm:hidden place-self-center absolute right-5 duration-200 text-black dark:text-white `}
        >
          <FontAwesomeIcon
            icon={menu ? faEllipsisVertical : faBars}
            className="size-6"
          />
        </div>
      </div>
      {/**side menu */}
      <div
        onMouseEnter={() => setMenu(1)}
        onMouseLeave={() => setMenu(0)}
        className={`fixed z-50 top-[30vh] h-fit w-fit bg-gradient-to-r from-white/40 from-[0%] via-white/60 via-[50%] to-white/90 to-[100%] dark:from-black/40 dark:via-black/60 dark:to-black/90 backdrop-blur-md ${
          menu ? "" : "translate-x-[150%]"
        } right-0 rounded-l-[40px] p-5 -translate-y-1/2 duration-200`}
      >
        <ul className="gap-7 font-[roboto] font-light text-gray-600 dark:text-gray-400 text-3xl text-center">
          <a
            href="#About"
            className="h-fit w-fit"
            onClick={(e) => handleScroll(e, "About")}
          >
            <li
              onClick={() => setActiveSection("About")}
              className={`active:scale-95 duration-200 ${
                activeSection === "About"
                  ? "text-black dark:text-white scale-105"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              About Me
            </li>
          </a>
          <a
            href="#Skills"
            className="h-fit w-fit"
            onClick={(e) => handleScroll(e, "Skills")}
          >
            <li
              onClick={() => setActiveSection("Skills")}
              className={`active:scale-95 duration-200 ${
                activeSection === "Skills"
                  ? "text-black dark:text-white scale-105"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Skills
            </li>
          </a>
          <a
            href="#Projects"
            className="h-fit w-fit"
            onClick={(e) => handleScroll(e, "Projects")}
          >
            <li
              onClick={() => setActiveSection("Projects")}
              className={`active:scale-95 duration-200 ${
                activeSection === "Projects"
                  ? "text-black dark:text-white scale-105"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Projects
            </li>
          </a>
          <a
            href="#Contact"
            className="h-fit w-fit"
            onClick={(e) => handleScroll(e, "Contact")}
          >
            <li
              onClick={() => setActiveSection("Contact")}
              className={`active:scale-95 duration-200 ${
                activeSection === "Contact"
                  ? "text-black dark:text-white scale-105"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Contact
            </li>
          </a>
        </ul>
      </div>
      {/** Hero */}
      <div
        id="Hero"
        className="relative z-0 bg-white dark:bg-black h-full w-full overflow-x-hidden"
      >
        <div className="grid sm:grid-cols-2">
          <div className="absolute bottom-20 w-[380px] h-[240px] origin-left sm:scale-95 p-2 ml-2 place-content-evenly border-l-2 border-gray-700">
            <BlurText
              text="I'm the DEVELOPER You need!"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-[] font-[roboto] text-black dark:text-white"
            />
          </div>
          <div className="hidden sm:flex absolute right-0 h-full w-[40%] bg-slate-400"></div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-[20px] w-[20px] bg-white sm:bg-yellow-300 md:bg-orange-600 lg:bg-red-800 xl:bg-blue-700"></div>
    </div>
  );
};

export default Navbar;
