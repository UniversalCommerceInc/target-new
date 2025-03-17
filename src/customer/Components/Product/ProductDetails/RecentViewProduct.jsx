import { Link } from "react-router-dom";
import { receiveProducts } from "../../../../action";
import { useEffect, useState } from "react";

const RecentViewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    receiveProducts().then((data) => {
      const filteredProducts = data?.data.products.results
        .filter(
          (product) =>
            product.masterData.current.name !==
            "Call of Duty: Modern Warfare III - PlayStation 5"
        )
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      setProducts(filteredProducts);
    });
  }, []);

  return (
    <div className="mt-8 mb-8">
      <h2 className="text-2xl font-semibold mb-4">
        Your Recently Viewed Items
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((item) => (
          <Link to={`/product/${item.id}`} key={item.id}>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={item.masterData.current.allVariants[0].images[0].url}
                alt={`Recently Viewed Item ${item.id}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-lg font-semibold mb-2 truncate">
                  {item.masterData.current.name}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  $
                  {item.masterData.current.allVariants[0].price.value
                    .centAmount / 100}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentViewProduct;
