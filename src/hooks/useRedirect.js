import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export const useRedirect = (userAuthStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (userAuthStatus === "loggedIn") {
          navigate("/");
        }
      } catch (err) {
        if (userAuthStatus === "loggedOut") {
          navigate("/");
        }
      }
    };

    handleMount();
  }, [navigate, userAuthStatus]);
};
