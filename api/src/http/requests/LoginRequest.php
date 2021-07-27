<?php

class LoginRequest 
{
  public function validate() {

    if (!$this->request['airline'] || !$this->request['username'] || !$this->request['password']) {
      throw new Exception("Airline, Username and Password are required");
    }

    if (!$this->request['username']) {
      throw new Exception("Guests should be an integer");
    }

  }
}