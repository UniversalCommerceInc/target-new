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
          <img src="https://www.target.com.au/medias/sys_master/root/h98/hab/15709749411870/240621-Half-Roundel-Logo-v2.png" alt="Target" className="h-20"/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewNavbar;
