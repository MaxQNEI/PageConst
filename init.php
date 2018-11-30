<?php

ini_set('display_errors', true);
ini_set('error_reporting', E_ALL);

(php_sapi_name() != 'cli') && header('Content-Type: text/plain; charset=UTF-8');

defined('ROOT') || define('ROOT', __DIR__);
defined('BLDROOT') || define('BLDROOT', ROOT . '/bld');
defined('LIBROOT') || define('LIBROOT', ROOT . '/lib');
defined('SRCROOT') || define('SRCROOT', ROOT . '/src');
defined('WEBROOT') || define('WEBROOT', ROOT . '/web');

!is_dir(BLDROOT) && exec('mkdir -p ' . escapeshellarg(BLDROOT));
!is_dir(LIBROOT) && exec('mkdir -p ' . escapeshellarg(LIBROOT));
!is_dir(SRCROOT) && exec('mkdir -p ' . escapeshellarg(SRCROOT));
!is_dir(WEBROOT) && exec('mkdir -p ' . escapeshellarg(WEBROOT));

defined('EXT2MIME') || define('EXT2MIME', [
    'ico' => 'image/x-icon',
    'png' => 'image/png',
    'svg' => 'image/svg+xml',

    'css' => 'text/css',
    'js' => 'text/javascript',
]);
