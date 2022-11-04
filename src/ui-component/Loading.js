import React from "react";
const loadingImg = "/src/assets/images/loading/loading.svg";

const Loading = () => (
  <div className="spinner">
    <img src={loadingImg} alt="Loading..." />
  </div>
);

export default Loading;
