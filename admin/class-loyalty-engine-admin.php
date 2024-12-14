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

    public function register_settings() {
        // Register a new setting for "loyalty_engine" page
        register_setting('loyalty_engine', 'loyalty_engine_options');

        // Register a new section in the "loyalty_engine" page
        add_settings_section(
            'loyalty_engine_general_section',
            __('General Settings', 'loyalty-engine'),
            array($this, 'loyalty_engine_general_section_callback'),
            'loyalty_engine'
        );

        // Register a new field in the "loyalty_engine_general_section" section, inside the "loyalty_engine" page
        add_settings_field(
            'loyalty_engine_points_per_dollar',
            __('Points per Dollar', 'loyalty-engine'),
            array($this, 'loyalty_engine_points_per_dollar_callback'),
            'loyalty_engine',
            'loyalty_engine_general_section'
        );
    }

    public function loyalty_engine_general_section_callback() {
        echo '<p>' . __('Configure general settings for the loyalty program.', 'loyalty-engine') . '</p>';
    }

    public function loyalty_engine_points_per_dollar_callback() {
        $options = get_option('loyalty_engine_options');
        $value = isset($options['points_per_dollar']) ? $options['points_per_dollar'] : '';
        echo '<input type="number" id="loyalty_engine_points_per_dollar" name="loyalty_engine_options[points_per_dollar]" value="' . esc_attr($value) . '" />';
    }
}