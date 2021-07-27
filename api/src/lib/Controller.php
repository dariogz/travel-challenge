<?php

namespace ID90\lib;

use ID90\lib\Response;

class Controller
{
  protected array $middlewares = [];

  public function __construct() {
    // Constructor
  }

  public function middlewares() {
    return $this->middlewares;
  }

  protected function response($body, int $code = 200) {
    Response::json($body, $code);
  }

}