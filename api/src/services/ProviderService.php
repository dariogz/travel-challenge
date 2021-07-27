<?php

namespace ID90\services;

use ID90\services\ProviderInterface;

class ProviderService
{
  public static function make(string $provider) {
    $className = 'ID90\\services\\providers\\'.$provider;

    if(!class_exists($className))
      throw new \Exception("Provider not found");
    
    if(!in_array(ProviderInterface::class, class_implements($className)))
      throw new \Exception("Provider not valid");
              
    return new $className();
  }
}