import React, { useState } from 'react';
import { db, storage } from '../Config/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Modal from "./Modal";

function AddProject({ onClose, open }) {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedBudget, setEstimatedBudget] = useState('');
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
        if (!title.trim() || !startDate || !endDate || !status || !image || !description.trim() || !estimatedBudget.trim() || !specification.trim()) {
            setError('All fields including image are required!');
            return;
        }
        try {
            setUploading(true);
            const imageRef = ref(storage, `images/${image.name}`);
            const uploadTask = uploadBytesResumable(imageRef, image);
            uploadTask.on(
                'state_changed',
                null,
                (error) => {
                    setError('Image upload failed.');
                    setUploading(false);
                },
                async () => {
                    const downloadURL = await getDownloadURL(imageRef);
                    await addDoc(collection(db, 'projects'), {
                        title: title.trim(),
                        startDate,
                        endDate,
                        status,
                        description: description.trim(),
                        estimatedBudget: estimatedBudget.trim(),
                        specification: specification.trim(),
                        imageUrl: downloadURL,
                        created: Timestamp.now(),
                    });
                    setUploading(false);
                    onClose();
                    alert('Project added successfully!');
                }
            );
        } catch (err) {
            setError('Error adding project. Please try again later.');
            setUploading(false);
        }
    };

    return (
        <div className='w-full h-full flex justify-left items-left'>
        <Modal modalLabel='Add Project' onClose={onClose} open={open}>
                <form name='addProject' onSubmit={handleSubmit} className="form">
                    <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Project Name" className='input' />
                    <input type="date" name="startDate" onChange={(e) => setStartDate(e.target.value)} value={startDate} placeholder="Start Date" className='input' />
                    <input type="date" name="endDate" onChange={(e) => setEndDate(e.target.value)} value={endDate} placeholder="End Date" className='input' />
                    <input type="text" name="status" onChange={(e) => setStatus(e.target.value)} value={status} placeholder="Project Status" className='input' />
                    <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Project Description" className='input' rows="4" />
                    <input type="text" name="estimatedBudget" onChange={(e) => setEstimatedBudget(e.target.value)} value={estimatedBudget} placeholder="Estimated Budget" className='input' />
                    <input type="text" name="specification" onChange={(e) => setSpecification(e.target.value)} value={specification} placeholder="Project Specification" className='input' rows="3" />
                    <input type="file" accept="image/*" onChange={handleImageChange} className='input' />
                    {error && <p className="text-red-500">{error}</p>}
                    {uploading && <p className="text-blue-500">Uploading image...</p>}
                <div className='flex items-center justify-center gap-6'>
                        <button className='btn' onClick={onClose} type="reset">Cancel</button>
                        <button type='submit' className='btn' disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Done'}
                    </button>
                </div>
            </form>
        </Modal>
    </div>
    );
}

export default AddProject;
