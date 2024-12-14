<?php
class Loyalty_Engine_Rewards_Test extends WP_UnitTestCase {
    public function test_add_points() {
        $user_id = $this->factory->user->create();
        
        // Initial points should be 0
        $initial_points = Loyalty_Engine_DB::get_user_points($user_id);
        $this->assertEquals(0, $initial_points);

        // Add 100 points
        $result = Loyalty_Engine_Rewards::add_points($user_id, 100, 'Test addition');
        $this->assertTrue($result);

        // Check new point balance
        $new_points = Loyalty_Engine_DB::get_user_points($user_id);
        $this->assertEquals(100, $new_points);
    }
}