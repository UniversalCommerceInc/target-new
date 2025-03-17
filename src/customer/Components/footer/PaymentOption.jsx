import React from 'react';

const PaymentOptions = () => {
  return (
    <div className="bg-zinc-800 text-white py-6 w-full">
      <div className=" w-full">
        <div className="flex flex-col lg:flex-row justify-between items-centerw-full px-[10%] ">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-lg font-semibold mb-2">Payment options</h2>
            <div className="flex flex-wrap justify-center lg:justify-start space-x-4">
              <img className="h-[20px] w-[40px] object-contain" src="/visa.png" alt="Visa" />
              <img className="h-[20px] w-[40px] object-cover filter invert" src="/masterCard.png" alt="Mastercard" />
              <img className="h-[20px] w-[40px] object-cover filter invert" src="/amex.png" alt="Amex" />
              <img className="h-[20px] w-[40px] object-cover" src="/applePay.png" alt="Apple Pay" />
              <img className="h-[20px] w-[40px] object-contain filter invert" src="/paypal.png" alt="Paypal" />
              <img className="h-[20px] w-[40px] object-contain filter invert" src="/afterpay.png" alt="Afterpay" />
              <img className="h-[20px] w-[40px] object-contain filter invert" src="/zip.png" alt="Zip" />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end w-full lg:w-auto">
            <img src="https://www.target.com.au/medias/sys_master/root/h9c/hab/h00/h00/26706947047454/2022-top-10-power-retail-desktop3.png" alt="Top 10 Finalist" className="max-w-full" />
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-between items-center mt-6 px-[10%]">
          <div className="flex items-center text-sm text-center lg:text-left mb-4 lg:mb-0">
            <img className="h-[50px] w-[50px] object-cover filter invert mr-4" src="/target-logo.png" alt="Logo" />
            <div>
              <p>&copy; 2024 Target Australia Pty Ltd ABN 75 004 250 944</p>
              <p>Target Australia Pty Ltd is part of the Wesfarmers Ltd group and has no affiliation with Target Corporation US</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 text-sm mt-1">
                <a href="#" className="hover:underline">Conditions of Use</a>
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Whistleblower Policy</a>
                <a href="#" className="hover:underline">*Terms & Conditions</a>
                <a href="#" className="hover:underline">Site Map</a>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex items-center">
              <span className="mr-2">Secured by</span>
              <img className="h-auto w-[100px] object-cover" src="/geo.png" alt="GeoTrust" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 text-white py-2 text-center text-xs mt-4">
        By using this website, you agree to our <a href="#" className="hover:underline">use of cookies</a> to give you the best possible experience.
      </div>
    </div>
  );
};

export default PaymentOptions;
