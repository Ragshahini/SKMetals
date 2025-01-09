// src/Product/Modal.js
function Modal({ open, modalLable, children, onClose }) {
    if (!open) return null;

    return (
        <div className='modal-backdrop' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <h2>{modalLable}</h2>
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Modal;
