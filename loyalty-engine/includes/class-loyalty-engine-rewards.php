<?php
class Loyalty_Engine_Rewards {
    public static function redeem_reward($reward_id, $user_id) {
        global $wpdb;

        $reward = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM {$wpdb->prefix}loyalty_rewards WHERE id = %d AND active = 1",
            $reward_id
        ));

        if (!$reward) {
            return new WP_Error('invalid_reward', __('Invalid or inactive reward', 'loyalty-engine'));
        }

        $user_points = Loyalty_Engine_DB::get_user_points($user_id);

        if ($user_points < $reward->points) {
            return new WP_Error('insufficient_points', __('Insufficient points to redeem this reward', 'loyalty-engine'));
        }

        $wpdb->start_transaction();

        try {
            $new_points = $user_points - $reward->points;
            $updated = Loyalty_Engine_DB::update_user_points($user_id, $new_points);

            if ($updated === false) {
                throw new Exception(__('Failed to update user points', 'loyalty-engine'));
            }

            $wpdb->commit();
            return true;
        } catch (Exception $e) {
            $wpdb->rollback();
            return new WP_Error('redemption_failed', $e->getMessage());
        }
    }
}