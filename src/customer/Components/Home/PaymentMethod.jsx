import React from 'react';

const PaymentMethod = ({ imageSrc, altText, title, subtitle }) => {
  return (
    <div className="flex items-center space-x-2">
      <img src={imageSrc} alt={altText} className="w-16 h-auto object-contain" />
      <div className="text-center">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

const PaymentMethods = () => {
  return (
    <div className="border-t border-b border-zinc-300 py-4 flex justify-around items-center">
      <PaymentMethod
        imageSrc="/applePay.png"
        altText="Apple Pay"
        title="KEEP IT SIMPLE"
        subtitle="AND SECURE."
      />
      <PaymentMethod
        imageSrc="/afterpay.png"
        altText="Afterpay"
        title="BUY NOW,"
        subtitle="PAY LATER."
      />
      <PaymentMethod
        imageSrc="/zip.png"
        altText="Zip"
        title="ZIP NOW,"
        subtitle="PAY LATER."
      />
    </div>
  );
};

export default PaymentMethods;
