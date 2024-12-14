// ... existing code ...

// Add shortcode for displaying rewards
function pizza_rewards_shortcode() {
    ob_start();
    echo '<div id="pizza-rewards-root"></div>';
    return ob_get_clean();
}
add_shortcode('pizza_rewards', 'pizza_rewards_shortcode');

// Enqueue scripts and styles on the frontend when shortcode is used
function pizza_rewards_enqueue_frontend_scripts() {
    global $post;
    if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'pizza_rewards')) {
        pizza_rewards_enqueue_scripts();
    }
}
add_action('wp_enqueue_scripts', 'pizza_rewards_enqueue_frontend_scripts');

// ... rest of the existing code