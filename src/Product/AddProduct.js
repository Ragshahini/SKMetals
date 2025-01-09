import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../Config/firebase';
import Modal from './Modal';

function AddProduct({ onClose, open }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !price || !image || !description || !specification) {
            setError('All fields are required!');
            return;
        }
        try {
            setError(null);
            setUploading(true);
            const imageRef = ref(storage, `images/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);
            await addDoc(collection(db, 'products'), {
                title,
                price,
                description,
                specification,
                imageUrl,
                created: Timestamp.now(),
            });
            setUploading(false);
            onClose();
        } catch (err) {
            setError('Error adding product. Please try again.');
            setUploading(false);
        }
    };

    return (
        <div className='w-full h-full fixed z-[1000] top-0 left-0 right-0 bottom-0 backdrop-blur-md flex items-center justify-center'>
            <Modal modalLabel='Add Product' onClose={onClose} open={open}>
                <form name='addProduct' onSubmit={handleSubmit} className="form flex flex-col gap-4 p-4">
                    <style>
                        {`
                        body {
                            font-family: 'Arial', sans-serif;
                            background-color: #f4f4f4;
                        }

                        .modal {
                            background-color: white;
                            border-radius: 10px;
                            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                            max-width: 500px;
                            width: 100%;
                        }

                        .form {
                            display: flex;
                            flex-direction: column;
                            gap: 20px;
                        }

                        .input {
                            border: 1px solid #ccc;
                            border-radius: 5px;
                            padding: 10px;
                            transition: border-color 0.3s;
                        }

                        .input:focus {
                            border-color: #007BFF;
                            outline: none;
                        }

                        .btn {
                            padding: 10px 15px;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            transition: background-color 0.3s;
                        }

                        .btn:hover {
                            background-color: #007BFF;
                        }

                        .btn.border {
                            border: 1px solid #007BFF;
                            color: #007BFF;
                            background-color: white;
                        }

                        .text-red-500 {
                            color: #f44336;
                        }

                        .text-blue-500 {
                            color: #2196F3;
                        }

                        .text-center {
                            text-align: center;
                        }

                        .flex {
                            display: flex;
                        }

                        .items-center {
                            align-items: center;
                        }

                        .justify-center {
                            justify-content: center;
                        }

                        .gap-4 {
                            gap: 1rem;
                        }

                        .p-4 {
                            padding: 1rem;
                        }
                        `}
                    </style>

                    <input 
                        type="text" 
                        name="title" 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title} 
                        placeholder="Product Name" 
                        className='input border p-2 rounded w-full' 
                    />
                    <input 
                        type="number" 
                        name="price" 
                        onChange={(e) => setPrice(e.target.value)} 
                        value={price} 
                        placeholder="Price" 
                        className='input border p-2 rounded w-full' 
                    />
                    <input 
                        type="text" 
                        name="description" 
                        onChange={(e) => setDescription(e.target.value)} 
                        value={description} 
                        placeholder="Product Description" 
                        className='input border p-2 rounded w-full' 
                    />
                    <input 
                        type="text" 
                        name="specification" 
                        onChange={(e) => setSpecification(e.target.value)} 
                        value={specification} 
                        placeholder="Product Specification" 
                        className='input border p-2 rounded w-full' 
                    />
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className='input border p-2 rounded w-full' 
                    />

                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {uploading && <p className="text-blue-500 text-center">Uploading image...</p>}

                    <div className='flex items-center justify-center gap-6'>
                        <button className='btn border rounded px-4 py-2 bg-gray-200 hover:bg-gray-300' onClick={onClose} type="reset">Cancel</button>
                        <button type='submit' className='btn border rounded px-4 py-2 bg-blue-500 text-white hover:bg-blue-600' disabled={uploading}>
                            {uploading ? 'Uploading...' : 'Done'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default AddProduct;
