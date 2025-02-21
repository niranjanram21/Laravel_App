import React from "react";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

const AuthenticatedLayout = ({ children, user }) => {
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
                <nav className="hidden gap-12 lg:flex">
                    <Link href="/" className="hover:text-indigo-300">
                        Home
                    </Link>
                    <Link href="/about" className="hover:text-indigo-300">
                        About
                    </Link>
                    <Link href="/contact" className="hover:text-indigo-300">
                        Contact
                    </Link>
                </nav>
                <div className="mt-3 space-y-1">
                    <Link method="post" href="/logout" as="button">
                        Log Out
                    </Link>
                </div>
            </header>

            {/* Page Content */}
            <div user={user}></div>
            <main className="p-6">{children}</main>

            {/* Footer */}
            {/* <footer className="bg-gray-800 text-gray-300 text-center py-4">
                &copy; {new Date().getFullYear()} MyApp. All rights reserved.
            </footer> */}
        </div>
    );
};

export default AuthenticatedLayout;
