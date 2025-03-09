import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const getDeviceBrand = () => {
  if (typeof navigator === "undefined") return "Generic";
  const userAgent = navigator.userAgent;

  // Apple devices: Return "Apple" for both iPhone and iPad
  if (userAgent.includes("iPhone") || userAgent.includes("iPad"))
    return "Apple";

  // Android devices: Return only the brand name
  if (userAgent.includes("Android")) {
    if (userAgent.includes("Samsung") || userAgent.includes("SM-"))
      return "Samsung";
    if (userAgent.includes("Pixel")) return "Pixel";
    if (userAgent.includes("OnePlus")) return "OnePlus";
    if (
      userAgent.includes("Xiaomi") ||
      userAgent.includes("Redmi") ||
      userAgent.includes("Poco")
    )
      return "Xiaomi";
    if (userAgent.includes("OPPO")) return "OPPO";
    if (userAgent.includes("vivo")) return "vivo";
    if (userAgent.includes("Motorola")) return "Motorola";
    if (userAgent.includes("Sony") || userAgent.includes("Xperia"))
      return "Sony";
    if (userAgent.includes("Nokia")) return "Nokia";
    return "Android";
  }

  return "Windows";
};

const getScreenBorderRadius = () => {
  if (typeof navigator === "undefined") return 15;
  const userAgent = navigator.userAgent;

  // Apple devices
  if (userAgent.includes("iPhone")) return 35;
  if (userAgent.includes("iPad")) return 20;

  // Android devices
  if (userAgent.includes("Android")) {
    if (
      userAgent.includes("S22 Ultra") ||
      userAgent.includes("S23 Ultra") ||
      userAgent.includes("S24 Ultra")
    )
      return 10;
    if (userAgent.includes("Pixel 7")) return 10;
    if (userAgent.includes("SM-T") || userAgent.includes("Tablet")) return 15;
    if (userAgent.includes("Samsung") || userAgent.includes("SM-")) return 22;
    if (userAgent.includes("Pixel")) return 18;
    if (userAgent.includes("OnePlus")) return 20;
    if (userAgent.includes("Xiaomi") || userAgent.includes("Redmi")) return 22;
    if (userAgent.includes("OPPO") || userAgent.includes("vivo")) return 24;
    if (userAgent.includes("Motorola")) return 18;
    if (userAgent.includes("Sony") || userAgent.includes("Xperia")) return 12;
    if (userAgent.includes("Nokia")) return 16;
    return 25;
  }

  return 10;
};

const D1 = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [deviceSize, setDeviceSize] = useState({ width: 200, height: 400 });
  const [deviceBrand, setDeviceBrand] = useState("Generic");

  // Detect device orientation & set proportional device size
  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      setIsLandscape(screenWidth > screenHeight);

      // Set proportional device size (adjustable scaling factor)
      const scale = 0.45; // Adjust for desired proportions
      setDeviceSize({
        width: Math.min(2000, screenWidth * scale),
        height: Math.min(2000, screenHeight * scale),
      });
    };

    // Initialize brand name
    setDeviceBrand(getDeviceBrand());

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const borderRadius = getScreenBorderRadius();

  // Refs
  const pageRef = useRef(null);
  const boxRef = useRef(null);
  const headlineRef = useRef(null);
  const devRef = useRef(null);
  const tiles1Ref = useRef(null);
  const tiles2Ref = useRef(null);
  const posterRef = useRef(null);

  // GSAP Animations on Mount
  useGSAP(() => {
    // Animate the box container
    gsap.from(boxRef.current, {
      borderRadius: `${borderRadius * 3}px`,
      duration: 1,
      ease: "bounce.out",
      scrollTrigger: {
        trigger: pageRef.current,
        scroller: "body",
        start: "top 20%",
      },
    });

    gsap.from(headlineRef.current, {
      y: "-100px",
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: pageRef.current,
        scroller: "body",
        start: "top 60%",
        end: "top 20%",
        scrub: 1,
      },
    });

    // Animate the device from bottom of the screen
    gsap.from(devRef.current, {
      y: "100vh", // ensures it slides from bottom in both orientations
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: pageRef.current,
        scroller: "body",
        start: "top 20%",
      },
    });

    // Animate Tiles1 horizontally
    gsap.to(Array.from(tiles1Ref.current.children), {
      xPercent: -100,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1,
    });

    // Animate Tiles2 vertically
    gsap.to(Array.from(tiles2Ref.current.children), {
      yPercent: -100,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1,
    });

    // Flip Poster
    gsap.to(posterRef.current, {
      rotateX: 180,
      backgroundColor: "#ff69b4",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1,
    });
  }, []);

  return (
    <div
      ref={pageRef}
      style={{
        padding: "1.5rem",
        paddingTop: "4rem",
        height: "100vh",
        width: "100%",
        background:
          "radial-gradient(circle at center, #2e2e2e, #000000, #000000)",
      }}
    >
      {/* Outer Box */}
      <div
        ref={boxRef}
        className={`h-full w-full overflow-hidden border-black dark:border-neutral-400 border-4 sm:place-content-center
          grid ${isLandscape ? "grid-cols-2" : "grid-cols-1"}`}
        style={{ borderRadius }}
      >
        {/* Headline */}
        <p
          ref={headlineRef}
          className="place-content-center text-neutral-600 dark:text-neutral-300 text-5xl w-fit m-5 font-sans font-bold"
        >
          Pixel-Perfect Designs that Speak for Themselves.
        </p>

        {/* Device Container */}
        <div
          ref={devRef}
          className={`border-4 border-neutral-400 dark:border-neutral-500 bg-white dark:bg-black
            ${
              isLandscape
                ? "grid grid-cols-2 grid-rows-1"
                : "grid grid-cols-1 grid-rows-2"
            }
            place-self-center overflow-hidden`}
          style={{
            borderRadius,
            width: `${deviceSize.width}px`,
            height: `${deviceSize.height}px`,
          }}
        >
          {/* =========== Block1 =========== */}
          <div
            className="h-full w-full flex flex-col p-2"
            style={{ borderRadius }}
          >
            {/* Header: Displays the device brand name */}
            <div
              className="bg-yellow-400 text-center uppercase flex items-center justify-center"
              style={{
                flex: "0 0 20%",
                borderRadius: borderRadius / 2,
              }}
            >
              <p className="font-semibold text-lg">{deviceBrand}?</p>
            </div>
            {/* Poster */}
            <div
              ref={posterRef}
              className="bg-pink-600 mt-2"
              style={{
                flex: "1 1 auto",
                borderRadius: borderRadius / 2,
              }}
            />
          </div>

          {/* =========== Block2 =========== */}
          <div
            className="h-full w-full flex flex-col p-2"
            style={{ borderRadius }}
          >
            {/* Tiles1 (horizontal scrolling) */}
            <div
              ref={tiles1Ref}
              className="flex gap-2 overflow-hidden"
              style={{
                flex: "0 0 30%", // ~30% of block2
                borderRadius: borderRadius / 2,
              }}
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square bg-purple-500 opacity-${
                    80 - i * 10
                  }`}
                  style={{ borderRadius: borderRadius / 2 }}
                />
              ))}
            </div>

            {/* Tiles2 (vertical scrolling) */}
            <div
              ref={tiles2Ref}
              className="grid gap-2 overflow-hidden mt-2"
              style={{
                flex: "1 1 auto",
                borderRadius: borderRadius / 2,
                gridTemplateColumns: isLandscape
                  ? "repeat(3, 1fr)"
                  : "repeat(2, 1fr)",
              }}
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square bg-blue-500 opacity-${
                    80 - (i % 4) * 10
                  }`}
                  style={{ borderRadius: borderRadius / 2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default D1;
