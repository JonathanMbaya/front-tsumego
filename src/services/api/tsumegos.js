import { adminInstance } from "./axiosInstance";

export async function createTsumego(data) {
   const response = await adminInstance.post("tsumegos-create/", data);
   return response;
}