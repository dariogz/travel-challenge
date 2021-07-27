<?php 
use PHPUnit\Framework\TestCase;
use ID90\services\ProviderService;
use ID90\services\providers\ID90Travel;

final class ID90TravelProviderTest extends TestCase
{
  const PROVIDER_NAME = 'ID90Travel';

  public function testId90TravelProviderCanBeInstantiated(): void
  {
    $this->assertInstanceOf(
      ID90Travel::class,
      ProviderService::make(self::PROVIDER_NAME)
    );
  }

  public function testId90TravelProviderGetAirlines(): void
  {
    $provider = ProviderService::make(self::PROVIDER_NAME);
    $airlines = $provider->getAirlines();

    $this->assertIsArray(
      $airlines
    );

    $this->assertNotEmpty(
      $airlines
    );

    $values = array_values($airlines);
    $this->assertIsString(array_shift($values));
  }

}
