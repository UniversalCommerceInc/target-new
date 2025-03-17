import React from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import { FaMapMarkerAlt } from "react-icons/fa";
const HeaderTop = ({ className }) => {
  return (
    <header
      className={` flex flex-col items-center py-1 px-5 box-border text-center text-base ${className}`}
      style={{ backgroundColor: '#564C4D' }}
    >
      <div className="w-full flex flex-col items-start justify-center py-2 max-w-[1000px] md:max-w-full">
        <div className="w-full h-6 flex flex-row items-center justify-center gap-2 px-5">
          <span className="location-icon  text-white">
            {/* &nbsp; */}
            <FaMapMarkerAlt color="white" size={14} />        {/* <img src="/image.svg" alt="location" className="w-4 h-4 object-cover filter invert"/> */}
          </span>
          <span className="leading-6 text-white whitespace-nowrap">
            
            Showing stock for delivery to
          </span>
          <div className="flex flex-row items-center justify-center">
            <b className="underline leading-6 text-white whitespace-nowrap">
              Sydney International Airport, 2020
            </b>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTop;
