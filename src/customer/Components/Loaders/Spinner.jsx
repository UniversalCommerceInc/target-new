import { lineSpinner } from "ldrs";

// Default values shown

const Spinner = () => {
  lineSpinner.register();

  return (
    <div className="flex justify-center items-center h-screen">
      <l-line-spinner
        size="40"
        stroke="3"
        speed="1"
        color="#FF0D00"
      ></l-line-spinner>
    </div>
  );
};

export default Spinner;
