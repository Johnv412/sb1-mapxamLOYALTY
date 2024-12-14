<?php
/**
 * Plugin Name: LoyaltyEngine
 * Plugin URI: https://example.com/loyalty-engine
 * Description: A comprehensive loyalty rewards system for WordPress
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://example.com
 * Text Domain: loyalty-engine
 * Domain Path: /languages
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Define plugin constants
define('LOYALTY_ENGINE_VERSION', '1.0.0');
define('LOYALTY_ENGINE_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('LOYALTY_ENGINE_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include necessary files
require_once LOYALTY_ENGINE_PLUGIN_DIR . 'includes/class-loyalty-engine.php';
require_once LOYALTY_ENGINE_PLUGIN_DIR . 'includes/class-loyalty-engine-activator.php';
require_once LOYALTY_ENGINE_PLUGIN_DIR . 'includes/class-loyalty-engine-deactivator.php';

// Activation and deactivation hooks
register_activation_hook(__FILE__, array('Loyalty_Engine_Activator', 'activate'));
register_deactivation_hook(__FILE__, array('Loyalty_Engine_Deactivator', 'deactivate'));

/**
 * Begins execution of the plugin.
 */
function run_loyalty_engine() {
    $plugin = new Loyalty_Engine();
    $plugin->run();
}
run_loyalty_engine();