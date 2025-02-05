import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

function App() {
  return (
    <div className="overflow-hidden bg-white dark:bg-black">
      <div className="">
        <Navbar />
      </div>
      <div className="">
        <About />
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
    </div>
  );
}

export default App;
/**<div className="absolute bottom-0 left-0 h-[20px] w-[20px] bg-white sm:bg-yellow-300 md:bg-orange-600 lg:bg-red-800 xl:bg-blue-700"></div> */
