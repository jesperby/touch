<?php
/*
  File that describes available apps/services
*/

require_once( "config.php" );

$apps = array(
  'Externa tjänster' => array(
    'home' => array(
      'label' => 'Hem',
      'description' => 'Startsidan',
      'uri' => '',
      'show-in-menu' => FALSE,
      'icon' => 'false',
      'preload' => TRUE
    ), 
    'news' => array(
      'label' => 'Nyheter',
      'description' => 'Nyheter från malmo.se',
      'uri' => '#news',
      'show-in-menu' => TRUE,
      'icon' => 'arrow-r',
      'preload' => TRUE
    ), 
    'events' => array(
      'label' => 'Evenemangskalendern',
      'description' => 'Det händer i Malmö',
      'uri' => '#events',
      'show-in-menu' => TRUE,
      'icon' => 'arrow-r',
      'preload' => TRUE
    ),
    /*
    'jobs' => array(
      'label' => 'Lediga jobb',
      'description' => 'Arbeta i Malmö stad',
      'uri' => '#jobs',
      'show-in-menu' => TRUE,
      'icon' => 'arrow-r',
      'preload' => TRUE
    ),
    */
    'poi' => array(
      'label' => 'Platser',
      'description' => 'Hitta viktiga platser i Malmö',
      'uri' => '#poi',
      'show-in-menu' => TRUE,
      'icon' => 'arrow-r',
      'preload' => TRUE
    ),
    'kkompassen' => array(
      'label' => 'Konstkompassen',
      'description' => 'Utforska Malmös konstverk',
      'uri' => 'http://www.konstkompassen.se/mobile',
      'show-in-menu' => TRUE,
      'icon' => 'arrow-r',
      'preload' => FALSE
    ),
    'soctanter' => array(
      'label' => 'Soctanter på nätet',
      'description' => 'Ställ frågor till Soctanterna och delta i diskussioner',
      'uri' => 'https://webapps2.malmo.se/soctanter/',
      'show-in-menu' => TRUE,
      'icon' => 'false',
      'preload' => FALSE
    ),
    'report' => array(
      'label' => 'Felanmälan',
      'description' => 'Felanmäl något i staden',
      'uri' => '#report',
      'show-in-menu' => TRUE,
      'icon' => 'arrow-r',
      'preload' => TRUE
    ),
    'mstad' => array(
      'label' => 'Malmo.se',
      'description' => 'Malmö stads webbplats',
      'uri' => 'http://www.malmo.se/',
      'show-in-menu' => TRUE,
      'icon' => 'false',
      'preload' => FALSE
    ),
    'about' => array(
      'label' => 'Om denna tjänst',
      'description' => 'Information om den här applikationen',
      'uri' => '#about',
      'show-in-menu' => TRUE,
      'icon' => 'arrow-r',
      'preload' => TRUE
    ),
  ),

  'Interna tjänster' => array(
    'intnews' => array(
      'label' => 'Nyheter Komin',
      'description' => 'Nyheter för dig som är kommunanställd.',
      'uri' => '#komin-news',
      'show-in-menu' => TRUE,
      'icon' => 'arrow-r',
      'preload' => TRUE     
    ),
    'komin' => array(
      'label' => 'Komin',
      'description' => 'Genväg till Komin',
      'uri' => 'https://webapps06.malmo.se/dashboard',
      'show-in-menu' => TRUE,
      'icon' => 'false',
      'preload' => FALSE      
    )    
  )
);

// Restrict access to internal services using an ip range.
//$isInternal = preg_match("/^161\.52\./", $_SERVER['REMOTE_ADDR']) ||  // Wired
//              preg_match("/^10\.64\./", $_SERVER['REMOTE_ADDR']);     // Wi-fi

$pattern_wired = "/^" . preg_quote( $config['ip_wired'] ) . "/";
$pattern_wifi = "/^" . preg_quote( $config['ip_wired'] ) . "/";

$isInternal = preg_match( $pattern_wired, $_SERVER['REMOTE_ADDR']) ||  // Wired
              preg_match( $pattern_wifi, $_SERVER['REMOTE_ADDR']);     // Wi-fi

if(!$isInternal) {
  array_pop($apps);
}

print json_encode($apps);
