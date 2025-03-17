import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomerRoutes from "./Routers/CustomerRoutes";
import AdminPannel from "./Admin/AdminPannel";

function App() {
  const isAdmin = true;

  // Fetch token every 10 minutes and store it in localStorage
  useEffect(() => {
    const fetchToken = () => {
      const myHeaders = new Headers();
      myHeaders.append("X-Voltmx-app-key", "5470b3dce94beb6641a05dbe4dabaa2d");
      myHeaders.append("X-Voltmx-app-secret", "1faea998d8e7f435878eb4820dbde24");
      myHeaders.append("Accept", "application/json");
      

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://m100003239002.demo-hclvoltmx.net/services/InvokeFoundryToken/FoundryLogin",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          const token = result?.claims_token?.value;
          if (token) {
            localStorage.setItem("authTokenFoundary", token);
            console.log("Token stored in localStorage:", token);
          } else {
            console.error("Token not found in response:", result);
          }
        })
        .catch((error) => console.error("Token fetch error:", error));
    };

    // Fetch token initially
    fetchToken();

    // Set interval to fetch token every 10 minutes (600,000 ms)
    const intervalId = setInterval(fetchToken, 600000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Fetch admin token only once and store in localStorage
  useEffect(() => {
    const fetchAdminToken = () => {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://m100003239002.demo-hclvoltmx.net/services/adminLogin/ObtainAdminToken",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          const adminToken = result?.access_token;
          if (adminToken) {
            localStorage.setItem("ObtainAccessToken", adminToken);
            console.log("Admin token stored in localStorage:", adminToken);
          } else {
            console.error("Admin token not found in response:", result);
          }
        })
        .catch((error) => console.error("Admin token fetch error:", error));
    };

    // Fetch admin token once
    fetchAdminToken();
  }, []);

  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/admin/*" element={<AdminPannel />} />
      </Routes>
    </div>
  );
}

export default App;
