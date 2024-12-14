<div class="wrap">
    <h2><?php echo esc_html(get_admin_page_title()); ?></h2>
    <form action="options.php" method="post">
    <?php
        settings_fields('loyalty_engine');
        do_settings_sections('loyalty_engine');
        submit_button('Save Settings');
    ?>
    </form>
</div>