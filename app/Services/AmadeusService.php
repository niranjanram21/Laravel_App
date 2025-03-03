<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

class AmadeusService
{
    protected $client;
    protected $baseUrl;

    public function __construct()
    {
        $this->client = new Client();
        $this->baseUrl = env('AMADEUS_ENV') === 'sandbox'
            ? 'https://test.api.amadeus.com'
            : 'https://api.amadeus.com';
    }

    private function getAccessToken()
    {
        if (Cache::has('amadeus_access_token')) {
            return Cache::get('amadeus_access_token');
        }

        $response = $this->client->post("{$this->baseUrl}/v1/security/oauth2/token", [
            'form_params' => [
                'grant_type' => 'client_credentials',
                'client_id' => env('AMADEUS_API_KEY'),
                'client_secret' => env('AMADEUS_API_SECRET'),
            ]
        ]);

        $data = json_decode($response->getBody(), true);
        $accessToken = $data['access_token'];

        Cache::put('amadeus_access_token', $accessToken, now()->addSeconds($data['expires_in']));

        return $accessToken;
    }

    public function getFlightOffers($origin, $destination, $departureDate)
    {
        $token = $this->getAccessToken();
        $cabinClasses = ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'];
        $allOffers = [];

        foreach ($cabinClasses as $cabinClass) {
            $response = $this->client->get("{$this->baseUrl}/v2/shopping/flight-offers", [
                'headers' => [
                    'Authorization' => "Bearer $token",
                    'Content-Type' => 'application/json',
                ],
                'query' => [
                    'originLocationCode' => $origin,
                    'destinationLocationCode' => $destination,
                    'departureDate' => $departureDate,
                    'adults' => 1,
                    'children' => 1,
                    'travelClass' => $cabinClass,
                    'max' => 50,
                ]
            ]);

            $data = json_decode($response->getBody(), true);

            if (!empty($data['data'])) {
                $allOffers = array_merge($allOffers, $data['data']);
            }
        }

        return $allOffers;
    }
}
