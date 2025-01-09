import { useState } from 'react';
import EditDelivery from '../Delivery/EditDelivery';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../Config/firebase';
import { RiUser3Fill } from "react-icons/ri";
import MakeSure from '../Components/MakeSure';
import Modal from "../Delivery/Modal"; // Import the Modal component

function Delivery({ id, title, description, completed, cusID, cusNo, cusEmail }) {
    const [checked, setChecked] = useState(completed);
    const [open, setOpen] = useState({ edit: false, view: false });
    const [popup, setPopup] = useState(false);

    const handleClose = () => {
        setOpen({ edit: false, view: false });
    };

    /* function to update document in firestore */
    const handleCheckedChange = async () => {
        const taskDocRef = doc(db, 'delivery', id);
        try {
            await updateDoc(taskDocRef, {
                completed: checked
            });
        } catch (err) {
            alert(err);
        }
    };

    /* function to delete a document from firestore */
    const handleDelete = async () => {
        const projectDocRef = doc(db, 'delivery', id);
        try {
            await deleteDoc(projectDocRef);
            setPopup(false); // Close the popup after deletion
        } catch (err) {
            alert(err);
        }
    };

    const handlePopup = () => {
        setPopup(!popup);
    };

   
   
    return (
        <div className='rounded shadow-md border-[10px] flex w-[15rem] h-[18rem] pt-12'>
            <div className='flex w-full h-full flex-wrap'>
                <div className='w-full h-full flex flex-col justify-evenly items-center'>
                    <div>
                        <RiUser3Fill className='text-[6rem] text-stone' />
                    </div>

                    <div>
                        <p className="text-[1.2rem] font-xl capitalize">
                            Name: {title}
                        </p>
                        <p className="text-[1.2rem] font-xl capitalize">
                            Description: {description}
                        </p>
                    </div>

                    <div className='flex w-full justify-evenly'>
                        <button
                            onClick={() => setOpen({ ...open, view: true })}
                            className='bg-green-500 text-white px-2 py-1 rounded'>
                            View
                        </button>
                        <button
                            className='bg-green-500 text-white px-2 py-1 rounded'
                            onClick={() => setOpen({ ...open, edit: true })}>
                            Edit
                        </button>
                        <button 
                            className='bg-green-500 text-white px-2 py-1 rounded'
                            onClick={handlePopup}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {popup && (
                <MakeSure 
                    message="Are you sure you want to delete this delivery?" 
                    onClose={handlePopup} 
                    onConfirm={handleDelete} 
                />
            )}

            {open.edit && (
                <EditDelivery
                    onClose={handleClose}
                    toEditTitle={title}
                    toEditDescription={description}
                    open={open.edit}
                    id={id}
                    toEditcusID={cusID}
                    toEditcusNo={cusNo}
                    toEditcusEmail={cusEmail}
                />
            )}

            {open.view && (
                <Modal open={open.view} onClose={() => setOpen({ ...open, view: false })}>
                    <div className='p-6 bg-white rounded-lg shadow-lg w-[30vw] h-[60vh] overflow-y-auto relative'>
                        <button 
                            onClick={() => setOpen({ ...open, view: false })} 
                            className='bg-gray-500 text-white px-4 py-2 rounded absolute top-4 right-4'>
                            Cancel
                        </button>
                        <h2 className='text-2xl font-semibold mb-4'>{title}</h2>
                        <div className='mb-2'>
                            <strong>Description:</strong>
                            <p className='text-gray-700'>{description}</p>
                        </div>
                        <div className='mb-2'>
                            <strong>Customer ID:</strong>
                            <p className='text-gray-700'>{cusID}</p>
                        </div>
                        <div className='mb-2'>
                            <strong>Contact Number:</strong>
                            <p className='text-gray-700'>{cusNo}</p>
                        </div>
                        <div className='mb-2'>
                            <strong>Email:</strong>
                            <p className='text-gray-700'>{cusEmail}</p>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Delivery;
