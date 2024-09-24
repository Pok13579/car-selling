"use client"; // ทำให้คอมโพเนนต์นี้เป็น Client Component

import React, { useState } from 'react';

// Mock data for car models
const carModels = [
    { name: '718', imageUrl: 'https://files.porsche.com/filestore/image/multimedia/none/982-718-cayman-gt4rs-modelimage-sideshot/model/ca8f53c1-f3b7-11ed-8103-005056bbdc38/porsche-model.png', fuel: ['Gasoline'] },
    { name: '911', imageUrl: 'https://images-porsche.imgix.net/-/media/E969499404154DB79BAD58EF5CC8CFAB_82BBE0A2462E47C4B1DB34EA0B23B853_CZ25W12IX0010-911-carrera-gts-side?w=2560&h=697&q=45&crop=faces%2Centropy%2Cedges&auto=format', fuel: ['Gasoline'] },
    { name: 'Taycan', imageUrl: 'https://images-porsche.imgix.net/-/media/329E707A3234485BBE98485116865780_E8DD4C47C7F14D41B61C1AE76B59FC1A_TA24Q3EIX0010-taycan-turbo-s-side?w=2560&h=697&q=45&crop=faces%2Centropy%2Cedges&auto=format', fuel: ['Electro'] },
    { name: 'Panamera', imageUrl: 'https://images-porsche.imgix.net/-/media/59689B43ECDE4E05ABEB83FBDD064823_933AEC68E35141DD89A00A0932C25DDE_PA24P5NIX0006-panamera-turbo-s-e-hybrid-side?w=2560&h=697&q=45&crop=faces%2Centropy%2Cedges&auto=format', fuel: ['Hybrid', 'Gasoline'] },
    { name: 'Macan', imageUrl: 'https://images-porsche.imgix.net/-/media/6706E68927CC491AA3BABF9D186D753A_F204C069B3764429AD5DD23D3F5646F5_macan-turbo-side?w=2560&h=811&q=45&crop=faces%2Centropy%2Cedges&auto=format', fuel: ['Electro', 'Gasoline'] },
    { name: 'Cayenne', imageUrl: 'https://files.porsche.com/filestore/image/multimedia/none/e3-2nd-cayenne-coupe-modelexplorer-sideshot/normal/923da18f-8859-11ee-810c-005056bbdc38;sS;twebp065/porsche-normal.webp', fuel: ['Hybrid', 'Gasoline'] },
];

function CarMenu() {
    const [selectedMenu, setSelectedMenu] = useState(null);

    // Function to handle menu click
    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    return (
        <div className="flex h-screen"> {/* Set full height for the component */}
            {/* Left-side Menu */}
            <div className="w-1/2 bg-gray-100 p-4 h-full"> {/* Set height to full */}
                <ul>
                    <li onClick={() => handleMenuClick('Models')} className="cursor-pointer py-2">Models</li>
                    <li onClick={() => handleMenuClick('Vehicle Purchase')} className="cursor-pointer py-2">Vehicle Purchase</li>
                    <li onClick={() => handleMenuClick('Services')} className="cursor-pointer py-2">Services</li>
                    <li onClick={() => handleMenuClick('Experience')} className="cursor-pointer py-2">Experience</li>
                    <li onClick={() => handleMenuClick('Find a Dealer')} className="cursor-pointer py-2">Find a Dealer</li>
                </ul>
            </div>

            {/* Right-side Display */}
            <div className="w-3/4 bg-gray-200 p-4 h-full overflow-y-auto"> {/* Set height to full and enable scrolling */}
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

                {selectedMenu === 'Vehicle Purchase' && (
                    <div className="text-xl">รายละเอียดการซื้อรถยนต์</div>
                )}

                {selectedMenu === 'Services' && (
                    <div className="text-xl">บริการต่าง ๆ</div>
                )}

                {selectedMenu === 'Experience' && (
                    <div className="text-xl">ประสบการณ์การขับขี่</div>
                )}

                {selectedMenu === 'Find a Dealer' && (
                    <div className="text-xl">ค้นหาตัวแทนจำหน่าย</div>
                )}

                {!selectedMenu && (
                    <div className="text-gray-500">Please select a menu from the left.</div>
                )}
            </div>
        </div>
    );
}


export default CarMenu;
