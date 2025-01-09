import React, { useState } from 'react';
import Modal from 'react-modal'; // Importing the Modal component
import EditProduct from './EditProduct';
import { db } from '../Config/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

function Product({ title, price, imageUrl, description, specification, id, userEmail }) {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteDoc(doc(db, 'products', id));
                alert("Product deleted successfully!");
            } catch (err) {
                alert("Error deleting product: " + err.message);
            }
        }
    };

    return (
        <div style={styles.productCard}>
            <img src={imageUrl} alt={title} style={styles.image} />
            <h3 style={styles.title}>{title}</h3>
            <p style={styles.price}>Price: {price}</p>

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
                            onClick={handleDelete}
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

            {openEditModal && 
                <EditProduct 
                    open={openEditModal} 
                    onClose={() => setOpenEditModal(false)} 
                    toEditTitle={title} 
                    toEditPrice={price} 
                    toEditDescription={description} 
                    toEditSpecification={specification} 
                    id={id} 
                />
            }

            {/* View Modal */}
            {openViewModal && (
                <Modal isOpen={openViewModal} onRequestClose={() => setOpenViewModal(false)}>
                    <div style={styles.modalContent}>
                        <button 
                            onClick={() => setOpenViewModal(false)} 
                            style={styles.closeButton}
                        >
                            Close
                        </button>
                        <h2>{title}</h2>
                        <p style={styles.label}>Description:</p>
                        <p>{description}</p>
                        <p style={styles.label}>Specification:</p>
                        <p>{specification}</p>
                        <p style={styles.label}>Price:</p>
                        <p>{price}</p>
                    </div>
                </Modal>
            )}
        </div>
    );
}

const styles = {
    productCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        margin: '1rem',
        width: '220px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '5px',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
        margin: '0.5rem 0',
    },
    price: {
        color: '#b87333',
        fontSize: '1rem',
        marginBottom: '0.5rem',
    },
    buttonContainer: {
        marginTop: '1rem',
    },
    editButton: {
        marginRight: '5px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
    deleteButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
    viewButton: {
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
    modalContent: {
        padding: '1rem',
        background: '#fff',
        borderRadius: '5px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    closeButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
    },
    label: {
        fontWeight: 'bold',
        color: '#1b3d81',
    },
};

export default Product;
