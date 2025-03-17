import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../App.css"; // Make sure to import a CSS file for additional styling
import { receiveProducts } from "../../../action";

const buttonStyles =
  "absolute top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10";
const linkStyles = "text-zinc-500";
const activeLinkStyles = "text-red-500 font-bold";

const womenCategories = [
  { src: "/N3.png", label: "Men's Accessories" },
  { src: "/N1.png", label: "Kids' Clothing" },
  { src: "/N3.png", label: "Kids' Accessories" },
  { src: "/N2.png", label: "Kids' Toys" },
  { src: "/N5.png", label: "Kids' Shoes" },
  { src: "/N3.png", label: "Dresses & Skirts" },
  { src: "/N4.png", label: "Denim" },
  { src: "/N5.png", label: "Men's Clothing" },
];
const men = [
  { src: "/N1.png", label: "Kids' Clothing" },
  { src: "/N3.png", label: "Men's Accessories" },
  { src: "/N1.png", label: "Kids' Shoes" },
  { src: "/N3.png", label: "Kids' Accessories" },
  { src: "/N2.png", label: "Kids' Toys" },
  { src: "/N3.png", label: "Dresses & Skirts" },
  { src: "/N4.png", label: "Denim" },
  { src: "/N5.png", label: "Men's Clothing" },
];
const kids = [
  { src: "/N1.png", label: "Kids' Clothing" },
  { src: "/N3.png", label: "Men's Accessories" },
  { src: "/N5.png", label: "Kids' Shoes" },
  { src: "/N4.png", label: "Kids' Accessories" },
  { src: "/N2.png", label: "Kids' Toys" },
  { src: "/N3.png", label: "Dresses & Skirts" },
  { src: "/N4.png", label: "Denim" },
  { src: "/N5.png", label: "Men's Clothing" },
  { src: "/N3.png", label: "Men's Accessories" },
  { src: "/N2.png", label: "Kids' Shoes" },
  { src: "/N5.png", label: "Kids' Accessories" },
];
const home = [
  { src: "/N1.png", label: "Kids' Clothing" },
  { src: "/N2.png", label: "Kids' Toys" },
  { src: "/N3.png", label: "Dresses & Skirts" },
  { src: "/N4.png", label: "Denim" },
  { src: "/N3.png", label: "Men's Accessories" },
  { src: "/N2.png", label: "Kids' Shoes" },
  { src: "/N3.png", label: "Kids' Accessories" },
  { src: "/N5.png", label: "Men's Clothing" },
  { src: "/N3.png", label: "Men's Accessories" },
  { src: "/N4.png", label: "Kids' Shoes" },
  { src: "/N2.png", label: "Kids' Accessories" },
];

const HomeCarousel = () => {
  const [activeCategory, setActiveCategory] = useState("WOMEN");
  const [products, setProducts] = useState([]);

  // const getActiveCategories = () => {
  //   switch (activeCategory) {
  //     case 'WOMEN':
  //       return womenCategories;
  //     case 'MEN':
  //       return men;
  //     case 'KIDS':
  //       return kids;
  //     case 'HOME':
  //       return home;
  //     default:
  //       return [];
  //   }
  // };
  // const activeCategories = getActiveCategories();

  const settings = {
    dots: true,
    customPaging: (i) => <div className="slick-dots-line"></div>,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
  };

  React.useEffect(() => {
    receiveProducts().then((data) => {
      const products = data.data.products.results;
      setProducts(products);
      console.log("Products received:", products);

      // const categorySet = new Set();
      // products.forEach((product) => {
      //   const categoryName =
      //     product.masterData.current.categories[0]?.parent?.parent?.name;
      //   if (categoryName) {
      //     categorySet.add(categoryName);
      //   }
      // });

      // const categoriesArray = [...categorySet];
      // setCategories(categoriesArray);

      // if (categoriesArray.length > 0) {
      //   setActiveCategory(categoriesArray[0]);
      // }
      // console.log("Categories extracted:", categoriesArray);
    });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-4">You May Also Like</h2>
      {/* <div className="flex justify-center gap-4 mb-4">
        <span
          onClick={() => setActiveCategory('WOMEN')}
          className={`${linkStyles} ${activeCategory === 'WOMEN' && activeLinkStyles} `}
          style={{ cursor: 'pointer' , color:activeCategory === 'WOMEN'? '#FF0000' : '#000000'}}
        >
          WOMEN
        </span>
        |
        <span
          onClick={() => setActiveCategory('MEN')}
          className={`${linkStyles} ${activeCategory === 'MEN' && activeLinkStyles}`}
          style={{ cursor: 'pointer' , color:activeCategory === 'MEN'? '#FF0000' : '#000000'}}

        >
          MEN
        </span>
        |
        <span
          onClick={() => setActiveCategory('KIDS')}
          className={`${linkStyles} ${activeCategory === 'KIDS' && activeLinkStyles}`}
          style={{ cursor: 'pointer' , color:activeCategory === 'KIDS'? '#FF0000' : '#000000'}}

        >
          KIDS
        </span>
        |
        <span
          onClick={() => setActiveCategory('HOME')}
          className={`${linkStyles} ${activeCategory === 'HOME' && activeLinkStyles}`}
          style={{ cursor: 'pointer' , color:activeCategory === 'HOME'? '#FF0000' : '#000000'}}

        >
          HOME
        </span>
      </div> */}
      <div className="slider-wrapper">
        <Slider {...settings}>
          {products.slice(5, 11).map((image, index) => (
            <div key={index} className="p-4">
              <img
                className="w-full rounded-lg"
                src={image.masterData.current.allVariants[0].images[0].url}
                alt={image.label}
              />
              <p className="text-center mt-2">
                {image.masterData.current.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const CustomArrow = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${buttonStyles} ${
        direction === "left" ? "left-0" : "right-0"
      }`}
      aria-label={direction}
      style={{ zIndex: 1 }}
    >
      <img
        aria-hidden="true"
        alt={`${direction}-arrow`}
        src={`https://img.icons8.com/ios-glyphs/30/000000/chevron-${direction}.png`}
      />
    </button>
  );
};

export default HomeCarousel;
