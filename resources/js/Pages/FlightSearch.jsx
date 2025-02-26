import React, { useState } from "react";
import axios from "axios";

export default function FlightSearch() {
    const [formData, setFormData] = useState({
        origin: "",
        destination: "",
        departureDate: "",
    });

    const [flights, setFlights] = useState([]); // ✅ Use useState instead of useRef
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get("/flights", { params: formData });
            console.log("API Response:", response.data.data);
            setFlights(response.data.data || []); // ✅ Update state, triggering re-render
        } catch (error) {
            setError("Failed to fetch flight data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex justify-center">
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Search Flights</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">
                                Origin:
                            </label>
                            <input
                                type="text"
                                name="origin"
                                value={formData.origin}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                placeholder="e.g. BOM"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">
                                Destination:
                            </label>
                            <input
                                type="text"
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                placeholder="e.g. JFK"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">
                                Departure Date:
                            </label>
                            <input
                                type="date"
                                name="departureDate"
                                value={formData.departureDate}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
                            disabled={loading}
                        >
                            {loading ? "Searching..." : "Search Flights"}
                        </button>
                    </form>

                    {error && <p className="text-red-600 mt-4">{error}</p>}
                </div>
            </div>

            {flights.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Flight Results:</h3>
                    <ul className="mt-2">
                        {flights.map((flight, index) => (
                            <div
                                key={index}
                                className="flex justify-center bg-gray-200 border p-4 rounded my-2 shadow"
                            >
                                <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
                                    {
                                        flight.itineraries[0].segments[0]
                                            .carrierCode
                                    }
                                    {flight.itineraries[0].segments[0].number}
                                </div>
                                <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
                                    <div className="fs-4 fw-bold primary-text-color">
                                        {
                                            flight.itineraries[0].segments[0]
                                                .departure.iataCode
                                        }
                                    </div>
                                    <div>
                                        {
                                            flight.itineraries[0].segments[0]
                                                .departure.at
                                        }
                                    </div>
                                </div>
                                <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
                                    3
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
