import React from "react";
import { useSelector } from "react-redux";
import ShippingComponent from "../Cart/ShippingComponent";

// Fallback static data
const staticCart = {
  id: "2",
  lines: [
    {
      id: "3",
      quantity: 1,
      linePrice: 8490,
      productVariant: {
        id: "91",
        name: "AVIATOR GRADIENT Standard Gold Gradient Blue",
        price: 8490,
        currencyCode: "INR",
        images: [
          {
            url: "http://49.206.253.146:3000/assets/preview/6e/ag1__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/27/ag2__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/d0/ag-s_l-g-gb__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/07/ag-s_l-g-gb1__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/c1/ag-s_l-g-gb2__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/81/ag-s_l-g-gb3__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/e4/ag-s_l-g-gb4__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/83/ag-s_l-g-gb5__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/ac/ag-s_l-g-gb6__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/fa/ag-s_l-g-gb7__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/9c/ag-s_l-g-gb8__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/87/ag-s_l-g-gb9__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/fe/ag-s_l-g-gb10__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/e1/ag-s_l-g-gb11__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/09/ag-s_l-g-gb12__preview.png",
          },
        ],
      },
    },
    {
      id: "4",
      quantity: 1,
      linePrice: 8490,
      productVariant: {
        id: "92",
        name: "AVIATOR GRADIENT Large Gold Gradient Blue",
        price: 8490,
        currencyCode: "INR",
        images: [
          {
            url: "http://49.206.253.146:3000/assets/preview/6e/ag1__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/27/ag2__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/09/ag-s_l-g-gb12__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/e1/ag-s_l-g-gb11__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/87/ag-s_l-g-gb9__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/fe/ag-s_l-g-gb10__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/fa/ag-s_l-g-gb7__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/9c/ag-s_l-g-gb8__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/ac/ag-s_l-g-gb6__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/83/ag-s_l-g-gb5__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/81/ag-s_l-g-gb3__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/e4/ag-s_l-g-gb4__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/c1/ag-s_l-g-gb2__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/07/ag-s_l-g-gb1__preview.png",
          },
          {
            url: "http://49.206.253.146:3000/assets/preview/d0/ag-s_l-g-gb__preview.png",
          },
        ],
      },
    },
  ],
};

const OrderSummary = () => {
  // Extract cart data from Redux store
  const cartState = useSelector((store) => store.cartItems.cartItems);
  const cart = cartState || staticCart;

  // Determine products to display
  const products = cart.lineItems.map((line, i) => ({
    name: line.variant.sku,
    quantity: line.quantity,
    price: line.variant.prices[0].value.centAmount / 100,
    image: line?.variant?.images[0].url,
    colour: line?.variant?.attributes?.find((attr) => attr.name === "color")
      ?.value,
  }));

  // Calculate subtotal, shipping, and total
  // const subtotal = `₹${cart?.lines
  //   .reduce((acc, line) => acc + line.linePrice, 0)
  //   .toLocaleString()}.00`;
  // const shipping = "₹0.00";
  // const total = subtotal; // Assuming no additional charges other than subtotal

  return (
    <div className="w-full bg-zinc-100 p-4 rounded-lg">
      <div className="px-5 lg:col-span-2 mt-5 lg:mt-0">
        <ShippingComponent
          totalPrice={cartState?.totalPrice?.centAmount / 100}
          totalItems={cartState.totalLineItemQuantity}
          shippingCharge={cartState?.shippingInfo?.price?.centAmount / 100}
        />
      </div>
      <hr />
      {/* <p className="mb-4">{products?.length} Items in Cart</p> */}
      <hr />
      {/* {products?.map((product, index) => (
        <div className="flex items-center p-4 mb-4 border-2" key={index}>
          <img
            src={product?.image}
            alt="Product Image"
            className="w-30 h-20 mr-4 object-contain "
          />
          <div>
            <p className="font-semibold">{product?.name}</p>
            <p className="text-sm text-zinc-600">Qty: {product?.quantity}</p>
            <p className="text-sm text-zinc-600">{product?.price}</p>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default OrderSummary;
