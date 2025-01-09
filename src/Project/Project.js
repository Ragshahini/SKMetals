import React, { useState } from 'react';
import Modal from 'react-modal';
import EditProjectForm from './EditProject'; // Import the new EditProjectForm
import { db } from '../Config/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import MakeSure from "../Components/MakeSure.js";

function Project({ id, title, startDate, endDate, status, imageUrl, description, estimatedBudget, specification, userEmail }) {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [popup, setPopup] = useState(false);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await deleteDoc(doc(db, 'projects', id));
                alert("Project deleted successfully!");
            } catch (err) {
                alert("Error deleting project: " + err.message);
            }
        }
    };

    const handlePopup = () => {
        setPopup(!popup);
    };

    return (
        <div style={styles.projectCard}>
            <img src={imageUrl} alt={title} style={styles.image} />
            <h3 style={styles.title}>{title}</h3>
            <p style={styles.startDate}>Start Date: {startDate}</p>
            <p style={styles.endDate}>End Date: {endDate}</p>
            <p style={styles.status}>Status: {status}</p>

            <div style={styles.buttonContainer}>
                {userEmail === 'skmetal123@gmail.com' && (
                    <>
                        <button
                            style={styles.editButton}
                            onClick={() => setOpenEditModal(true)}
                        >
                            Edit
                        </button>
                        <button
                            style={styles.deleteButton}
                            onClick={handlePopup}
                        >
                            Delete
                        </button>
                    </>
                )}
                <button
                    style={styles.viewButton}
                    onClick={() => setOpenViewModal(true)}
                >
                    View
                </button>
            </div>

            {/* Delete Confirmation Popup */}
            {popup && (
                <MakeSure
                    message="Are you sure you want to delete this project?"
                    onClose={handlePopup}
                    onConfirm={handleDelete}
                />
            )}

            {/* Separate Edit Form */}
            {openEditModal && 
                <EditProjectForm 
                    id={id} 
                    title={title} 
                    startDate={startDate} 
                    endDate={endDate} 
                    status={status} 
                    description={description} 
                    estimatedBudget={estimatedBudget} 
                    specification={specification} 
                    onClose={() => setOpenEditModal(false)} 
                />
            }

            {/* View Modal */}
            {openViewModal && (
                <Modal isOpen={openViewModal} onRequestClose={() => setOpenViewModal(false)} style={customStyles}>
                    <div style={styles.modalContent}>
                        <button 
                            onClick={() => setOpenViewModal(false)} 
                            style={styles.closeButton}
                        >
                            Cancel
                        </button>
                        <h2>{title}</h2>
                        <img src={imageUrl} alt={title} style={styles.viewImage} />
                        
                        {/* Add labels for each data field */}
                        <p style={styles.label}>Description:</p>
                        <p>{description}</p>
                        <p style={styles.label}>Start Date:</p>
                        <p>{startDate}</p>
                        <p style={styles.label}>End Date:</p>
                        <p>{endDate}</p>
                        <p style={styles.label}>Status:</p>
                        <p>{status}</p>
                        <p style={styles.label}>Estimated Budget:</p>
                        <p>{estimatedBudget}</p>
                        <p style={styles.label}>Specification:</p>
                        <p>{specification}</p>

                      

                        {/* Update and Cancel buttons with space in between */}
                        <div style={styles.buttonContainer}>
                            

                            
                            <button style={styles.cancelButton} onClick={() => setOpenViewModal(false)}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

// Styles for the project card and modal
const styles = {
    projectCard: {
        border: '1px solid #b5a642',
        borderRadius: '10px',
        width: '300px',
        margin: '20px',
        padding: '15px',
        backgroundColor: '#f5f5dc',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '10px',
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: '10px 0',
        color: '#1b3d81',
    },
    startDate: {
        color: '#b5a642',
    },
    endDate: {
        color: '#b5a642',
    },
    status: {
        color: '#1b3d81',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    editButton: {
        backgroundColor: '#1b3d81',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
    deleteButton: {
        backgroundColor: '#b87333',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
    viewButton: {
        backgroundColor: '#b5a642',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
    modalContent: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    closeButton: {
        backgroundColor: 'red',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
    viewImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '10px',
    },
    label: {
        fontWeight: 'bold',
        marginTop: '10px',
    },
    imageContainer: {
        marginTop: '10px',
    },
    modalImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '10px',
    },
    updateButton: {
        backgroundColor: '#4CAF50', // Green color for Update button
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        marginRight: '10px', // Space between buttons
    },
    cancelButton: {
        backgroundColor: '#f44336', // Red color for Cancel button
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
};

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
    },
};

export default Project;
