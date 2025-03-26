import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FlybuysComponent = () => {
  const [img,setImg]=useState([])
  const [cta,setCta]=useState([])
  const constructImageUrl = useCallback((resourceUri) => {
      if (!resourceUri) return "";
      const match = resourceUri.match(/\/([\w-]+)\/[^/]+\?MOD=AJPERES/);
      return match
        ? `https://dx.sbx0328.play.hclsofy.com/wps/wcm/connect/${match[1]}/190325-stocktake-sale-BG-Destkop.webp?MOD=AJPERES&ContentCache=NONE&CACHE=NONE&CACHEID=ROOTWORKSPACE-${match[1]}-plAFqpv`
        : "";
    }, []);
  
    useEffect(() => {

      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://m100003239002.demo-hclvoltmx.net/services/DXContentApi/BannerContent3",
            {
              method: "POST", // Changed to POST
              headers: {
                "Content-Type": "application/json",
                // Add Authorization header if needed
                // "Authorization": "Bearer YOUR_API_KEY"
              },
              body: JSON.stringify({}), // Some APIs require a request body, check documentation
            }
          );
   
          const data = await response.json();
          setImg([constructImageUrl(data?.data?.Image?.data?.image?.resourceUri?.value),constructImageUrl(data?.data?.Image1?.data?.image?.resourceUri?.value)])
          setCta([data?.data["CTA Link"].data?.linkElement?.destination.value,data?.data["CTA Secondary Link"]?.data?.linkElement?.destination?.value])
          console.log("API Response:3", data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
   
      fetchData();
    }, []);
  return (
    <div className="p-2 dark:bg-zinc-800 text-center">
      
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-2 text-lg" style={{color:"#214C8D"}}>
        <div className="pt-10 pb-0" >
          <Link to={cta[0]}>
        <img
        //  src="https://www.target.com.au/medias/sys_master/root/hfe/h89/h00/h00/29315075670046/060325-HP-OnePass-2Col1-Banner-Desktop-Left.png" 
         src={img?.[0]}
        
         alt="Flybuys Logo" className="w-full mb-4 " 
         />
</Link>
        </div>
        
        <div>
          
        </div>
        {/* <div className="text-center">
          <p className="font-bold">GOT 2000 FLYBUYS POINTS?</p>
          <p className="font-bold text-xl">SAVE $10 INSTANTLY</p>
        </div>
        <div className="hidden md:block h-10 w-px bg-zinc-300"></div> */}
        {/* <div className="text-center">
          <p className="font-bold">GOT 4000 FLYBUYS POINTS?</p>
          <p className="font-bold text-xl">SAVE $20 INSTANTLY</p>
        </div> */}
        
        <div className="pt-8 pb-0">
          <Link to={cta[1]}>
        <img 
        src={img?.[1]}
        // src="https://www.target.com.au/medias/sys_master/root/h7a/h94/h00/h00/29315075997726/060325-HP-OnePass-2Col1-Banner-Desktop-Right.png" 
        alt="Flybuys Logo" className="w-full mb-4 " />
        </Link>
        {/* <LearnMoreButton /> */}
        </div>
      </div>
     
      {/* <div className="text-center " style={{color:"#214C8D"}}>
        <p className=" ">
        Turn your flybuys points into instant savings when you shop in store or <br/> online at Target.

        <a href="#" className=" underline">T&Cs Apply</a>
      </p> */}
        {/* </div> */}
      
    </div>
  );
};

const LearnMoreButton = () => {
  return (
    <button className="mt-6  text-white  py-2 px-4 rounded-full"
    style={{backgroundColor:"#214C8D"}}
    >Learn more</button>
  );
};

const FlybuysPage = () => {
  return (
    <>
      <FlybuysComponent />
    
    </>
  );
};

export default FlybuysPage;
