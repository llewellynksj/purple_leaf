import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../services/axiosDefaults";
import { useNavigate } from "react-router";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

// Code from Code Institute's 'Moments' Walkthrough

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
      console.log("Current User Data:", data); // Debugging line
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            const { data } = await axios.post("/dj-rest-auth/token/refresh/");
            console.log("Token refreshed:", data); // Debugging line
          } catch (err) {
            console.error("Failed to refresh token:", err); // Debugging line
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/login");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            const { data } = await axios.post("/dj-rest-auth/token/refresh/");
            console.log("Token refreshed on 401:", data); // Debugging line
            return axios(err.config);
          } catch (err) {
            console.error("Failed to refresh token on 401:", err); // Debugging line
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/login");
              }
              return null;
            });
            removeTokenTimestamp();
          }
        }
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
