"use client"; // ทำให้คอมโพเนนต์นี้เป็น Client Component

import React, { useState } from 'react';

// Mock data for car models
const carModels = [
    { name: '718', imageUrl: 'https://example.com/718.png', fuel: ['Gasoline'] },
    { name: '911', imageUrl: 'https://example.com/911.png', fuel: ['Gasoline'] },
    { name: 'Taycan', imageUrl: 'https://example.com/taycan.png', fuel: ['Electro'] },
    { name: 'Panamera', imageUrl: 'https://example.com/panamera.png', fuel: ['Hybrid', 'Gasoline'] },
    { name: 'Macan', imageUrl: 'https://example.com/macan.png', fuel: ['Electro', 'Gasoline'] },
    { name: 'Cayenne', imageUrl: 'https://example.com/cayenne.png', fuel: ['Hybrid', 'Gasoline'] },
];

function CarMenu() {
    const [selectedMenu, setSelectedMenu] = useState(null);

    // Function to handle menu click
    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    return (
        <div className="flex">
            {/* Left-side Menu */}
            <div className="w-1/4 bg-gray-100 p-4">
                <ul>
                    <li onClick={() => handleMenuClick('Models')} className="cursor-pointer py-2">Models</li>
                    <li onClick={() => handleMenuClick('Vehicle Purchase')} className="cursor-pointer py-2">Vehicle Purchase</li>
                    <li onClick={() => handleMenuClick('Services')} className="cursor-pointer py-2">Services</li>
                    <li onClick={() => handleMenuClick('Experience')} className="cursor-pointer py-2">Experience</li>
                    <li onClick={() => handleMenuClick('Find a Dealer')} className="cursor-pointer py-2">Find a Dealer</li>
                </ul>
            </div>

            {/* Right-side Display */}
            <div className="w-3/4 bg-gray-50 p-4">
                {selectedMenu === 'Models' && (
                    <div>
                        {carModels.map((car) => (
                            <div key={car.name} className="flex items-center mb-6">
                                <img src={car.imageUrl} alt={car.name} className="w-32 h-auto mr-4" />
                                <div>
                                    <h3 className="text-xl font-bold">{car.name}</h3>
                                    <div className="flex space-x-2">
                                        {car.fuel.map((fuelType) => (
                                            <span key={fuelType} className="px-2 py-1 bg-gray-200 rounded">
                                                {fuelType}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedMenu && selectedMenu !== 'Models' && (
                    <div className="text-xl">You have selected: {selectedMenu}</div>
                )}

                {!selectedMenu && (
                    <div className="text-gray-500">Please select a menu from the left.</div>
                )}
            </div>
        </div>
    );
}

export default CarMenu;
