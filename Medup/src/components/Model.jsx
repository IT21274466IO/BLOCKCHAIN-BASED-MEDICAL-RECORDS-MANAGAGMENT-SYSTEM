import React from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-green-600 mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}
