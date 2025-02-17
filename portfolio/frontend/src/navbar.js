import React from 'react';
import resumePDF from "url:./img/Katie_House_Resume.pdf";
import headshot from "./img/headshot.jpeg";


function Navbar() {
  const handleResumeClick = () => {
    window.open(resumePDF, '_blank');
  };

  const handleLinkedInClick = () => {
    window.open('http://www.linkedin.com/in/katiehouse', '_blank');
  };

  const handleGithubClick = () => {
    window.open('http://www.github.com/katiehouse3', '_blank');
  };

  return (
    <div className="header-container">
      <div className="media">
        <img src={headshot} className="mr-3 profile-img" alt="avatar" />
        <div className="media-body">
          <h1 className="text-white">Katie's Portfolio</h1>
          <button type="button" onClick={handleResumeClick} className="btn btn-dark">Resume</button>
          <button type="button" onClick={handleLinkedInClick} className="btn btn-dark">LinkedIn</button>
          <button type="button" onClick={handleGithubClick} className="btn btn-dark">Github</button>
          <button type="button" onClick={() => window.location.href = 'mailto:katiehouse3@gmail.com'}className="btn btn-dark">Contact</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;