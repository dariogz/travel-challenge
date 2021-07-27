<?php

namespace ID90\lib;

use ID90\lib\Request;
use ID90\lib\Response;

class Router
{
  private static $instance;
  private array $routes = [];
  private Request $request;

  public static function load() {
    if (static::$instance === null) {
      static::$instance = new self();
    }

    return static::$instance;
  }

  public function get($path, $callback) {
    $this->routes['get'][$path] = $callback;
  }

  public function post($path, $callback) {
    $this->routes['post'][$path] = $callback;
  }

  public function match() {
    $method = Request::method();
    $path = Request::path();

    // OPTIONS pre-flight requests
    if($method == 'options') {
      Response::json();
    }

    $callback = $this->routes[$method][$path] ?? false;
    if (!$callback || !is_array($callback)) {
      throw new \Exception("Route not found");
    }

    $controller = new $callback[0];
    $controller->action = $callback[1];
    $middlewares = $controller->middlewares();
    foreach ($middlewares as $middlewares) {
      $middleware->run();
    }
    $callback[0] = $controller;

    return call_user_func($callback);
  }
}