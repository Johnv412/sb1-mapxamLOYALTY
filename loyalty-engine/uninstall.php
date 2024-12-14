<?php
// If uninstall not called from WordPress, then exit
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// Perform uninstall actions here (e.g., delete plugin options, custom database tables, etc.)