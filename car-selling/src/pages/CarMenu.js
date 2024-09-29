"use client"; // Make this a client component

import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa'; // Import the chevron icon

// Mock data for car models
const carModels = [
    { name: '718', imageUrl: 'https://files.porsche.com/filestore/image/multimedia/none/982-718-cayman-gt4rs-modelimage-sideshot/model/ca8f53c1-f3b7-11ed-8103-005056bbdc38/porsche-model.png', fuel: ['Gasoline'] },
    { name: '911', imageUrl: 'https://files.porsche.com/filestore/image/multimedia/none/992-gt3-rs-modelimage-sideshot/model/cfbb8ed3-1a15-11ed-80f5-005056bbdc38/porsche-model.png', fuel: ['Gasoline'] },
    { name: 'Taycan', imageUrl: 'https://images-porsche.imgix.net/-/media/329E707A3234485BBE98485116865780_E8DD4C47C7F14D41B61C1AE76B59FC1A_TA24Q3EIX0010-taycan-turbo-s-side?w=2560&h=697&q=45&crop=faces%2Centropy%2Cedges&auto=format', fuel: ['Electro'] },
    { name: 'Panamera', imageUrl: 'https://images-porsche.imgix.net/-/media/59689B43ECDE4E05ABEB83FBDD064823_933AEC68E35141DD89A00A0932C25DDE_PA24P5NIX0006-panamera-turbo-s-e-hybrid-side?w=2560&h=697&q=45&crop=faces%2Centropy%2Cedges&auto=format', fuel: ['Hybrid', 'Gasoline'] },
    { name: 'Macan', imageUrl: 'https://images-porsche.imgix.net/-/media/6706E68927CC491AA3BABF9D186D753A_F204C069B3764429AD5DD23D3F5646F5_macan-turbo-side?w=2560&h=811&q=45&crop=faces%2Centropy%2Cedges&auto=format', fuel: ['Electro', 'Gasoline'] },
    { name: 'Cayenne', imageUrl: 'https://files.porsche.com/filestore/image/multimedia/none/e3-2nd-cayenne-coupe-modelexplorer-sideshot/normal/923da18f-8859-11ee-810c-005056bbdc38;sS;twebp065/porsche-normal.webp', fuel: ['Hybrid', 'Gasoline'] },
];

function CarMenu() {
    const [selectedMenu, setSelectedMenu] = useState('Models'); // Initial state set to 'Models'

    // Function to handle menu click
    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    return (
        <div className="flex h-screen"> {/* Set full height for the component */}
            {/* Left-side Menu */}
            <div className="w-2/6 bg-gray-100 p-4 h-full text-stone-600">
                <ul>
                    {['Models', 'Experience', 'We Brand', 'Find a Dealer'].map((menu) => (
                        <li
                            key={menu}
                            onClick={() => handleMenuClick(menu)}
                            className={`cursor-pointer flex items-center justify-between py-4 pl-6 pr-4 mb-4 rounded-lg transition-colors duration-200 ${selectedMenu === menu
                                ? 'bg-gray-300 text-black font-bold' // Add font-bold here
                                : 'hover:bg-gray-300 hover:text-black font-semibold' // Add font-bold here
                                }`}
                        >
                            {menu}
                            <FaChevronRight className="text-gray-500" /> {/* Chevron icon */}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right-side Display */}
            <div className="w-3/4 bg-gray-200 p-4 h-full overflow-y-auto">
                {selectedMenu === 'Models' && (
                    <div>
                        {carModels.map((car) => (
                            <div
                                key={car.name}
                                className="flex items-center mb-6 text-neutral-700 transition-all hover:border-white rounded-lg p-6 hover:bg-white h-40" // Adjust height as needed
                            >
                                <img
                                    src={car.imageUrl}
                                    alt={car.name}
                                    className="w-60 h-auto mr-4 transition-transform duration-300 hover:translate-x-2" // Image hover effect
                                />
                                <div>
                                    <h3 className="text-2xl font-bold text-neutral-700">{car.name}</h3>
                                    <div className="flex space-x-2">
                                        {car.fuel.map((fuelType) => (
                                            <span key={fuelType} className="px-3 py-1 rounded text-lg bg-gray-300">
                                                {fuelType}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                

                {selectedMenu === 'Experience' && (
                    <div className="flex flex-col items-center">

<div className="bg-white p-4 rounded-lg shadow-md w-26 max-w-lg text-xl mb-4 hover:scale-105">
                            <img
                                src="https://images-porsche.imgix.net/-/media/15A5CCAAF3B7442BBDFD951DF5E65D51_2FD89F957F804501B00E0229135308F7_001-hero_21-9_5120x2194?w=1759&q=85&auto=format"
                                alt="logo"
                                className="w-31 h-auto mr-4 transition-transform duration-300" // Adjust the width as needed
                                style={{ maxWidth: '100%', height: 'auto' }} // Ensures responsiveness
                            />
                            <p className="font-bold text-black">Head. Heart. Hands on the steering wheel. Feel the fascination of Porsche.</p>
                        </div>


                        <div className="bg-white p-4 rounded-lg shadow-md w-26 max-w-lg text-xl mb-4 hover:scale-105">
                            <img
                                src="https://images-porsche.imgix.net/-/jssmedia/F6E350102F234E0A83EC620CB390E846_8F9941067B1147ADA91F42BE640748D3_OctPrevTeaser?w=2200&auto=format"
                                alt="logo"
                                className="w-31 h-auto mr-4 transition-transform duration-300" // Adjust the width as needed
                                style={{ maxWidth: '100%', height: 'auto' }} // Ensures responsiveness
                            />
                            <p className="font-bold text-black">Looking ahead: October Porsche motorsport preview</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md w-26 max-w-lg text-xl mb-4 hover:scale-105">
                            <img
                                src="https://images-porsche.imgix.net/-/jssmedia/BF6D8BD2347146DE8DA80AF7B5B09369_D5874787DCF24D69BFF1B20386BF233B_20230907-PorscheGT3RR_3-4Rear_MF_angled_1920x1080?w=2200&auto=format"
                                alt="logo"
                                className="w-31 h-auto mr-4 transition-transform duration-300" // Adjust the width as needed
                                style={{ maxWidth: '100%', height: 'auto' }} // Ensures responsiveness
                            />
                            <p className="font-bold text-black">The new 911 GT3 R rennsport.</p>
                        </div>

                        
                    </div>
                )}

                {selectedMenu === 'We Brand' && (
                    <div className="flex flex-col items-center">
                        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg text-l flex flex-col items-center ">
                            <img
                                src="https://di-uploads-pod3.dealerinspire.com/porscheoffremont/uploads/2018/09/porsche-logo.jpg"
                                alt="logo"
                                className="w-57 h-auto mr-4 transition-transform duration-300" // Adjust the width as needed
                                style={{ maxWidth: '100%', height: 'auto' }} // Ensures responsiveness
                            />
                            <p className='text-center text-black'>
                                Porsche is a renowned German automobile manufacturer specializing in high-performance sports cars, SUVs, and sedans. Founded in 1931 by Ferdinand Porsche, the brand is celebrated for its engineering excellence and innovative designs, most famously exemplified by the iconic Porsche 911, which debuted in 1964. With a commitment to performance and luxury, Porsche has successfully blended cutting-edge technology with traditional craftsmanship, making it a symbol of automotive prestige. The brand has expanded its lineup over the years to include models such as the Porsche Cayenne and Macan, catering to a wider audience while maintaining its racing heritage. Porsche's dedication to sustainability is also evident in its development of hybrid and electric models, including the all-electric Taycan, showcasing its forward-thinking approach in the evolving automotive landscape.
                            </p>
                        </div>
                    </div>
                )}

                {selectedMenu === 'Find a Dealer' && (
                    <div className="flex flex-col items-center">
                        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg mb-4 hover:scale-105"> {/* White container for the first map */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123980.67414202126!2d100.52063790941125!3d13.815239709840727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e282e84575f0d5%3A0x42801568f975de55!2sPorsche%20Centre%20Bangkok!5e0!3m2!1sth!2sth!4v1727611807180!5m2!1sth!2sth"
                                width="100%" // Set width to 100% for responsiveness
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            <span className="text-xl text-center text-black">Porsche Centre Bangkok</span>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg mb-4 hover:scale-105"> {/* White container for the second map */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123980.67414202126!2d100.52063790941125!3d13.815239709840727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29e2a2034a013%3A0xb37eca5a94e3a66d!2sPorsche%20Centre%20Pattanakarn!5e0!3m2!1sth!2sth!4v1727612481575!5m2!1sth!2sth"
                                width="100%" // Set width to 100% for responsiveness
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            <span className="text-xl text-center text-black">Porsche Centre Pattanakarn</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CarMenu;
