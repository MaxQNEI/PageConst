<?php

echo "watch():", PHP_EOL;

require 'init.php';

watch([SRCROOT, BLDROOT], function() {
    exec("reset");

    exec("php " . escapeshellarg(BLDROOT . '/index.php'), $output, $return_var);

    $output = trim(join(PHP_EOL, $output));
    echo $output, PHP_EOL, PHP_EOL;
});
