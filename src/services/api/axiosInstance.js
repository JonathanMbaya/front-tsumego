import axios from "axios";
import { getUser } from "../session/session";

const BASE_URL = process.env.REACT_APP_API_URL;

export const instance = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

export const adminInstance = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

const TOKEN_AUTHORIZATION = getUser()?.token;

adminInstance.interceptors.request.use(
  (request) => {
    request.headers.Authorization = `Token ${TOKEN_AUTHORIZATION?.trim()}`;
    return request;
  },
  (error) => {
    if (error.response) {
      const apiError = error.response?.data;
      return Promise.reject(apiError);
    }
    return Promise.reject(error);
  }
);
