<?php

require '../init.php';

function view($path, $vars = null) {
    if(!is_file(($path = ('views/' . $path . '.php')))) {
        throw new Exception('Not found ' . $path);
    }

    is_array($vars) && extract($vars);

    return require $path;
}

function applyassets() {
    foreach(fl(SRCROOT . '/assets') as $assetsrc) {
        src2web(str_replace(SRCROOT . '/assets', '', $assetsrc));
    }
}

function applyincludes(&$module, &$app) {
    if(!isset($module['includes'])) { return; }

    foreach($module['includes'] as $env) {
        $module = array_merge($app[$env], $module);
    }
}

function applyfavicon(&$module, &$app) {
    if(!isset($module['favicon'])) { return; }

    foreach($module['favicon'] as &$favicon) {
        if(is_string($favicon)) {
            $ext = explode('.', $favicon['href']);
            $ext = end($ext);

            $favicon = [
                'type' => EXT2MIME[$ext],
                'href' => $favicon,
            ];
        }
    }
}

function applystyles(&$module, &$app) {
    if(!isset($module['styles'])) { return; }

    foreach($module['styles'] as &$style) {
        if(is_string($style)) {
            $ext = explode('.', $style);
            $ext = end($ext);

            $style = [
                'type' => EXT2MIME[$ext],
                'href' => $style,
            ];
        }
    }
}

function applyscripts(&$module, &$app) {
    if(!isset($module['scripts'])) { return; }

    foreach($module['scripts'] as &$script) {
        if(is_string($script)) {
            $ext = explode('.', $script);
            $ext = end($ext);

            $script = [
                'type' => EXT2MIME[$ext],
                'src' => $script,
            ];
        } else if(is_array($script)) {
            $ext = explode('.', $script['main']);
            $ext = end($ext);

            $script = [
                'type' => EXT2MIME[$ext],
                'src' => $script['main'],
            ];

            if(isset($script['controllers'])) {

            }
        }
    }
}

function src2web($src) {
    if(is_dir($src) || preg_match("/^(https?|\/\/)/ui", $src)) {
        return false;
    }

    $src = str_replace(ROOT, '', $src);
    $src = str_replace(SRCROOT . '/assets', '', $src);

    $web = WEBROOT . $src;
    $src = SRCROOT . '/assets' . $src;

    if(!is_file(($src))) {
        return false;
    }

    if(!is_dir(dirname($web))) {
        exec("mkdir -p " . escapeshellarg(dirname($web)));
    }

    $_src = escapeshellarg($src);
    $_web = escapeshellarg($web);

    exec("cp -f {$_src} {$_web}");
    return true;
}

function watch($path, $handle) {
    $filelist = [];

    if(is_array($path)) {
        foreach($path as $p) {
            array_push($filelist, $p);
            (is_dir($p)) && ($filelist = array_merge($filelist, fl($p)));
        }
    } else if(is_dir($path)) {
        array_push($filelist, $path);
    }

    $filelist = array_map(function($value) { return null; }, array_flip($filelist));

    while(true) {
        $modified = false;
        foreach($filelist as $filepath => &$lmtime) {
            $mtime = filemtime($filepath);
            if(is_null($lmtime) || $lmtime < $mtime) {
                $lmtime = $mtime;
                $modified = true;
            }
        }

        if($modified) {
            echo 'watch(): handle();', PHP_EOL;
            $handle();
        }

        sleep(1);
    }
}

function fl($path) {
    $absfilelist = [];
    $relfilelist = array_slice(scandir($path), 2);

    foreach($relfilelist as $index => &$filename) {
        $filepath = "{$path}/{$filename}";

        if(is_dir($filepath)) {
            array_push($absfilelist, $filepath);
            foreach(fl($filepath) as $filepath) {
                if(!in_array($filepath, $absfilelist)) {
                    array_push($absfilelist, $filepath);
                }
            }
        } else {
            array_push($absfilelist, $filepath);
        }
    }

    sort($absfilelist);

    return $absfilelist;
}
