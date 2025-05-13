import React, { useCallback, useEffect, useState } from "react";

const ImageGallery = () => {
    const [images,setImages]=useState([]);
      useEffect(() => {
          fetch("https://m100003239002.demo-hclvoltmx.net/services/DXContentApi/bannerContent2", {
            method: "POST",
            mode: "cors",
            headers: { Accept: "application/json" },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("API Response:2", data);
             setImages([constructImageUrl(data?.data?.Image1?.data?.image?.resourceUri?.value),constructImageUrl(data?.data?.Image2?.data?.image?.resourceUri?.value),]);
            
              
            })
            .catch((error) => console.error("Error fetching banners:", error));
        }, []);
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
 

  return (
    <div className="w-[98%] flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-2 text-lg mt-10" >
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Offer ${index + 1}`}
          className="w-full md:w-1/2  object-cover rounded shadow "
        />
      ))}
    </div>
  );
};

export default ImageGallery;
