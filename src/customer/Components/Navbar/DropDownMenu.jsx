import React, { useState } from "react";

const DropDownMenu = () => {
  const categories = ["New", "Women", "Men", "Kids", "Baby", "Home", "Toys", "Entertainment", "Beauty", "Gifts", "Sale"];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="self-stretch flex flex-col items-center justify-start py-0 px-5 border-b-2 border-solid border-gray-300 hidden md:flex">
      <div className="w-full max-w-screen-xl flex flex-col items-start justify-start py-0 px-4">
        <div className="w-full flex flex-row items-center justify-between gap-5">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <a href="#" className="text-black text-base leading-5">
                {category}
              </a>
              {isHovered && (
                <div className="absolute left-0 top-full z-10 bg-white border border-gray-300 rounded-sm py-2 px-3">
                  <p className="text-gray-700 text-sm">{category}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
