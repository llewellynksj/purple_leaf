import axios from "axios";

axios.defaults.baseURL = "https://loved-leaves-5947c4767276.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
