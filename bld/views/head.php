<?php

$title = [];
array_push($title, $app['title']['text']);
isset($module['title']) && array_push($title, $module['title']);
$title = join($app['title']['separator'], $title);

?>

<?php if(isset($module['base'])): ?><base href="<?= $module['base'] ?>"><?php endif; ?>

<meta charset="utf-8">

<title><?= $title ?></title>

<?php foreach($module['favicon'] as $favicon): ?>
    <link rel="shortcut icon" type="<?= $favicon['type'] ?>" href="<?= $favicon['href'] ?>">
<?php endforeach; ?>

<?php foreach($module['styles'] as $style): ?>
    <link rel="stylesheet" type="<?= $style['type'] ?>" href="<?= $style['href'] ?>">
<?php endforeach; ?>

<?php foreach($module['scripts'] as $script): ?>
    <?php $async = (isset($script['async']) ? ' async' : null); ?>
    <script type="<?= $script['type'] ?>" src="<?= $script['src'] ?>"<?= $async ?>></script>
<?php endforeach; ?>
