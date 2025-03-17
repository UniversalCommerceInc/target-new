import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DeliveryInfo = () => {
  const deliveryOptions = [
    {
      icon: '/D1.png',
      text: 'Free Delivery',
      details: 'Over $60',
    },
    {
      icon: '/D2.png',
      text: '2HR Click & Collect',
      details: '',
    },
    {
      icon: '/D3.png',
      text: 'Free Returns',
      details: '60 Day Returns',
    },
  ];

  const iconStyle = 'w-6 ';
  const textStyle = 'font-bold';

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '0', // Ensures the item is centered
  };

  return (
    <div className="bg-white rgba(0, 0, 0, 0.24) 0px 3px 8px dark:bg-zinc-800 shadow">
      <div className=" mx-auto px-4 py-2 hidden md:flex items-center justify-between space-x-4">
        {deliveryOptions.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span>
              <img src={option.icon} alt={option.text} className={iconStyle } />
            </span>
            <span className={textStyle}>{option.text}</span>
            {option.details && <span>{option.details}</span>}
          </div>
        ))}
      </div>
      <div className="md:hidden px-4 py-2">
        <Slider {...settings}>
          {deliveryOptions.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div>
                <img src={option.icon} alt={option.text} className={iconStyle } />
              </div>
              <div>
              <span className={textStyle}>{option.text}</span>
              {option.details && <span>{option.details}</span>}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DeliveryInfo;
