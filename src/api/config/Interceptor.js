import axios from "axios";
import LocalStorageService from "../../storage/LocalStorageService";
const obtainAccessToken = localStorage.getItem("obtainaccesstoken");
const claimToken = localStorage.getItem("authTokenFoundary");

// console.log("User Access Token:", userAccessToken);
console.log("Obtain Access Token:", obtainAccessToken);
console.log("Claim Token:", claimToken);
// console.log("process.env.REACT_APP_PUBLIC_URL,", process.env);
// baseURL: "http://49.206.253.146:1773/",
 const instance = axios.create({
  baseURL: "https://m100003239002.demo-hclvoltmx.net/services",
});
const localStorageService = LocalStorageService.getService();
const userAccessToken = localStorageService.getUserAuthAccessToken();
console.log("userAccessToken", userAccessToken);
// let accesstoken="5cd59bcb6f99cec3fc932e5d6f7fdabea59d96b8bf8d9b7980d2ac4bb955ff19"
const jwt = localStorage.getItem("jwt");
instance.interceptors.request.use(
  (config) => {
    config.headers = {
      "Content-Type": "application/json",
    };
    if (userAccessToken) {
      config.headers["Authorization"] = `Bearer ${userAccessToken}`;
    }
    if (claimToken) {
      config.headers["X-Voltmx-Authorization"] = claimToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 404) {
      // history.push( '/not-found' );
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
// export  instance;


export const instance2 = axios.create({
  baseURL: "https://m100003239002.demo-hclvoltmx.net/services",
});

// Get local storage service instance
// const localStorageService = LocalStorageService.getService();

// Retrieve tokens from localStorage
// const userAccessToken = localStorageService.getUserAuthAccessToken();
// const userAccessToken = localStorage.getItem("access_token");



// Request Interceptor
instance2.interceptors.request.use(
  (config) => {
    config.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // Add tokens if available
    if (userAccessToken) {
      // config.headers["User-Access-Token"] = userAccessToken;
    }
    if (userAccessToken) {
      config.headers["Authorization"] = `Bearer ${userAccessToken}`;
    }
    if (claimToken) {
      config.headers["X-Voltmx-Authorization"] = claimToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
instance2.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 404) {
      console.error("API Endpoint Not Found!");
    }
    return Promise.reject(error);
  }
);

export default instance;