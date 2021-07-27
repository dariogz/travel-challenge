<?php 
use PHPUnit\Framework\TestCase;
use ID90\lib\Router;

final class RouterTest extends TestCase
{
  public function testRouterCanBeInstantiated(): void
  {
    $this->assertInstanceOf(
      Router::class,
      Router::load()
    );
  }

  public function testRouterRoutesCanBeDeclared(): void
  {
    $GET_ROUTE = '/test/api';
    $TEST_CLASS = 'TestClass';
    $TEST_METHOD = 'testMethod';

    $router = Router::load();
    $router->get($GET_ROUTE, [$TEST_CLASS, $TEST_METHOD]);
    $routes = $router->routes();

    $this->assertEquals(
      $routes['get'][$GET_ROUTE][0],
      $TEST_CLASS
    );    
  }
}
