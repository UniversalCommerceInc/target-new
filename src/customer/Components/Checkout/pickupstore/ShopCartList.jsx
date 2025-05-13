import React, { useState } from "react";
import ShopCart from "./ShopCart";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  addDeliveryType,
  associateStore,
  createOrders,
  setShippingMethod,
} from "../../../../action";

const ShopCartList = ({ shop, deliveryType, onClose, setSelectedOption }) => {
  const [selectedSellers, setSelectedSellers] = useState({});
  const navigate = useNavigate();

  // ✅ Handle seller selection
  const handleSelectSeller = (sellerId) => {
    const selectedSeller = shop.find((s) => s.sellerId === sellerId);
    localStorage.setItem("storeKey", sellerId);
    localStorage.setItem("deliveryType", deliveryType);
    
    setSelectedSellers((prevSelected) => ({
      ...prevSelected,
      [sellerId]: selectedSeller,
    }));
  };

  // ✅ Transform selected sellers to match API format
  const transformSelectedSellers = () => {
    return Object.values(selectedSellers).map((seller) => ({
      sellerId: seller.sellerId,
      sellerName: seller.sellerName,
      shipMethodId: seller.shipMethodId,
    }));
  };

  // ✅ Notify user on success
  const notify = () => toast.success("Added sellers address");

  // ✅ Save selected sellers in localStorage
  const saveSellersToLocalStorage = (shopData) => {
    const sellerInfo = shopData.reduce((acc, seller) => {
      if (!acc[seller.shipMethodId]) {
        acc[seller.shipMethodId] = [];
      }
      if (!acc[seller.shipMethodId].includes(seller.sellerId)) {
        acc[seller.shipMethodId].push(seller.sellerId);
      }
      return acc;
    }, {});

    const dealerData = {
      dealer: {
        deliveryType,
        shipMethodIds: Object.keys(sellerInfo),
      },
    };

    localStorage.setItem("dealerData", JSON.stringify(dealerData));
    console.log("Dealer data saved to localStorage:", dealerData);
  };

  // ✅ Handle order placement
  const handlePlaceOrder = async (shippingID) => {
    try {
      const cartId = localStorage.getItem("cartId");
      const cartVersion = localStorage.getItem("cartVersion");

      if (!cartVersion) throw new Error("Missing cart version");

      // Step 1: Set Shipping Method
      const res = await setShippingMethod({
        shippingID,
        CartID: cartId,
        version: cartVersion,
      });

      if (!res || !res.version) throw new Error("Failed to set shipping method");

      // Step 2: Create Order
      const order = await createOrders({
        id: cartId,
        version: res.version,
      });

      if (!order) throw new Error("Failed to create order");

      console.log("Order Created:", order);
      localStorage.setItem("orderId", order?.id);
      localStorage.setItem("orderVersion", order?.version);
      localStorage.setItem("price", order?.totalPrice.centAmount);

      // Step 3: Associate Store
      const associateStoreRes = await associateStore({
        orderId: order.id,
        storeKey: localStorage.getItem("storeKey"),
      });
      localStorage.setItem("orderVersion", associateStoreRes?.version);

      // Step 4: Add Delivery Type
      const deliveryTypeRes = await addDeliveryType({
        orderId: order.id,
        deliveryType,
      });
      localStorage.setItem("orderVersion", deliveryTypeRes?.version);

      navigate("/checkout?step=3");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  // ✅ Continue button handler
  const handleContinue = () => {
    if (deliveryType === "pickup") {
      handlePlaceOrder("da64256d-b45c-4a73-94ae-6e90f66d6480");
    } else {
      handlePlaceOrder("ec0f5ba4-682d-4de5-845b-8dce7a058756");
    }

    notify();
  };

  // ✅ Enable/Disable Continue Button
  const isAllSelected = shop.every(
    (seller) => selectedSellers[seller.sellerId]
  );

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between mb-3 mr-3 sticky top-0 bg-white p-2">
        <div className="text-lg font-bold text-gray-800">
          Choose Nearby Shop
        </div>
        <button
          onClick={handleContinue}
          className={`px-4 py-2 text-white font-semibold rounded-md transition duration-300 ${
            isAllSelected
              ? "bg-black hover:bg-indigo-900 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!isAllSelected}
        >
          Continue
        </button>
        <button
          onClick={() => {
            setSelectedOption("shipping");
            onClose();
          }}
          className="px-4 py-2 text-white font-semibold rounded-md transition duration-300 bg-red-400 hover:bg-red-700 cursor-pointer"
        >
          Cancel
        </button>
      </div>

      {shop.length === 0 ? (
        <div className="text-gray-600 border border-red-500 p-2 m-2">
          No nearby sellers for this cart item.<br /> Choose 'Standard US' to
          continue.
        </div>
      ) : (
        shop.map((seller) => (
          <div
            key={seller.sellerId}
            className={`relative border p-4 mb-2 rounded-md cursor-pointer ${
              selectedSellers[seller.sellerId]
                ? "border-green-600"
                : "border-gray-300"
            }`}
            onClick={() => handleSelectSeller(seller.sellerId)}
          >
            <ShopCart shop={seller} />
          </div>
        ))
      )}
    </div>
  );
};

export default ShopCartList;
