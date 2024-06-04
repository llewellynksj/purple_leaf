import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const Home = () => {
  const currentUser = useCurrentUser();

  return (
    <>
      <h1 className="text-center">Home</h1>
      <p>{currentUser}</p>
    </>
  );
};

export default Home;
