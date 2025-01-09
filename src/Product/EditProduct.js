// src/Product/EditProduct.js
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Config/firebase';
import Modal from './Modal';

function EditProduct({ open, onClose, toEditTitle, toEditPrice, toEditDescription, toEditSpecification, id }) {
    // State variables for form fields
    const [title, setTitle] = useState(toEditTitle);
    const [price, setPrice] = useState(toEditPrice);
    const [description, setDescription] = useState(toEditDescription);
    const [specification, setSpecification] = useState(toEditSpecification);

    // Handle form submission
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, 'products', id), { title, price, description, specification });
            onClose(); // Close modal on successful update
        } catch (err) {
            alert("Error updating product.");
        }
    };

    // Modal styles
    const modalStyles = {
        display: open ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        zIndex: 1000,
    };

    // Modal content styles
    const contentStyles = {
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '400px',
        padding: '24px',
    };

    return (
        <div style={modalStyles}>
            <div style={contentStyles}>
                <h2 className='text-2xl font-semibold mb-4 text-center'>Edit Product</h2>
                <form name='updateProduct' onSubmit={handleUpdate}>
                    <div className='flex flex-col space-y-4'>
                        <input 
                            type="text" 
                            name="title" 
                            onChange={(e) => setTitle(e.target.value)} 
                            value={title} 
                            placeholder="Product Name"
                            className='border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <input 
                            type="number" 
                            name="price" 
                            onChange={(e) => setPrice(e.target.value)} 
                            value={price} 
                            placeholder="Price"
                            className='border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <input 
                            type="text" 
                            name="description" 
                            onChange={(e) => setDescription(e.target.value)} 
                            value={description} 
                            placeholder="Product Description"
                            className='border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <input 
                            type="text" 
                            name="specification" 
                            onChange={(e) => setSpecification(e.target.value)} 
                            value={specification} 
                            placeholder="Product Specification"
                            className='border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div className='flex items-center justify-between mt-6'>
                        <button 
                            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                            type="reset" 
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button 
                            type='submit' 
                            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                        >
                            Done
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
