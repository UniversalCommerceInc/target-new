import React, { useCallback, useEffect, useState } from 'react';



const ProductCard = ({ imageUrl, altText, title, description ,buttonText,link}) => {
  return (
    <div className="text-center bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden flex flex-col">
      <img src={imageUrl} alt={altText} className="w-full h-auto object-contain" />
      <div className="text-center p-4 bg-[#ECEDE6] text-black flex flex-col flex-grow">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-2 flex-grow">{description}</p>
        <a href={link} className=" text-center mt-4 text-black py-2 px-4 rounded hover:underline" >{buttonText}</a>
      </div>
    </div>
  );
};

const TargetProducts = () => {
  const [data,setData]=useState({});
  useEffect(() => {
      fetch("https://m100003239002.demo-hclvoltmx.net/services/DXContentApi/bannerContent2", {
        method: "POST",
        mode: "cors",
        headers: { Accept: "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:2", data);
         setData(data);
        
          
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
    
    console.log(data)
    const products = [
      {
        imageUrl: constructImageUrl(data?.data?.Image1?.data?.image?.resourceUri?.value?.n) ||"https://www.target.com.au/medias/sys_master/root/h98/h46/h00/h00/29453780582430/300425-Matching-Mini-Me-NAT.jpg",
        altText: "Lily Loves",
        title: "Matching Mini Me",
        description: "Coordinated PJs for mum and the kids make for picture-perfect duos.",
        link:data?.data?.Link1?.data?.linkElement?.destination?.value,
        buttonText:data?.data?.Image1Link?.data?.linkElement?.display?.value
      },
      {
        imageUrl: constructImageUrl(data?.data?.Image2?.data?.image?.resourceUri?.value?.n)||"https://www.target.com.au/medias/sys_master/root/h25/h54/h00/h00/29453780975646/300425-Lego-Botanicals-set-NAT.jpg",
        altText: "New Season Home",
        title: "LEGO® Botanicals Sets",
        description: "Beyond the joy of building, these sets serve as an elegant decor for any space", link:data?.data?.Link2?.data?.linkElement?.destination?.value,
        buttonText:data?.data?.Link2?.data?.linkElement?.display?.value
      },
      {
        imageUrl: constructImageUrl(data?.data?.Image3?.data?.image?.resourceUri?.value) || "https://www.target.com.au/medias/sys_master/root/hf1/h49/h00/h00/29454696349726/300425-Flannelette-Bedding-NAT-v1.jpg",
        altText: "Lily Loves Collection",
        title: "Flannelette Bedding",
        description: "Stay snug & comfortable all night long with our flannelette bedding range.",
        link:data?.data?.Link3?.data?.linkElement?.destination?.value,
        buttonText:data?.data?.Link3?.data?.linkElement?.display?.value
      },
      // Add more products as needed
    ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-center text-2xl font-bold mb-8">NOW AT TARGET</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            imageUrl={product.imageUrl}
            altText={product.altText}
            title={product.title}
            description={product.description}
            buttonText={product.buttonText}
            link={product.link}
          />
        ))}
      </div>
    </div>
  );
};

export default TargetProducts;
