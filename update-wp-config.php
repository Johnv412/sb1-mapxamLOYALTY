<?php
require_once('wp-load.php');

$config_file = ABSPATH . 'wp-config.php';
$config_content = file_get_contents($config_file);

// Remove any existing debug settings
$config_content = preg_replace('/define\s*\(\s*[\'"]WP_DEBUG[\'"]\s*,.*?\);/s', '', $config_content);
$config_content = preg_replace('/define\s*\(\s*[\'"]WP_DEBUG_LOG[\'"]\s*,.*?\);/s', '', $config_content);
$config_content = preg_replace('/define\s*\(\s*[\'"]WP_DEBUG_DISPLAY[\'"]\s*,.*?\);/s', '', $config_content);

// Add new debug settings
$debug_settings = "
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
";

$insertion_point = strpos($config_content, "/* That's all, stop editing!");
if ($insertion_point !== false) {
    $config_content = substr_replace($config_content, $debug_settings, $insertion_point, 0);
}

file_put_contents($config_file, $config_content);
echo "wp-config.php has been updated with correct debug settings.";
?>