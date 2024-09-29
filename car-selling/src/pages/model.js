import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, push, onValue, remove, update } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSave, faMinus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function CartItem({ user }) {
    const [carModels, setCarModels] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartVisible, setCartVisible] = useState(false);

    // Fetch car models
    useEffect(() => {
        const fetchCarModels = async () => {
            const models = [
                { id: '1', name: 'Car 1', price: 20000, imageUrl: 'car1.jpg' },
                { id: '2', name: 'Car 2', price: 25000, imageUrl: 'car2.jpg' },
            ];
            setCarModels(models);
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
        push(ref(db, `users/${user.uid}/cart`), { name: car.name, price: car.price, quantity: 1 });
    };

    // Update quantity in cart
    const increaseQuantity = (id, quantity) => {
        update(ref(db, `users/${user.uid}/cart/${id}`), { quantity: quantity + 1 });
    };

    const decreaseQuantity = (id, quantity) => {
        if (quantity > 1) {
            update(ref(db, `users/${user.uid}/cart/${id}`), { quantity: quantity - 1 });
        } else {
            remove(ref(db, `users/${user.uid}/cart/${id}`));
        }
    };

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Toggle cart visibility
    const toggleCartVisibility = () => {
        setCartVisible(!cartVisible);
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold text-center mb-6">Available Cars</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {carModels.map((car) => (
                    <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                        <img src={car.imageUrl} alt={car.name} className="w-full h-48 object-cover" />
                        <div className="p-4 text-center">
                            <h3 className="text-xl font-semibold text-gray-800">{car.name}</h3>
                            <p className="text-gray-600 mb-3">${car.price}</p>
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

            <div className="text-center mt-8">
                <button onClick={toggleCartVisibility} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300 flex items-center mx-auto">
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                    View Cart ({cartItems.length})
                </button>
            </div>

            {cartVisible && (
                <div className="space-y-4 mt-6">
                    <h2 className="text-3xl font-bold text-center mb-6">Your Cart</h2>
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                                <div className="flex-grow">
                                    <span className="text-gray-800">{item.name}</span>
                                    <div className="text-gray-600">Price: ${item.price}</div>
                                </div>
                                <div className="flex items-center">
                                    <button 
                                        onClick={() => decreaseQuantity(item.id, item.quantity)} 
                                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-l transition duration-300"
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <span className="text-lg mx-2">{item.quantity}</span>
                                    <button 
                                        onClick={() => increaseQuantity(item.id, item.quantity)} 
                                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-r transition duration-300"
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                    <button 
                                        onClick={() => remove(ref(db, `users/${user.uid}/cart/${item.id}`))} 
                                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded ml-2 transition duration-300"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No cars in the cart</p>
                    )}
                    {cartItems.length > 0 && (
                        <div className="bg-white rounded-lg shadow-md p-4 text-right">
                            <h3 className="text-xl font-bold text-gray-800">Total: ${calculateTotal()}</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}