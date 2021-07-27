<?php

class SearchRequest 
{
  public function validate() {

    if (!$this->request['guest']) {
      throw new Exception("Guests is required");
    }

    if (!is_int($this->request['guest'])) {
      throw new Exception("Guests should be an integer");
    }

    if (!$this->request['guest']) {
      throw new Exception("Guests should be an integer");
    }
  }
}