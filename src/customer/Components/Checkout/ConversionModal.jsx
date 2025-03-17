import React from "react";

const ConversionModal = ({
  isOpen,
  onClose,
  onConfirm,
  conversionRate,
  cartTotal,
}) => {
  if (!isOpen) return null;

  const convertedAmount = (cartTotal * conversionRate).toFixed(2);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Currency Conversion</h2>
        <p>
          Your total of <span className="text-green-500">₹{cartTotal}</span>{" "}
          will be converted to approximately
          <span className="text-green-500"> ${convertedAmount} USD</span>.
          <br /> Click "OK" to proceed with PayPal payment.
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white p-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={onConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversionModal;
