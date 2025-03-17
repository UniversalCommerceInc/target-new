import React from 'react';

const BrandLogo = ({ src, alt }) => (
  <img src={src} alt={alt} className="h-10" />
);

const DiscountBanner = () => (
  <div className="bg-red-700 text-white text-center mt-10 py-8">
    <h1 className="text-4xl font-bold">25% OFF</h1>
    <p className="text-lg">Selected Clothing & Footwear Brands*</p>
    <div className="flex justify-center space-x-6 my-4">
      <BrandLogo src="/Fila.png" alt="Brand Logo 1" />
      <BrandLogo src="/Lonsdale.webp" alt="Brand Logo 2" />
      <BrandLogo src="/Piping.webp" alt="Brand Logo 3" />
      <BrandLogo src="/Zoo.webp" alt="Brand Logo 4" />
      <BrandLogo src="/Mooks.webp" alt="Brand Logo 5" />
      <BrandLogo src="/Mossimo.webp" alt="Brand Logo 6" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
      <div className="bg-white ">
        <img src="/womens.png" alt="Shop Women" className="w-full" />
        {/* <p className="mt-2 text-red-700 font-bold">SHOP WOMEN</p> */}
      </div>
      <div className="bg-white ">
        <img src="mens.png" alt="Shop Men" className="w-full" />
        {/* <p className="mt-2 text-red-700 font-bold">SHOP MEN</p> */}
      </div>
      <div className="bg-white ">
        <img src="boys.png" alt="Shop Boys" className="w-full" />
        {/* <p className="mt-2 text-red-700 font-bold">SHOP BOYS</p> */}
      </div>
      <div className="bg-white ">
        <img src="girls.png" alt="Shop Girls" className="w-full" />
        {/* <p className="mt-2 text-red-700 font-bold">SHOP GIRLS</p> */}
      </div>
    </div>
  </div>
);

export default DiscountBanner;
