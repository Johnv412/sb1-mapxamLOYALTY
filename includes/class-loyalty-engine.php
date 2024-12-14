<?php
class Loyalty_Engine {
    protected $loader;
    protected $plugin_name;
    protected $version;

    public function __construct() {
        $this->plugin_name = 'loyalty-engine';
        $this->version = LOYALTY_ENGINE_VERSION;
        $this->load_dependencies();
        $this->define_admin_hooks();
        $this->define_public_hooks();
    }

    private function load_dependencies() {
        require_once LOYALTY_ENGINE_PLUGIN_DIR . 'includes/class-loyalty-engine-loader.php';
        require_once LOYALTY_ENGINE_PLUGIN_DIR . 'admin/class-loyalty-engine-admin.php';
        require_once LOYALTY_ENGINE_PLUGIN_DIR . 'public/class-loyalty-engine-public.php';
        require_once LOYALTY_ENGINE_PLUGIN_DIR . 'includes/class-loyalty-engine-api.php';

        $this->loader = new Loyalty_Engine_Loader();
    }

    private function define_admin_hooks() {
        $plugin_admin = new Loyalty_Engine_Admin($this->get_plugin_name(), $this->get_version());
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts');
        $this->loader->add_action('admin_menu', $plugin_admin, 'add_plugin_admin_menu');
        $this->loader->add_action('admin_init', $plugin_admin, 'register_settings');
    }

    private function define_public_hooks() {
        $plugin_public = new Loyalty_Engine_Public($this->get_plugin_name(), $this->get_version());
        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_styles');
        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_scripts');
    }

    public function run() {
        $this->loader->run();
    }

    public function get_plugin_name() {
        return $this->plugin_name;
    }

    public function get_version() {
        return $this->version;
    }
}