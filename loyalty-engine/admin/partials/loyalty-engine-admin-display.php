<div class="wrap">
    <h2>LoyaltyEngine Settings</h2>
    <form method="post" action="options.php">
        <?php
        settings_fields('loyalty_engine_options');
        do_settings_sections('loyalty_engine');
        submit_button();
        ?>
    </form>
</div>