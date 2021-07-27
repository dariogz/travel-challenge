<?php

namespace ID90\services\providers;

use GuzzleHttp\Client;
use ID90\lib\Session;
use ID90\services\ProviderInterface;

class ID90Travel implements ProviderInterface {

  private Client $httpClient;
  private $baseUrl = 'https://beta.id90travel.com';

  public function __construct() {
    $this->httpClient = new Client;
  }

  /**
   * Retrives Airlines from API
   */
  public function getAirlines() {
    $api = $this->httpClient->get($this->baseUrl.'/airlines');
    $apiResponse = json_decode($api->getBody()->getContents());
    $airlines = [];

    foreach($apiResponse as $airline) {
      $airlines[$airline->id] = $airline->display_name;
    }

    return $airlines;
  }

  /**
   * Authenticate user within the API
   */
  public function loginUser(string $airline, array $credentials, array $options = []) {
    try {
      $request = $this->httpClient->post($this->baseUrl.'/session.json', [
        'headers' => [
          'Content-Type' => 'application/x-www-form-urlencoded'
        ],
        'form_params' => [
          'session[airline]' => $airline,
          'session[username]' => $credentials['username'],
          'session[password]' => $credentials['password'],
          'session[remember_me]' => $options['remember'] ?? 0,
        ]
      ]);
    } catch (\Throwable $th) {
      throw new \Exception("Invalid Username or Password");
    }

    $response = json_decode($request->getBody()->getContents());
    return [
      'id' => $response->member->id,
      'airline' => $response->member->airline,
      'avatar_url' => $response->member->profile_image_url,
      'name' => $response->member->first_name,
      'last_name' => $response->member->last_name,
      'email' => $response->member->email
    ];
  }

  /**
   * Searches Hotels on ID90 Travel Platform
   */
  public function searchHotels(string $location, int $guest, array $date, array $options = []) {
    $api = $this->httpClient->get($this->baseUrl.'/api/v1/hotels.json', [
      'query' => [
        'guests[]' => $guest,
        'checkin' => $date['from'],
        'checkout' => $date['to'],
        'destination' => $location
      ]
    ]);
    $apiResponse = json_decode($api->getBody()->getContents());
    $hotels = [];

    foreach($apiResponse->hotels as $hotel) {
      $distance = (array) $hotel->distance_to_airports;
      $hotels[] = [
        'hotel' => [
          'title' => $hotel->name,
          'location' => $hotel->location->description . ", " . $hotel->location->city . ", " . $hotel->location->country,
          'description' => $hotel->description,
          'distance_to_airport' => array_splice($distance, 0, 1),
          'photo' =>  $hotel->image,
          'review_count' => $hotel->ratings->guest->overallRating->count,
          'review_rating' => $hotel->ratings->guest->overallRating->overall,
          'review_category' => $hotel->ratings->guest->overallRating->overallCategory
        ],
        'booking' => [
          'rooms' => $hotel->number_of_rooms,
          'nights' => $hotel->nights,
          'price_total' => $hotel->total
        ]
      ];
    }

    return [
      'hotels' => $hotels,
      'count' => count($hotels),
      'pages' => $apiResponse->meta->total_pages
    ];
  }
}