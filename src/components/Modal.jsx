// Modal.js

import React from "react";

const Modal = ({ show, children, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-md">
                {children}
                <button
                    onClick={onClose}
                    className="text-white bg-red-600 p-2 rounded-md font-bold mt-4"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default Modal;
