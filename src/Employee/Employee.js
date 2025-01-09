import { useState } from 'react';
import EditEmployee from '../Employee/EditEmployee';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../Config/firebase';
import { RiUser3Fill } from "react-icons/ri";
import MakeSure from '../Components/MakeSure';
import Modal from '../Employee/Modal'; // Ensure this path is correct

function Employee({ id, ename, email, completed, eaddress, eid, emobile }) {
    const [checked, setChecked] = useState(completed);
    const [open, setOpen] = useState({ edit: false, view: false });
    const [popup, setPopup] = useState(false);

    const handleClose = () => {
        setOpen({ edit: false, view: false });
    };

    /* Function to update document in Firestore */
    const handleCheckedChange = async () => {
        const employeeDocRef = doc(db, 'employee', id);
        try {
            await updateDoc(employeeDocRef, {
                completed: checked
            });
        } catch (err) {
            alert(err);
        }
    };

    /* Function to delete a document from Firestore */
    const handleDelete = async () => {
        const employeeDocRef = doc(db, 'employee', id);
        try {
            await deleteDoc(employeeDocRef);
            setPopup(false); // Close the popup after deletion
        } catch (err) {
            alert(err);
        }
    };

    const handlePopup = () => {
        setPopup(!popup);
    };

    return (
        <div className='rounded shadow-md border-[10px] flex w-[15rem]  h-[18rem] pt-12'>
            <div className='flex w-full h-full flex-wrap'>
                <div className='w-full h-full flex flex-col justify-evenly items-center'>
                    <div>
                        <RiUser3Fill className='text-[7rem] text-black' />
                    </div>
                    <div>
                        <p className="text-[1.5rem] font-xl text-black capitalize">
                            Name: {ename}
                        </p>
                        <p className="text-[1.5rem] font-xl text-black capitalize">
                            Id: {eid}
                        </p>
                    </div>

                    <div className='flex w-full justify-evenly bg-white text-black'>
                        <button
                            onClick={() => setOpen({ ...open, view: true })}
                            className='btn-1 bg-black text-white'>
                            View
                        </button>
                        <button
                            className='btn-1 bg-black text-white'
                            onClick={() => setOpen({ ...open, edit: true })}>
                            Edit
                        </button>
                        <button className='btn-1 bg-black text-white' onClick={handlePopup}>Delete</button>
                    </div>
                </div>
            </div>

            {/* Modal for Viewing Employee Details */}
           {/* View Modal */}
{open.view && (
    <Modal open={open.view} onClose={() => setOpen({ ...open, view: false })}>
        <div 
            className='p-8 bg-white rounded-lg shadow-lg w-[50vw] max-w-xl h-[70vh] overflow-y-auto relative mx-auto my-auto transform translate-y-[-50%] translate-x-[-50%] absolute top-1/2 left-1/2'
        >
            <button 
                onClick={() => setOpen({ ...open, view: false })} 
                className='bg-gray-500 text-white px-4 py-2 rounded absolute top-4 right-4' 
            >
                Cancel
            </button>
            <h2 className='text-2xl font-semibold mb-4'>{ename}</h2>
            <div className='mb-2'>
                <strong>Email:</strong>
                <p className='text-gray-700'>{email}</p>
            </div>
            <div className='mb-2'>
                <strong>Address:</strong>
                <p className='text-gray-700'>{eaddress}</p>
            </div>
            <div className='mb-2'>
                <strong>Mobile:</strong>
                <p className='text-gray-700'>{emobile}</p>
            </div>
            <div className='mb-2'>
                <strong>Completed:</strong>
                <p className='text-gray-700'>{checked ? 'Yes' : 'No'}</p>
            </div>
        </div>
    </Modal>
)}

            {/* Edit Employee Modal */}
            {open.edit && (
                <EditEmployee
                    open={open.edit}
                    onClose={handleClose}
                    toEditname={ename}
                    toEditemail={email}
                    toEditaddress={eaddress}
                    toEditeEid={eid}
                    toEditemobile={emobile}
                    id={id}
                />
            )}

            {/* Confirmation Popup for Deletion */}
            {popup && (
                <MakeSure 
                    message="Are you sure you want to delete this employee?" 
                    onClose={handlePopup} 
                    onConfirm={handleDelete} 
                />
            )}
        </div>
    );
}

export default Employee;
