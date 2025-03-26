import React, { useEffect, useState } from 'react';



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
    const constructImageUrl = (resourceUri) => {
      if (!resourceUri) return "";
      const match = resourceUri.match(/\/([\w-]+)\/[^/]+\?MOD=AJPERES/);
      return match
        ? `https://dx.sbx0328.play.hclsofy.com/wps/wcm/connect/${match[1]}/190325-stocktake-sale-BG-Destkop.webp?MOD=AJPERES&ContentCache=NONE&CACHE=NONE&CACHEID=ROOTWORKSPACE-${match[1]}-plAFqpv`
        : "";
    };
    console.log(data)
    const products = [
      {
        imageUrl: constructImageUrl(data?.data?.Image1?.data?.image?.resourceUri?.value),
        altText: "Lily Loves",
        title: "Kids’ Autumn Winter Fleece",
        description: "Cosy cotton blends that bring the warm and fuzzies.",
        link:data?.data?.Link1?.data?.linkElement?.destination?.value,
        buttonText:data?.data?.Link1?.data?.linkElement?.display?.value
      },
      {
        imageUrl: constructImageUrl(data?.data?.Image2?.data?.image?.resourceUri?.value),
        altText: "New Season Home",
        title: "New Season Home",
        description: "Perfectly proportioned for heights 160cm (5ft 3) and below, no matter what shape you are.", link:data?.data?.Link2?.data?.linkElement?.destination?.value,
        buttonText:data?.data?.Link2?.data?.linkElement?.display?.value
      },
      {
        imageUrl: constructImageUrl(data?.data?.Image3?.data?.image?.resourceUri?.value),
        altText: "Lily Loves Collection",
        title: "Lily Loves Collection",
        description: "New season looks, trending fits and forever favourites..",
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
