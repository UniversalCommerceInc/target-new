import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../../Redux/Auth/Action';
import  {toast, Toaster } from 'react-hot-toast';
import { MdOutlineEmail } from 'react-icons/md';
import { SlBasket } from 'react-icons/sl';
import { RxCube } from 'react-icons/rx';
import { FaRegHeart } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import NewNavbar from '../Navbar/NewNavbar';

const inputClasses = "w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
const textClasses = "text-zinc-700 dark:text-zinc-300";
const linkClasses = "text-blue-500";
const iconClasses = 'w-6 h-6 mr-3 mt-1';
const buttonClasses = 'bg-black text-white py-2 px-4 rounded-full';
const textColorClasses = 'text-zinc-700';
const smallTextClasses = 'text-xs text-zinc-600';
const containerClasses = 'bg-zinc-200 p-6 rounded-lg w-full';
const centerClass = 'text-center';
const listClasses = 'space-y-6 mt-4';
const listItemClasses = 'flex items-start';
const fontBoldClasses = 'font-semibold';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePasswordVisibilityToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!firstName) errors.firstName = 'First Name is required';
        if (!lastName) errors.lastName = 'Last Name is required';
        if (!phoneNumber) errors.phoneNumber = 'Phone Number is required';
        if (!email) errors.email = 'Email is required';
        if (!password) errors.password = 'Password is required';

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            const userData = { firstName, lastName, phoneNumber, email, password };

            try {
                await dispatch(register(userData,navigate,toast));
                // navigate("/sign-in");
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
           
            <NewNavbar />
            <div className="flex flex-col items-stretch justify-center m-auto gap-4 p-6 md:flex-row">
                <div className="flex-1">
                    <SignUpForm
                        email={email}
                        password={password}
                        showPassword={showPassword}
                        handlePasswordVisibilityToggle={handlePasswordVisibilityToggle}
                        handleSubmit={handleSubmit}
                        setEmail={setEmail}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                        setPassword={setPassword}
                        setPhoneNumber={setPhoneNumber}
                        errors={errors}
                    />
                </div>
                <div className="flex-1">
                    <SignUpComponent />
                </div>
            </div>
            <Toaster />
        </>
    );
};

const SignUpForm = ({ email, password, showPassword, handlePasswordVisibilityToggle, handleSubmit, setEmail, setFirstName, setLastName, setPassword, setPhoneNumber, errors }) => {
    return (
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg h-full">
            <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Create an account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className={`block ${textClasses}`}>Email*</label>
                    <input
                        type="email"
                        id="email"
                        className={inputClasses}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="first-name" className={`block ${textClasses}`}>First name*</label>
                    <input
                        type="text"
                        id="first-name"
                        className={inputClasses}
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="last-name" className={`block ${textClasses}`}>Last name*</label>
                    <input
                        type="text"
                        id="last-name"
                        className={inputClasses}
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="mobile-number" className={`block ${textClasses}`}>Mobile number*</label>
                    <input
                        type="tel"
                        id="mobile-number"
                        className={inputClasses}
                        placeholder="Mobile Number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                    <p className={`text-sm ${textClasses} mt-1`}>Updates on your order can be sent by SMS</p>
                </div>
                <div className="mb-4 relative">
                    <label htmlFor="password" className={`block ${textClasses}`}>Password*</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className={inputClasses}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" className="absolute right-3 top-9 text-black" onClick={handlePasswordVisibilityToggle}>
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox text-blue-500" />
                        <span className={`ml-2 ${textClasses}`}>Yes, opt me in to receive marketing from Target, including exclusive promotions and offers.</span>
                    </label>
                </div>
                <p className={`text-sm ${textClasses} mb-4`}>By signing up, you agree to our <a href="#" className={linkClasses}>Conditions of Use</a> and <a href="#" className={linkClasses}>Privacy Policy</a>.</p>
                <button type="submit" className={`w-full py-2 ${email && password ? "bg-red-500" : 'bg-zinc-500 cursor-not-allowed opacity-50'} text-white rounded-full text-lg`}>Join Now</button>
            </form>
            <p className="text-center text-zinc-700 dark:text-zinc-300 mt-4">Already have an account? <Link to="/sign-in" className={linkClasses}>Log in here</Link></p>
        </div>
    );
};

const SignUpComponent = () => {
    return (
        <div className={`${containerClasses} mt-4 h-full`}>
            <div>
                <p className={fontBoldClasses}>Enjoy access to:</p>
                <ul className={listClasses}>
                    <FeatureItem
                        icon={<FaRegHeart className={iconClasses} />}
                        title="$10 off online!^"
                        description="Get $10 off your next $50+ online shop when you opt into marketing."
                    />
                    <FeatureItem
                        icon={<RxCube className={iconClasses} />}
                        title="Detailed Order Tracking"
                        description="Get updates on the progress of your order and see all your past purchases."
                    />
                    <FeatureItem
                        icon={<SlBasket className={iconClasses} />}
                        title="Faster Checkout"
                        description="We'll remember and pre-fill your details every time you shop online."
                    />
                    <FeatureItem
                        icon={<MdOutlineEmail className={iconClasses} />}
                        title="Latest Deals and Products"
                        description="Never miss a promotion, the latest products or exclusive offers when you opt into marketing."
                    />
                </ul>
                <p className={`${smallTextClasses} mt-6`}>
                    ^Offer available to new marketing opt-ins only. E-Voucher promo code sent via your Welcome Email. Code is single-use only and not redeemable for cash. Cannot be used with any other promo code. Excludes Clearance.
                </p>
            </div>
        </div>
    );
};

const FeatureItem = ({ icon, title, description }) => (
    <li className={listItemClasses}>
        <div>{icon}</div>
        <div>
            <p className={fontBoldClasses}>{title}</p>
            <p className={`${textColorClasses}`}>{description}</p>
        </div>
    </li>
);

export default RegisterPage;
