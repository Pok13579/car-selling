"use client";

import { useEffect, useState } from 'react';

import { checkAuthState } from '../Auth';

import AuthDialog from '../pages/AuthDialog';
import TodoItem from '../pages/TodoItems';

export default function Home() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white flex flex-col min-h-screen">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">Welcome to Our Todo App</div>
            <AuthDialog onLogin={setUser} customClass="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300" />
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Manage Your Tasks with Ease</h1>
          <h2 className="text-xl mb-4 text-gray-600">Stay organized, focused, and in control</h2>
          {user ? <TodoItem user={user} /> : null}
        </section>
      </main>

      <footer className="bg-blue-600 py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white">© 2024 Mallika Kliangkhlao. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
