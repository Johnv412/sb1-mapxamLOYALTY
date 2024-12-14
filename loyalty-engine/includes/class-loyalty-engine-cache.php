<?php
class Loyalty_Engine_Cache {
    private static $cache_group = 'loyalty_engine';

    public static function set($key, $value, $expiration = 3600) {
        wp_cache_set($key, $value, self::$cache_group, $expiration);
    }

    public static function get($key) {
        return wp_cache_get($key, self::$cache_group);
    }

    public static function delete($key) {
        wp_cache_delete($key, self::$cache_group);
    }

    public static function flush() {
        wp_cache_flush();
    }
}