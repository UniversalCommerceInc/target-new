// import { get } from "../api/APIController";

import { getOrdersSuccess } from "../../Redux/Admin/Orders/ActionCreator";
import store from "../../Redux/Store";
import { deleteCall, get, post, putCall } from "../../api/config/APIController";

// export const getCartItems = () => {
//   return (dispatch) => {
//     return new Promise((resolve, reject) => {
//       get("cart")
//         .then((response) => {
//           if (response.status === 200) {
//             // console.log("this is new cart response", response.data);
//             dispatch({
//               type: "GET_CART_ITEMS",
//               cartItems: response?.data,
//             });
//             resolve(response.data);
//           }
//         })
//         .catch((error) => {
//           dispatch({
//             type: "GET_CART_ITEMS",
//             cartItems: {},
//           });
//           reject(error);
//         })
//         .finally();
//     });
//   };
// };
export const getCartItems = () => {
  return async (dispatch) => {
    try {
      let cartId = localStorage.getItem("cartId");

      const body = {
        CartId: cartId,
      };

      const response = await post(
        "https://m100003239002.demo-hclvoltmx.net/services/Customer/getCart",
        body
      );
      localStorage.setItem("cartVersion", response.version || response.data.version );

      dispatch({
        type: "GET_CART_ITEMS",
        cartItems: response?.data || [],
      });
    } catch (error) {
      dispatch({
        type: "GET_CART_ITEMS",
        cartItems: [],
      });
      console.error("Failed to get cart items:", error);
    }
  };
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

export const getCutomerOrdersNew = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      post("/Customer/getCustomerOrders")
        .then((response) => {
          if (response.status === 200) {
            console.log("this getCutomerOrdersNew", response.result);
            dispatch({
              type: "GET_ORDER_HISTORY_NEW",
              order: response?.data,
            });
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          // Any cleanup code can go here if needed
        });
    });
  };
};

export const createCart = () => {
  return new Promise((resolve, reject) => {
    post("createCart")
      .then((response) => {
        if (response.status === 201) {
          // console.log("this getCutomerOrdersNew", response.data);
          // store.dispatch({
          //   type: "GET_CART_ITEMS",
          //   items: response?.data,
          // });
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const AddItemToCartNew = async (data,Cartversion) => {
  const token = localStorage.getItem("accesstoken");

  if (!token) {
    window.location.href = "/sign-in"; // Redirect to sign-in if no token
    return;
  }

  let cartId = localStorage.getItem("cartId");
  let version = localStorage.getItem("cartVersion") ;

  // If no cart exists, create one
  if (!cartId || !version) {
    try {
      const cartData = await createCartNew();
      cartId = cartData.id;
      version = cartData.version;
    } catch (error) {
      console.error("Failed to create cart:", error);
      return;
    }
  }

  // Prepare data for adding item to cart
  const payload = {
    productId: data.productId,
    quantity: data.quantity,
    variantId: data.variantId,
    cartid: cartId,
    version: version,
  };

  return new Promise((resolve, reject) => {
    post("Customer/add_Item_to_Cart", payload)
      .then((response) => {
        if (response.status === 200) {
          // Update version in localStorage
          // localStorage.setItem("cartVersion", response.version || version);

          store.dispatch({
            type: "UPDATE_CART_ITEMS",
            cartItems: response?.data,
          });

          resolve(response.data);
        }
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
        reject(error);
      });
  });
};


export const RemoveCartItemNew = (data) => {
  return async (dispatch) => {
    try {
      let version = localStorage.getItem("cartVersion");
      let cartId = localStorage.getItem("cartId");

      const response = await post(
        "https://m100003239002.demo-hclvoltmx.net/services/Customer/RemoveLineItem",
        {
          Cartid: cartId,
          version: data.version,
          quantity: data.quantity,
          lineItemId: data.lineItemId,
        }
      );

      // ✅ Update version in localStorage
      // localStorage.setItem("cartVersion", response.version || version);

      dispatch({
        type: "REMOVE_CART_ITEM",
        payload: cartId,
      });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };
};


// };
export const updateCartQtyNEW = (data) => {
  return async (dispatch) => {
    try {
      const response = await post(
        "https://m100003239002.demo-hclvoltmx.net/services/Customer/adjustLineItem",
        data
      );
      // ✅ Update version in localStorage
      // localStorage.setItem("cartVersion", response.version);
      dispatch({
        type: "UPDATE_CART_ITEM",
        payload: response,
      });
    } catch (error) {
      console.error("Failed to update cart quantity:", error);
    }
  };
};



export const placeOrder = async (data) => {
  return new Promise((resolve, reject) => {
    return post("checkout", data)
      .then((res) => {
        getCartItems();
        resolve(res);
        // getCustomerLoginCart();
      })
      .catch((error) => {
        reject(false);
        console.log(error);
      })
      .finally();
  });
};

export const checkoutStripePayemt = (Cart) => {
  // const custEmail = LocalStorageService.getCustEmail();
  // var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));
  // console.log("this is stripe api testing", Cart);
  // console.log("this is stripe api testing", Cart, custEmail);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Authorization",
    "Bearer sk_test_51NBwWXSGTUXQrd4JyICqJIf64RVbq1t3vfAroiNGqRD87s3a31DvzicmmFvamzuK8gWDW4wY2E8D49fRiQRVxd3000CdSHv08F"
  );

  var urlencoded = new URLSearchParams();
  urlencoded.append("cancel_url", "http://13.126.66.2:2024/Error");
  urlencoded.append("success_url", `http://localhost:3000/payment/${Cart.id}`);
  // urlencoded.append("customer_email", custEmail);
  urlencoded.append("customer_email", "sameer@cnetric.com");

  Cart.lineItems.forEach((each, index) => {
    return (
      urlencoded.append(`line_items[${index}][price_data][currency]`, "USD"),
      urlencoded.append(
        `line_items[${index}][price_data][product_data][name]`,
        each.variant.sku
      ),
      urlencoded.append(
        `line_items[${index}][price_data][product_data][description]`,
        each.variant.sku
      ),
      urlencoded.append(
        `line_items[${index}][price_data][product_data][images][0]`,
        each.variant.images[0].url
      ),
      urlencoded.append(
        `line_items[${index}][price_data][unit_amount]`,
        each.variant.prices[0].value.centAmount
      ),
      urlencoded.append(`line_items[${index}][quantity]`, each.quantity),
      urlencoded.append(
        `shipping_options[${index}][shipping_rate_data][display_name]`,
        "BlueDart"
      ),
      urlencoded.append(
        `shipping_options[${index}][shipping_rate_data][fixed_amount][amount]`,
        "1000"
      ),
      urlencoded.append(
        `shipping_options[${index}][shipping_rate_data][fixed_amount][currency]`,
        "USD"
      ),
      urlencoded.append(
        `shipping_options[${index}][shipping_rate_data][type]`,
        "fixed_amount"
      )
    );
  });
  urlencoded.append("mode", "payment");
  urlencoded.append(`payment_method_types[0]`, "card");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("https://api.stripe.com/v1/checkout/sessions", requestOptions)
    .then((response) =>
      // response.text()
      response.json()
    )
    .then((result) => {
      if (result) {
        console.log("stripe responce", result.url);
        localStorage.removeItem("LocalCartItems");
        // activeOrder();

        const paymentData = {
          cartId: Cart?.id,
          shippingAddress: JSON.parse(localStorage.getItem("shippingAddress")),
        };
        // placeOrder(paymentData);

        window.location.replace(result.url);
      }
    })
    .catch((error) => console.log("error", error));
};


export const createCartNew = () => {
  return new Promise((resolve, reject) => {
    post("/Customer/createCart", { currency: "EUR" })
      .then((response) => {
        if (response.status === 201) {
          const { id, version } = response.data;

          // Store cartId and version in localStorage
          localStorage.setItem("cartId", id);
          localStorage.setItem("cartVersion", version);

          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};


