<?php
/**
 * $Id: index.php 1766 2010-05-05 09:08:29Z marten $
 */

if (!defined('APP')) {
    define('APP', dirname(__FILE__) . '/app/');
}
require_once('config.php');
require_once(APP . '/Dispatcher.php');
