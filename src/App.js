import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Config/firebase";
import HomePage from "./Components/HomePage";
import Delivery from "./Components/DeliveryPage";
import Employee from "./Components/EmployeePage";
import Stock from "./Components/ProductPage";
import Project from "./Components/ProjectPage";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import logo from "./IMG/K.png"; 

const App = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            setAuthUser(user || null);
        });
        return () => {
            listen();
        };
    }, []);

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Sign out successful");
                setAuthUser(null);
            })
            .catch((error) => console.log("Error signing out:", error));
    };

    return (
        <Router>
            <div>
                <nav className="fixed top-0 left-0 right-0 px-10 py-2 flex items-center justify-between w-full bg-[black] drop-shadow-md z-[5000]">
                    <Link to="/">
                        <img src={logo} alt="SK Metal Logo" className="w-24 h-24" />
                    </Link>
                    <ul className="flex gap-10 font-md items-center">
                        <li>
                            <Link to="/" className="text-[1.5rem] text-white hover:text-gold">Home</Link>
                        </li>
                        <li>
                            <Link to="/stocks" className="text-[1.5rem] text-white hover:text-gold">Products & Equipments</Link>
                        </li>
                        <li>
                            <Link to="/project" className="text-[1.5rem] text-white hover:text-gold">Projects</Link>
                        </li>
                        {authUser && authUser.email === 'skmetal123@gmail.com' && (
                            <>
                                <li>
                                    <Link to="/employee" className="text-[1.5rem] text-white hover:text-gold">Staffs</Link>
                                </li>
                                <li>
                                    <Link to="/delivery" className="text-[1.5rem] text-white hover:text-gold">Delivery</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="flex gap-5">
                        {authUser ? (
                            <div className="flex gap-5 items-center">
                                <p className="text-white">{authUser.email}</p>
                                <button onClick={userSignOut} className="text-[1rem] bg-white px-4 py-2 rounded text-blue-500 hover:bg-blue-600">
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-white text-[1.2rem] hover:text-gold">Login</Link>
                                <Link to="/register" className="text-white text-[1.2rem] hover:text-gold">Register</Link>
                            </>
                        )}
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/stocks" element={<Stock />} />
                    <Route path="/project" element={<Project />} />
                    {authUser && authUser.email === 'skmetal123@gmail.com' && (
                        <>
                            <Route path="/employee" element={<Employee />} />
                            <Route path="/delivery" element={<Delivery />} />
                        </>
                    )}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
