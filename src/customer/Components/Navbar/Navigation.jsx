import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import SearchIcon from "@mui/icons-material/Search";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../Redux/Customers/Cart/Action";
import { logoutCustomer } from "../../../action/Customer";
import logo from "../../../logos/111.png";
import RightModal from "./RightModel";
import ShoppingCart, { BasketModal, EmptyCart } from "./ShoppingCartModel";
import { getCartItems } from "../../../action/cart";
import Navbar from "./Navbar";
import "./Navigation.css"; // Import your custom CSS

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const searchContainerClasses =
  "flex items-center bg-zinc-200 dark:bg-zinc-700 rounded-full px-4 py-2";
const iconClasses = "w-5 h-5";
const inputClasses = "bg-transparent focus:outline-none flex-grow";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // New state for scroll handling
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation();
  const { auth, cart, newUser, cartItems } = useSelector((store) => store);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");
  const location = useLocation();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolledHover, setScrolledHover] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getCart(jwt));
    }
  }, [jwt]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
  };

  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleMyOrderClick = () => {
    handleCloseUserMenu();
    navigate("/account/order");
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logoutCustomer());
  };

  const navigateToShops = () => {
    window.location.href = "/shops";
  };

  useEffect(() => {
    if (newUser?.newUser?.user) {
      handleClose();
    }
    if (
      auth.user?.role !== "ADMIN" &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate(-1);
    }
  }, [auth.user]);

  return (
    <div>
      {" "}
      {/* Apply scrolled class based on state */}
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6 text-center ">
                  {/* Add navigation items here if needed */}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a
                      href="/"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="/" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <header
        className={` w-full bg-white ${
          scrolled
            ? "fixed top-0 backdrop-blur-md bg-opacity-70 shadow-md hover:bg-white"
            : "bg-opacity-100"
        } transition-all duration-300 z-50`}
        onMouseEnter={() => setScrolledHover(true)}
        onMouseLeave={() => setScrolledHover(false)}
      >
        <nav aria-label="Top" className="mx-auto ">
          <div className=" border-gray-200">
            <div className="flex h-16 items-center px-4 lg:px-8">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="flex-shrink-0">
                <Link to="/">
                  <img
                    src={
                      isSmallScreen
                        ? "/target-logo.png"
                        : "https://www.target.com.au/medias/auth0/target.svg"
                    }
                    alt="Shopwithzosh"
                    className="h-auto w-[60px] md:w-[120px]"
                  />
                </Link>
              </div>

              {/* Search bar */}
{location.pathname === "/search" ? null : (
              <div onClick={()=>{navigate("/search")}}className="flex-1 flex items-center justify-center opacity-2 lg:ml-6 lg:mr-6">
              <div
                  className={searchContainerClasses + " w-full lg:max-w-xl"}
                  style={{ backgroundColor: "#F0F0F0" }}
                >
                  <SearchIcon className={`${iconClasses} mr-2 text-gray-500`} />
                  <input
                    type="text"
                    placeholder="Search products & brands"
                    className={inputClasses}
                    onInput={navigateToShops}
                  />
                  <CameraAltIcon
                    className={`${iconClasses} ml-2 text-gray-500`}
                  />
                </div>
              
              </div>)}

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {newUser?.newUser?.user ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        sx={{ color: "black", cursor: "pointer" }}
                      >
                        {newUser?.newUser?.user?.name[0].toUpperCase()}
                      </Avatar>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{ "aria-labelledby": "basic-button" }}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={handleMyOrderClick}>
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={toggleModal}
                      className="text-sm font-medium text-gray-900"
                      style={{ color: "black" }}
                    >
                      <img
                        className="w-14 h-14 object-cover rounded-full hover:invert"
                        loading="lazy"
                        alt="Button"
                        src="/button.svg"
                      />
                    </Button>
                  )}
                </div>
                <RightModal open={isModalOpen} toggleModal={toggleModal} />
                {/* Icons */}
                <div className="flex lg:ml-2">
                  <p className="p-2 text-gray-500 hover:text-blue-500">
                    <span className="sr-only">wishList</span>
                    <img
                      className="w-14 h-14 object-cover"
                      loading="lazy"
                      alt="Link"
                      src="/link.svg"
                    />
                  </p>
                </div>

                {/* Cart */}
                <div className="ml-2 flow-root lg:ml-2">
                  <CartButton newUser={newUser} cartItems={cartItems} />
                </div>
              </div>
            </div>
          </div>
        </nav>
        {scrolled ? null : <Navbar />}
        {scrolled && scrolledHover ? <Navbar scrolled={scrolled} /> : null}
      </header>
    </div>
  );
}

const CartButton = ({ newUser, cartItems }) => {
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleOpenCart = () => setOpenCart(!openCart);
  const handleCloseCart = () => setOpenCart(false);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch, jwt]);

  return (
    <div className="flow-root lg:ml-2">
      <Button
        onClick={handleOpenCart}
        // onMouseEnter={handleOpenCart}
        // onMouseLeave={handleOpenCart}
        className=" -m-2 flex items-center p-2"
      >
        <div className="relative">
          <img
            className="w-14 h-14 object-cover hover:invert"
            alt="Link 1"
            src="/link-1.svg"
          />
          <span className="absolute top-2 right-3 text-black rounded-lg ml-2 text-sm font-medium  ">
            {cartItems?.cartItems?.cart
              ? cartItems.cartItems.cart.lines.length
              : " "}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </div>
      </Button>
      <Slide direction="left" in={openCart} mountOnEnter unmountOnExit>
        <div className="absolute top-16 right-20 z-10">
          {cartItems?.cartItems?.cart?.totalQuantity === 0 ? (
            <EmptyCart handleCloseCart={handleCloseCart} />
          ) : (
            <ShoppingCart handleCloseCart={handleCloseCart} />
          )}
        </div>
      </Slide>
    </div>
  );
};
