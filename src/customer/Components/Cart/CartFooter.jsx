import React from 'react';

// Shared Tailwind CSS classes
const flexCenter = "flex justify-center";
const textCenter = "text-center";
const spaceX4 = "space-x-4";
const spaceX6 = "space-x-6";
const mb6 = "mb-6";
const h8 = "h-8";
const h12 = "h-12";
const textXl = "text-xl";
const fontBold = "font-bold";
const textSm = "text-sm";
const hoverUnderline = "hover:underline";

const PaymentOptions = () => {
    return (
        <div className={`bg-zinc-800 text-white p-6 ${textCenter}`}>
            <h2 className={`mb-4 ${textXl}`}>Payment options</h2>
            <div className={`${flexCenter} ${spaceX4} ${mb6}`}>
            <img className="h-[20px] w-[40px] object-contain" src="/visa.png" alt="Visa" />
              <img className="h-[20px] w-[40px] object-cover filter invert" src="/masterCard.png" alt="Mastercard" />
              <img className="h-[20px] w-[40px] object-cover filter invert" src="/amex.png" alt="Amex" />
              <img className="h-[20px] w-[40px] object-cover" src="/applePay.png" alt="Apple Pay" />
              <img className="h-[20px] w-[40px] object-contain filter invert" src="/paypal.png" alt="Paypal" />
              <img className="h-[20px] w-[40px] object-contain filter invert" src="/afterpay.png" alt="Afterpay" />
              <img className="h-[20px] w-[40px] object-contain filter invert" src="/zip.png" alt="Zip" />
            </div>
            <div className={mb6}>
                <p className={textXl + ' ' + fontBold}>1300 753 567</p>
                <p>International: +61 3 5246 2433</p>
            </div>
            <div className={mb6}>
                <p>Monday to Friday 9:00am to 7:00pm AEDT</p>
                <p>Saturday 9:00am to 5:00pm AEDT</p>
                <p>Closed Sunday and public holidays</p>
            </div>
            <div className={`flex justify-center align-center mb-6`}>
            <img className="h-[50px] w-[50px] object-cover filter invert mr-4" src="/target-logo.png" alt="Logo" />
            </div>
            <div className={mb6 + ' ' + textSm}>
                <p>Copyright © 2019 Target Australia Pty Ltd ABN 75 004 250 944. Target Australia Pty Ltd is part of the Wesfarmers Ltd group and has no affiliation with Target Corporation US.</p>
            </div>
            <div className={`${flexCenter} ${spaceX6} ${mb6} ${textSm}`}>
                <a href="#" className={hoverUnderline}>Conditions of use</a>
                <a href="#" className={hoverUnderline}>Privacy policy</a>
            </div>
            <div className={`${flexCenter} items-center space-x-2 ${textSm}`}>
                <span>Secured by</span>
                <img className="h-auto w-[100px] object-cover" src="/geo.png" alt="GeoTrust" />
            </div>
        </div>
    );
};

export default PaymentOptions;
