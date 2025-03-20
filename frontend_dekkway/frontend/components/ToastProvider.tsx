"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={true}
      pauseOnFocusLoss={true}
      draggable={true}
      pauseOnHover={true}
      theme="light"
      toastClassName={() =>
        "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
      }
      progressClassName="Toastify__progress-bar"
      style={{
        width: "400px",
        fontSize: "14px",
      }}
    />
  );
}