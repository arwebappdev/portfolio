import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import TextPressure from "../Textanimations/TextPressure/TextPressure";
import SpotlightCard from "../components/SpotlightCard/SpotlightCard";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

// Ensure ScrollTrigger is registered
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
        textShadow: "0px 0px 10px rgba(255, 255, 255, 1)",
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

  const contactMethods = [
    {
      title: "Gmail",
      value: "ar.appsoftwares@gmail.com",
      color: "text-red-600",
      spot: "rgba(220, 38, 38, 0.2)",
      icon: faEnvelope,
      url: "mailto:ar.appsoftwares@gmail.com",
    },
    {
      title: "LinkedIn",
      value: "linkedin.com/in/ar-mansoori",
      color: "text-blue-500",
      spot: "rgba(59, 130, 246, 0.2)",
      icon: faLinkedin,
      url: "https://www.linkedin.com/in/ar-mansoori?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      title: "GitHub",
      value: "github.com/ar-mansoori",
      color: "text-white",
      spot: "rgba(255, 255, 255, 0.2)",
      icon: faGithub,
      url: "https://github.com/ar-mansoori",
    },
    {
      title: "X",
      value: "@arwebappdev",
      color: "text-white",
      spot: "rgba(255, 255, 255, 0.2)",
      icon: faXTwitter,
      url: "https://x.com/arwebappdev?t=0MxW0Km3MN5JVHmzxMQROw&s=09",
    },
    {
      title: "Instagram",
      value: "@arwebappdev",
      color: "text-pink-500",
      spot: "rgba(236, 72, 153, 0.2)",
      icon: faInstagram,
      url: "https://www.instagram.com/arwebappdev?igsh=MXduY2ZsY3I1dmhidg==",
    },
  ];

  return (
    <section id="Contact" ref={sectionRef} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div
          ref={contactRef}
          className=" relative z-30 mb-10 text-white place-self-center text-5xl border-t-2 border-gray-300 bg-gradient-to-b from-gray-600 from-1% via-black via-20% to-black opacity-0"
        >
          <TextPressure
            text="contact-me"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={150}
          />
        </div>
        <div className="m-5 text-white font-light">
          Note: I only share my contact number with my clients, if you want to
          hire me then DM me on Fiverr, Linked-in, Instagram or Gmail
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <div
              key={method.title}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <SpotlightCard
                className="custom-spotlight-card rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                spotlightColor={method.spot}
              >
                <div className="flex items-center justify-center mb-4">
                  <FontAwesomeIcon
                    icon={method.icon}
                    className={`${method.color} text-5xl`}
                  ></FontAwesomeIcon>
                </div>
                <a href={method.url} target="_blank">
                  <h3 className=" text-4xl font-normal font-[roboto] text-center text-white mb-2">
                    {method.title}
                  </h3>

                  <p className="text-center text-gray-300">{method.value}</p>
                </a>
              </SpotlightCard>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-300 mb-4">Want your website?</p>
          <button
            className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            onClick={() =>
              (window.location.href = "mailto:ar.appsoftwares@gmail.com")
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
