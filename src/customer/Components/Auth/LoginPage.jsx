import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { login } from "../../../Redux/Auth/Action";

import { Toaster, toast } from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
import NewNavbar from "../Navbar/NewNavbar";
import { MdOutlineEmail } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { RxCube } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { getCustomerNew } from "../../../action/Customer";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const accesstoken = localStorage.getItem("accesstoken");
  useEffect(() => {
    if (accesstoken) {
      navigate("/");
    }
  }, [accesstoken]);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Dispatch the login action with necessary parameters
      dispatch(getCustomerNew({ username:email, password }, navigate, toast));
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Toaster />
      <NewNavbar />
      <div className="flex flex-col md:flex-row items-stretch justify-center m-auto gap-4 p-6">
        <div className="flex-1 md:w-1/2">
          <LoginForm
            email={email}
            password={password}
            handleSubmit={handleSubmit}
            setEmail={setEmail}
            setPassword={setPassword}
            showPassword={showPassword}
            handlePasswordVisibilityToggle={handlePasswordVisibilityToggle}
            errors={errors}
          />
        </div>
        <div className="flex-1 md:w-1/2">
          <SignUpComponent />
        </div>
      </div>
    </>
  );
};

export default Login;

const inputClass = "mt-1 block w-full p-2 border border-zinc-300 rounded-md";
const buttonClass = "text-sm leading-5";
const linkClass = "text-sm text-zinc-600 hover:underline";
const primaryButtonClass =
  "w-full py-2 bg-zinc-300 text-zinc-700 rounded-md font-semibold";
const secondaryButtonClass =
  "w-full py-2 bg-purple-600 text-white rounded-full font-semibold";
const hrClass = "flex-grow border-t border-zinc-300";
const orTextClass = "mx-2 text-sm text-zinc-600";

const LoginForm = ({
  email,
  password,
  handleSubmit,
  setEmail,
  setPassword,
  showPassword,
  handlePasswordVisibilityToggle,
  errors,
}) => {
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Welcome back!</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className={inputClass}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password*
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              className={inputClass}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center {buttonClass}"
              onClick={handlePasswordVisibilityToggle}
            >
              {/* {showPassword ? 'Hide' : 'Show'} */}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div>
          <a href="#" className={linkClass}>
            Reset password?
          </a>
        </div>
        <div>
          <button
            type="submit"
            className={`w-full py-2 ${
              email && password
                ? "bg-red-500"
                : "bg-zinc-500 cursor-not-allowed opacity-50"
            } text-white rounded-full text-lg`}
          >
            Log in with Target
          </button>
        </div>
        <p className="text-sm text-zinc-600 mt-4">
          By logging in with Target or OnePass you agree to Target's{" "}
          <a href="#" className="underline">
            Condition of Use
          </a>{" "}
          and may receive personalised communication and advertising from
          Target. Target will handle your personal information in accordance
          with its{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex items-center my-4">
          <hr className={hrClass} />
          <span className={orTextClass}>OR</span>
          <hr className={hrClass} />
        </div>
        <div>
          <button type="button" className={secondaryButtonClass}>
            Continue with OnePass
          </button>
        </div>
      </form>
    </div>
  );
};

const SignUpComponent = () => {
  return (
    <div className="bg-zinc-200 p-6 rounded-lg h-full">
      <div className="text-center">
        <p className="font-semibold text-lg">Don't have an account?</p>
        <Link to="/sign-up">
          <button className="bg-black text-white py-2 px-4 rounded-full mt-2">
            Create Account
          </button>
        </Link>
      </div>
      <div className="mt-6">
        <p className="font-semibold">Enjoy access to:</p>
        <ul className="space-y-6 mt-4">
          <FeatureItem
            icon={<FaRegHeart className="w-6 h-6 mr-3 mt-1" />}
            title="$10 off online!^"
            description="Get $10 off your next $50+ online shop when you opt into marketing."
          />
          <FeatureItem
            icon={<RxCube className="w-6 h-6 mr-3 mt-1" />}
            title="Detailed Order Tracking"
            description="Get updates on the progress of your order and see all your past purchases."
          />
          <FeatureItem
            icon={<SlBasket className="w-6 h-6 mr-3 mt-1" />}
            title="Faster Checkout"
            description="We'll remember and pre-fill your details every time you shop online."
          />
          <FeatureItem
            Item
            icon={<MdOutlineEmail className="w-6 h-6 mr-3 mt-1" />}
            title="Latest Deals and Products"
            description="Never miss a promotion, the latest products or exclusive offers when you opt into marketing."
          />
        </ul>
        <p className="text-xs mt-6">
          ^Offer available to new marketing opt-ins only. E-Voucher promo code
          sent via your Welcome Email. Code is single-use only and not
          redeemable for cash. Cannot be used with any other promo code.
          Excludes Clearance.
        </p>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, description }) => (
  <li className="flex items-start">
    <div>{icon}</div>
    <div>
      <p className="font-semibold">{title}</p>
      <p className="font-semibold text-zinc-700">{description}</p>
    </div>
  </li>
);
