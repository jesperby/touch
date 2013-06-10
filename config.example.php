<?php

	$config = array( 
		/*
		 * Ip adresses for networks that have access to the intranet.
		 */

		// Wired network, as regular expression
		"ip_wired" => "/^333\.33\./", // mock example 333.33.XX.XX

		// Wifi network, as regular expression
		"ip_wifi" => "/^444\.44\./" // mock example 444.44.XX.XX


		/**
		 * Error reporting email
		 */

		// Error report email - from
		"report_mail_from" => array( 'some_name@some_email.com' => 'Some name' ),

		// Error report email - from
		"report_mail_to" => array( 'some_name@some_email.com' => 'Some name' )
	);