<?php
class Loyalty_Engine_Admin {
    private $plugin_name;
    private $version;

    public function __construct($plugin_name, $version) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }

    public function enqueue_styles() {
        wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/loyalty-engine-admin.css', array(), $this->version, 'all');
    }

    public function enqueue_scripts() {
        wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/loyalty-engine-admin.js', array('jquery'), $this->version, false);
    }

    public function add_plugin_admin_menu() {
        add_menu_page(
            'LoyaltyEngine', 
            'LoyaltyEngine', 
            'manage_options', 
            $this->plugin_name, 
            array($this, 'display_plugin_setup_page'),
            'dashicons-star-filled',
            6
        );
    }

    public function display_plugin_setup_page() {
        include_once('partials/loyalty-engine-admin-display.php');
    }
}