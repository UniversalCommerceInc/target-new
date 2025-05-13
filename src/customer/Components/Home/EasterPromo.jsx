import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import "tailwindcss/tailwind.css";

export default function EasterPromo() {
  const [index, setIndex] = useState(0);
  const bannersRef = useRef([]);
  const ctaRef = useRef({});
  const descriptionRef = useRef("");
const textRef = useRef("");
const logoRef = useRef("");
 const constructImageUrl = useCallback((resourceUri) => {
    if (!resourceUri) return "";
  
    // Remove query parameters if present
    const cleanUri = resourceUri.split("?")[0];
    const parts = cleanUri.split("/");
  
    const uuid = parts[4]; // e.g. 6369ab73-...
    const filename = parts[5]; // e.g. 010525-StarWars-...
  
    const prefix = filename?.split("-")[0]; // e.g. 010525
  
    return `https://dx.sbx0189.play.hclsofy.com/wps/wcm/connect/${uuid}/${filename}?MOD=AJPERES&CACHEID=ROOTWORKSPACE-${uuid}/${prefix}-nu0.55K`;
  }, []);
  
  

  useEffect(() => {
    fetch("https://m100003239002.demo-hclvoltmx.net/services/DXContentApi/BannerContent", {
      method: "POST",
      mode: "cors",
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:1", data);
        bannersRef.current = [
          constructImageUrl(data.data.Taget_left_Image.data.image.resourceUri.value),
    
        ];
        ctaRef.current = {
          text: data.data.Target_link1.data.linkElement.display.value,
          link: data.data.Target_link1.data.linkElement.destination.value,
          text2: data.data.Target_link2.data.linkElement.display.value,
          link2: data.data.Target_link2.data.linkElement.destination.value,
          text3: data.data.Target_link3.data.linkElement.display.value,
          link3: data.data.Target_link3.data.linkElement.destination.value,
        };
        textRef.current = [data.data.Target_Text1.data.value,data.data.Target_Text2.data.value,data.data.Target_Text3.data.value,data.data.Target_Text4.data.value]
        logoRef.current = [
          constructImageUrl(data.data.Taget_Right_Logo.data.image.resourceUri.value),
        ];
        // Target_Text1=data.Target_link1.data.linkElement.display.value;
        // Target_Text2=data.data.Target_Text2.data.value;
        // Target_Text3=data.data.Target_Text3.data.value;
        // Target_Text4=data.data.Target_Text4.data.value;
        // Taget_left_Image=data.data.Taget_left_Image.data.image.resourceUri.value;
        // Taget_Right_Logo=data.data.Taget_Right_Logo.data.image.resourceUri.value;
        // Target_Text1=data.data.Target_link1.data.linkElement.display.value;
        // Target_link1=x.data.Target_link1.data.linkElement.destination.value;
        // Target_link2=x.data.Target_link2.data.linkElement.destination.value;
        // Target_link3=x.data.Target_link3.data.linkElement.destination.value;
        descriptionRef.current = data.data.Target_Text1.data.value;
      })
      .catch((error) => console.error("Error fetching banners:", error));
  }, [constructImageUrl]);
console.log(bannersRef.current)
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
  className="custom-heading text-red-700 text-2xl font-bold mb-4"
  dangerouslySetInnerHTML={{ __html: decodedHTML }}
></h1>

<h1 >{textRef.current[1]}</h1>
{/* <h1>{textRef.current[2]}</h1> */}
{/* <h1>{textRef.current[3]}</h1> */}
        <a href={ctaRef.current.link} target="_blank" rel="noopener noreferrer">
          <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition">
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
