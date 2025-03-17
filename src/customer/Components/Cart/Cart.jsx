import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  RemoveCartItemNew,
  updateCartQtyNEW,
} from "../../../action/cart";
import ShippingComponent from "./ShippingComponent";
import CartFooter from "./CartFooter";
import HomeCarousel from "../Carousel/HomeCarousel";
import NewNavbar from "../Navbar/NewNavbar";
import ConfirmDeleteModal from "./ConfirmDeleteModal"; // Import the modal
import NewArrivals from "../Home/NewArrival";
import BasketComponent from "./CartEmpty";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store);
  const [CartData, setCartData] = useState(cartItems.cartItems);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleOpenModal = (e, itemId,qty) => {
    setItemToRemove({
      quantity: qty,
      lineItemId: itemId,
      version: cartItems.cartItems.version,
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setItemToRemove(null);
  };

  const handleConfirmDelete = async () => {
    handleCloseModal();
    if (itemToRemove) {
      setLoading(true);
      let data = itemToRemove;
      try {
        await dispatch(RemoveCartItemNew(data)); // ✅ Dispatch Redux action
        console.log(data, "delete");
        await dispatch(getCartItems()); // ✅ Refresh cart data
      } catch (err) {
        console.error("Failed to remove item from cart:", err);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleUpdateCart = async (e, lineId, qty,productId,variantId) => {
    e.preventDefault();
    setLoading(true);
    let data = {
      cartID: cartItems.cartItems.id,
      lineItemId: lineId,
      quantity: qty,
      version: cartItems.cartItems.version,
    };
    
    console.log(data, "update");
    try {
      await dispatch(updateCartQtyNEW(data)); // ✅ Dispatch Redux action
      await dispatch(getCartItems()); // ✅ Refresh cart data
    } catch (err) {
      console.error("Failed to update cart:", err);
    } finally {
      setLoading(false);
    }
  };
  

  

  useEffect(() => {
    setCartData(cartItems.cartItems);
  }, [cartItems.cartItems]);

  return (
    <div className="">
      <NewNavbar />
      {CartData?.lineItems?.length > 0 && (
        <div className="lg:grid grid-cols-5 lg:px-16 relative">
          <div className="lg:col-span-3 lg:px-5 bg-white">
            <div className="space-y-3">
              {CartData?.lineItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleRemoveItemFromCart={handleOpenModal}
                  handleUpdateCart={handleUpdateCart}
                  loading={loading}
                  setLoading={setLoading}
                />
              ))}
            </div>
          </div>
          <div className="px-5 lg:col-span-2 sticky top-0 mt-5 lg:mt-0">
            <ShippingComponent
              totalPrice={CartData?.totalPrice?.centAmount / 100}
              totalItems={CartData.totalLineItemQuantity}
            />
          </div>
        </div>
      )}
      {CartData?.lineItems?.length ==0 && <BasketComponent/>}
      {/* <HomeCarousel /> */}
<NewArrivals title="Frequently Bought Together"/>
      <CartFooter />
      <ConfirmDeleteModal
        open={openModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Cart;
