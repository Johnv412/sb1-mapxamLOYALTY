<?php
class Loyalty_Engine_i18n {
    public function load_plugin_textdomain() {
        load_plugin_textdomain(
            'loyalty-engine',
            false,
            dirname(dirname(plugin_basename(__FILE__))) . '/languages/'
        );
    }
}