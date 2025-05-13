import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AutumnWinterPromo() {
  const [data, setData] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://m100003239002.demo-hclvoltmx.net/services/DXContentApi/BannerContent2",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
          }
        );
        const jsonData = await response.json();
        setData([
          {
            title: jsonData?.data?.LeftRichText?.data?.value || "Default Title",
            images: [
              constructImageUrl(jsonData?.data?.Image1?.data?.image?.resourceUri?.value) || "",
              constructImageUrl(jsonData?.data?.Image2?.data?.image?.resourceUri?.value) || "",
            ],
            links: [
              {
                url: jsonData?.data?.Left_Link1?.data?.linkElement?.destination?.value || "#",
                text:jsonData?.data?.Left_Link1?.data?.linkElement?.display?.value || "Default Link 1",
              },
              {
                url: jsonData?.data?.Left_Link2?.data?.linkElement?.destination?.value || "#",
                text: jsonData?.data?.Left_Link2?.data?.linkElement?.display?.value || "Default Link 2",
              },
              {
                url: jsonData?.data?.Left_Link3?.data?.linkElement?.destination?.value || "#",
                text: jsonData?.data?.Left_Link3?.data?.linkElement?.display?.value || "Default Link 3",
              },
              {
                url: jsonData?.data?.Left_Link4?.data?.linkElement?.destination?.value || "#",
                text: jsonData?.data?.Left_Link4?.data?.linkElement?.display?.value || "Default Link 4",
              },
            ],
          },
          {
            title: jsonData?.data?.RightRichText?.data?.value || "Default Title",
            images: [
              constructImageUrl(jsonData?.data?.Right_Image1?.data?.image?.resourceUri?.value) || "", constructImageUrl(jsonData?.data?.Right_Image1?.data?.image?.resourceUri?.value) || ""
            ],
            links: [
              {
                url: jsonData?.data?.Right_Link1?.data?.linkElement?.destination?.value || "#",
                text: jsonData?.data?.Right_Link1?.data?.linkElement?.display?.value || "Default Link",
              },
            ],
          },
        ]);
        
      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const constructImageUrl = useCallback((resourceUri) => {
    if (!resourceUri) return "";
  
    const parts = resourceUri.split("/");
  
    // Extract UUID and file name
    const uuid = parts[4]; // 4c00ac5d-...
    const filename = parts[5]; // 170425-Mothers-Day-LP-Hero-DesktopV5.webp
    const prefix = filename?.split("-")[0]; // 170425
  
    return `https://dx.sbx0189.play.hclsofy.com/wps/wcm/connect/${uuid}/${filename}?MOD=AJPERES&CACHEID=ROOTWORKSPACE-${uuid}/${prefix}-nu0.55K`;
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
console.log(data,"autumnwinter")
  return (
    <div className="p-10">
      <h2 className="text-center text-3xl font-semibold mb-6">
        We think you'll love
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-[#A41C26] text-white p-6 rounded-lg flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={item.images[imageIndex]}
              alt="Promo Image"
              className="w-1/2 h-full rounded-lg"
            />
            <div className="ml-4">
              <h3
                className="text-2xl font-bold"
                dangerouslySetInnerHTML={{ __html: item.title }}
              ></h3>
              <div className="mt-4 space-x-2">
                {item.links.map((link, i) => (
                  <Link key={i} to={link.url}>
                    <button className="px-4 py-2 bg-white text-red-700 font-semibold rounded-lg m-2">
                      {link.text}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}