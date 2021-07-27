<?php

namespace ID90\http\controllers;

use ID90\lib\Controller;
use ID90\lib\Request;
use ID90\services\AuthService;
use ID90\services\ProviderService;

class SearchController extends Controller
{
  public function search() {

    if(!AuthService::isLoggedIn()) {
      throw new \Exception("User has to be logged in");
    }

    $provider = ProviderService::make('ID90Travel');
    $request = Request::body();

    $this->response([
      'results' => $provider->searchHotels(
        $request['location'],
        $request['guests'],
        ['from' => $request['date_from'], 'to' => $request['date_to']],
      )
    ]);

  }
}