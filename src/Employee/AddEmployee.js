import { db } from '../Config/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import Modal from "./Modal"
import { useState } from 'react'

function AddEmployee({ onClose, open }) {
  const [ename, setEname] = useState('');
  const [email, setEmail] = useState('');
  const [eaddress, setAddress] = useState('');
  const [eid, setId] = useState('');
  const [emobile, setMobile] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ename || !email || !eaddress || !eid || !emobile) {
      setError('All fields are required!');
      return;
    }

    if (!/^\d{10}$/.test(emobile)) {
      setError('Mobile number must be exactly 10 digits.');
      return;
    }

    try {
      setError(null);
      await addDoc(collection(db, 'employee'), {
        ename: ename,
        email: email,
        eaddress: eaddress,
        eid: eid,
        emobile: emobile,
        completed: false,
        created: Timestamp.now()
      });
      onClose();
      alert('Employee added successfully!');
    } catch (err) {
      setError('Error adding employee. Please try again later.');
    }
  }

  const handleMobileChange = (e) => {
    const input = e.target.value;
    // Allow only numbers and ensure length is 10 or less
    if (/^\d{0,10}$/.test(input)) {
      setMobile(input);
    }
  };

  return (
    <div className='w-full h-full pt-[10rem] px-5 fixed z-[1000] top-0 left-0 right-0 bottom-0 backdrop-blur-md flex items-center justify-center'>
      <Modal modalLable='Add Employee' onClose={onClose} open={open}>
        <form name='addTask' onSubmit={handleSubmit} className="form flex flex-col gap-4 p-4">
          <input
            type='text'
            name='ename'
            onChange={(e) => setEname(e.target.value)}
            value={ename}
            placeholder='Enter Name'
            className='input border p-2 rounded w-full'
          />
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
            value={email}
            className='input border p-2 rounded w-full'
          />
          <input
            type="text"
            name="eaddress"
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Enter Address'
            value={eaddress}
            className='input border p-2 rounded w-full'
          />
          <input
            type="text"
            name="eid"
            onChange={(e) => setId(e.target.value)}
            placeholder='Enter Employee ID'
            value={eid}
            className='input border p-2 rounded w-full'
          />
          <input
            type="text"
            name="emobile"
            onChange={handleMobileChange}
            placeholder='Enter Mobile no (10 digits)'
            value={emobile}
            className='input border p-2 rounded w-full'
          />

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className='flex items-center justify-center gap-6'>
            <button className='btn border rounded px-4 py-2 bg-gray-200 hover:bg-gray-300' onClick={onClose} type="reset">Cancel</button>
            <button type='submit' className='btn border rounded px-4 py-2 bg-blue-500 text-white hover:bg-blue-600'>Done</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AddEmployee;
