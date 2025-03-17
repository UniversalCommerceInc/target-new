import { dotPulse } from "ldrs";

// Default values shown

const CartSpinner = () => {
  dotPulse.register();

  return (
    <div className="flex justify-center items-center">
      <l-dot-pulse size="40" speed="1.3" color="black"></l-dot-pulse>
    </div>
  );
};

export default CartSpinner;

// Default values shown
