import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, push, onValue, update, get } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import InCart from './in_cart'; // Import component in_cart.js

export default function CartItem({ user }) {
    const [carSeries, setCarSeries] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [cartVisible, setCartVisible] = useState(false);

    // State for new car form
    const [newCar, setNewCar] = useState({
        id: '',
        imageUrl: '',
        name: '',
        price: '',
        series: '' // Added series field
    });
    // Fetch car models from Firebase Database and group by series
    useEffect(() => {
        const fetchCarModels = async () => {
            const carModelsRef = ref(db, 'cart'); // Assuming carModels is stored at 'cart' in Firebase
            const snapshot = await get(carModelsRef);
            
            if (snapshot.exists()) {
                const models = snapshot.val();
                const groupedBySeries = {};

                // Group the models by series
                Object.entries(models).forEach(([id, model]) => {
                    if (!groupedBySeries[model.series]) {
                        groupedBySeries[model.series] = [];
                    }
                    groupedBySeries[model.series].push({ id, ...model });
                });

                setCarSeries(groupedBySeries);
            } else {
                console.log('No car models available');
            }
        };
        fetchCarModels();
    }, []);

    // Fetch user's cart
    useEffect(() => {
        const cartRef = ref(db, `users/${user.uid}/cart`);
        const unsubscribe = onValue(cartRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const cartList = Object.entries(data).map(([id, item]) => ({ id, ...item }));
                setCartItems(cartList);
            } else {
                setCartItems([]);
            }
        });
        return () => unsubscribe();
    }, [user.uid]);

    // Add car to cart
    const addToCart = (car) => {
        const existingItem = cartItems.find(item => item.name === car.name);
        
        if (existingItem) {
            // If item exists, increase its quantity
            increaseQuantity(existingItem.id, existingItem.quantity);
        } else {
            // If item does not exist, add new item to cart
            push(ref(db, `users/${user.uid}/cart`), { name: car.name, price: car.price, quantity: 1 });
        }
    };

    // Update quantity in cart
    const increaseQuantity = (id, quantity) => {
        update(ref(db, `users/${user.uid}/cart/${id}`), { quantity: quantity + 1 });
    };

    // Toggle cart visibility
    const toggleCartVisibility = () => {
        setCartVisible(!cartVisible);
    };

    return (
        <div className="container mx-auto py-8">
            {!cartVisible ? (
                <>
                    <h2 className="text-3xl font-bold text-center mb-6 text-black">Available Cars</h2>


                    {Object.keys(carSeries).map((series) => (
    <div key={series} className="mb-8">
        <h3 className="text-4xl font-bold mb-4 flex items-center text-black">            
            {series}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
    {carSeries[series].map((car) => (
        <div key={car.id} className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105">
            <img src={car.imageUrl} alt={car.name} className="w-full h-30 object-cover" />
            <div className="p-4 text-center">
                <h4 className="text-xl font-semibold text-gray-800">{car.name}</h4>
                <p className="text-gray-600 mb-3">THB {car.price.toLocaleString()}</p> {/* Format price with commas */}
                <button 
                    onClick={() => addToCart(car)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 w-full"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add to Cart
                </button>
            </div>
        </div>
    ))}
</div>
    </div>
))}


                    <div className="text-center mt-8">
                        <button onClick={toggleCartVisibility} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300 flex items-center mx-auto">
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                            View Cart ({cartItems.length})
                        </button>
                    </div>
                </>
            ) : (
                <InCart cartItems={cartItems} setCartVisible={setCartVisible} user={user} />
            )}
        </div>
    );
}




/////////////////////////////////////IF Youw want to add car remove comment//////////////////////////////////
//import { useEffect, useState } from 'react';
//import { db } from '../firebase';
//import { ref, push, onValue, update, get } from 'firebase/database';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
//import InCart from './in_cart';

//export default function CartItem({ user }) {
//    const [carModels, setCarModels] = useState([]);
//    const [cartItems, setCartItems] = useState([]);
//    const [cartVisible, setCartVisible] = useState(false);
    
//    // State for new car form
//    const [newCar, setNewCar] = useState({
//        id: '',
//        imageUrl: '',
//        name: '',
//        price: '',
//        series: '' // Added series field
//    });

//    // Fetch car models from Firebase Database
//    useEffect(() => {
//        const fetchCarModels = async () => {
//            const carModelsRef = ref(db, 'cart'); 
//            const snapshot = await get(carModelsRef);
            
//            if (snapshot.exists()) {
//                const models = snapshot.val();
//                const modelsList = Object.entries(models).map(([id, model]) => ({ id, ...model }));
//                setCarModels(modelsList);
//            } else {
//                console.log('No car models available');
//            }
//        };
//        fetchCarModels();
//    }, []);

//    // Fetch user's cart
//    useEffect(() => {
//        const cartRef = ref(db, `users/${user.uid}/cart`);
//        const unsubscribe = onValue(cartRef, (snapshot) => {
//            const data = snapshot.val();
//            if (data) {
//                const cartList = Object.entries(data).map(([id, item]) => ({ id, ...item }));
//                setCartItems(cartList);
//            } else {
//                setCartItems([]);
//            }
//        });
//        return () => unsubscribe();
//    }, [user.uid]);

//    // Add car to cart
//    const addToCart = (car) => {
//        const existingItem = cartItems.find(item => item.name === car.name);
        
//        if (existingItem) {
//            increaseQuantity(existingItem.id, existingItem.quantity);
//        } else {
//            push(ref(db, `users/${user.uid}/cart`), { name: car.name, price: car.price, quantity: 1 });
//        }
//    };

//    // Update quantity in cart
//    const increaseQuantity = (id, quantity) => {
//        update(ref(db, `users/${user.uid}/cart/${id}`), { quantity: quantity + 1 });
//    };

//    // Add new car model to Firebase
//    const addCarModel = async (e) => {
//        e.preventDefault(); // Prevent form submission
//        const { id, imageUrl, name, price, series } = newCar;

//        if (id && imageUrl && name && price && series) { // Check if all fields are filled
//            await push(ref(db, 'cart'), { id, imageUrl, name, price, series }); // Push new car model
//            setNewCar({ id: '', imageUrl: '', name: '', price: '', series: '' }); // Reset form
//        } else {
//            alert('Please fill in all fields');
//        }
//    };

//    // Toggle cart visibility
//    const toggleCartVisibility = () => {
//        setCartVisible(!cartVisible);
//    };

//    return (
//        <div className="container mx-auto py-8">
//            {!cartVisible ? (
//                <>
//                    <h2 className="text-3xl font-bold text-center mb-6">Available Cars</h2>
//                    <form onSubmit={addCarModel} className="mb-8">
//                        <h3 className="text-xl font-semibold text-center mb-4">Add New Car Model</h3>
//                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                            <input 
//                                type="text" 
//                                placeholder="ID" 
//                                value={newCar.id} 
//                                onChange={(e) => setNewCar({ ...newCar, id: e.target.value })} 
//                                className="p-2 border rounded"
//                                required 
//                            />
//                            <input 
//                                type="text" 
//                                placeholder="Image URL" 
//                                value={newCar.imageUrl} 
//                                onChange={(e) => setNewCar({ ...newCar, imageUrl: e.target.value })} 
//                                className="p-2 border rounded"
//                                required 
//                            />
//                            <input 
//                                type="text" 
//                                placeholder="Name" 
//                                value={newCar.name} 
//                                onChange={(e) => setNewCar({ ...newCar, name: e.target.value })} 
//                                className="p-2 border rounded"
//                                required 
//                            />
//                            <input 
//                                type="number" 
//                                placeholder="Price" 
//                                value={newCar.price} 
//                                onChange={(e) => setNewCar({ ...newCar, price: e.target.value })} 
//                                className="p-2 border rounded"
//                                required 
//                            />
//                            <input 
//                                type="text" 
//                                placeholder="Series" // New input for series
//                                value={newCar.series} 
//                                onChange={(e) => setNewCar({ ...newCar, series: e.target.value })} 
//                                className="p-2 border rounded"
//                                required 
//                            />
//                        </div>
//                        <button 
//                            type="submit" 
//                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 mt-4"
//                        >
//                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
//                            Add Car
//                        </button>
//                    </form>
                    
//                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                        {carModels.map((car) => (
//                            <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
//                                <img src={car.imageUrl} alt={car.name} className="w-full h-30 object-cover" />
//                                <div className="p-4 text-center">
//                                    <h3 className="text-xl font-semibold text-gray-800">{car.name}</h3>
//                                    <p className="text-gray-600 mb-3">${car.price}</p>
//                                    <p className="text-gray-600 mb-3">ID: {car.id}</p> {/* Display series */}
//                                    <p className="text-gray-600 mb-3">Series: {car.series}</p> {/* Display series */}
//                                    <button 
//                                        onClick={() => addToCart(car)} 
//                                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 w-full"
//                                    >
//                                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
//                                        Add to Cart
//                                    </button>
//                                </div>
//                            </div>
//                        ))}
//                    </div>

//                    <div className="text-center mt-8">
//                        <button onClick={toggleCartVisibility} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300 flex items-center mx-auto">
//                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
//                            View Cart ({cartItems.length})
//                        </button>
//                    </div>
//                </>
//            ) : (
//                <InCart cartItems={cartItems} setCartVisible={setCartVisible} user={user} />
//            )}
//        </div>
//    );
//}
/////////////////////////////////////IF Youw want to add car remove comment//////////////////////////////////

