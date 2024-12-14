<?php
require_once('wp-load.php');

// Deactivate all instances of LoyaltyEngine plugin
$all_plugins = get_plugins();
foreach ($all_plugins as $plugin_path => $plugin_data) {
    if (strpos($plugin_data['Name'], 'LoyaltyEngine') !== false) {
        deactivate_plugins($plugin_path);
    }
}
echo "All LoyaltyEngine plugins have been deactivated.";
?>