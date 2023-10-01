"use client"
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Hnavbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="p-4 dark:bg-gray-800 text-white">
      <div className="container flex justify-between h-16 mx-auto">
        <a
          rel="noopener noreferrer"
          href="/"
          aria-label="Back to homepage"
          className="flex items-center p-2 border border-red-500 text-white px-3 py-1 rounded"
        >
         BloGGer
        </a>
        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <ul className="flex flex-col space-y-3">
              <li className="flex">
                <a
                  rel="noopener noreferrer"
                  href="/"
                  className={`flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400 ${
                    router.pathname === '/blog/' ? 'border-violet-400' : ''
                  }`}
                >
                  Home
                </a>
              </li>
              <li className="flex">
                <a
                  rel="noopener noreferrer"
                  href="/auth/login"
                  className={`flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400 ${
                    router.pathname === '/blog/new' ? 'border-violet-400' : ''
                  }`}
                >
                  Login
                </a>
              </li>
              <li className="flex">
                <a
                  rel="noopener noreferrer"
                  href="/auth/register"
                  className={`flex items-center px-4 -mb-1 border-b-2 dark:border-transparent ${
                    router.pathname === '/profile' ? 'border-violet-400' : ''
                  }`}
                >
                  Register
                </a>
              </li>
            </ul>
            
          </div>
        )}
        {/* Desktop Menu */}
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <a
              rel="noopener noreferrer"
              href="/"
              className={`flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400 ${
                router.pathname === '/blog' ? 'border-violet-400' : ''
              }`}
            >
              Home
            </a>
          </li>
          <li className="flex">
            <a
              rel="noopener noreferrer"
              href="/auth/login"
              className={`flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400 ${
                router.pathname === '/blog/new' ? 'border-violet-400' : ''
              }`}
            >
Login
            </a>
          </li>
          <li className="flex">
            <a
              rel="noopener noreferrer"
              href="/auth/register"
              className={`flex items-center px-4 -mb-1 border-b-2 dark:border-transparent ${
                router.pathname === '/profile' ? 'border-violet-400' : ''
              }`}
            >
              Register
            </a>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
         
        </div>
      </div>
    </header>
  );
};

export default Hnavbar;
