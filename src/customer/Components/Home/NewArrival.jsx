import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { receiveProducts } from "../../../action";

const NewArrivals = ({title}) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    receiveProducts()
      .then((data) => {
        console.log("Combined Products:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 400, // Reduced for smoother transition
    slidesToShow: 4,
    slidesToScroll: 1,
    lazyLoad: "ondemand", // Load only visible slides
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out", // Smoother transition
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
  };
 // Handle product click
 const handleProductClick = (product) => {
  const objectId = product.objectID;
  console.log("Object ID stored:", objectId);

  // Save object ID to localStorage
  localStorage.setItem("objectId", objectId);

  // Redirect to the product details page
  navigate(`/product/${product.id}`);
};
  return (
    <div className="max-w-screen-xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>

      <div className="slider-wrapper">
        {products.length > 0 ? (
          <Slider {...settings}>
            {products.map((product) => {
              const details = product.masterData.current.description["en-US"];
              const price = product.masterData.current.masterVariant.prices[0].value.centAmount
                ? `$${product.masterData.current.masterVariant.prices[0].value.centAmount/100}`
                : "Out of Stock";

              return (
                <div
                onClick={() => handleProductClick(product)}                  key={product._highlightResult.id.value}
                  className="block p-4"
                >
                  <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                    {/* Product Image */}
                    <img
                      className="w-full h-70 object-cover"
                      src={product._highlightResult.assets.value}
                      alt={details}
                    />

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {details}
                      </h3>

                      {/* Price and Availability */}
                      <p className="text-gray-500 mt-1">{price}</p>

                      {/* Stock Status */}
                      <span
                        className={`text-sm font-medium ${
                          product.masterData.current.masterVariant.availability.availableQuantity >
                          0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {product?.masterData.current.masterVariant.availability.isOnStock >
                        0
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </div>
    </div>
  );
};

const CustomArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md ${
      direction === "left" ? "left-0" : "right-0"
    } z-10`}
    aria-label={direction}
  >
    <img
      src={`https://img.icons8.com/ios-glyphs/30/000000/chevron-${direction}.png`}
      alt={`${direction} arrow`}
    />
  </button>
);

export default NewArrivals;
