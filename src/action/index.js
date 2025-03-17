// import { get } from "../api/APIController";

import { get, post } from "../api/config/APIController";
// import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "./cart";

export const receiveProducts = () => {
  return new Promise((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
   

    const raw = JSON.stringify({
      objectid: localStorage.getItem("objectId")||"be4e87e32cc10_dashboard_generated_id", // Replace with actual object ID
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://m100003239002.demo-hclvoltmx.net/services/AlgoliaService/Recommendation", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json(); // If response is JSON
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      })
      .then((data) => {
        const products = data?.results?.[0]?.hits || [];
        const combinedProducts = products.filter(
          (product) =>
            product._highlightResult.masterData.current.categories.value ===
              "Toys" ||
            product._highlightResult.masterData.current.categories.value ===
              "Furniture"
        );
        resolve(products);     })
      .catch((error) => {
        reject(error);
      });
  });
};


// public addToCart = (data: any) => {
//   return new Promise((resolve: any, reject: any) => {
//     this.instance
//       .post(API.ADD_TO_CART + "/" + Cart.getCartId(), data)
//       .then((response) => {
//         if (response.status == 200) {
//           let message = response.data.msg ?? "";
//           let cartItems: any = LocalStorageService.getCartItems();

//           if (cartItems) {
//             cartItems.push(data.data.id);
//           } else {
//             cartItems = [data.data.id];
//           }

//           LocalStorageService.setCartItems(cartItems);
//           useCartStore.setState({
//             count: cartItems.length,
//             cartItems: cartItems,
//           });
//           resolve(response);
//         } else {
//           let message = response.data.msg ?? "";
//           Toast.showError(message);
//           reject(response);
//         }
//       })
//       .catch((error) => {
//         console.log("Error", error);
//         Toast.showError(
//           JSON.parse(error.response.request.response).msg.detail
//         );
//         reject(error);
//       });
//   });
// };

export const receiveProductsById = (id) => {
  let url = `/Customer/GetProductByID`;
  return new Promise((resolve, reject) => {
    post(url,{ProductID:id})
      .then((response) => {
        if (response.status === 200) {
          // let data = response.data;

          // dispatch({
          //   type: "ACTUAL_PRODUCTS",
          //   products: data.products,
          // });
          resolve(response.data);
          // console.log("this is product details response", response);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const ordersById = (id) => {
  let url = `Customer/getOrderDetails`;
  return new Promise((resolve, reject) => {
    post(url,{orderid:id})
      .then((response) => {
        if (response.status === 200) {
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const receiveProductsSearch = (search) => {
  return new Promise((resolve, reject) => {
    get(`search?query=${search}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const receiveGetContent = () => {
  return new Promise((resolve, reject) => {
    get("getContent")
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};


// Function to set shipping address
export const setShippingAddress = (addressData) => {
  const url = "Customer/set_Shipping_Address";
  return new Promise((resolve, reject) => {
    post(url, addressData)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

// Function to set billing address
export const setBillingAddress = (addressData) => {
  const url = "Customer/set_BillingAddress";
  return new Promise((resolve, reject) => {
    post(url, addressData)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

// Function to get shipping method ID
export const getShippingMethodID = () => {
  const url = "Customer/getShippingMethodID";
  return new Promise((resolve, reject) => {
    post(url, {})
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

// Function to set shipping method
export const setShippingMethod = (shippingData) => {
  const url = "Customer/setShippingMethod";
  return new Promise((resolve, reject) => {
    post(url, shippingData)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

// Function to create orders
export const createOrders = (orderData) => {
  const url = "Customer/createOrders";
  return new Promise((resolve, reject) => {
    post(url, orderData)
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

// Function to create payment
export const createPayment = (paymentData) => {
  const url = "Customer/createPayment";
  return new Promise((resolve, reject) => {
    post(url, paymentData)
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

// Function to add payment to order
export const addPaymentToOrder = (paymentOrderData) => {
  const url = "Customer/addPaymentToOrder";
  return new Promise((resolve, reject) => {
    post(url, paymentOrderData)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};