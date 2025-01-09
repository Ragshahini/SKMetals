import React from 'react';

function MakeSure({ message, onClose, onConfirm }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">{message}</h2>
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">No</button>
                    <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Yes</button>
                </div>
            </div>
        </div>
    );
}

export default MakeSure;
