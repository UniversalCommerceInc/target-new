import React from "react";
import CheckCircle from "@mui/icons-material/CheckCircle";
import CircleOutlined from "@mui/icons-material/CircleOutlined";

// const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

const CustomStepper = ({ steps, activeStep }) => {
  return (
    <div className=" flex justify-center m-auto items-center w-[80%]">
      {steps.map((label, index) => (
        <React.Fragment key={label}>
          <div className=" flex flex-col items-center">
            {index < activeStep ? (
              <CheckCircle
                className="text-red-500"
                style={{ fontSize: 30, marginTop: "25px" }}
              />
            ) : (
              <CircleOutlined
                className="text-red-500"
                style={{ fontSize: 30, marginTop: "25px" }}
              />
            )}
            <span className="mt-2">{label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-grow h-[2px] bg-gray-400"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CustomStepper;
