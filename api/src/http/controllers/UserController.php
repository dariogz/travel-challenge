<?php

namespace ID90\http\controllers;

use ID90\lib\Controller;
use ID90\lib\Request;
use ID90\services\ProviderService;
use ID90\services\AuthService;

class UserController extends Controller
{
  public function login() {

    if(AuthService::isLoggedIn()) {
      throw new \Exception("User is already logged in");
    }

    $provider = ProviderService::make('ID90Travel');
    $request = Request::body();
    $user = $provider->loginUser(
      $request['airline'],
      ['username' => $request['username'], 'password' => $request['password']],
      ['remember_me' => $request['remember_me'] ?? 0],
    );
    AuthService::login($user);

    $this->response([
      'user' => $user
    ]);
  }

  public function logout() {

    if(!AuthService::isLoggedIn()) {
      throw new \Exception("User is not logged in");
    }

    AuthService::logout();
    $this->response([
      'message' => "You have successfully logged out!"
    ]);
  }

  public function user() {
    die("user");
  }
}