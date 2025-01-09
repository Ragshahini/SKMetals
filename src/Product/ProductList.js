import { MdDescription } from "react-icons/md"
import Modal from "./Modal"

function ProductList({ onClose, open, title, price,description,specification })
{

  return (
    <div className='w-full h-ful pt-[10rem] px-5 fixed z-[1000] top-0 left-0 right-0 bottom-0  backdrop-blur-md py-5 flex justify-center '>
      <Modal modalLable='Product List' onClose={onClose} open={open}>
        <div className='w-full h-full flex flex-col justify-around'>
          <div className="flex items-center gap-6">
            <label htmlFor="" className="text-[1.2rem] font-xl capitalize">
              Title
            </label>
            <h2>{title}</h2>
          </div>


          <div className="flex items-center gap-6">
            <label htmlFor="" className="text-[1.2rem] font-xl capitalize">
              Price
            </label>
            <h2>{price}</h2>
          </div>

          <div className="flex items-center gap-6">
            <label htmlFor="" className="text-[1.2rem] font-xl capitalize">
              Description
            </label>
            <h2>{description}</h2>
          </div>

          <div className="flex items-center gap-6">
            <label htmlFor="" className="text-[1.2rem] font-xl capitalize">
              Specification
            </label>
            <h2>{specification}</h2>
          </div>
 
        </div>
      </Modal>
    </div>
  )
}

export default ProductList 