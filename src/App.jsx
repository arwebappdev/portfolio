import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import HireMe from "./components/HireMe";
import D1 from "./components/D1";

function App() {
  return (
    <div className="overflow-hidden bg-white dark:bg-black">
      <div className="">
        <Navbar />
      </div>

      <HireMe />

      <div className="">
        <About />
      </div>
      <div className="">
        <D1 />
      </div>
      <div className="">
        <Skills />
      </div>
      <div className="">
        <Projects />
      </div>
      <div className="">
        <Contact />
      </div>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
/**<div className="absolute bottom-0 left-0 h-[20px] w-[20px] bg-white sm:bg-yellow-300 md:bg-orange-600 lg:bg-red-800 xl:bg-blue-700"></div> */
