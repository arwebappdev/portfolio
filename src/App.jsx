import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

function App() {
  return (
    <div className="overflow-hidden">
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
