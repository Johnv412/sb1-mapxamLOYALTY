<?php
class Loyalty_Engine_Logger {
    private static $log_file;

    public static function init() {
        self::$log_file = WP_CONTENT_DIR . '/loyalty-engine-logs/loyalty-engine-' . date('Y-m-d') . '.log';
        if (!file_exists(dirname(self::$log_file))) {
            mkdir(dirname(self::$log_file), 0755, true);
        }
    }

    public static function log($message, $level = 'info') {
        $timestamp = date('Y-m-d H:i:s');
        $log_entry = sprintf("[%s] [%s] %s\n", $timestamp, strtoupper($level), $message);
        error_log($log_entry, 3, self::$log_file);
    }

    public static function get_logs($date = null) {
        if ($date === null) {
            $date = date('Y-m-d');
        }
        $log_file = WP_CONTENT_DIR . '/loyalty-engine-logs/loyalty-engine-' . $date . '.log';
        if (file_exists($log_file)) {
            return file_get_contents($log_file);
        }
        return '';
    }
}

Loyalty_Engine_Logger::init();