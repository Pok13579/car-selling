import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import Firebase configuration
import { ref, push, onValue, remove, update } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const App = ({ user }) => {
    const [cars, setCars] = useState([]);
    const [newCarName, setNewCarName] = useState('');
    const [newCarPrice, setNewCarPrice] = useState('');
    const [newCarImageUrl, setNewCarImageUrl] = useState('');
    const [editingCarId, setEditingCarId] = useState(null);
    const [error, setError] = useState('');

    const addOrUpdateCar = (e) => {
        e.preventDefault();
        setError('');

        if (!newCarName || !newCarPrice || !newCarImageUrl) {
            setError('All fields are required!');
            return;
        }

        if (isNaN(newCarPrice)) {
            setError('Price must be a number!');
            return;
        }

        const carData = {
            name: newCarName,
            price: newCarPrice,
            imageUrl: newCarImageUrl
        };

        if (editingCarId) {
            update(ref(db, `users/${user.uid}/cars/${editingCarId}`), carData)
                .then(() => {
                    resetForm();
                })
                .catch((error) => {
                    setError('Error updating car: ' + error.message);
                });
        } else {
            const carKey = push(ref(db, `users/${user.uid}/cars`)).key;
            update(ref(db, `users/${user.uid}`), {
                [`cars/${carKey}`]: carData
            }).then(() => {
                resetForm();
            }).catch((error) => {
                setError('Error adding car: ' + error.message);
            });
        }
    };

    const resetForm = () => {
        setNewCarName('');
        setNewCarPrice('');
        setNewCarImageUrl('');
        setEditingCarId(null);
    };

    useEffect(() => {
        const userRef = ref(db, `users/${user.uid}`);
        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.cars) {
                const carList = Object.entries(data.cars).map(([id, car]) => ({
                    id,
                    ...car
                }));
                setCars(carList);
            } else {
                setCars([]);
            }
        });
        return () => unsubscribe();
    }, [user.uid]);

    const deleteCar = (id) => {
        remove(ref(db, `users/${user.uid}/cars/${id}`)).catch((error) => {
            setError('Error deleting car: ' + error.message);
        });
    };

    const editCar = (car) => {
        setNewCarName(car.name);
        setNewCarPrice(car.price);
        setNewCarImageUrl(car.imageUrl);
        setEditingCarId(car.id);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-300 p-5">
            <h2 className="text-5xl font-extrabold text-center mb-6 text-gray-900 font-serif">
                Add Your Dream Car
            </h2>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={addOrUpdateCar} className="mb-6 flex space-x-4">
                <input
                    type="text"
                    value={newCarName}
                    onChange={(e) => setNewCarName(e.target.value)}
                    placeholder="Car Name"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={newCarPrice}
                    onChange={(e) => setNewCarPrice(e.target.value)}
                    placeholder="Car Price"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={newCarImageUrl}
                    onChange={(e) => setNewCarImageUrl(e.target.value)}
                    placeholder="Image URL"
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-300 flex items-center"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    {editingCarId ? 'Update Car' : 'Add Car'}
                </button>
            </form>

            {/* Displaying Cars in a Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {cars.length > 0 ? (
                    cars.map((car) => (
                        <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={car.imageUrl} alt={car.name} className="w-full h-48 object-cover" />
                            <div className="p-4 relative">
                                <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
                                <p className="text-md font-bold text-gray-600">${car.price}</p>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button onClick={() => editCar(car)} className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition duration-300">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button onClick={() => deleteCar(car.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition duration-300">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No cars available</p>
                )}
            </div>
        </div>
    );
};

export default App;