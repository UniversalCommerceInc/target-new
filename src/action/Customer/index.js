import {
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
} from "../../Redux/Auth/ActionTypes";
import { get, post } from "../../api/config/APIController";
import LocalStorageService from "../../storage/LocalStorageService";
import { toast } from "react-hot-toast";

export const getCartItems = () => {
  return new Promise((resolve, reject) => {
    get("login")
      .then((response) => {
        if (response.status === 200) {
          if (response.data.token) {
          }
          LocalStorageService.setUserAuthAccessToken(response.data.token);
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const getCustomerNew = (data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      post("/customerLogin/CustomerLogin", data)
        .then((response) => {
          if (response.data.access_token)
            localStorage.setItem("accesstoken", response.access_token|| response.data.access_token);
          dispatch({
            type: GET_USER_SUCCESS,
            payload: response.data,
          });
          // dispatch(LOGIN_SUCCESS(response.data));
          toast.success("Login Successful");
          window.location.replace("/");

          // setTimeout(() => {
          resolve(response.data);
          // }, 2000);
        })
        .catch((error) => {
          console.log(error);
          dispatch(LOGIN_FAILURE(error.message));
          toast.error("Invalid Credentials, Please Try Again.");
        })
        .finally();
    });
  };
};

export const logoutCustomer = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_CUSTOMER_NEW",
      user: {},
    });
    LocalStorageService.clearToken();
    localStorage.clear();
    window.location.replace("/");
  };
};

export const getCustomerInfo = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      post("Customer/getcustomerInfo")
        .then((response) => {
          if (response.status === 200) {
            dispatch({
              type: "GET_CUSTOMER_NEW",
              user: response.data,
            });
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(error);
        })
        .finally();
    });
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
