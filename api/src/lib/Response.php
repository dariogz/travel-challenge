<?php

namespace ID90\lib;

class Response 
{
  public static function json($body = false, int $code = 200) {
    header('Content-type: application/json');
    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    header('Access-Control-Allow-Credentials: true');
    http_response_code($code);

    if ($body)
      echo json_encode($body);
    die;
  }
}