import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FlightSearch() {
    const [formData, setFormData] = useState({
        origin: "",
        destination: "",
        departureDate: "",
    });

    const [flights, setFlights] = useState([]);
    const [allFlights, setAllFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [showModal, setShowModal] = useState(false);
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
            const data = response.data;
            console.log("API Response:", data);
            setFlights(data);
            setAllFlights(data);
            localStorage.setItem(
                "flightData",
                JSON.stringify(data || [])
            );
        } catch (error) {
            setError("Failed to fetch flight data");
        } finally {
            setLoading(false);
        }
    };

    const handleFlightDetails = (flight) => {
        setSelectedFlight(flight);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedFlight(null);
        setShowModal(false);
    };

    const handleCarrierCodeFilter = (carrier) => {
        if (carrier === "ALL") {
            setFlights([...allFlights]);
        } else {
            setFlights(() =>
                allFlights.filter(
                    (flight) =>
                        flight.itineraries[0].segments[0].carrierCode ===
                        carrier
                )
            );
        }
    };

    useEffect(() => {
        const storedFlights = localStorage.getItem("flightData");
        if (storedFlights) {
            const parsedFlights = JSON.parse(storedFlights);
            setFlights(parsedFlights);
            setAllFlights(parsedFlights);
        }
    }, []);

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

            <div className="w-1/2 flex justify-center flex-wrap mx-auto my-4">
                <span
                    className="mx-2 cursor-pointer font-bold border border-gray-400 rounded-lg px-3 my-1"
                    onClick={() => handleCarrierCodeFilter("ALL")}
                >
                    ALL
                </span>
                {[
                    ...new Set(
                        allFlights.map(
                            (flight) =>
                                flight.itineraries[0].segments[0].carrierCode
                        )
                    ),
                ].map((carrier, index) => (
                    <span
                        key={index}
                        className="mx-2 cursor-pointer border border-gray-400 rounded-lg px-3 my-1"
                        onClick={() => handleCarrierCodeFilter(carrier)}
                    >
                        {carrier}
                    </span>
                ))}
            </div>

            {flights.map((flight, index) => {
                return (
                    <div
                        key={index}
                        className="flex w-1/2 my-2 mx-auto py-2 px-4 flex-row justify-between border border-gray-500 rounded-lg"
                    >
                        <div className="fs-5 font-bold">
                            {flight.itineraries[0].segments[0].carrierCode}{" "}
                            {flight.itineraries[0].segments[0].number}
                        </div>
                        <div>
                            <div className="fs-4 font-bold">
                                {
                                    flight.itineraries[0].segments[0].departure
                                        .iataCode
                                }
                            </div>
                            <div>
                                {flight.itineraries[0].segments[0].departure.at}
                            </div>
                        </div>
                        <div className="">
                            <div>
                                <span className="">No of stops: </span>
                                {flight.itineraries[0].segments.length - 1}
                            </div>
                            <hr />
                            <div>{flight.itineraries[0].duration}</div>
                        </div>
                        <div className="mb-4">
                            <div className="fs-4 font-bold">
                                {
                                    flight.itineraries[0].segments.at(-1)
                                        .arrival.iataCode
                                }
                            </div>
                            <div>
                                {
                                    flight.itineraries[0].segments.at(-1)
                                        .arrival.at
                                }
                            </div>
                        </div>
                        <div className="">
                            <div className="fs-4 font-bold">
                                {flight.price.grandTotal}{" "}
                                {flight.price.currency}
                            </div>
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white my-2 py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                                Book Now
                            </button>
                            <button
                                data-modal-target="default-modal"
                                data-modal-toggle="default-modal"
                                className="block text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm py-1 px-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="button"
                                onClick={() => handleFlightDetails(flight)}
                            >
                                View Flight Details
                            </button>
                        </div>
                    </div>
                );
            })}

            {showModal && selectedFlight && (
                <div
                    id="default-modal"
                    tabIndex="-1"
                    className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
                >
                    <div className="bg-white rounded-lg shadow-md w-1/2 p-4">
                        <div className="flex items-center justify-between border-b pb-2">
                            <h3 className="text-lg font-semibold">
                                Flight Details
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex justify-between my-2">
                            <p>
                                <strong>From:</strong>{" "}
                                {
                                    selectedFlight.itineraries[0].segments[0]
                                        .departure.iataCode
                                }{" "}
                                (
                                {
                                    selectedFlight.itineraries[0].segments[0]
                                        .departure.at
                                }
                                )
                            </p>
                            <p>
                                <strong>To:</strong>{" "}
                                {
                                    selectedFlight.itineraries[0].segments.at(
                                        -1
                                    ).arrival.iataCode
                                }{" "}
                                (
                                {
                                    selectedFlight.itineraries[0].segments.at(
                                        -1
                                    ).arrival.at
                                }
                                )
                            </p>
                        </div>

                        <div className="flex justify-between my-2">
                            <p>
                                <strong>Airline:</strong>{" "}
                                {
                                    selectedFlight.itineraries[0].segments[0]
                                        .carrierCode
                                }
                            </p>
                            <p>
                                <strong>Flight No:</strong>{" "}
                                {
                                    selectedFlight.itineraries[0].segments[0]
                                        .number
                                }
                            </p>
                            <p>
                                <strong>Stops:</strong>{" "}
                                {selectedFlight.itineraries[0].segments.length -
                                    1}
                            </p>
                            <p>
                                <strong>Duration:</strong>{" "}
                                {selectedFlight.itineraries[0].duration}
                            </p>
                        </div>
                        <hr />
                        <h5 className="mt-2">Pricing</h5>
                        <p>
                            <strong>Total:</strong>{" "}
                            {selectedFlight.price.grandTotal}{" "}
                            {selectedFlight.price.currency}
                        </p>
                        <hr />
                        <h5 className="mt-2">
                            <strong>Traveler Breakdown</strong>
                        </h5>
                        {selectedFlight.travelerPricings.map(
                            (traveler, tIndex) => (
                                <div key={tIndex} className="border-b ">
                                    <div>
                                        Price: {traveler.price.total}{" "}
                                        {traveler.price.currency}
                                    </div>
                                    <div className="flex flex-row gap-8 p-2">
                                        {traveler.fareDetailsBySegment.map(
                                            (segment, sIndex) => {
                                                return (
                                                    <div key={sIndex}>
                                                        <div>
                                                            {
                                                                traveler.travelerType
                                                            }
                                                        </div>
                                                        <div>
                                                            {segment.cabin}
                                                        </div>

                                                        {/* <button className="bg-blue-600 text-white px-2 py-1 mt-2 rounded">
                                                            Select
                                                        </button> */}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
