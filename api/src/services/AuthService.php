<?php

namespace ID90\services;

use ID90\lib\Session;

class AuthService
{
  public static $SESSION_KEY = "user";

  public static function login($userData) {
    return Session::set(self::$SESSION_KEY, $userData);
  }

  public static function logout() {
    return Session::remove(self::$SESSION_KEY);
  }

  public static function isLoggedIn() {
    return (bool) Session::get(self::$SESSION_KEY) ?? false;
  }

  public static function getUser() {
    return Session::get(self::$SESSION_KEY);
  }


}