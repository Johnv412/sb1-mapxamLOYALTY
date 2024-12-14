<?php
class Loyalty_Engine_Rewards {
    // ... existing methods ...

    public static function add_points($user_id, $points, $reason = '') {
        $current_points = Loyalty_Engine_DB::get_user_points($user_id);
        $new_points = $current_points + $points;

        $updated = Loyalty_Engine_DB::update_user_points($user_id, $new_points);

        if ($updated) {
            Loyalty_Engine_Logger::log("Added $points points to user $user_id. Reason: $reason");
            return true;
        }

        return false;
    }
}