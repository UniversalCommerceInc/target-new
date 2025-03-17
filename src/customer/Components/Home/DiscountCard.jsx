import React from 'react';

const discountCardClasses = "mt-8 bg-red-700 text-white p-6 text-center";
const gridClasses = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4";
const cardClasses = "text-center";

const DiscountCard = () => {
  return (
    <div className={discountCardClasses}>
      <h2 className="text-3xl font-bold mb-2">20% OFF</h2>
      <p className="mb-6">Sleepwear for the Family* - Online Only</p>
      <div className={gridClasses}>
        <div className={cardClasses}>
          <img src="/Women.png" alt="Shop Women" className="w-[300px] mx-auto mb-4"/>
          {/* <p className="font-bold">SHOP WOMEN</p> */}
        </div>
        <div className={cardClasses}>
          <img src="/Men.png" alt="Shop Men" className="w-[300px] mx-auto mb-4"/>
          {/* <p className="font-bold">SHOP MEN</p> */}
        </div>
        <div className={cardClasses}>
          <img src="/Kids.png" alt="Shop Kids" className="w-[300px] mx-auto mb-4"/>
          {/* <p className="font-bold">SHOP KIDS</p> */}
        </div>
        <div className={cardClasses}>
          <img src="/baby.png" alt="Shop Baby" className="w-[300px] mx-auto mb-4"/>
          {/* <p className="font-bold">SHOP BABY</p> */}
        </div>
      </div>
    </div>
  );
};

export default DiscountCard;
