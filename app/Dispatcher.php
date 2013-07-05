<?php

/**
 * $Id: Dispatcher.php 2072 2010-09-08 11:57:24Z marten $
 */

if (!defined('APP')) {
    define('APP', dirname(dirname(__FILE__)));
}

$dispatcher = new Dispatcher();
$dispatcher->startup();

/**
 * Entry point for the application
 *
 */
class Dispatcher {

    /**
     * Constructor
     */
    public function __construct() {

        session_name('touch');
        session_start();

        global $config;
        $this->config = $config;
    }

    /**
     * Start the execution and get data
     */
    public function startup() {

        // Other variables to be used in views
        $config = $this->config;

        include(APP.'/views/skeleton.php');

    }
}
