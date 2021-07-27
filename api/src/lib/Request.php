<?php

namespace ID90\lib;

class Request
{
  public static function method() {
    return strtolower($_SERVER['REQUEST_METHOD']);
  }

  public static function path() {
    $path = $_SERVER['REQUEST_URI'];
    $position = strpos($_SERVER['REQUEST_URI'], '?');
    if ($position !== false) {
      $path = substr($path, 0, $position);
    }
    return $path;
  }

  public static function isGet() {
    return self::method() === 'get';
  }

  public static function isPost() {
    return self::method() === 'post';
  }

  public static function body() {
    $data = [];
    if (self::isGet()) {
      foreach ($_GET as $key => $value) {
        $data[$key] = filter_input(INPUT_GET, $key, FILTER_SANITIZE_SPECIAL_CHARS);
      }
    }
    if (self::isPost()) {
      $data = json_decode(file_get_contents("php://input"), true);
    }
    return $data;
  }
}