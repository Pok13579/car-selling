import { useState, useEffect } from 'react';

export default function CarModels() {
    // Car data with image URLs
    const carData = [
        {   
            id: 1,
            name: '718',
            price: 'THB 6,190,000',
            imageUrl: '/images/718.jpg',
        },
        {
            id: 2,
            name: '911',
            price: 'THB 11,900,000',
            imageUrl: '/images/911.jpg',
        },
        {
            id: 3,
            name: 'Taycan',
            price: 'THB 6,690,000',
            imageUrl: '/images/taycan.jpg',
        },
        {
            id: 4,
            name: 'Panamera',
            price: 'THB 7,990,000',
            imageUrl: '/images/panamera.jpg',
        },
        {
            id: 5,
            name: 'Macan',
            price: 'THB 4,990,000',
            imageUrl: '/images/macan.jpg',
        },
        {
            id: 6,
            name: 'Cayenne',
            price: 'THB 6,290,000',
            imageUrl: '/images/cayenne.jpg',
        },
    ];

    return (
        <div className="container mx-auto py-16 px-4 lg:px-0">
            {/* Header */}
            <h2 className="text-5xl font-extrabold text-center mb-6 text-gray-900">Discover Your Dream Car</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
                Explore the range of models designed to inspire, engineered to perform.
            </p>
            
            {/* Car Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {carData.map((car) => (
                    <div
                        key={car.id}
                        className="relative rounded-xl shadow-xl overflow-hidden bg-white transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                    >
                        {/* Car Image */}
                        <img
                            src={car.imageUrl}
                            alt={car.name}
                            className="w-full h-64 object-cover rounded-t-xl"
                        />
                        {/* Car Info */}
                        <div className="p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">{car.name}</h3>
                                <p className="text-lg text-gray-600 mt-1">{car.price}</p>
                            </div>
                            {/* Buttons */}
                            <div className="flex justify-between mt-6">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300">
                                    Build Your Own
                                </button>
                                <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300">
                                    All Models
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
