import React, { useState } from "react";

const Carousel = () => {
  const slides = [
    { image: `${process.env.PUBLIC_URL}/Synkerr.jpeg`, text: "Social Media Website for collaboration",link:"https://github.com/alphaplayerofdooms/Synkerr_Homepage"},
    { image: `${process.env.PUBLIC_URL}/Synkerr.jpeg`, text: "E-Summit NITK 2024",link:"https://github.com/Esummit-organization/ESIC-Website/tree/esic/nikhil" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="mt-20 w-screen">
      <div className="relative flex justify-center py-20">
        <img
          className="h-[400px] w-[400px] object-cover"
          src={slides[currentIndex].image}
          alt={`Slide ${currentIndex + 1}`}
        />
        <span className="absolute top-15 right-[20%] sm:right-[40%] text-white text-center bg-black bg-opacity-50 p-2">
            <a target="_blank" href={slides[currentIndex].link} rel="noreferrer">
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" className="w-12 h-12" />
            </a>
            
        </span>
        <p className="absolute bottom-[0] text-white text-center bg-black bg-opacity-50 p-2">
          {slides[currentIndex].text}
        </p>
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={handlePrev}
        >
          &lt;
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <div>
      <Carousel />
    </div>
  );
};

export default Projects;
