<?php
class Loyalty_Engine_Blocks {
    public function register_blocks() {
        register_block_type('loyalty-engine/user-points', array(
            'render_callback' => array($this, 'render_user_points_block'),
        ));
    }

    public function render_user_points_block($attributes, $content) {
        if (!is_user_logged_in()) {
            return '<p>' . esc_html__('Please log in to view your points.', 'loyalty-engine') . '</p>';
        }

        $user_id = get_current_user_id();
        $points = Loyalty_Engine_DB::get_user_points($user_id);

        return sprintf(
            '<div class="loyalty-engine-user-points">%s: <strong>%d</strong></div>',
            esc_html__('Your current points', 'loyalty-engine'),
            $points
        );
    }
}