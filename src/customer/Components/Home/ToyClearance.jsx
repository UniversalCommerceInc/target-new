import React from 'react';

// Shared tailwind classes
const textBlack = 'text-black';
const fontBold = 'font-bold';
const textLG = 'text-lg';
const fontExtrabold = 'font-extrabold';
const text4XL = 'text-4xl';
const mt2 = 'mt-2';
const mt4 = 'mt-4';
const block = 'block';
const underline = 'underline';

const ToyClearance = () => {
  return (
    <div className="bg-yellow-500 text-center p-8">
      <p className={`${textBlack} ${fontBold} ${textLG}`}>MORE ITEMS ADDED</p>
      <h1 className={`${textBlack} ${fontExtrabold} ${text4XL} ${mt2}`}>TOY CLEARANCE</h1>
      <p className={`${textBlack} ${fontBold} ${textLG} ${mt2}`}>HUNDREDS OF TOYS REDUCED!</p>
      <a href="#" className={`${textBlack} ${fontBold} ${underline} ${mt4} ${block}`}>Shop all Toy Clearance</a>
      <p className={`${textBlack} ${mt2}`}>While stocks last. Not in conjunction with other offers.</p>
    </div>
  );
};

export default ToyClearance;
