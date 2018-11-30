<?php

/*******************************************************************************
 *
 * LIBROOT - typically assets for src/web
 *
 * ** BLDROOT - contains php-scripts for build from sources (/src)
 *
 * SRCROOT - this is root directory of client projects.
 *           this directory modifies by Constructor!
 *
 * WEBROOT - compiled sources from LIBROOT + SRCROOT
 *
 ******************************************************************************/

// Initialization ----------------------------------------------------------- //
echo "Initialization";
require 'init.php';

echo " -> checks";
$reqfn = ['view', 'src2web'];
foreach($reqfn as $fnname) {

    if(!function_exists($fnname)) {
        echo ' -> failed!', PHP_EOL;
        return;
    }
}

echo " -> success!", PHP_EOL;

// Loading srcconfig -------------------------------------------------------- //
$srcconfig = SRCROOT . '/index.json';
echo "Loading src/index.json";
$app = file_get_contents($srcconfig);
$app = json_decode($app, true);
if(empty($app)) {
    echo " -> failed!", PHP_EOL;
    return;
}
echo " -> success!", PHP_EOL;

// Clear/Create web/index.php ----------------------------------------------- //
echo "Clear/Create web/index.php";
file_put_contents(WEBROOT . "/index.php", '');
echo " -> success!", PHP_EOL;

// Modules
echo "Build modules:", PHP_EOL;

foreach($app['modules'] as &$module) {
    echo "Module {$module['name']}", PHP_EOL;

    applyassets();
    applyincludes($module, $app);
    applyfavicon($module, $app);
    applystyles($module, $app);
    applyscripts($module, $app);

    ob_start();
    view('html', compact('app', 'module'));
    file_put_contents(WEBROOT . '/' . $module['name'] . '.php', ob_get_clean());
}

echo "Done.", PHP_EOL;
