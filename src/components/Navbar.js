import { useNavigate } from 'react-router-dom';
import React from 'react';

const NavBar = () => {
  const navigate = useNavigate();

  const gotoProjects = () => {
    navigate('/Projects');
  }
  const gotoAbout = () => {
    navigate('/');
  }
  const gotoContact = () => {
    navigate('/Contact');
  }

  const shineClass = `
    relative
    overflow-hidden
    before:absolute before:inset-0
    before:bg-gradient-to-r before:from-transparent before:via-purple-400/50 before:to-transparent
    before:translate-x-[-200%]
    hover:before:animate-shine
    transition duration-300
    hover:text-purple-300
    hover:border-purple-500
    hover:shadow-lg hover:shadow-purple-500/30
  `;

  return (
    <div>
      <div className="md:w-[90%] w-[80%] ml-[5%] mt-[1%] sticky top-0 z-50">
        <ul className="flex flex-row justify-evenly">
          <li className={`rounded-3xl bg-[#1B1B1B] text-[#9C9C9C] hover:cursor-pointer border-[1px] border-[#430680] py-[1%] px-[12%] ${shineClass}`} onClick={gotoAbout}>About</li>
          <li className={`rounded-3xl bg-[#1B1B1B] text-[#9C9C9C] hover:cursor-pointer border-[1px] py-[1%] border-[#430680] px-[12%] ${shineClass}`} onClick={gotoProjects}>Projects</li>
          <li className={`rounded-3xl bg-[#1B1B1B] text-[#9C9C9C] hover:cursor-pointer border-[1px] py-[1%] border-[#430680] px-[12%] ${shineClass}`} onClick={gotoContact}>Contact</li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;