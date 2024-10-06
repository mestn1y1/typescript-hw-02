import { Oval } from "react-loader-spinner";
import css from "./Loader.module.css";
import React from "react";

export const Loader: React.FC = () => {
  return (
    <div className={css.loaderContainer}>
      <Oval height={40} width={40} color="#4fa94d" ariaLabel="loading" />
    </div>
  );
};
