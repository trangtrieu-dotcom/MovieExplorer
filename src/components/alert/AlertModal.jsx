import React from "react";
import { X } from "lucide-react";

export default function AlertModal({ isOpen, onClose, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-base-100 p-6 rounded-lg shadow-lg max-w-md w-full mx-4 relative">
                <button onClick={onClose} className="btn btn-sm btn-circle btn-primary absolute top-4 right-4">
                    <X size={18} />
                </button>
                
                <div className="flex-1 flex items-center justify-center pt-8 pb-6">
                    <p className="text-lg font-medium">{message}</p>
                </div>

                <div className="flex justify-end">
                    <button onClick={onClose} className="btn btn-sm btn-primary">
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
} 