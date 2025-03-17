import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AddDeliveryAddressForm from "./ShippingAddressForm";
import PaymentMethod from "./PaymentMethod";
import {
  CheckCircle,
  CircleOutlined,
  FiberManualRecord,
} from "@mui/icons-material/";
import CustomStepper from "./CustomStepper";
import NewNavbar from "../Navbar/NewNavbar";
import CartFooter from "../Cart/CartFooter";
import TransactionComponent from "./TransactionComponent";

// Define the steps for the stepper
const steps = ["LogIn","Shipping Address","Shipping Method", `Payments`];

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0); // State to manage active step
  const location = useLocation(); // Get the current location
  const queryParams = new URLSearchParams(location.search); // Extract query parameters from URL
  const step = parseInt(queryParams.get("step"), 10) || 0; // Get the step from query parameter or default to 0
  const navigate = useNavigate(); // Hook for navigating to different routes

  // Effect to update the active step when the URL changes
  useEffect(() => {
    setActiveStep(step);
  }, [step]);

  // Function to handle moving to the next step
  const handleNext = () => {
    const nextStep = activeStep + 1; // Calculate the next step
    setActiveStep(nextStep); // Update the active step
    navigate(`/checkout?step=${nextStep}`); // Navigate to the next step
  };

  // Function to handle moving to the previous step
  const handleBack = () => {
    const prevStep = activeStep - 1; // Calculate the previous step
    setActiveStep(prevStep); // Update the active step
    navigate(`/checkout?step=${prevStep}`); // Navigate to the previous step
  };

  // Function to reset the stepper to the first step
  const handleReset = () => {
    setActiveStep(0); // Reset the active step to 0
    navigate("/checkout?step=0"); // Navigate to the first step
  };

  return (
    <>
      <NewNavbar />

      <Box className="px-5 lg:px-8" sx={{ width: "100%" }}>
        {/* <Stepper alternativeLabel activeStep={activeStep} connector={<div />}>
        {steps.map((label, index) => (
          <div key={label} style={{display:"flex", marginLeft:"20%", }}>
            <StepLabel style={{ display: 'block', alignItems: 'center', justifyContent: 'center' }}>
              {index < activeStep ? (
                <CheckCircle color="secondary" sx={{ fontSize: 30, color: 'red', marginRight: '4px' }} />
              ) : (
                <CircleOutlined color="error" sx={{ fontSize: 30, color: 'red', marginRight: '8px' }} />
              )}
              {label}
            </StepLabel>
          </div>
        ))}
      </Stepper> */}

        <CustomStepper steps={steps} activeStep={activeStep} />
        {/* Conditional rendering based on the active step */}
        {activeStep === steps.length ? (
          <React.Fragment>
            {/* Display message when all steps are completed */}
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            {/* Button to reset the stepper */}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* Display back button for all steps except the first one */}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
            {/* Render different components based on the active step */}
            <div className="w-[100%]">
              {/* {activeStep !== 2 ? (
                <AddDeliveryAddressForm handleNext={handleNext} />
              ) : (
                <PaymentMethod handleNext={handleNext} />
              )} */}
              {activeStep === 1 && (<AddDeliveryAddressForm handleNext={handleNext} />)}
              {activeStep === 2 && (<PaymentMethod handleNext={handleNext} />)}
              {activeStep === 3 && (<TransactionComponent />)}
            </div>
          </React.Fragment>
        )}
      </Box>
      <CartFooter />
    </>
  );
}
