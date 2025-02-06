import { useState, useRef, useCallback, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import StarBorder from "../Animations/StarBorder/StarBorder";

const DraggableHireMeButton = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ y: 60 });
  const buttonRef = useRef(null);

  const handleDragStart = useCallback((e) => {
    e.preventDefault(); // Prevents default touch behavior like scrolling
    setIsDragging(true);
    document.body.style.overflow = "hidden"; // Lock scrolling
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    document.body.style.overflow = ""; // Restore scrolling
  }, []);

  const handleDragMove = useCallback(
    (e) => {
      e.preventDefault(); // Prevents unintended scrolling
      if (isDragging && buttonRef.current) {
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const newY = clientY - buttonRect.height / 2;
        setPosition({
          y: Math.max(
            0,
            Math.min(newY, window.innerHeight - buttonRect.height)
          ),
        });
      }
    },
    [isDragging]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove, { passive: false });
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleDragMove, { passive: false });
      window.addEventListener("touchend", handleDragEnd);
    } else {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  return (
    <div
      ref={buttonRef}
      className="fixed z-50 left-0 flex items-center"
      style={{ top: `${position.y}px` }}
    >
      <div
        className={`bg-primary text-primary-foreground text-black dark:text-white bg-gray-300/50 dark:bg-gray-800/50 backdrop-blur-sm p-1 pl-3 rounded-r-[20px] transition-transform duration-100 ${
          isDragging ? "scale-105 shadow-xl" : "shadow-lg"
        }`}
      >
        <a href="https://www.fiverr.com/s/6Y0E82A" target="_blank">
          <StarBorder
            as="button"
            className="custom-class font-[roboto]"
            color="red"
            speed="5s"
          >
            Hire Me
          </StarBorder>
        </a>
      </div>
      <div
        className="cursor-move bg-secondary text-secondary-foreground p-1 bg-gray-300/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-[20px] shadow-lg ml-2"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <FontAwesomeIcon
          icon={faGripVertical}
          className=" text-black dark:text-white"
        />
      </div>
    </div>
  );
};

export default DraggableHireMeButton;
