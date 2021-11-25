<?php header("Content-Type: application/javascript");
$maps_call = getenv('MAPS_CALL') ?>


script = document.createElement('script');
script.src = $maps_call
script.async;
document.querySelector('head').append(script);