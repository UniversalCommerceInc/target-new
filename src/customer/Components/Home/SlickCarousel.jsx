import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slickSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const carouselData = [
  { src: "https://placehold.co/300x500", alt: "Jackets & Coats", text: "Jackets & Coats" },
  { src: "https://placehold.co/300x500", alt: "Workwear & Suiting", text: "Workwear & Suiting" },
  { src: "https://placehold.co/300x500", alt: "Dresses & Skirts", text: "Dresses & Skirts" },
  { src: "https://placehold.co/300x500", alt: "Denim", text: "Denim" },
  { src: "https://placehold.co/300x500", alt: "Sleepwear & Underwear", text: "Sleepwear & Underwear" },
];

const SlickCarousel = () => {
  return (
    <div className="container mx-auto py-8">
      <Slider {...slickSettings}>
        {carouselData.map((item, index) => (
          <div key={index} className="p-4">
            <img className="w-full" src={item.src} alt={item.alt} />
            <p className="text-center mt-2">{item.text}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickCarousel;
