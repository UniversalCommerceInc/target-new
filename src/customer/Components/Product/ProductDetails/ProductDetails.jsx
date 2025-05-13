import React, { Suspense, lazy, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveProductsById } from "../../../../action";
import toast, { Toaster } from "react-hot-toast";
import { AddItemToCartNew, getCartItems } from "../../../../action/cart";
import { Skeleton } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { FaCheck, FaSearchPlus, FaShoppingCart } from "react-icons/fa";
import Navigation from "../../Navbar/Navigation";
import HeaderTop from "../../Navbar/HeaderTop";
import NewArrivals from "../../Home/NewArrival";

const NavigationSection = lazy(() => import("../../Navbar/Navigation"));
const FooterSection = lazy(() => import("../../footer/Footer"));
const PaymentOptionsSection = lazy(() => import("../../footer/PaymentOption"));

// Custom notification component
const CustomNotification = ({ imageurl, productName }) => {
  return (
    <div className="flex items-center p-2 bg-white shadow-lg rounded-lg border-l-4 border-green-500">
      <div className="bg-green-100 p-2 rounded-full mr-3">
        <FaCheck className="text-green-500" />
      </div>
      <div className="flex-1">
        <p className="font-medium">Added to Cart!</p>
        <img src={imageurl} alt={productName} className="h-10"/>
        <p className="text-sm text-gray-600 truncate">
          {productName} 
        </p>
      </div>
      <div className="ml-2 bg-blue-100 p-2 rounded-full">
        <FaShoppingCart className="text-blue-500" />
      </div>
    </div>
  );
};

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [qty, setQty] = useState(1);
  const [btn, setBtn] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cartItems.cartItems);
  const { productId } = useParams();
  const [variant, setVariant] = useState(null);
  const [varId, setVarId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  
  useEffect(() => {
    receiveProductsById(productId)
      .then((res) => {
        if (res) {
          console.log(res);
          setProductDetails(res.masterData.current);
          setVariant(res.masterData.current?.masterVariant);
          setVarId(res.masterData.current?.masterVariant.id);
          setSelectedImage(res.masterData.current?.masterVariant?.images[0]?.url);
        }
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [productId]);

  useEffect(() => {
    dispatch(getCartItems());
  }, [btn, dispatch]);

  const handleAddToCart = () => {
    if (!variant) return;
    const data = {
      cartId: cart?.id,
      productId: productId,
      variantId: varId,
      quantity: qty,
    };
    AddItemToCartNew(data, cart.version)
      .then(() => { 
         // Show custom notification
         toast.custom(
          (t) => (
            <CustomNotification 
              imageurl={selectedImage}
              productName={productDetails?.name.en} // Fixed: accessing using .en instead of ["en-US"]
            />
          ),
          {
            duration: 3000,
            position: "top-right",
          }
        );
        setBtn(!btn);
      })
      .catch((err) => console.error("Error adding item to cart:", err));
  };

  const decrementQty = () => setQty((prev) => Math.max(prev - 1, 1));
  const incrementQty = () => setQty((prev) => prev + 1);

  if (!productDetails) {
    return <Skeleton variant="rectangular" width="100%" height={600} />;
  }

  // Format price properly
  const price = variant?.prices[0]?.value;
  const formattedPrice = price ? 
    `$ ${(price.centAmount / Math.pow(10, price.fractionDigits)).toFixed(price.fractionDigits)}` : 
    "Price not available";

  return (
    <div className="bg-white dark:bg-zinc-900 min-h-screen">
      {/* Navigation */}
      <HeaderTop />
      <Navigation />
      <div className="max-w-6xl mx-auto px-4">
        <Toaster />
        <nav className="flex items-center text-sm text-gray-500 space-x-2 my-4">
          <Link to="/" className="hover:text-blue-500 transition">
            Home
          </Link>
          <span>/</span>
          <Link to="/search" className="hover:text-blue-500 transition">
            Products
          </Link>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
          {/* Left Side - Images */}
          <div>
            <div className="w-full rounded-lg overflow-hidden border border-gray-300">
              <img
                src={selectedImage}
                alt="Product"
                className="w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="flex mt-4 space-x-2">
              {variant?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 border rounded-lg cursor-pointer object-cover ${
                    selectedImage === image.url ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(image.url)}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {productDetails?.name.en}
            </h1>
            <p className="text-gray-500 mt-2 dark:text-gray-400">
              {productDetails?.description.en}
            </p>

            {/* Price */}
            <p className="text-3xl font-bold text-blue-600 mt-4">
              {formattedPrice}
            </p>

            {/* Availability */}
            <p className={`mt-2 ${variant?.availability.isOnStock ? "text-green-500" : "text-red-500"}`}>
              {variant?.availability.isOnStock ? "In Stock" : "Out of Stock"}
            </p>

            {/* Quantity */}
            <div className="flex items-center mt-4 space-x-4">
              <button onClick={decrementQty} className="p-2 rounded bg-gray-200 dark:bg-gray-700">
                <RemoveCircleOutline />
              </button>
              <span className="text-lg">{qty}</span>
              <button onClick={incrementQty} className="p-2 rounded bg-gray-200 dark:bg-gray-700">
                <AddCircleOutline />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-transform duration-300 hover:scale-105 mt-4"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <NewArrivals title="You May Also Like"/>
    </div>
  );
};

export default ProductDetails;