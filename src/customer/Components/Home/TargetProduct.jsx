import React from 'react';

const products = [
  {
    imageUrl: "T1.png",
    altText: "Lily Loves",
    title: "LILY LOVES",
    description: "Toasty textures made for winter layering. no matter what shape you are."
  },
  {
    imageUrl: "T2.png",
    altText: "New Dannii Minogue Petites Collection",
    title: "NEW DANNII MINOGUE PETITES COLLECTION",
    description: "Perfectly proportioned for heights 160cm (5ft 3) and below, no matter what shape you are."
  },
  {
    imageUrl: "T3.png",
    altText: "New in Arlo Bedding",
    title: "NEW IN ARLO BEDDING",
    description: "Discover the latest colour in our stylish Arlo bedding range."
  },
  // Add more products as needed
];

const ProductCard = ({ imageUrl, altText, title, description }) => {
  return (
    <div className="text-center bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden flex flex-col">
      <img src={imageUrl} alt={altText} className="w-full h-auto object-contain" />
      <div className="text-center p-4 bg-black text-white flex flex-col flex-grow">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-2 flex-grow">{description}</p>
        <a href="#" className=" text-center mt-4 text-white py-2 px-4 rounded hover:underline">Shop now</a>
      </div>
    </div>
  );
};

const TargetProducts = () => {
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
          />
        ))}
      </div>
    </div>
  );
};

export default TargetProducts;
