import React, { useEffect, useState, version } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Alert,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import AddressCard from "../adreess/AdreessCard";
import OrderSummary from "./OrderSummary";
import EditAddressModal from "./EditAddressModal";
import { useNavigate } from "react-router-dom";
import PaymentOptions from "./PaymentOption";
import CartItem from "../Cart/CartItem";
import { useSelector } from "react-redux";
import { getCartItems } from "../../../action/cart";
import { setShippingMethod, createOrders, addPaymentToOrder, createPayment } from "../../../action";
import ShippingDetails from "./pickupstore/Shippingdetails";

const PaymentMethod = () => {
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [error, setError] = useState("");
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [shippingMethods, setShippingMethods] = useState([]);
  const { cartItems } = useSelector((store) => store);
  const [CartData, setCartData] = useState(cartItems.cartItems);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedAddress = JSON.parse(localStorage.getItem("shippingAddress"));
        if (storedAddress) {
          setShippingAddress(storedAddress);
        }

        // Fetch cart data
        const res = await getCartItems();
        
        // Fetch shipping methods (mocked data)
        const shippingData = {
         
          results: [
            {
              id: "a9493bb2-7d0c-4ea9-9038-daa3794f080b",
              name: "Standard US",
            },
            {
              id: "38a9635b-d62c-45b2-885e-b8d1c63aebea",
              name: "Express US",
            },
            {
              id: "6bfbe97d-b70f-4766-9549-5a4ed1ee78ab",
              name: "Pickup From Store",
            },
            {
              id: "2502988c-b3ed-4c1a-9a22-8e4731fd26c7",
              name: "Ship From Store",
            },
          ],
        };
        setShippingMethods(shippingData.results);
        setSelectedShippingMethod(shippingData.results[0].id); // Select first shipping method by default
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditAddress = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveAddress = (updatedAddress) => {
    setShippingAddress(updatedAddress);
    localStorage.setItem("shippingAddress", JSON.stringify(updatedAddress));
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  const handlePlaceOrder = async () => {
    try {
      if (!selectedShippingMethod) {
        setError("Please select a shipping method.");
        return;
      }
  
      const cartVersion = localStorage.getItem("cartVersion");
      if (!cartVersion) {
        throw new Error("Missing cart version");
      }
  
      const res = await setShippingMethod({
        shippingID: "a9493bb2-7d0c-4ea9-9038-daa3794f080b",//id
        CartID: CartData?.id,
        version: cartVersion,
      });
  
      if (!res || !res.version) {
        throw new Error("Failed to set shipping method");
      }
  
      const order = await createOrders({
        id: CartData.id,
        version: res.version,
      });
  console.log(order)
      if (!order) {
        throw new Error("Failed to create order");
      }
  
      console.log("Order Creation Response:", order);
  
      localStorage.setItem("orderId", order?.id);
      localStorage.setItem("orderVersion", order?.version);

      // Create payment
      // const paymentData = {
       
      //     centAmount: CartData.totalPrice.centAmount
       
      // };
  
      // const paymentResponse = await createPayment(paymentData);
      // if (!paymentResponse || !paymentResponse.id) {
      //   throw new Error("Failed to create payment");
      // }
  
      // console.log("Payment Creation Response:", paymentResponse);
  
      // // Add payment to order
      // const paymentOrderData = {
      //   orderID: order.id,
      //   paymentID: paymentResponse.id,
      //   version: order.version,
      // };
  
      // const addPaymentResponse = await addPaymentToOrder(paymentOrderData);
      // if (!addPaymentResponse) {
      //   throw new Error("Failed to add payment to order");
      // }
  
      // console.log("Add Payment To Order Response:", addPaymentResponse);
  
      navigate("/checkout?step=3");
  
    } catch (error) {
      setError("Failed to place the order. Please try again.");
      console.error("Error placing order:", error);
    }
  };
  
  
  
  return (
    <Box
      sx={{
        width: "100%",
        p: 4,
        my: 4,
        border: "1px solid #E5E7EB",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <div className="flex flex-col md:flex-row justify-between gap-6 align-center">
        <div className={`w-full md:w-2/3`}>
          <Typography
            variant="h4"
            component="h1"
            className={`text-lg font-bold mb-8`}
          >
           Choose Shipping Method:
          </Typography>
          <hr />

          {/* Shipping Method Selection */}
          {/* <FormControl component="fieldset" className="mt-6 py-6"> */}
            {/* <FormLabel component="legend">Choose Shipping Method:</FormLabel> */}
            {/* <RadioGroup
              value={selectedShippingMethod}
              onChange={(e) => setSelectedShippingMethod(e.target.value)}
            >
              {shippingMethods.map((method) => (
                <FormControlLabel
                  key={method.id}
                  value={method.id}
                  control={<Radio />}
                  label={method.name}
                />
              ))}
            </RadioGroup>
          </FormControl> */}
<ShippingDetails/>
          {/* Address Section */}
          <div className={`text-zinc-600 mb-4 mt-6`}>
            <AddressCard address={shippingAddress} />
            <Button
              variant="contained"
              onClick={handleEditAddress}
              sx={{ backgroundColor: "#EF4444", color: "white", mt: 2 }}
            >
              Edit
            </Button>
            <EditAddressModal
              open={isEditModalOpen}
              onClose={handleCloseEditModal}
              addressData={shippingAddress}
              onSave={handleSaveAddress}
            />
          </div>

          {/* Cart Items */}
          <div className="lg:col-span-3 lg:px-5 bg-white">
            <div className="space-y-3">
              {CartData?.lineItems?.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3">
          <OrderSummary />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Proceed to Payment Button */}
      <Box
        sx={{
          borderTop: "1px solid #E5E7EB",
          py: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#EF4444",
            color: "white",
            paddingX: 6,
            paddingY: 2,
          }}
          onClick={handlePlaceOrder}
        >
          Proceed to Pay
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentMethod;
