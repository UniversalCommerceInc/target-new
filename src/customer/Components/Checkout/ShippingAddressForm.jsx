import React, { useState, useEffect } from "react";
import OrderSummary from "./OrderSummary";
import { setBillingAddress, setShippingAddress } from "../../../action";
import { getCartItems } from "../../../action/cart";
import HCLForm from "./HclForm";


const ShippingAddressForm = ({ handleNext }) => {
  const version = localStorage.getItem("cartVersion")
  const [formData, setFormData] = useState({
    firstName: "Danny",
    lastName: "Joe",
    streetName: "Main Street",
    streetNumber: "123",
    postalCode: "80933",
    city: "Bruges",
    state: "Central Region",
    country: "DE",
    region: "Belgium",
    mobile: "+49 171 2345678",
    email: "danny@cnetric.com",
    version: version
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [useSameForBilling, setUseSameForBilling] = useState(true);
  const [currentCartId, setCurrentCartId] = useState("");

  // Get CartId from localStorage on component mount
  useEffect(() => {
    
    const cartId = localStorage.getItem("cartId") || "";
    setCurrentCartId(cartId);
    setFormData(prev => ({ ...prev, CartId: cartId }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.streetName) newErrors.streetName = "Street Address is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal Code is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.mobile) newErrors.mobile = "Phone Number is required";
    if (!formData.email) newErrors.email = "Email is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data with CartId
      const addressData = {
        ...formData,
        CartId: currentCartId
      };

      // First set shipping address
      const shippingResponse = await setShippingAddress(addressData);
      console.log("Shipping address set successfully:", shippingResponse);
      // await getCartItems();
      // Store in localStorage
      localStorage.setItem("shippingAddress", JSON.stringify(addressData));
      // localStorage.setItem("cartValue", JSON.stringify(shippingResponse.version));

      addressData.version =shippingResponse.version;
      console.log(addressData)
      // If same address for billing, set billing address
      // if (useSameForBilling) {
        const billingResponse = await setBillingAddress(addressData);
        console.log("Billing address set successfully:", billingResponse);
        localStorage.setItem("billingAddress", JSON.stringify(addressData));
      // }
      // await getCartItems();
      localStorage.setItem("cartVersion",billingResponse.version );

      // Proceed to next step
      handleNext();
    } catch (error) {
      console.error("Error setting address:", error);
      setErrors({ submit: "Failed to save address. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between border-2 p-4">
      <div className="lg:w-[60%]">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
        <hr className="mb-4" />
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-zinc-700">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                className="w-full border border-zinc-300 p-2"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && (
                <p className="text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-zinc-700">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                className="w-full border border-zinc-300 p-2"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && (
                <p className="text-red-600">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label className="block text-zinc-700">
                Street Address <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="streetName"
                className="w-full border border-zinc-300 p-2"
                value={formData.streetName}
                onChange={handleChange}
                required
              />
              {errors.streetName && (
                <p className="text-red-600">{errors.streetName}</p>
              )}
            </div>
            <div>
              <label className="block text-zinc-700">
                Street Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="streetNumber"
                className="w-full border border-zinc-300 p-2"
                value={formData.streetNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-zinc-700">
                City <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="city"
                className="w-full border border-zinc-300 p-2"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {errors.city && (
                <p className="text-red-600">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-zinc-700">
                Postal Code <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                className="w-full border border-zinc-300 p-2"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
              {errors.postalCode && (
                <p className="text-red-600">{errors.postalCode}</p>
              )}
            </div>
            <div>
              <label className="block text-zinc-700">State/Province</label>
              <input
                type="text"
                name="state"
                className="w-full border border-zinc-300 p-2"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-zinc-700">
                Country <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="country"
                className="w-full border border-zinc-300 p-2"
                value={formData.country}
                onChange={handleChange}
                required
              />
              {errors.country && (
                <p className="text-red-600">{errors.country}</p>
              )}
            </div>
            <div>
              <label className="block text-zinc-700">
                Region <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="region"
                className="w-full border border-zinc-300 p-2"
                value={formData.region}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-zinc-700">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="mobile"
                className="w-full border border-zinc-300 p-2"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              {errors.mobile && (
                <p className="text-red-600">{errors.mobile}</p>
              )}
            </div>
            <div>
              <label className="block text-zinc-700">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="w-full border border-zinc-300 p-2"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className="text-red-600">{errors.email}</p>
              )}
            </div>
          </div>
          
          {/* <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={useSameForBilling}
                onChange={() => setUseSameForBilling(!useSameForBilling)}
                className="mr-2"
              />
              Use same address for billing
            </label>
          </div> */}
          
          {errors.submit && (
            <p className="text-red-600 mb-4">{errors.submit}</p>
          )}
          
          <button 
            type="submit" 
            className="bg-red-600 text-white p-2 w-full disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "PROCESSING..." : "NEXT"}
          </button>
        </form>
        {/* <HCLForm /> */}
      </div>
      <div className="lg:w-[35%] mb-6 lg:mb-0">
        <OrderSummary />
      </div>
    </div>
  );
};

export default ShippingAddressForm;