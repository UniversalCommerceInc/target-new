import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  RemoveCartItemNew,
  updateCartQtyNEW,
  getCartItems,
} from "../../../action/cart";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProgressBar } from "../Cart/ShippingComponent";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ShoppingCart = ({ handleCloseCart }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartItems.cartItems);
  const [cartData, setCartData] = useState(cart);
  const [loading, setLoading] = useState(false);

  const totalPrice = cartData?.totalPrice?.centAmount / 100;
  const totalItems = cartData?.totalLineItemQuantity;

  // 🚀 Shipping Message Logic
  let shippingMessage;
  if (totalPrice < 60) {
    shippingMessage = "You're $60 away to get FREE standard shipping";
  } else if (totalPrice < 120) {
    shippingMessage = "You're $30 away to get FREE standard shipping";
  } else {
    shippingMessage = "You have FREE standard shipping";
  }

  // ✅ Update Cart Quantity
  const handleUpdateQuantity = async (e, lineId, newQty,productId,variantId) => {
    e.preventDefault();

    if (newQty < 1) return;

    setLoading(true);

    const data = {
      cartID: cart?.id,
      lineItemId: lineId,
      quantity: newQty, // ✅ Correctly sending updated quantity
      version: cart?.version, 
    };
    

    try {
      await dispatch(updateCartQtyNEW(data));
      toast.success("Cart updated successfully");
      await dispatch(getCartItems()); // ✅ Refresh cart data
    } catch (err) {
      toast.error("Failed to update cart");
      console.error("Failed to update cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove Cart Item
  const handleRemoveItem = async (e, lineId,newQuantity) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      Cartid: cart?.id,
      lineItemId: lineId,
      quantity:newQuantity,
      version: cart?.version, // ✅ Send version correctly
    };

    try {
      await dispatch(RemoveCartItemNew(data));
      toast.success("Item removed from cart");
      await dispatch(getCartItems());
    } catch (err) {
      toast.error("Failed to remove item");
      console.error("Failed to remove item:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Cart Data on State Change
  useEffect(() => {
    setCartData(cart);
  }, [cart]);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 w-96 h-auto border border-zinc-300 dark:border-zinc-700 shadow-lg rounded">
      {/* ✅ Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <div
          className={`text-center mb-4 text-sm ${
            totalPrice < 120 ? "text-red-700" : "text-green-700"
          } font-semibold`}
        >
          {shippingMessage}
        </div>
        <button
          onClick={handleCloseCart}
          className="text-zinc-500 dark:text-zinc-400"
        >
          ✕
        </button>
      </div>

      {/* ✅ Progress Bar */}
      <ProgressBar totalPrice={totalPrice} totalItems={totalItems} />

      {/* ✅ Cart Items */}
      <div className="overflow-y-auto h-52">
  {cartData?.lineItems?.length > 0 ? (
    cartData?.lineItems.map((item) => (
      <CartItem
        key={item.id}
        id={item.id}
        imageSrc={item.variant.images[0].url}
        productName={item.variant.sku}
        productId={item.productId}
        variantId={item.variant.id}
        price={
          (item.variant?.prices[0].value.centAmount / 100) * item.quantity
        }
        initialQuantity={item.quantity} // ✅ Pass initialQuantity
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    ))
  ) : (
    <div className="text-center text-zinc-500">
      Your cart is empty
    </div>
  )}
</div>


      {/* ✅ Subtotal */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm dark:text-zinc-300">
          Subtotal ({totalItems} items)
        </p>
        <p className="text-lg font-semibold dark:text-white">
          ${totalPrice?.toFixed(2)}
        </p>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
        Includes all items and discounts
      </p>

      {/* ✅ Checkout Button */}
      <Link to="/checkout?step=1">
        <button className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center mb-4">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Checkout Securely
        </button>
      </Link>

      {/* ✅ Continue Shopping */}
      <Link to="/cart">
        <button className="w-full text-black py-2 rounded-lg border border-zinc-300">
          View Cart
        </button>
      </Link>
    </div>
  );
};

export default ShoppingCart;




const buttonStyles = "absolute top-2 right-2 text-zinc-500 hover:text-zinc-700";
const containerStyles =
  "flex justify-center items-center w-full h-[40vh] bg-zinc-100";
const innerContainerStyles =
  "relative w-[100%] h-[50vh] p-4 bg-white border border-zinc-300 rounded shadow-md";
const textStyles = "text-center m-14 text-zinc-600";
const buttonClasses = "px-2  ";

const modalClasses =
  "w-full bg-zinc-600 bg-opacity-50 flex items-center justify-center z-50";
const closeButtonClasses =
  "absolute top-2 right-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white";
const productContainerClasses = "flex overflow-x-auto space-x-4 pb-4";
const productCardClasses = "flex-shrink-0 w-24";
const borderClasses = "border-t border-zinc-200 dark:border-zinc-700 my-4";
const subtotalClasses = "flex justify-between items-center mb-4";
const checkoutButtonClasses =
  "w-full bg-black text-white py-2 rounded-lg flex items-center justify-center mb-4";
const continueShoppingButtonClasses =
  "w-full text-black dark:text-white py-2 rounded-lg border border-zinc-300 dark:border-zinc-600";
const commonContainerClasses =
  "bg-white z-100 dark:bg-zinc-800 p-4 w-96 h-auto border border-zinc-300 dark:border-zinc-700 shadow-lg rounded";



export const EmptyCart = ({ handleCloseCart }) => {
  return (
    <div className={commonContainerClasses}>
      <div className={innerContainerStyles}>
        <button onClick={handleCloseCart} className={buttonStyles}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Your basket is empty
        </h2>
        <div className={borderClasses}></div>
        <div className={subtotalClasses}>
          <p className="text-sm dark:text-zinc-300">Subtotal (0 items)</p>
          <p className="text-lg font-semibold dark:text-white">$0.00</p>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          Includes all items and discounts
        </p>
        <button className={checkoutButtonClasses}>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          Checkout Securely
        </button>
        <button className={continueShoppingButtonClasses}>
          View Cart
        </button>
      </div>
    </div>
  );
};

const CartItem = ({
  id,
  imageSrc,
  productName,
  productId,
  variantId,
  price,
  initialQuantity,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Increment
  const handleIncrease = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const newQuantity = quantity + 1;
    setQuantity(newQuantity); // ✅ Update local state immediately

    try {
      await onUpdateQuantity(e, id, newQuantity,productId,variantId); // ✅ Update cart quantity
    } catch (err) {
      console.error(err);
      setQuantity(quantity); // ✅ Rollback on error
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Decrement
  const handleDecrease = async (e) => {
    e.preventDefault();
    if (loading || quantity <= 1) return;

    setLoading(true);
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);

    try {
      await onUpdateQuantity(e, id, newQuantity,productId,variantId);
    } catch (err) {
      console.error(err);
      setQuantity(quantity);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Remove
  const handleRemove = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onRemoveItem(e, id,quantity);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between border-2 p-4 items-center">
      {/* ✅ Product Image */}
      <img
        src={imageSrc}
        alt={productName}
        className="w-[130px] h-auto object-cover rounded"
      />
      <div className="flex flex-col flex-grow ml-4">
        {/* ✅ Product Name */}
        <span className="text-zinc-700 dark:text-zinc-300">
          {productName}
        </span>
        {/* ✅ Product Price */}
        <span className="text-zinc-900 dark:text-zinc-100 font-bold">
          ${price.toFixed(2)}
        </span>
        {/* ✅ Quantity Controls */}
        <div className="flex items-center mt-2">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1 || loading}
            className="px-2 text-zinc-500 hover:text-zinc-700"
          >
            <RemoveCircleOutline />
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={handleIncrease}
            disabled={loading}
            className="px-2 text-zinc-500 hover:text-zinc-700"
          >
            <AddCircleOutline />
          </button>
          {/* ✅ Remove Item */}
          <button
            onClick={handleRemove}
            disabled={loading}
            className="ml-2 text-zinc-500 hover:text-zinc-700"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

// const ShoppingCart = ({ handleCloseCart }) => {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cartItems.cartItems);
//   const [cartData, setCartData] = useState(cart);
//   const cartItems = cart?.lines || [];
//   const jwt = localStorage.getItem("jwt");
//   const [loading, setLoading] = useState(false);

//   // Uncomment when integrating with Redux

//   // const handleUpdateQuantity = (lineId, quantity) => {
//   //   updateCartQtyNEW({ lineId, quantity }, toast).then(() => {
//   //     dispatch(getCartItems());
//   //   });
//   // };

//   // const handleRemoveItem = (lineId) => {
//   //   dispatch(RemoveCartItemNew(lineId));
//   // };

//   // Dummy data for now
//   // const dummyCartItems = [SingleProduct, { ...SingleProduct, id: 2 }];

//   // const subtotal = dummyCartItems
//   //   .reduce((total, item) => total + item.price * item.quantity, 0)
//   //   .toFixed(2);
//   let totalPrice = cartData?.totalPrice?.centAmount / 100;
//   let shippingMessage;
//   if (totalPrice < 60) {
//     shippingMessage = "You're $60 away to get FREE standard shipping";
//   } else if (totalPrice < 120) {
//     shippingMessage = "You're $30 away to get FREE standard shipping";
//   } else {
//     shippingMessage = "You have FREE standard shipping";
//   }
//   const textCenterClass = "text-center";
//   const textRedClass = "text-red-700";
//   const textGreenClass = "text-green-700";
//   const fontSemiBoldClass = "font-semibold";

//   const textSMClass = "text-sm";

//   const mb4Class = "mb-4";

//   const handleUpdateQuantity = async (e, lineId, qty) => {
//     e.preventDefault();
//     setLoading(true);
//     let data = {
//       cartId: cart?.id,
//       lineItemId: lineId,
//       quantity: qty,
//     };

//     try {
//       await updateCartQtyNEW(data);
//       dispatch(getCartItems());
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveItem = async (e, lineId) => {
//     setLoading(true);
//     e.preventDefault();
//     let data = {
//       cartId: cart?.id,
//       lineItemId: lineId,
//     };
//     try {
//       await RemoveCartItemNew(data);
//       dispatch(getCartItems());
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   dispatch(getCartItems());
//   // }, [
//   //   dispatch,
//   //   cartData?.totalLineItemQuantity,
//   //   ,
//   // ]);

//   useEffect(() => {
//     dispatch(getCartItems());
//   }, [cartData?.lineItems?.length]);

//   return (
//     <div className={commonContainerClasses}>
//       <div className="flex justify-between items-center border-b pb-2 mb-2">
//         {/* <span className="text-zinc-700 dark:text-zinc-300">
     
//           You're $30 away to get FREE standard shipping
//         </span> */}
//         <div
//           className={`${textCenterClass} ${mb4Class} ${textSMClass} ${
//             totalPrice < 120 ? textRedClass : textGreenClass
//           } ${fontSemiBoldClass}`}
//         >
//           {shippingMessage}
//         </div>
//         <button
//           onClick={handleCloseCart}
//           className="text-zinc-500 dark:text-zinc-400"
//         >
//           ✕
//         </button>
//       </div>
//       <ProgressBar
//         totalPrice={cartData?.totalPrice?.centAmount / 100}
//         totalItems={cartData.totalLineItemQuantity}
//       />
//       <div className="overflow-y-auto h-52">
//         {cartData?.lineItems?.map((item) => (
//           <CartItem
//             key={item.id}
//             id={item.id}
//             imageSrc={item.variant.images[0].url}
//             productName={item.variant.sku}
//             price={
//               (item.variant?.prices[0].value.centAmount / 100) * item.quantity
//             }
//             quantity={item.quantity}
//             onUpdateQuantity={handleUpdateQuantity}
//             onRemoveItem={handleRemoveItem}
//           />
//         ))}
//       </div>
//       <div className={subtotalClasses}>
//         <p className="text-sm dark:text-zinc-300">
//           {/* Subtotal ({dummyCartItems.length} items) */}
//         </p>
//         <p className="text-lg font-semibold dark:text-white">
//           ${cartData?.totalPrice?.centAmount / 100}
//         </p>
//       </div>
//       <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
//         Includes all items and discounts
//       </p>
//       <Link to="/checkout">
//         {" "}
//         <button className={checkoutButtonClasses}>
//           <svg
//             className="w-5 h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5 13l4 4L19 7"
//             ></path>
//           </svg>
//           Checkout Securely
//         </button>
//       </Link>
//       <Link to="/cart">
//         <button className={continueShoppingButtonClasses}>
//           Continue shopping
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default ShoppingCart;
