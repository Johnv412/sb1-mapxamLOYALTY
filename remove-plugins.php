<?php
require_once('wp-load.php');

$plugins_dir = WP_PLUGIN_DIR;
$loyalty_plugins = glob($plugins_dir . '/*loyalty*', GLOB_ONLYDIR);
foreach ($loyalty_plugins as $plugin) {
    system('rm -rf ' . escapeshellarg($plugin));
}
echo "All LoyaltyEngine plugin directories have been removed.";
?>