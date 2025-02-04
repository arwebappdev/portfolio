import { useGSAP } from "@gsap/react";
import DecryptedText from "../Textanimations/DecryptedText/DecryptedText";
import TextPressure from "../Textanimations/TextPressure/TextPressure";
import gsap from "gsap";
import { useRef } from "react";

const About = () => {
  const aboutRef = useRef();
  const sectionRef = useRef();
  useGSAP(() => {
    gsap.to(aboutRef.current, {
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
  });
  return (
    <div id="About" ref={sectionRef} className="h-screen bg-black py-20">
      <div
        ref={aboutRef}
        className="relative z-30 text-white place-self-center text-5xl border-t-2 border-gray-300 bg-gradient-to-b from-gray-600 from-1% via-black via-20% to-black opacity-0"
      >
        <TextPressure
          text="About Me"
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

      <div className=" relative left-0 top-1/2 -translate-y-1/2 w-[70%] sm:w-1/2 h-fit ring-2 text-4xl sm:text-5xl font-mono p-5 text-white">
        <DecryptedText
          text="Hi, I am Abdul Rehman a curious FRONTEND Developer, who loves to create websites with Cool Animations and Creative UIs..."
          animateOn="view"
          revealDirection="center"
          speed={50}
          maxIterations={20}
          className="revealed"
          encryptedClassName="encrypted"
        />
      </div>
      {/* <div className="relative top-1/2 -translate-y-1/2 w-1/2 h-fit ring-2 text-5xl font-mono p-5 place-self-center">
        Hi, I am Abdul Rehman a curious FRONTEND Developer, who loves to create
        websites with Cool Animations and Creative UIs
      </div>*/}
    </div>
  );
};

export default About;
