<?php

use ID90\lib\Router;
use ID90\http\controllers\UserController;
use ID90\http\controllers\AppController;
use ID90\http\controllers\SearchController;

$router = Router::load();
$router->get('/api/config', [AppController::class, 'config']);
$router->post('/api/login', [UserController::class, 'login']);
$router->get('/api/logout', [UserController::class, 'logout']);
$router->get('/api/user', [UserController::class, 'user']);
$router->get('/api/search', [SearchController::class, 'search']);