<?php

namespace ID90\services;

interface ProviderInterface {
  public function getAirlines();
  public function loginUser(string $airline, array $credentials, array $options = []);
  public function searchHotels(string $location, int $guest, array $date, array $options = []);
}