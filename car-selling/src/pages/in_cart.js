import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase, update, remove, ref } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKZXycWiCL3lveCVMcjcL1KWbLIJggzBA",
    authDomain: "react-50919.firebaseapp.com",
    databaseURL: "https://react-50919-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-50919",
    storageBucket: "react-50919.appspot.com",
    messagingSenderId: "118926940338",
    appId: "1:118926940338:web:a4ffda2fb078c7e75d11ab",
    measurementId: "G-P9H0VPKFD7"
    };
    
// Initialize Firebase (Check if an app already exists)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);

export default function InCart({ cartItems, setCartVisible, user }) {
    // Update quantity in cart
    const increaseQuantity = (id, quantity) => {
        update(ref(db, `users/${user.uid}/cart/${id}`), { quantity: quantity + 1 })
            .catch((error) => console.error("Error updating quantity:", error));
    };

    const decreaseQuantity = (id, quantity) => {
        if (quantity > 1) {
            update(ref(db, `users/${user.uid}/cart/${id}`), { quantity: quantity - 1 })
                .catch((error) => console.error("Error updating quantity:", error));
        } else {
            removeItemFromCart(id);
        }
    };

    const removeItemFromCart = (id) => {
        remove(ref(db, `users/${user.uid}/cart/${id}`))
            .catch((error) => console.error("Error removing item:", error));
    };

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="space-y-4 mt-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-black">Your Cart</h2>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between text-black">
                        <div className="flex-grow">
                            <span className="text-gray-800">{item.name}</span>
                            <div className="text-gray-600">Price: THB {item.price}</div>
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
                                onClick={() => removeItemFromCart(item.id)} 
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded ml-2 transition duration-300"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-600">No items in the cart</p>
            )}
            {cartItems.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-4 text-right">
                    <h3 className="text-xl font-bold text-gray-800">Total: THB {calculateTotal()}</h3>
                </div>
            )}
            <div className="text-center mt-8">
                <button onClick={() => setCartVisible(false)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300">
                    Back to Available Cars
                </button>
            </div>
        </div>
    );
}
