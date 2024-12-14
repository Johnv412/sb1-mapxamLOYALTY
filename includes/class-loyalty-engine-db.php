<?php
class Loyalty_Engine_DB {
    public static function get_rewards($args = array()) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'loyalty_rewards';
        
        $defaults = array(
            'active' => true,
            'limit' => 10,
            'offset' => 0
        );
        $args = wp_parse_args($args, $defaults);
        
        $query = "SELECT * FROM $table_name WHERE active = %d LIMIT %d OFFSET %d";
        $prepared = $wpdb->prepare($query, $args['active'], $args['limit'], $args['offset']);
        
        return $wpdb->get_results($prepared, ARRAY_A);
    }

    public static function insert_reward($data) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'loyalty_rewards';
        
        $result = $wpdb->insert($table_name, $data);
        if ($result === false) {
            return new WP_Error('db_insert_error', $wpdb->last_error);
        }
        
        return $wpdb->insert_id;
    }

    public static function get_user_points($user_id) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'loyalty_customer_points';
        
        $query = "SELECT points FROM $table_name WHERE user_id = %d";
        $points = $wpdb->get_var($wpdb->prepare($query, $user_id));
        
        return $points !== null ? intval($points) : 0;
    }

    public static function update_user_points($user_id, $points) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'loyalty_customer_points';
        
        $result = $wpdb->replace(
            $table_name,
            array(
                'user_id' => $user_id,
                'points' => $points,
                'last_updated' => current_time('mysql')
            ),
            array('%d', '%d', '%s')
        );
        
        return $result !== false;
    }

    public static function get_gift_cards($user_id) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'loyalty_gift_cards';
        
        $query = "SELECT * FROM $table_name WHERE user_id = %d AND is_active = 1";
        return $wpdb->get_results($wpdb->prepare($query, $user_id), ARRAY_A);
    }
}