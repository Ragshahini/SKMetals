import Modal from "./Modal";

function ProjectList({ onClose, open, title, startDate, endDate, imageUrl, completed, description, estimatedBudget, specification }) {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <Modal modalLable='Project List' onClose={onClose} open={open}>
                <div className='w-full h-full flex flex-col justify-around'>
                    <img src={imageUrl} alt={title} className="w-full h-[10rem] object-cover rounded mb-4" />
                    <div className="flex items-center gap-6">
                        <label htmlFor="" className="text-[1.2rem] font-xl capitalize">Title</label>
                        <h2>{title}</h2>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <label htmlFor="" className="text-[1.2rem] font-xl capitalize">Start Date</label>
                        <h2>{startDate}</h2>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <label htmlFor="" className="text-[1.2rem] font-xl capitalize">End Date</label>
                        <h2>{endDate}</h2>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <label htmlFor="" className="text-[1.2rem] font-xl capitalize">Status</label>
                        <h2>{completed ? 'Completed' : 'Not Completed'}</h2>
                    </div>
                    
                    {/* Add additional fields for the detailed view */}
                    <div className="flex items-center gap-6">
                        <label htmlFor="" className="text-[1.2rem] font-xl capitalize">Description</label>
                        <h2>{description || 'No description available.'}</h2>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <label htmlFor="" className="text-[1.2rem] font-xl capitalize">Estimated Budget</label>
                        <h2>{estimatedBudget || 'No budget provided.'}</h2>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <label htmlFor="" className="text-[1.2rem] font-xl capitalize">Specification</label>
                        <h2>{specification || 'No specifications provided.'}</h2>
                    </div>
                    
                    <div className='flex justify-end mt-4'>
                        <button onClick={onClose} className='btn bg-red-500 text-white'>Close</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ProjectList;
