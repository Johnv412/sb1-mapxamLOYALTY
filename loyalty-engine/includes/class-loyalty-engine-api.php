<?php
class Loyalty_Engine_API {
    public function register_routes() {
        add_action('rest_api_init', array($this, 'register_api_routes'));
    }

    public function register_api_routes() {
        register_rest_route('loyalty-engine/v1', '/rewards', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_rewards'),
            'permission_callback' => array($this, 'check_permissions'),
        ));

        register_rest_route('loyalty-engine/v1', '/customer-points', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_customer_points'),
            'permission_callback' => array($this, 'check_permissions'),
        ));
    }

    public function check_permissions() {
        return current_user_can('read');
    }

    public function get_rewards($request) {
        global $wpdb;
        $rewards = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}loyalty_rewards WHERE active = 1");
        return new WP_REST_Response($rewards, 200);
    }

    public function get_customer_points($request) {
        $user_id = get_current_user_id();
        global $wpdb;
        $points = $wpdb->get_var($wpdb->prepare(
            "SELECT points FROM {$wpdb->prefix}loyalty_customer_points WHERE user_id = %d",
            $user_id
        ));
        return new WP_REST_Response(array('points' => (int)$points), 200);
    }
}