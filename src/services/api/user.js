import { instance } from "./axiosInstance";

export async function singup(user) {
   const response = await instance.post("signup/", user);
   return response.data;
}
