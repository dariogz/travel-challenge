<?php

namespace ID90\lib;

class Session
{
  public static function start() {
    session_start();
  }

  public static function set($key, $value) {
    $_SESSION[$key] = $value;
  }

  public static function get($key) {
    return $_SESSION[$key] ?? false;
  }

  public function remove($key) {
    unset($_SESSION[$key]);
  }
}