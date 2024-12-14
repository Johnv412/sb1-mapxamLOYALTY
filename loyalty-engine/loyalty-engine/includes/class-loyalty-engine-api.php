<?php
class Loyalty_Engine_API {
    public function register_routes() {
        add_action('rest_api_init', array($this, 'register_api_routes'));
    }

    public function register_api_routes() {
        register_rest_route('loyalty-engine/v1', '/rewards', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_rewards'),
            'permission_callback' => array($this, 'check_customer_permissions'),
        ));

        register_rest_route('loyalty-engine/v1', '/gift-cards', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_gift_cards'),
            'permission_callback' => array($this, 'check_customer_permissions'),
        ));

        register_rest_route('loyalty-engine/v1', '/customer-profile', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_customer_profile'),
            'permission_callback' => array($this, 'check_customer_permissions'),
        ));

        // Add more routes as needed
    }

    public function check_customer_permissions() {
        return is_user_logged_in();
    }

    public function get_rewards($request) {
        global $wpdb;
        $rewards = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}loyalty_rewards WHERE active = 1");
        return new WP_REST_Response($rewards, 200);
    }

    public function get_gift_cards($request) {
        global $wpdb;
        $user_id = get_current_user_id();
        $gift_cards = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}loyalty_gift_cards WHERE user_id = %d AND is_active = 1", $user_id));
        return new WP_REST_Response($gift_cards, 200);
    }

    public function get_customer_profile($request) {
        $user_id = get_current_user_id();
        $user = get_userdata($user_id);
        $points = get_user_meta($user_id, 'loyalty_points', true);

        $profile = array(
            'id' => $user_id,
            'name' => $user->display_name,
            'email' => $user->user_email,
            'points' => (int)$points,
        );

        return new WP_REST_Response($profile, 200);
    }
}