<?php

namespace ID90\lib;

use ID90\lib\Session;

class Application
{
  private static $instance;
  private Router $router;

  public static function start()
  {
    if (!self::$instance instanceof self) {
      self::$instance = new self();
      self::$instance->router = Router::load();
      Session::start();
    }

    return self::$instance;
  }

  public function run() {
    try {
      $this->router->match();
    } catch (\Exception $e) {
      Response::json(["error" => $e->getMessage()], 400);
    }
  }

}