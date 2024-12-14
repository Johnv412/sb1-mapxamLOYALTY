<?php
class Loyalty_Engine_Error_Handler {
    public static function log_error($message, $data = array()) {
        error_log(sprintf(
            '[LoyaltyEngine Error] %s - Data: %s',
            $message,
            json_encode($data)
        ));
    }

    public static function display_admin_notice($message, $type = 'error') {
        add_action('admin_notices', function() use ($message, $type) {
            printf(
                '<div class="notice notice-%s is-dismissible"><p>%s</p></div>',
                esc_attr($type),
                esc_html($message)
            );
        });
    }

    public static function handle_exception($exception) {
        self::log_error($exception->getMessage(), array(
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'trace' => $exception->getTraceAsString()
        ));

        if (current_user_can('manage_options')) {
            self::display_admin_notice('An error occurred in the LoyaltyEngine plugin. Please check the error logs.');
        }
    }
}