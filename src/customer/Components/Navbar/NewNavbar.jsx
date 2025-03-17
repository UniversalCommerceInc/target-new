import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function NewNavbar() {
  const goBack = () => {
    window.history.back(); // Go back one page
  };

  return (
    <div className="mx-auto  ">
      <div className="flex flex-col sm:flex-row items-center justify-start mb-4 gap-4 sm:gap-[40%]">
        <div className="flex items-center ml-2 space-x-2" onClick={goBack} style={{ cursor: 'pointer' }}>
          <BsArrowLeft />
          <span className="font-bold">Back</span>
        </div>
        <div className="relative">
            <Link to="/">
          <img src="https://www.target.com.au/medias/auth0/target.svg" alt="Target" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewNavbar;
