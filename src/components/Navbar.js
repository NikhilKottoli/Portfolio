import { useNavigate } from 'react-router-dom';
import React from 'react';

const NavBar=()=> {
  const navigate = useNavigate();

  const gotoProjects=()=>{
    navigate('/Projects');
  }
  const gotoAbout = () =>{
    navigate('/');
  }
  const gotoContact = ()=>{
    navigate('/Contact');
  }
  return (
    <div>
      <div className="w-[90%] ml-[5%] mt-[1%] sticky top-0 z-50">
        <ul className="flex flex-row justify-evenly ">
          <li className="rounded-3xl bg-[#1B1B1B] text-[#9C9C9C] hover:cursor-pointer border-[1px] border-[#430680] py-[1%] px-[12%]" onClick={gotoAbout}> About</li>
          <li className="rounded-3xl bg-[#1B1B1B] text-[#9C9C9C] hover:cursor-pointer border-[1px] py-[1%] border-[#430680] px-[12%]" onClick={gotoProjects}>Projects</li>
          <li className="rounded-3xl bg-[#1B1B1B] text-[#9C9C9C] hover:cursor-pointer border-[1px] py-[1%] border-[#430680] px-[12%]" onClick={gotoContact}>Contact</li>
        </ul>
      </div>
    </div>
  );
}
export default NavBar;