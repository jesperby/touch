<?php $base_url = $config['base_url']; ?>

<?php if($config['dev']) { ?>
  
  <link rel="stylesheet" href='<?php echo "/$base_url/app/public/jqtouch/jqtouch.css"; ?>' />
  <link rel="stylesheet" href='<?php echo "/$base_url/app/public/css/theme.css?" . rand(); ?>' />
  <link rel="stylesheet" href='<?php echo "/$base_url/app/public/css/touch.css?" . rand(); ?>' />
  <script src='<?php echo "/$base_url/app/public/jqtouch/jquery-1.4.2.min.js"; ?>'></script>
  <script src='<?php echo "/$base_url/app/public/jqtouch/jqtouch.js"; ?>'></script>

  <script src='<?php echo "/$base_url/app/public/js/jquery.easing.1.3.js"; ?>'></script>
  <script src='<?php echo "/$base_url/app/public/js/gears_init.js"; ?>'></script>
  <script src='<?php echo "/$base_url/app/public/js/config.js?" . rand(); ?>'></script>
  <script src='<?php echo "/$base_url/app/public/js/global.js?" . rand(); ?>'></script>
  <script src='<?php echo "/$base_url/app/public/js/events.js?" . rand(); ?>'></script>
  <script src='<?php echo "/$base_url/app/public/js/feeds.js?" . rand(); ?>'></script>
<?php } else { ?>
  <link rel="stylesheet" href='<?php echo "/$base_url/app/public/css/min.css"; ?>' />
  <script src='<?php echo "/$base_url/app/public/js/min.js"; ?>'></script>
<?php } ?>
