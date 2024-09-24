"use client"; 
import { useEffect, useState } from 'react';
import { checkAuthState } from '../Auth';
import AuthDialog from '../pages/AuthDialog';
import TodoItem from '../pages/TodoItems';
import CarMenu from '../pages/CarMenu';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0); // State to track the current image index

  // Array of car image URLs
  const carImages = [
    "https://images-porsche.imgix.net/-/media/E969499404154DB79BAD58EF5CC8CFAB_82BBE0A2462E47C4B1DB34EA0B23B853_CZ25W12IX0010-911-carrera-gts-side?w=1400&q=85&crop=faces%2Centropy%2Cedges&auto=format",
    "https://images-porsche.imgix.net/-/media/E469499404154DB79BAD58EF5CC8CFAB_82BBE0A2462E47C4B1DB34EA0B23B853_CZ25W12IX0010-911-turbo-s-side?w=1400&q=85&crop=faces%2Centropy%2Cedges&auto=format",
    "https://images-porsche.imgix.net/-/media/E369499404154DB79BAD58EF5CC8CFAB_82BBE0A2462E47C4B1DB34EA0B23B853_CZ25W12IX0010-911-targa-side?w=1400&q=85&crop=faces%2Centropy%2Cedges&auto=format"
    // Add more URLs as needed
  ];

  useEffect(() => {
    checkAuthState()
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Auth state check failed:", error);
        setLoading(false);
      });
  }, []);

  const handleNextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % carImages.length);
  };

  const handlePrevImage = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + carImages.length) % carImages.length);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white flex flex-col min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold text-blue-600 tracking-wide">PORSCHE</div>
          <div className="flex items-center">
            <div className="text-lg font-medium text-gray-600 hover:text-blue-600 transition duration-300 mr-6 cursor-pointer">
              Menu
            </div>
            {!user && (
              <AuthDialog 
                onLogin={setUser} 
                customClass="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300" 
              />
            )}
          </div>
        </nav>
      </header>

      {/* Main Section */}
      <main className="flex-grow">
        <section className="relative">
          <div 
            className="relative w-full h-[70vh] bg-cover bg-center"
            style={{ 
              backgroundImage: `url('${carImages[imageIndex]}')`, // Use the current image from the state
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center text-white space-y-4 animate-fade-in">
                {/* Content here */}
              </div>
            </div>
            {/* Left and Right Navigation Buttons */}
            <div className="absolute inset-y-0 left-4 flex items-center">
              <button 
                className="bg-white bg-opacity-70 hover:bg-opacity-100 transition-all text-gray-800 p-3 rounded-full shadow-lg" 
                onClick={handlePrevImage} // Handle left button click
              >
                {"<"}
              </button>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center">
              <button 
                className="bg-white bg-opacity-70 hover:bg-opacity-100 transition-all text-gray-800 p-3 rounded-full shadow-lg" 
                onClick={handleNextImage} // Handle right button click
              >
                {">"}
              </button>
            </div>
          </div>
        </section>

        {/* Task Section */}
        <section className="container mx-auto px-6 py-12 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Manage Your Tasks with Ease</h2>
          <p className="text-lg text-gray-600 mb-10">Stay organized, focused, and in control</p>
          {user ? (
            <TodoItem user={user} />
          ) : (
            <div>
              <p className="text-lg text-gray-600">Please sign in to manage your tasks.</p>
            </div>
          )}
        </section>

        {/* Include CarMenu here */}
        <section className="container mx-auto px-6 py-12">
          <CarMenu />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white">© 2024 Lapatrada Chotirat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
