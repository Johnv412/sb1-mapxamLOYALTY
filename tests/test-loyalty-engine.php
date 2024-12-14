<?php
class Loyalty_Engine_Test extends WP_UnitTestCase {
    public function test_user_points() {
        $user_id = $this->factory->user->create();
        wp_set_current_user($user_id);

        Loyalty_Engine_DB::update_user_points($user_id, 100);

        $shortcode_output = do_shortcode('[loyalty_user_points]');
        $this->assertEquals('Your current points: 100', $shortcode_output);
    }

    public function test_reward_redemption() {
        $user_id = $this->factory->user->create();
        wp_set_current_user($user_id);

        $reward_id = Loyalty_Engine_DB::insert_reward(array(
            'name' => 'Test Reward',
            'description' => 'Test Description',
            'points' => 50,
            'active' => 1
        ));

        Loyalty_Engine_DB::update_user_points($user_id, 100);

        $result = Loyalty_Engine_Rewards::redeem_reward($reward_id, $user_id);
        $this->assertTrue($result);

        $updated_points = Loyalty_Engine_DB::get_user_points($user_id);
        $this->assertEquals(50, $updated_points);
    }

    public function test_insufficient_points_redemption() {
        $user_id = $this->factory->user->create();
        wp_set_current_user($user_id);

        $reward_id = Loyalty_Engine_DB::insert_reward(array(
            'name' => 'Expensive Reward',
            'description' => 'Very Expensive',
            'points' => 1000,
            'active' => 1
        ));

        Loyalty_Engine_DB::update_user_points($user_id, 100);

        $result = Loyalty_Engine_Rewards::redeem_reward($reward_id, $user_id);
        $this->assertInstanceOf('WP_Error', $result);
        $this->assertEquals('insufficient_points', $result->get_error_code());
    }
}