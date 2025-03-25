'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" // Change en "dark" si tu utilises un thème sombre
<<<<<<< HEAD
      toastClassName={() =>
        "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg rounded-lg p-5 flex items-center justify-between"
      }
      bodyClassName={() => "text-sm font-medium"}
=======
      className="toast-container"
      toastClassName={() =>
        "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg rounded-lg p-5 flex items-center justify-between"
      }
>>>>>>> frontend-develop
      progressClassName="bg-blue-500"
      style={{
        top: "6rem", // Ajustez cette valeur pour déplacer les toasts plus bas
        right: "1rem",
        width: "auto",
        maxWidth: "400px",
      }}
    />
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> frontend-develop
