<?php

namespace App\Http\Controllers;

use App\Services\AmadeusService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AmadeusController extends Controller
{
    protected $amadeusService;

    public function __construct(AmadeusService $amadeusService)
    {
        $this->amadeusService = $amadeusService;
    }

    public function showFlightSearch()
    {
        return Inertia::render("FlightSearch");
    }

    public function getFlightOffers(Request $request)
    {
        $request->validate([
            'origin' => 'required|string|size:3',
            'destination' => 'required|string|size:3',
            'departureDate' => 'required|date',
        ]);

        $flights = $this->amadeusService->getFlightOffers(
            $request->origin,
            $request->destination,
            $request->departureDate,
        );

        return response()->json($flights);
    }
}
