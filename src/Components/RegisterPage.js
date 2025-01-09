import { Link, useNavigate } from 'react-router-dom';
import Register_img from "../IMG/frontpage.jfif";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from "react";
import { auth } from "../Config/firebase";

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                setError("Added Successfully");
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                setError(error.message); // Set only the error message
            });
    };

    return (
        <div className='w-full h-screen pt-[6rem] px-5 pb-2 flex items-center justify-center font-open'>
            <div className='w-full h-full flex items-center justify-center rounded overflow-hidden shadow-2xl m-10'>
                <div className="w-1/2 h-full overflow-hidden">
                    <img src={Register_img} alt="" className="w-full h-full object-cover" />
                </div>
                <div className='w-1/2 h-full flex flex-col p-5 gap-5 justify-center'>
                    <h1 className='text-[2rem] font-popins font-lg'>Register Page</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                        <div className='flex flex-col font-md gap-1'>
                            <label className='text-[18px] font-lg'>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                required
                                className='border-[2px] rounded-2xl p-2 border-light-gray outline-none'
                            />
                        </div>

                        <div className='flex flex-col font-md gap-1'>
                            <label className='text-[18px] font-lg'>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                className='border-[2px] rounded-2xl p-2 border-light-gray outline-none'
                            />
                        </div>

                        <div className='flex flex-col font-md gap-1'>
                            <label className='text-[18px] font-lg'>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                className='border-[2px] rounded-2xl p-2 border-light-gray outline-none'
                            />
                        </div>

                        <div className='flex flex-col font-md gap-1'>
                            <label className='text-[18px] font-lg'>Confirm Password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                required
                                className='border-[2px] rounded-2xl p-2 border-light-gray outline-none'
                            />
                        </div>
                        
                        {error && <div className="text-[red]">{error}</div>} {/* Display error message */}

                        <button type="submit" className='bg-yellow p-2 rounded-full font-xl text-[1.2rem] w-full'>Register</button>
                    </form>
                    <p>
                        Already have an account? <Link to="/login" className='font-xl'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
