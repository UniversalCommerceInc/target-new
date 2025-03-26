import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import "tailwindcss/tailwind.css";

export default function EasterPromo() {
  const [index, setIndex] = useState(0);
  const bannersRef = useRef([]);
  const ctaRef = useRef({});
  const descriptionRef = useRef("");

  const constructImageUrl = useCallback((resourceUri) => {
    if (!resourceUri) return "";
    const match = resourceUri.match(/\/([\w-]+)\/[^/]+\?MOD=AJPERES/);
    return match
      ? `https://dx.sbx0328.play.hclsofy.com/wps/wcm/connect/${match[1]}/190325-stocktake-sale-BG-Destkop.webp?MOD=AJPERES&ContentCache=NONE&CACHE=NONE&CACHEID=ROOTWORKSPACE-${match[1]}-plAFqpv`
      : "";
  }, []);

  useEffect(() => {
    fetch("https://m100003239002.demo-hclvoltmx.net/services/DXContentApi/BannerContent", {
      method: "POST",
      mode: "cors",
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        bannersRef.current = [
          constructImageUrl(data.data.Image.data.image.resourceUri.value),
          constructImageUrl(data.data["preview-image"].data.image.resourceUri.value),
          constructImageUrl(data.data["Graphic Image"].data.image.resourceUri.value),
        ];
        ctaRef.current = {
          text: data.data["CTA Link"].data.linkElement.display.value,
          link: data.data["CTA Link"].data.linkElement.destination.value,
        };
        descriptionRef.current = data.data.Description.data.value;
      })
      .catch((error) => console.error("Error fetching banners:", error));
  }, [constructImageUrl]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % bannersRef.current.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);
  const decodedHTML = descriptionRef.current
  .replace(/\\n/g, "") // Remove unnecessary new lines
  .replace(/\\"/g, '"') // Fix escaped double quotes
  .replace(/\\\//g, "/"); // Fix escaped forward slashes

  return (
    <div className="relative w-full h-[500px] bg-[#A41C26] flex items-center justify-between overflow-hidden">
      {/* Left Side Content */}
      <div className="absolute left-4 w-1/2 text-white   ">
      <h1
  className="custom-heading"
  dangerouslySetInnerHTML={{ __html: decodedHTML }}
></h1>


        <a href={ctaRef.current.link} target="_blank" rel="noopener noreferrer">
          <button className="mt-6 px-6 py-3 bg-white text-red-700 font-semibold rounded-lg hover:bg-gray-200 transition">
            {ctaRef.current.text}
          </button>
        </a>
      </div>

      {/* Animated Image Carousel */}
      {bannersRef.current.length > 0 && (
        <motion.img
          key={index}
          src={bannersRef.current[index]}
          alt="Easter Promo"
          className="w-[50%] h-full object-fit inset-10 rounded-br-[100px]"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* "Right on Target" Logo */}
      <div className="absolute right-2 text-white w-1/2 font-semibold flex items-center">
        <img
          src="https://www.target.com.au/medias/sys_master/root/hef/h23/h00/h00/29304933974046/060325-01c-HP-RightOnTarget.png"
          alt="Right on Target"
        />
      </div>
    </div>
  );
}
