import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div className="App bg-[#000000] w-full h-full overflow-y-auto">
        <Routes>
          <Route
            path="/"
            element={
              <div className="About">
                <NavBar />
                <HeroSection />
                <Skills />
              </div>
            }
          />
          <Route path="/Projects" element={
            <div className="Projects">
              <NavBar />
              <Projects />
            </div>
          } />
          <Route path='/Contact' element={
            <div className='Contact'>
                <NavBar/>
                <Contact/>
            </div>
          }  />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
