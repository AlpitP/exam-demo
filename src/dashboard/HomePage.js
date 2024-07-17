import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { data } = useSelector((state) => state.api);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Home Page</h1>
      <h3 style={{ textAlign: "center", marginTop: "25%" }}>
        Well Come {data.signIn?.name}
      </h3>
    </div>
  );
};

export default HomePage;
