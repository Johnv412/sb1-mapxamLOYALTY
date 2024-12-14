<?php
/**
 * Plugin Name: LoyaltyEngine
 * Plugin URI: https://example.com/loyalty-engine
 * Description: A comprehensive loyalty rewards system for WordPress
 * Version: 1.0
 * Author: Your Name
 * Author URI: https://example.com
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Include necessary files
require_once plugin_dir_path(__FILE__) . 'includes/class-loyalty-engine-activator.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-loyalty-engine-deactivator.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-loyalty-engine.php';

// Activation and deactivation hooks
register_activation_hook(__FILE__, array('Loyalty_Engine_Activator', 'activate'));
register_deactivation_hook(__FILE__, array('Loyalty_Engine_Deactivator', 'deactivate'));

// Start the plugin
function run_loyalty_engine() {
    $plugin = new Loyalty_Engine();
    $plugin->run();
}
run_loyalty_engine();

// Add shortcode for displaying user points
function loyalty_engine_user_points_shortcode() {
    if (!is_user_logged_in()) {
        return 'Please log in to view your points.';
    }
    
    $user_id = get_current_user_id();
    $points = get_user_meta($user_id, 'loyalty_points', true);
    
    return "Your current points: " . (int)$points;
}
add_shortcode('loyalty_user_points', 'loyalty_engine_user_points_shortcode');

// Add shortcode for displaying available rewards
function loyalty_engine_available_rewards_shortcode() {
    global $wpdb;
    $rewards = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}loyalty_rewards WHERE active = 1");
    
    $output = '<ul class="loyalty-rewards-list">';
    foreach ($rewards as $reward) {
        $output .= '<li>' . esc_html($reward->name) . ' - ' . esc_html($reward->points) . ' points</li>';
    }
    $output .= '</ul>';
    
    return $output;
}
add_shortcode('loyalty_available_rewards', 'loyalty_engine_available_rewards_shortcode');

// Enqueue React app
function loyalty_engine_enqueue_react_app() {
    wp_enqueue_script('loyalty-engine-react-app', plugin_dir_url(__FILE__) . 'pizza-rewards-webapp/loyalty-engine/dist/assets/index.js', array(), '1.0.0', true);
    wp_enqueue_style('loyalty-engine-react-app-styles', plugin_dir_url(__FILE__) . 'pizza-rewards-webapp/loyalty-engine/dist/assets/index.css');
}
add_action('wp_enqueue_scripts', 'loyalty_engine_enqueue_react_app');