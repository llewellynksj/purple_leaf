import { jwtDecode } from "jwt-decode";
import { axiosReq } from "../services/axiosDefaults";

// Code from Code Institute's 'Moments' Walkthrough

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

export const setTokenTimestamp = (data) => {
  try {
    const token = data.key;

    if (typeof token === "string" && token.split(".").length === 3) {
      const decodedToken = jwtDecode(token);
      localStorage.setItem("token", token);
      localStorage.setItem("tokenTimestamp", decodedToken.exp * 1000);
      console.log("Token timestamp set successfully:", decodedToken.exp * 1000);
    } else {
      throw new Error("Token is not a valid JWT");
    }
  } catch (error) {
    console.error("Error setting token timestamp:", error);
  }
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
