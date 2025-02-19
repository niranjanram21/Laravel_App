import React from "react";
import { useForm } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        {errors.email && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        {errors.password && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="mb-4 flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={data.remember}
                            onChange={(e) => setData("remember", e.target.checked)}
                            className="h-4 w-4 text-indigo-600"
                        />
                        <label
                            htmlFor="remember"
                            className="text-sm text-gray-700"
                        >
                            Remember Me
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}