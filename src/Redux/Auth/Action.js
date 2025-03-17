import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from "./ActionTypes";
import api, { API_BASE_URL } from "../../config/api";
import { toast } from "react-hot-toast";

// Register action creators
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData, navigate, toast) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      dispatch(registerSuccess(user));
      toast.success("User Account Created Successfully");
      setTimeout(() => {
        navigate("/sign-in"); // Redirect to sign-in route after a 2-second delay
      }, 2000);
    }
  } catch (error) {
    toast.error("Error in User Account Creation");
    dispatch(registerFailure(error.message));
  }
};

// Login action creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData, navigate, toast) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    const user = response.data;
    if (user.access_token)
      localStorage.setItem("accesstoken", user.access_token);
    dispatch({ type: GET_USER_SUCCESS, payload: user });
    dispatch(loginSuccess(user));
    toast.success("Login Successful");
    setTimeout(() => {
      navigate("/");
    }, 2000); // Wait for 2 seconds before navigating
  } catch (error) {
    console.log(error);
    dispatch(loginFailure(error.message));
    toast.error("Invalid Credentials, Please Try Again.");
  }
};

// Get user from token
export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      dispatch({ type: GET_USER_SUCCESS, payload: user });
      console.log("req User: ", user);
    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
    toast.success("Logout Successfully");
  };
};
