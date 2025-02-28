import React from "react";
import { Link } from "@inertiajs/react";

const GuestLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="mb-8 px-16 flex items-center justify-between border-b py-4 md:mb-12 md:py-8 xl:mb-16">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
                    aria-label="logo"
                >
                    App-Name
                </Link>
                {/* <nav className="hidden gap-12 lg:flex">
                    <Link href="/" className="hover:text-indigo-300">
                        Home
                    </Link>
                    <Link href="/about" className="hover:text-indigo-300">
                        About
                    </Link>
                    <Link href="/contact" className="hover:text-indigo-300">
                        Contact
                    </Link>
                </nav> */}
                <div className="flex gap-4">
                    <Link
                        href="/login"
                        className="hidden rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="hidden rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block"
                    >
                        Register
                    </Link>
                </div>
            </header>

            {/* Page Content */}
            <main className="p-6">{children}</main>

            {/* Footer */}
            {/* <footer className="bg-gray-800 text-gray-300 text-center py-4">
                &copy; {new Date().getFullYear()} MyApp. All rights reserved.
            </footer> */}
        </div>
    );
};

export default GuestLayout;
