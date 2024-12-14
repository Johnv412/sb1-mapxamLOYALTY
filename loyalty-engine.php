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

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Define plugin constants
define('LOYALTY_ENGINE_VERSION', '1.0.0');
define('LOYALTY_ENGINE_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('LOYALTY_ENGINE_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include necessary files
require_once LOYALTY_ENGINE_PLUGIN_DIR . 'includes/class-loyalty-engine.php';

/**
 * Begins execution of the plugin.
 */
function run_loyalty_engine() {
    try {
        $plugin = new Loyalty_Engine();
        $plugin->run();
    } catch (Exception $e) {
        // Log the error
        error_log('LoyaltyEngine Plugin Error: ' . $e->getMessage());
        
        // Display the error (only during plugin activation)
        if (isset($_GET['action']) && $_GET['action'] === 'activate') {
            wp_die('LoyaltyEngine Plugin Error: ' . $e->getMessage());
        }
    }
}

// Activation hook
register_activation_hook(__FILE__, 'loyalty_engine_activate');

function loyalty_engine_activate() {
    try {
        Loyalty_Engine::activate();
    } catch (Exception $e) {
        wp_die('LoyaltyEngine Activation Error: ' . $e->getMessage());
    }
}

run_loyalty_engine();