import { useState } from "react";
import { data } from "./categorydata";
import Collapse from '@mui/material/Collapse';

const Navbar = ({scrolled}) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleMouseEnter = (category) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div className="bg-white hidden dark:bg-zinc-800 mt-2 md:block">
      <nav className="border-b relative border-zinc-200 dark:border-zinc-700">
        <ul className="flex justify-center align-center border-b space-x-4 px-4 text-zinc-700 dark:text-zinc-300">
          {data.categories.map((category) => (
            <li
              key={category.name}
              onMouseEnter={() => handleMouseEnter(category)}
              onMouseLeave={handleMouseLeave}
              className="text-zinc-900 px-5 pb-1 dark:text-white hover:border-b-2 hover:border-red-500 hover:text-red-500"
            >
              <a href={category.link} className="text-zinc-500 font-bold font-11 dark:text-white hover:text-red-500">
                {category.name}
              </a>
              <Collapse in={hoveredCategory === category} timeout="auto" unmountOnExit>
                <div className="absolute right-0 left-0 mt-2 bg-white dark:bg-zinc-800 shadow-lg p-4 z-50">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    Shop All {hoveredCategory?.name}
                  </h3>
                  <hr />
                  <div className="flex justify-start space-x-4">
                    {category.subcategories.map((subcategory, index) => (
                      <div key={index} className="w-full p-2">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                          {subcategory.title}
                        </h3>
                        <ul className="space-y-1 text-zinc-700 dark:text-zinc-300">
                          {subcategory.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {category.promotions && (
                      <div className="w-1/2 p-2">
                        {category.promotions.map((promo, index) => (
                          <div key={index} className="border p-4 mb-4">
                            <img src={promo.imageUrl} alt={promo.altText} className="mb-4" />
                            <div className="text-red-600 text-lg font-bold mb-1">{promo.title}</div>
                            <div className="text-zinc-600 text-sm">{promo.description}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Collapse>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
