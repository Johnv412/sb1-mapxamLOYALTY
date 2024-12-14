<?php
class Pizza_Rewards_API {
    public function register_routes() {
        // Existing routes
        register_rest_route('pizza-rewards/v1', '/rewards', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_rewards'),
            'permission_callback' => array($this, 'check_permissions'),
        ));

        register_rest_route('pizza-rewards/v1', '/rewards', array(
            'methods' => 'POST',
            'callback' => array($this, 'create_reward'),
            'permission_callback' => array($this, 'check_permissions'),
        ));

        register_rest_route('pizza-rewards/v1', '/rewards/(?P<id>\d+)', array(
            'methods' => 'PUT',
            'callback' => array($this, 'update_reward'),
            'permission_callback' => array($this, 'check_permissions'),
        ));

        register_rest_route('pizza-rewards/v1', '/rewards/(?P<id>\d+)', array(
            'methods' => 'DELETE',
            'callback' => array($this, 'delete_reward'),
            'permission_callback' => array($this, 'check_permissions'),
        ));

        // New routes for gift cards
        register_rest_route('pizza-rewards/v1', '/giftcards', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_giftcards'),
            'permission_callback' => array($this, 'check_permissions'),
        ));

        register_rest_route('pizza-rewards/v1', '/giftcards', array(
            'methods' => 'POST',
            'callback' => array($this, 'create_giftcard'),
            'permission_callback' => array($this, 'check_permissions'),
        ));

        register_rest_route('pizza-rewards/v1', '/giftcards/(?P<id>\d+)', array(
            'methods' => 'PUT',
            'callback' => array($this, 'update_giftcard'),
            'permission_callback' => array($this, 'check_permissions'),
        ));

        register_rest_route('pizza-rewards/v1', '/giftcards/(?P<id>\d+)', array(
            'methods' => 'DELETE',
            'callback' => array($this, 'delete_giftcard'),
            'permission_callback' => array($this, 'check_permissions'),
        ));

        // New route for customer points
        register_rest_route('pizza-rewards/v1', '/customer-points', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_customer_points'),
            'permission_callback' => array($this, 'check_customer_permissions'),
        ));
    }

    public function check_permissions() {
        return current_user_can('manage_options');
    }

    public function check_customer_permissions() {
        return is_user_logged_in();
    }

    // Existing reward methods...

    public function get_giftcards($request) {
        $giftcards = get_option('pizza_rewards_giftcards', array());
        return new WP_REST_Response($giftcards, 200);
    }

    public function create_giftcard($request) {
        $giftcard = $request->get_json_params();
        $giftcards = get_option('pizza_rewards_giftcards', array());
        $giftcard['id'] = uniqid();
        $giftcards[] = $giftcard;
        update_option('pizza_rewards_giftcards', $giftcards);
        return new WP_REST_Response($giftcard, 201);
    }

    public function update_giftcard($request) {
        $id = $request->get_param('id');
        $updated_giftcard = $request->get_json_params();
        $giftcards = get_option('pizza_rewards_giftcards', array());
        $index = array_search($id, array_column($giftcards, 'id'));
        if ($index !== false) {
            $giftcards[$index] = array_merge($giftcards[$index], $updated_giftcard);
            update_option('pizza_rewards_giftcards', $giftcards);
            return new WP_REST_Response($giftcards[$index], 200);
        }
        return new WP_REST_Response(array('message' => 'Gift card not found'), 404);
    }

    public function delete_giftcard($request) {
        $id = $request->get_param('id');
        $giftcards = get_option('pizza_rewards_giftcards', array());
        $giftcards = array_filter($giftcards, function($giftcard) use ($id) {
            return $giftcard['id'] !== $id;
        });
        update_option('pizza_rewards_giftcards', $giftcards);
        return new WP_REST_Response(null, 204);
    }

    public function get_customer_points($request) {
        $user_id = get_current_user_id();
        $points = get_user_meta($user_id, 'pizza_rewards_points', true);
        return new WP_REST_Response(array('points' => $points ? $points : 0), 200);
    }
}