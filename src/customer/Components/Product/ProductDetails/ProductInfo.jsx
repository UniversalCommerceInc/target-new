import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// Shared Tailwind CSS classes
const sharedClass = "text-zinc-900 dark:text-zinc-100";

const ProductInfo = ({ des }) => {
  const productData = {
    deliveryOptions: {
      description: des,
      notice:
        "NOTICE: Click & Collect and delivery timeframes and fees are subject to availability and apply to this individual product only.",
      linkText: "Find out more",
      itemCode: "69284557",
    },
    features: [
      "Baby Coverall",
      "Organic cotton",
      "Regular fit",
      "All over print",
      "Round neck",
      "Long raglan sleeves for full range of movement",
      "Fold over mitts",
      "Two-way zip front",
      "Covered feet",
    ],
    details: des,
    materials: "Cotton/Elastane",
    careInstructions: "Machine washable",
    extraInfo:
      "Our organic cotton range is made with certified organic cotton. Grown without the use of harmful chemicals and in a way that builds healthy soil and ecosystems.",
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
      <Accordion title="Product Details">
        <p>{productData.details}</p>
      </Accordion>

      <div className="mb-4">
        <Accordion title="Product Features">
          <ul className="list-disc list-inside">
            {productData.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </Accordion>
      </div>

      <Accordion title="Delivery and in-store options">
        <p>{productData.deliveryOptions.description}</p>
        <p className={`text-sm ${sharedClass}`}>
          {productData.deliveryOptions.notice}{" "}
          <a href="#" className="text-blue-500">
            {productData.deliveryOptions.linkText}
          </a>
        </p>
        <p className="mt-2">
          Item code: {productData.deliveryOptions.itemCode}
        </p>
      </Accordion>
      <Accordion title="Product Details">
        <p>{productData.details}</p>
      </Accordion>
      <Accordion title="Materials and Composition">
        <p>{productData.materials}</p>
      </Accordion>
      <Accordion title="Care Instructions">
        <p>{productData.careInstructions}</p>
      </Accordion>
      <Accordion title="Extra Info">
        <p>
          <strong>ORGANIC COTTON</strong>
          <br />
          {productData.extraInfo}
        </p>
      </Accordion>
      <div className="text-center text-[13px] border-t border-zinc-300 dark:border-zinc-700 pt-4 gap-2">
        <a href="#">FAQs</a> |<a href="#">Payments & Delivery</a> |
        <a href="#">Returns & Refund</a>
      </div>
    </div>
  );
};

// Accordion component
const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div
        className="cursor-pointer p-4 dark:bg-zinc-700 rounded flex justify-between items-center"
        onClick={toggleAccordion}
      >
        <h2 className="font-bold">{title}</h2>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-100 dark:bg-zinc-800 rounded">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
