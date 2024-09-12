import React from 'react';
import { motion } from 'framer-motion';

const FloatingShape = ({ shape, size, color, left, top, duration }) => {
  const shapeClass = shape === 'circle' ? 'rounded-full' : 
                     shape === 'triangle' ? 'triangle' : 'rounded-lg';

  return (
    <motion.div
      className={`absolute ${size} ${color} ${shapeClass}`}
      style={{ left, top }}
      animate={{
        y: ["0%", "100%", "0%"],
        rotate: [0, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const HeroSection = () => {
  return (
    <div className="hero-section relative overflow-hidden flex mt-[10%] ml-[10%] flex-col gap-5 h-screen">
      {/* Floating shapes */}
      <FloatingShape shape="square" size="w-16 h-16" color="bg-purple-500/20" left="5%" top="10%" duration={15} />
      <FloatingShape shape="circle" size="w-24 h-24" color="bg-blue-500/20" left="80%" top="20%" duration={20} />
      <FloatingShape shape="triangle" size="w-12 h-12" color="bg-green-500/20" left="70%" top="60%" duration={18} />
      <FloatingShape shape="square" size="w-20 h-20" color="bg-pink-500/20" left="20%" top="70%" duration={22} />
      <FloatingShape shape="circle" size="w-14 h-14" color="bg-yellow-500/20" left="40%" top="30%" duration={17} />
      <FloatingShape shape="triangle" size="w-18 h-18" color="bg-red-500/20" left="60%" top="80%" duration={19} />
      <FloatingShape shape="square" size="w-10 h-10" color="bg-indigo-500/20" left="90%" top="40%" duration={16} />
      <FloatingShape shape="circle" size="w-22 h-22" color="bg-teal-500/20" left="10%" top="50%" duration={21} />

      {/* Hero content */}
      <h1 className="text-[#FFFFFF] text-7xl font-bold font-raleway z-10">Hey, my name is</h1>
      <h1 className="text-[#FFFFFF] text-7xl font-bold font-raleway z-10">Nikhil Kottoli</h1>
      <div className="gap-4 z-10">
        <p className="text-[#9C9C9C] text-2xl">I build cool stuff on the web and love making things look good</p>
        <p className="text-[#9C9C9C] text-2xl">An engineering student at NITK surathkal</p>
      </div>

      <div className="hero-section flex mr-[3%] justify-end mt-[20%] z-10">
        <p className="bg-[#D3D3D3] p-2 rounded-3xl animate-jiggle">Scroll Down &#8595;</p>
      </div>
    </div>
  );
}

export default HeroSection;