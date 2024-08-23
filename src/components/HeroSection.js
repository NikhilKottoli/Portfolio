const HeroSection = ()=> {
  return (
    <div className="hero-section flex mt-[10%] ml-[10%] flex flex-col gap-5 h-screen">
        <h1 className="text-[#FFFFFF] text-7xl font-bold font-raleway">Hey, my name is</h1>
        <h1 className="text-[#FFFFFF] text-7xl font-bold font-raleway">Nikhil Kottoli</h1>
        <div className="gap-4">
            <p className="text-[#9C9C9C] text-2xl"> I build cool stuff on the web and love making things look good</p>
            <p className="text-[#9C9C9C] text-2xl">An engineering student at NITK surathkal</p>
        </div>

        <div className="hero-section flex mr-[3%] justify-end mt-[20%] ">
          <p className="bg-[#D3D3D3] p-2 rounded-3xl animate-jiggle">Scroll Down &#8595;</p>
        </div>

    </div>
  );
}

export default HeroSection;