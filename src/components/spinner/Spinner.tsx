import React from "react";
import { FaSpinner } from "react-icons/fa6";

const Spinner = () => (
  <div className="min-h-20 flex items-center justify-center w-full">
    <FaSpinner className="animate-spin" />
  </div>
);

export default Spinner;
