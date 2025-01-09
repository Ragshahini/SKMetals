import React, { useState } from 'react';
import Modal from 'react-modal';
import { db } from '../Config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

// Set app element for accessibility (important for screen readers)
Modal.setAppElement('#root'); // Adjust according to your root element

const EditProjectForm = ({ id, title, startDate, endDate, status, description, estimatedBudget, specification, onClose }) => {
    const [formData, setFormData] = useState({
        title,
        startDate,
        endDate,
        status,
        description,
        estimatedBudget,
        specification,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const projectRef = doc(db, 'projects', id);
            await updateDoc(projectRef, formData);
            alert("Project updated successfully!");
            onClose(); // Close the modal after update
        } catch (err) {
            alert("Error updating project: " + err.message);
        }
    };

    return (
        <Modal isOpen={true} onRequestClose={onClose} style={customStyles}>
            <div style={styles.container}>
                <h2>Edit Project</h2>
                <form onSubmit={handleSubmit} style={styles.form}>

                    {/* Add labels and inputs for each field */}
                    <label style={styles.label}>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </label>

                    <label style={styles.label}>
                        Start Date:
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </label>

                    <label style={styles.label}>
                        End Date:
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </label>

                    <label style={styles.label}>
                        Status:
                        <input
                            type="text"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </label>

                    <label style={styles.label}>
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            style={styles.textarea}
                        />
                    </label>

                    <label style={styles.label}>
                        Estimated Budget:
                        <input
                            type="number"
                            name="estimatedBudget"
                            value={formData.estimatedBudget}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </label>

                    <label style={styles.label}>
                        Specification:
                        <textarea
                            name="specification"
                            value={formData.specification}
                            onChange={handleChange}
                            required
                            style={styles.textarea}
                        />
                    </label>

                    {/* Update and Cancel buttons with different colors */}
                    <div style={styles.buttonContainer}>
                        <button type="submit" style={styles.updateButton}>Update Project</button>
                        <button type="button" style={styles.cancelButton} onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

const styles = {
    container: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        position: 'relative', // Positioning for the pop-up effect
        animation: 'fadeIn 0.3s ease-in-out', // Animation for the pop-up effect
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    input: {
        padding: '8px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    textarea: {
        padding: '8px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        resize: 'none',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    updateButton: {
        backgroundColor: '#4CAF50', // Green color for Update button
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
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
        marginBottom: '0',
        transform: 'translate(-50%, -50%)',
        padding: '0', // No padding in content
        border: 'none', // No border
        backgroundColor: 'transparent', // Transparent background
    },
};

export default EditProjectForm;
