import React from "react";

const Contact = () => {
  return (
    <div>
    <div className="w-screen max-h-screen bg-black flex items-center justify-center mt-20">
      <div className="flex flex-wrap justify-center gap-8">
        <ContactCard 
          title="GitHub" 
          imgSrc="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
          imgAlt="GitHub Logo"
          link="https://github.com/alphaplayerofdooms"
        />
        <ContactCard 
          title="LinkedIn" 
          imgSrc="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" 
          imgAlt="LinkedIn Logo"
          link="https://www.linkedin.com/in/nikhil-kottoli-92552128a/"
        />
        <ContactCard 
          title="CodeChef" 
          imgSrc="https://s3.amazonaws.com/codechef_shared/sites/all/themes/abessive/logo.svg" 
          imgAlt="CodeChef Logo"
          link={"https://www.codechef.com/users/ligma_84"}
        />
      </div>
    </div>
    <div>
        <p className="text-white flex justify-center items-center mt-10">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Gmail_Icon.png/1024px-Gmail_Icon.png" alt="Gmail Logo" className="w-6 h-6 mr-2" />
            nikhilkottoli2005@gmail.com
        </p>
    </div>
   
    </div>
  );
}

const ContactCard = ({ title, imgSrc, imgAlt,link }) => (
  <a 
    href={link} 
    rel="noreferrer"
    target="_blank" 
    className="flex flex-col items-center justify-between bg-gray-800 rounded-lg p-6 w-64 h-64 transition-transform hover:scale-105 hover:shadow-lg hover:shadow-gray-700"
  >
    <h2 className="text-3xl font-bold text-white text-center">{title}</h2>
    <div className="flex-grow flex items-center justify-center">
      <img className="w-24 h-24 object-contain" src={imgSrc} alt={imgAlt} />
    </div>
  </a>
);

export default Contact;