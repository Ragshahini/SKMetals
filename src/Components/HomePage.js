import React, { useState, useEffect } from 'react';
import { useAuth } from '../Config/useAuth'; // Adjust this path based on the location of useAuth.js
import img1 from "../../src/IMG/steel.jpg";
import img2 from "../../src/IMG/sheets.webp";
import img3 from "../../src/IMG/pipes.jfif";
import img4 from "../../src/IMG/p.png";
import img5 from "../../src/IMG/copper.jfif";
import { Link } from 'react-router-dom';

function HomePage() {
    const images = [
        { src: img1, description: "High-quality metal fabrication for all your needs." },
        { src: img2, description: "Precision engineering for customized metal works." },
        { src: img3, description: "Expert cutting and welding services." },
        { src: img4, description: "Durable and reliable industrial metal structures." },
        { src: img5, description: "On-time delivery for your metal projects." }
    ];

    const [currentImage, setCurrentImage] = useState(0);
    const { currentUser } = useAuth(); // Get the current user from Firebase authentication

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [images.length]);

    return (
        <>
            <header className="flex flex-col items-center justify-center mt-30 md:mt-36 mb-8">
                <h1 className="font-bold text-black text-3xl mb-2">Welcome to SK Metal</h1>
                <p className="text-lg text-black">Innovating metal solutions with precision and reliability.</p>
            </header>

            <div className="relative w-screen h-[500px] mt-17">
                <img
                    src={images[currentImage].src}
                    alt={`slide-${currentImage}`}
                    className="w-full h-full object-cover rounded-lg transition-opacity duration-1000"
                />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-6 w-full">
                    <p className="text-lg font-semibold animate-fade-in">{images[currentImage].description}</p>
                </div>
            </div>

            <section className="bg-[#f5f5dc] text-white py-12 mt-8">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white text-[#1b3d81] rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow">
                        <h2 className="text-2xl font-bold mb-4">Our Services</h2>
                        <p>
                            At SK Metal, we provide high-quality metal fabrication, custom metalworks, and precision engineering solutions. Our services include cutting, bending, welding, and more.
                        </p>
                        <div className="mt-3 text-sm">
                            <p className="italic">"Delivering excellence in every weld and cut."</p>
                        </div>
                    </div>

                    <div className="bg-white text-[#1b3d81] rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow">
                        <h2 className="text-2xl font-bold mb-4">Our Projects</h2>
                        <p>
                            Explore our diverse projects, from custom metal parts to large industrial structures. Each project ensures durability and excellence.
                        </p>
                        <div className="mt-3 text-sm">
                            <p className="italic">"Building the future, one metal structure at a time."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conditionally render employee and delivery sections based on user email */}
            {currentUser && currentUser.email === 'skmetal123@gmail.com' && (
                <section className="bg-[#f5f5dc] text-black py-12 mt-8">
                    <div className="max-w-5xl mx-auto px-6">
                        <h2 className="text-2xl font-bold mb-4">Employee Management</h2>
                        <Link to="/employee" className="text-blue-600">Go to Employee Page</Link>
                        <h2 className="text-2xl font-bold mb-4 mt-6">Delivery Management</h2>
                        <Link to="/delivery" className="text-blue-600">Go to Delivery Page</Link>
                    </div>
                </section>
            )}

            <footer className="bg-[#f5f5dc] text-black py-6 mt-12">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
                    <div className="flex items-center mb-4 md:mb-0">
                        <p className="font-bold text-lg">SK Metal</p>
                    </div>
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <p>215, Munagama Road, Horana</p>
                        <p>Email: info@skmetalshop.com</p>
                        <p>Phone: +94 123 456 789</p>
                    </div>
                    <div className="text-center md:text-right">
                        <p>&copy; {new Date().getFullYear()} SK Metal Shop. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default HomePage;
