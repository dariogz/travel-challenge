<?php

namespace ID90\http\controllers;

use ID90\lib\Controller;
use ID90\services\ProviderService;
use ID90\services\AuthService;

class AppController extends Controller
{
  public function config() {
    
    $provider = ProviderService::make('ID90Travel');
    
    $this->response([
      'airlines' => $provider->getAirlines(),
      'user' => AuthService::getUser()
    ]);
  }
}