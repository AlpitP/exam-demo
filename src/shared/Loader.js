import React from "react";

const Loader = ({ loading }) => {
  return loading && <h1 style={{ textAlign: "center" }}>Loading...</h1>;
};

export default Loader;
