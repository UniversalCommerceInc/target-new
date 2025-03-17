import React, { useEffect, useState } from "react";
import { IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CartSpinner from "../Loaders/CartSpinner";
import { useLocation } from "react-router-dom";

const sharedClasses = {
  flex: "flex",
  flexCol: "flex-col",
  flexRow: "flex-row",
  itemsCenter: "items-center",
  border: "border",
  p4: "p-4",
  spaceY4: "space-y-4",
  spaceY2: "space-y-2",
  spaceX4: "space-x-4",
  spaceX2: "space-x-2",
  justifyBetween: "justify-between",
  mt2: "mt-2",
  mt4: "mt-4",
  w24: "w-24",
  hAuto: "h-auto",
  textLg: "text-lg",
  fontSemibold: "font-semibold",
  textXl: "text-xl",
  fontBold: "font-bold",
  textSm: "text-sm",
  borderRounded: "border rounded",
  p1: "p-1",
  borderR: "border-r",
  borderL: "border-l",
  w8: "w-8",
  textCenter: "text-center",
  px2: "px-2",
  flex1: "flex-1",
  hoverTextBlack: "hover:text-black",
  textZinc500: "text-zinc-500",
};

const CartItem = ({ item, handleRemoveItemFromCart, handleUpdateCart }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
const productId=item.productId;
const variantId=item.variant.id;
  const location = useLocation();

  const handleCancelEdit = () => {
    setQuantity(item.quantity);
    setEditMode(false);
  };

  const handleConfirmUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    handleUpdateCart(e, item.id, quantity,productId,variantId).then(() => {
      setLoading(false);
      setEditMode(false);
    });
  };

  useEffect(() => {
    if (!loading) {
      setQuantity(item.quantity);
    }
  }, [item.quantity, loading]);

  return (
    <div
      className={`flex flex-col md:flex-row items-center border p-4 space-y-4 md:space-y-0 md:space-x-4 relative rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out`}
    >
      <img
        src={item.variant.images[0].url}
        alt="Product Image"
        className={`w-48 h-auto rounded-lg border p-1`}
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {item.variant.sku}
            </h2>
            <p className="text-xl font-bold text-red-600 mt-2">
              $
              {(item.variant?.prices[0].value.centAmount / 100) * item.quantity}
            </p>
            {item?.variant?.attributes?.length > 0 && (
              <div className="text-sm mt-2">
                <span className="font-semibold text-gray-600">
                  {item?.variant?.attributes?.[0]?.name}:
                </span>{" "}
                {item?.variant?.attributes?.[0]?.value}
              </div>
            )}
          </div>
        </div>
        {location.pathname === "/cart" && (
          <>
            <div className="flex items-center mt-4 space-x-4">
              <IconButton
                onClick={(e) => {
                  setQuantity(quantity - 1);
                  setEditMode(true);
                }}
                className="text-gray-500 hover:text-black p-2 rounded-full bg-gray-200"
                disabled={quantity <= 1}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <span
                className={`border-l border-r w-8 text-center ${
                  loading ? "animate-pulse" : ""
                }`}
              >
                {loading ? <CartSpinner /> : quantity}
              </span>
              <IconButton
                onClick={(e) => {
                  setQuantity(quantity + 1);
                  setEditMode(true);
                }}
                className="text-gray-500 hover:text-black p-2 rounded-full bg-gray-200"
              >
                <AddCircleOutlineIcon />
              </IconButton>

              <IconButton
  onClick={(e) => handleRemoveItemFromCart(e, item.id, quantity)}
  className="hover:text-black"
              >
                <DeleteIcon />
              </IconButton>
            </div>
            {editMode && (
              <div className="flex space-x-4 mt-4">
                <Button
                  onClick={handleConfirmUpdate}
                  variant="contained"
                  style={{ color: "white", backgroundColor: "#FF6B6B" }}
                >
                  Update Item
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CartItem;
