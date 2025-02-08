import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Certifications from './components/Certifications';

function App() {
  return (
    <Router>
      <div className="App bg-[#000000] w-full h-full overflow-y-auto">
      <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="About">
                <HeroSection />
                <Skills />
                <Experience />
                <Certifications />
              </div>
            }
          />
          <Route path="/Projects" element={
            <div className="Projects">
              <Projects />
            </div>
          } />
          <Route path="/Contact" element={
            <div className="Contact">
              <Contact />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
