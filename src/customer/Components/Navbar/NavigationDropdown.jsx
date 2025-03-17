import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material"; // Import Skeleton from Material-UI

// Mock data to simulate API response
const mockData = {
  extraData: [
    {
      name: 'Women',
      children: [
        {
          name: 'Tops',
          children: [
            { name: 'T-Shirts' },
            { name: 'Blouses' }
          ]
        },
        {
          name: 'Bottoms',
          children: [
            { name: 'Jeans' },
            { name: 'Skirts' }
          ]
        }
      ],
      image: ['https://via.placeholder.com/150']
    },
    {
      name: 'Men',
      children: [
        {
          name: 'Shirts',
          children: [
            { name: 'Casual Shirts' },
            { name: 'Formal Shirts' }
          ]
        },
        {
          name: 'Trousers',
          children: [
            { name: 'Chinos' },
            { name: 'Jeans' }
          ]
        }
      ],
      image: ['https://via.placeholder.com/150']
    },
    {
      name: 'SALE',
      children: [
        {
          name: 'Women Sale',
          children: [
            { name: 'Dresses' },
            { name: 'Tops' }
          ]
        },
        {
          name: 'Men Sale',
          children: [
            { name: 'Shirts' },
            { name: 'Trousers' }
          ]
        }
      ],
      image: ['https://via.placeholder.com/150']
    }
  ]
};

/**
 * Renders a navigation dropdown component that fetches and displays data from an API.
 * The component displays a list of navigation items, and when the user hovers over an item,
 * a dropdown menu is shown with additional information related to that item.
 *
 * @returns {JSX.Element} The navigation dropdown component.
 */
const NavigationDropdown = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate an API call with a timeout
    const fetchData = async () => {
      setTimeout(() => {
        setData(mockData);
        setLoading(false);
      }, 1000); // Simulates network delay
    };

    fetchData();
  }, []);

  return (
    <div className="w-full mx-auto border-b border-gray-400">
      <div className="py-4 flex justify-center gap-8 text-lg font-medium">
        {loading ? ( // Display Skeleton while loading
          <Skeleton variant="rectangular" width='100%' height={40} />
        ) : (
          data.extraData?.map((el, index) => (
            <div
              onMouseEnter={() => document.getElementById(`${el.name}`).classList.remove('hidden')}
              onMouseLeave={() => document.getElementById(`${el.name}`).classList.add('hidden')}
              key={index}
              className="relative"
            >
              <a href="#" className={`uppercase no-underline ${el.name === 'SALE' ? 'text-red-600' : 'text-gray-800'}`}>
                {el.name}
              </a>
              <DropDownHover childrenData={el} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NavigationDropdown;

/**
 * Renders a dropdown menu with a list of child items and an optional image.
 *
 * @param {Object} childrenData - The data for the child items in the dropdown.
 * @param {string} childrenData.name - The name of the dropdown.
 * @param {Object[]} childrenData.children - The child items in the dropdown.
 * @param {string} childrenData.children[].name - The name of the child item.
 * @param {Object[]} childrenData.children[].children - The grandchild items of the child item.
 * @param {string} childrenData.children[].children[].name - The name of the grandchild item.
 * @param {string[]} childrenData.image - The URLs of the images to display in the dropdown.
 */
const DropDownHover = ({ childrenData }) => {
  return (
    <div className="absolute left-0 top-full w-full bg-white p-12 box-border hidden" id={childrenData.name}>
      <div className="flex justify-center">
        <div className={`flex ${childrenData?.image?.[0] ? 'flex-col items-center' : 'gap-24'}`}>
          {childrenData?.children?.map((el, index) => (
            <div key={index} className="p-4">
              <ul className="list-none p-0 m-0">
                <li className="cursor-pointer font-bold">{el.name}</li>
                <ul className="list-none p-0 m-0">
                  {el.children?.map((child, i) => (
                    <li className="cursor-pointer" key={i}>{child.name}</li>
                  ))}
                </ul>
              </ul>
            </div>
          ))}
        </div>
        {childrenData?.image && <div className="border border-gray-400 my-12 mx-24"></div>}
        {childrenData?.image && (
          <div className="flex flex-col items-center gap-2">
            <img className="w-2/3 h-2/3 object-cover" src={childrenData?.image?.[0]} alt={childrenData.name} />
            <h5 className="text-center">{childrenData.name}</h5>
          </div>
        )}
      </div>
    </div>
  );
};
