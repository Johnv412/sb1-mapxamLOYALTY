<?php
class Loyalty_Engine_Security {
    public static function sanitize_input($input) {
        if (is_array($input)) {
            return array_map(array(self::class, 'sanitize_input'), $input);
        }
        return sanitize_text_field($input);
    }

    public static function validate_nonce($nonce, $action = -1) {
        if (!wp_verify_nonce($nonce, $action)) {
            wp_die('Security check failed', 'Security Error', array('response' => 403));
        }
    }

    public static function check_user_capabilities($capability = 'manage_options') {
        if (!current_user_can($capability)) {
            wp_die('You do not have sufficient permissions to access this page.', 'Permission Error', array('response' => 403));
        }
    }

    public static function escape_output($output) {
        return esc_html($output);
    }

    public static function prevent_direct_access() {
        if (!defined('ABSPATH')) {
            exit;
        }
    }
}