import { adminInstance, instance } from "./axiosInstance";

export async function singup(user) {
   const response = await instance.post("signup/", user);
   return response;
}

export async function login(credentials) {
    const response = await instance.post("login/", credentials)
    return response
}

export async function logout() {
    const response = await adminInstance.post("logout/", {})
    return response
}