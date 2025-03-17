import { useMediaQuery } from '@mui/material';
import React, { useState, useEffect } from 'react';

const sharedButtonClasses = " w-[150px] bg-white text-black mx-4  py-2 px-6 rounded-full";
const sharedTextClasses = "text-white";
const sharedLinkClasses = "underline";

const SaleComponent = () => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Assuming 768px is the breakpoint for small screens
  
  const leftImages = ["/BL1.png", "/BL2.webp"]; // Add the source paths for left side images
  const rightImages = ["/BR1.png", "/BR2.webp"]; // Add the source paths for right side images
  const middleImages = ["/BL1.png", "/BL2.webp","/BR1.png", "/BR2.webp" ]; // Add the source paths for middle images

  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
  const [middleIndex, setMiddleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMiddleIndex((prevIndex) => (prevIndex + 1) % middleImages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftIndex((prevIndex) => (prevIndex + 1) % leftImages.length);
      setRightIndex((prevIndex) => (prevIndex + 1) % rightImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-black text-white text-center py-2">
        <p>20% Off Sleepwear* - Online Only <a href="#" className={sharedLinkClasses}>Shop now</a></p>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 flex">
          <img src={leftImages[leftIndex]} alt="Left side image" className="w-full hidden h-auto object-cover md:block flex-1" />
        </div>
       
        <div className="flex-1 bg-red-700 text-white flex flex-col items-center justify-center py-16">
          <h1 className="text-5xl font-bold mb-4">Sale</h1>
          <p className="text-2xl mb-4">25% Off Knitwear*</p>
          <img src={middleImages[middleIndex]} alt="Middle image" className="w-full h-auto object-cover md:hidden" />

          <div className="flex flex-wrap justify-center gap-4 mb-4 mt-4">
            <button className={sharedButtonClasses}>Shop Women</button>
            <button className={sharedButtonClasses}>Shop Men</button>
            <button className={sharedButtonClasses}>Shop Kids</button>
            <button className={sharedButtonClasses}>Shop Baby</button>
          </div>
          <p className="text-sm"><a href="#" className={sharedLinkClasses}>*T&Cs apply.</a> Ends 5 June</p>
        </div>
       
        <div className="flex-1 flex">
          {isSmallScreen ? (
            null
          ) : (
            <img src={rightImages[rightIndex]} alt="Right side image" className="w-full h-auto object-cover flex-1" />
          )}
        </div>
      </div>
    </>
  );
};

export default SaleComponent;
