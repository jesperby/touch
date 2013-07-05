<?php
/**
 * $Id: skeleton.php 1766 2010-05-05 09:08:29Z marten $
 */

$contentType = 'text/html';
$exp = $config['dev'] ? 0 : 3600;

header("Content-Type: {$contentType}; charset=UTF-8", true);
header("Cache-Control: max-age={$exp}", true);
header("Expires: " . gmdate("D, d M Y H:i:s", time() + $exp) . " GMT", true);
header("X-Powered-By: HTML5, CSS3, jQuery, jQTouch", true);

$pattern_wired = "/^" . preg_quote( $config['ip_wired'] ) . "/";
$isInternal = preg_match( $pattern_wired, $_SERVER['REMOTE_ADDR']);

include 'panels.php';
