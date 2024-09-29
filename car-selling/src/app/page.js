"use client";
import { useEffect, useState } from "react";
import { checkAuthState } from "../Auth";
import AuthDialog from "../pages/AuthDialog";
import TodoItem from "../pages/model";
import CarMenu from "../pages/CarMenu"; // Import CarMenu here

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false); // State to control menu visibility
  const [showVideo, setShowVideo] = useState(false); // State to control video visibility
  const [videoUrl, setVideoUrl] = useState(""); // State to control the video URL

  const carImages = [
    "https://images-porsche.imgix.net/-/media/11A4F7B3CD3D4C488368955E46012FDC_2D8453E4A7614E7EAED3939B87065413_TA24Q3EIX0011-taycan-turbo-s-front?w=999&q=85&auto=format",
    "https://files.porsche.com/filestore/image/multimedia/none/992-gt3-rs-modelimage-sideshot/model/cfbb8ed3-1a15-11ed-80f5-005056bbdc38/porsche-model.png", // Add a new car image URL here
    "https://files.porsche.com/filestore/image/multimedia/none/982-718-cayman-gt4rs-modelimage-sideshot/model/ca8f53c1-f3b7-11ed-8103-005056bbdc38/porsche-model.png",
    "https://images-porsche.imgix.net/-/media/5EE5F56AEC67493EB1AA87EAB2721DC0_DDCBAE39F81644E4AAA7B2CA3222DC2E_PA24P5KIX0005-panamera-turbo-e-hybrid-model-intro?w=2560&h=697&q=85&crop=faces%2Centropy%2Cedges&auto=format",
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

  useEffect(() => {
    // Start a timer to show the video if the user does not switch images
    const timer = setTimeout(() => {
      if (currentImageIndex === 0) {
        setVideoUrl("https://www.youtube.com/embed/x4xJ-4piQxI?autoplay=1&mute=1"); // Video for the first image
        setShowVideo(true);
      } else if (currentImageIndex === 1) {
        setVideoUrl("https://www.youtube.com/embed/478Ay_lNpT4?autoplay=1&mute=1"); // Video for the second image
        setShowVideo(true);
      } else if (currentImageIndex === 2) {
        setVideoUrl("https://www.youtube.com/embed/_ruyhTgEvh0?autoplay=1&mute=1"); // Updated video for the third image
        setShowVideo(true);
      } else if (currentImageIndex === 3) {
        setVideoUrl("https://www.youtube.com/embed/EQphZpXZ-vU?autoplay=1&mute=1"); // Video for the fourth image
        setShowVideo(true);
      }
    }, 2000); // Adjust time (5000ms = 5 seconds) as needed

    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carImages.length);
    setShowVideo(false); // Hide video when image is changed
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + carImages.length) % carImages.length
    );
    setShowVideo(false); // Hide video when image is changed
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Toggle menu visibility
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
        <div className="text-5xl font-bold text-black tracking-tight uppercase" style={{ fontFamily: 'sans-serif' }}>
  PORSCHE
</div>
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="text-lg font-medium text-gray-600 hover:text-blue-600 transition duration-300 mr-6"
            >
              Menu
            </button>

            <AuthDialog
              onLogin={setUser}
              customClass="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            />
          </div>
        </nav>
      </header>

      <div className="flex">
        {/* Menu Section */}
        {menuVisible && (
          <aside
            className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex justify-end"
            style={{ transition: "all 0.3s ease" }}
          >
            <div
              className="w-1/2 bg-white  shadow-lg h-full"
              style={{ right: menuVisible ? "0" : "-50%", transition: "right 0.3s ease" }}
            >
              {/* ปุ่ม X */}
              <button
                onClick={toggleMenu}
                className="absolute top-2 right-[52%] text-white font-bold text-xl mb-2 hover:text-gray-400 transition-colors duration-300"
              >
                X
              </button>

              <CarMenu />
            </div>
          </aside>
        )}

        {/* Main Section */}
        <main className="flex-grow">
          <section className="relative">
            <div
              className="relative w-full h-[70vh] bg-cover bg-center"
              style={{
                backgroundImage: `url(${carImages[currentImageIndex]})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              {showVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                  <iframe
                    width="100%"
                    height="100%"
                    src={videoUrl} // Use the dynamic video URL
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              <div className="absolute inset-0  bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white space-y-4 animate-fade-in">
                  {/* Content here */}
                </div>
              </div>
              {/* Left and Right Navigation Buttons */}
              <div className="absolute inset-y-0 left-4 flex items-center">
  <button
    onClick={handlePreviousImage}
    className="bg-white bg-opacity-70 hover:bg-opacity-100 transition-all text-gray-800 p-3 rounded-full shadow-lg border-2 border-black" // Added border here
  >
    {"<"}
  </button>
</div>
<div className="absolute inset-y-0 right-4 flex items-center">
  <button
    onClick={handleNextImage}
    className="bg-white bg-opacity-70 hover:bg-opacity-100 transition-all text-gray-800 p-3 rounded-full shadow-lg border-2 border-black" // Added border here
  >
    {">"}
  </button>
</div>

            </div>
          </section>

          {/* Task Section */}
          <section className="container mx-auto px-6 py-12 text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              In a Porsche, every road feels like a racetrack
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Driving a Porsche is not just about speed, it's about precision, passion, and the art of engineering.
            </p>
            {user ? (
              <TodoItem user={user} />
            ) : (
              <div>
                <p className="text-lg text-gray-600">
                  Please Sign in to discover the ideal car that suits your needs
                </p>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white">© 2024 Lapatrada Chotirat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
