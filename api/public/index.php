<?php

use ID90\lib\Application;
require "../vendor/autoload.php";
require "../src/http/routes.php";

$app = Application::start();
$app->run();
