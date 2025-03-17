import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartItems, placeOrder } from "../../../action/cart";

const inputClasses = "border p-2 rounded";
const buttonClasses = "p-2 rounded";
const checkboxClasses = "mr-2";

const PaymentInfo = ({ shippingInfo }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Credit Card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [agreePrivacyPolicy, setAgreePrivacyPolicy] = useState(false);
  const [error, setError] = useState("");

  const cart = useSelector((store) => store.cartItems.cartItems.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paymentMethods = [
    "Credit Card",
    "Debit Card",
    "Net Banking",
    "Wallet",
    "UPI",
    "EMI Options",
  ];

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setError("");
  };

  const handleMakePayment = () => {
    if (!agreePrivacyPolicy) {
      setError("You must agree with the Privacy Policy.");
      return;
    }

    const paymentData = {
      cartId: cart?.id,
      shippingAddress: shippingInfo,
    };

    const paymentsuccessdata = {
      paymentMethod: selectedPaymentMethod,
      mobile: shippingInfo.phoneNumber,
      totalAmount: cart?.total,
    };

    placeOrder(paymentData)
      .then((response) => {
        dispatch(getCartItems());
        navigate(`/payment/${cart.id}`, { state: paymentsuccessdata });
        console.log(response);
      })
      .catch((err) => {
        setError("Payment failed. Please try again.");
      });
  };

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const yearOptions = Array.from(
    { length: 21 },
    (_, i) => new Date().getFullYear() + i
  );

  return (
    <div className="mb-4 flex gap-6">
      <div className="flex flex-col gap-2 mb-4 w-[20%]">
        {paymentMethods.map((method, index) => (
          <button
            key={index}
            className={`${buttonClasses} ${
              selectedPaymentMethod === method
                ? "bg-green-500 text-white"
                : "border"
            }`}
            onClick={() => handlePaymentMethodChange(method)}
          >
            {method}
          </button>
        ))}
      </div>
      <div className="border p-6 rounded w-[60%]">
        <div className="flex justify-between mb-4">
          <span>We Accept:</span>
          <img
            src={"/mastercard.png"}
            alt="Accepted Cards"
            className="h-8 w-16 object-cover"
          />
        </div>
        {selectedPaymentMethod === "Credit Card" && (
          <div className="grid grid-cols-1 gap-4 mb-4">
            <label>Card Number</label>
            <input
              type="text"
              className={inputClasses}
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <label>Expiry Month</label>
              <select
                className={inputClasses}
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
              >
                <option value="">Month</option>
                {monthOptions.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <label>Expiry Year</label>
              <select
                className={inputClasses}
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
              >
                <option value="">Year</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <label>CVV</label>
            <input
              type="text"
              className={inputClasses}
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        )}
        {selectedPaymentMethod === "Debit Card" && (
          <div className="grid grid-cols-1 gap-4 mb-4">
            <label>Card Number</label>
            <input
              type="text"
              className={inputClasses}
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <label>Expiry Month</label>
              <select
                className={inputClasses}
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
              >
                <option value="">Month</option>
                {monthOptions.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <label>Expiry Year</label>
              <select
                className={inputClasses}
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
              >
                <option value="">Year</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <label>CVV</label>
            <input
              type="text"
              className={inputClasses}
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        )}
        {selectedPaymentMethod === "Net Banking" && (
          <div className="grid grid-cols-1 gap-4 mb-4">
            <label>
              Bank
              <select className={inputClasses}>
                <option value="">Select Bank</option>
                {/* Add bank options here */}
              </select>
            </label>
          </div>
        )}
        {selectedPaymentMethod === "Wallet" && (
          <div className="grid grid-cols-1 gap-4 mb-4">
            <label>
              Wallet
              <select className={inputClasses}>
                <option value="">Select Wallet</option>
                {/* Add wallet options here */}
              </select>
            </label>
          </div>
        )}
        {selectedPaymentMethod === "UPI" && (
          <div className="grid grid-cols-1 gap-4 mb-4">
            <label>
              UPI ID
              <input
                type="text"
                className={inputClasses}
                placeholder="UPI ID"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </label>
          </div>
        )}
        {selectedPaymentMethod === "EMI Options" && (
          <div className="grid grid-cols-1 gap-4 mb-4">
            <label>
              Bank
              <select className={inputClasses}>
                <option value="">Select Bank</option>
                {/* Add bank options here */}
              </select>
            </label>
            <label>
              EMI Tenure
              <select className={inputClasses}>
                <option value="">Select EMI Tenure</option>
                {/* Add EMI tenure options here */}
              </select>
            </label>
          </div>
        )}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="privacy-policy"
            className={checkboxClasses}
            checked={agreePrivacyPolicy}
            onChange={(e) => setAgreePrivacyPolicy(e.target.checked)}
          />
          <label htmlFor="privacy-policy">
            I agree with the Privacy Policy by proceeding with this payment.
          </label>
        </div>
        <div className="text-center font-bold text-xl mb-4">
          INR {cart?.total} (Total Amount Payable)
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex justify-center">
          <button
            className={`bg-green-500 text-white ${buttonClasses} mr-2`}
            onClick={handleMakePayment}
          >
            Make Payment
          </button>
          <button className={`bg-zinc-300 text-black ${buttonClasses}`}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
