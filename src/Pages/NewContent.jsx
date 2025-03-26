import { useEffect } from "react";
 
const FetchBannerContent = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://4.186.59.9:8080/services/DXContentApi/BannerContent3",
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
        console.log("API Response:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
 
    fetchData();
  }, []);
 
  return <div>Check the console for the API response.</div>;
};
 
export default FetchBannerContent;