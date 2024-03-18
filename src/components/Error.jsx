import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1 className="flex justify-between items-center text-4xl font-extrabold text-gray-200">
        Error
      </h1>
    </div>
  );
};
export default Error;
