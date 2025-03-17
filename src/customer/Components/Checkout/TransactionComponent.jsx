import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPayment, addPaymentToOrder } from "../../../action";
import {
  checkoutStripePayemt,
  getCartItems,
} from "../../../action/cart";
import { toast } from "react-hot-toast";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { FaStripe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import ShippingComponent from "../Cart/ShippingComponent";
import CartFooter from "../Cart/CartFooter";

const TransactionComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for cart and user authentication
  const cart = useSelector((state) => state?.cartItems?.cartItems);
  const auth = useSelector((state) => state?.auth?.user?.user);
  const orderid = localStorage.getItem("orderId");

  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const shippingAdd = JSON.parse(localStorage.getItem("shippingAddress")) || {};
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    streetName: "",
    streetNumber: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    region: "",
    mobile: "",
    email: "",
  });
console.log(orderid,"payment")
  useEffect(() => {
    // Load PayPal script
    const loadPaypalScript = async () => {
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": "AUKvP8ae0aMLtrs2Fxk76rEV_02atz98Zn_mkIFlBpmogGo2iAzBc4iLeKhIDxCOKuPAg6R70OgNOClL",
          currency: "USD",
        },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    };

    if (!window.paypal) loadPaypalScript();
  }, [paypalDispatch]);

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = () => {
    setShowShippingInfo(!showShippingInfo);
    if (!showShippingInfo) {
      setShippingInfo(shippingAdd);
    }
  };

  // ✅ Handle Stripe Payment
  const handleStripePayment = async () => {
    try {
      await checkoutStripePayemt(cart);
      toast.success("Payment successful!");
      dispatch(getCartItems());
    } catch (error) {
      console.error("Stripe payment failed:", error);
      toast.error("Stripe payment failed. Please try again.");
    }
  };

  // ✅ Handle Payment After PayPal Approval (WITHOUT capture())
  const handlePayment = async () => {
    try {
      const orderid = localStorage.getItem("orderId");
      if (!orderid) {
        throw new Error("Order ID is missing");
      }
      // localStorage.setItem("state", null);

      navigate(`/payment/${orderid}`);
    } catch (error) {
      console.error("Error in handlePayment:", error);
      toast.error("Payment failed. Please try again.");
    }
  };
  

  

  const onError = (err) => {
    console.error("PayPal Error:", err);
    toast.error(err.message);
  };

  return (
    <div className="mx-auto p-4">
      {/* Billing Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Section */}
        <div className="md:col-span-2">
  <h2 className="text-xl font-bold mb-2">Billing Information</h2>
  
  {/* Filter out 'cartId' and 'version' */}
  <div className="grid grid-cols-2 gap-4">
    {Object.entries(shippingInfo)
      .filter(([key]) => key !== "cartID" && key !== "version")
      .map(([key, value]) => (
        <div key={key}>
          <label htmlFor={key} className="block mb-1">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            type="text"
            name={key}
            id={key}
            value={value || ""}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>
      ))}
  </div>
  
  <div className="mt-4">
    <input
      type="checkbox"
      onChange={handleCheckboxChange}
      checked={showShippingInfo}
    />
    <label className="ml-2">
      Billing and Shipping address are the same
    </label>
  </div>
</div>


        {/* Right Section */}
        <div>
          <h2 className="text-xl font-bold mb-2">Order Details</h2>
          <ShippingComponent
            totalPrice={cart?.totalPrice?.centAmount / 100}
            totalItems={cart?.totalLineItemQuantity}
          />
          {/* Stripe Payment */}
          <button
            className="p-2 rounded bg-blue-500 text-white w-full my-4"
            onClick={handleStripePayment}
          >
            Pay with <FaStripe className="inline-block ml-2" />
          </button>

          {/* PayPal Payment */}
          <PayPalButtons
            style={{ layout: "horizontal", color: "silver" }}
            onApprove={()=>{
              localStorage.setItem("cartId", null);
              localStorage.setItem("state", null);
              localStorage.removeItem("cartId");
              navigate(`/payment/${orderid}`)}}
            onError={onError}
          />
        </div>
      </div>

      {/* Footer */}
      <CartFooter />
    </div>
  );
};

export default TransactionComponent;
