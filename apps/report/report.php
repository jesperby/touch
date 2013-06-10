<?php

//+++++++++++++++++++ INIT +++++++++++++++++

// Config file
require_once( "../../config.php" );

// Allowed extensions
$allowedExts = array("jpg", "jpeg", "gif", "png");

// Error or success, for redirect url
define( "ERROR", "error");
define( "SUCCESS", "success");
$page = SUCCESS;

// Path to attachment file
$attachment_path = "upload/" . $_FILES["reportImage"]["name"];

// Do we have a file?
$file_uploaded = is_uploaded_file( $_FILES["reportImage"]["tmp_name"] );

// Username field
$username = $_POST['username'];


//+++++++++++++++++++ FILE CHECK +++++++++++++++++
$file_msg = 'IMAGE: No image attached';
if( $file_uploaded && !$username ) {
  $extension = end(explode(".", $_FILES["reportImage"]["name"]));
  if ((($_FILES["reportImage"]["type"] == "image/gif")
    || ($_FILES["reportImage"]["type"] == "image/jpeg")
    || ($_FILES["reportImage"]["type"] == "image/png")
    || ($_FILES["reportImage"]["type"] == "image/pjpeg"))
    && ($_FILES["reportImage"]["size"] < 5000000)
    && in_array($extension, $allowedExts)) {
    if ($_FILES["reportImage"]["error"] > 0) {
      $page = ERROR;
      $file_msg = 'IMAGE ERROR: Image error';
    } else {
    
      if (file_exists("upload/" . $_FILES["reportImage"]["name"])) {
        $page = ERROR;
        $file_msg = "IMAGE ERROR: File exists in dir 'upload' with same name as attached image";
      } else {
        move_uploaded_file( $_FILES["reportImage"]["tmp_name"],
                            $attachment_path);
        $page = SUCCESS;
        $file_msg = "IMAGE uploaded ";
      }
    }
  } else {
    $page = ERROR;
    $file_msg = "IMAGE EROR: File too large or of wrong type";
  }
} else {
  $page = SUCCESS;
}



//+++++++++++++++++++ SEND MAIL +++++++++++++++++
if( $page == SUCCESS && !$username ) {
  // Create the message content
  
  $msg = "Beskrivning: " . $_POST['errorDescription']. "\r\n";
  $msg .= "Kontaktinfo: " . $_POST['errorContactInfo'] . "\r\n";
  $msg .= "Position: " . $_POST['latitude'] . ", " . $_POST['longitude'] . "\r\n";

  // Create the mail
  require_once '../../lib/Swift-4.3.0/lib/swift_required.php';

  $transport = Swift_SmtpTransport::newInstance('mail2.malmo.se', 25);

  // Create the message
  $message = Swift_Message::newInstance()
    ->setSubject('Felanmälan')
    ->setFrom( $config['report_mail_from'] )
    ->setTo( $config['report_mail_to'] )
    ->setBody( $msg )
    ;

  // Add attachment if exists
  if( $file_uploaded ) {
    $message->attach(Swift_Attachment::fromPath( $attachment_path ));
  }

  // Send the email
  $mailer = Swift_Mailer::newInstance($transport);
  $mailer->send($message);

}


// Delete attachment file
if( $file_uploaded ) {
  unlink( $attachment_path );
}

//+++++++++++++++++++ LOG +++++++++++++++++
$logfile_path = "../../logs/report_log";

$log_msg = "USER" . "\t" . date('Y-m-d') ."\t" . date('H:i') . "\t";
$log_msg .= getRealIpAddr() . "\t";
$log_msg .= $file_msg . "\r\n";

file_put_contents( $logfile_path, $log_msg, FILE_APPEND );

//+++++++++++++++++++ REDIRECT +++++++++++++++++
// Redirect
$baseUrl = "$_SERVER[HTTP_HOST]";
$relUrl = "$_SERVER[REQUEST_URI]"; 
$urlSplit = explode( "/", $relUrl);
$baseRelUrl = $urlSplit[1];

$url = "http://" . $baseUrl . "/" . $baseRelUrl . "/#report/" . $page;
header( "Location: $url" );
die;


//+++++++++++++++++++ HELPER FUNCTIONS +++++++++++++++++
function getRealIpAddr()


{
  if (!empty($_SERVER['HTTP_CLIENT_IP']))
  //check ip from share internet
  {
    $ip=$_SERVER['HTTP_CLIENT_IP'];
  }
  elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
  //to check ip is pass from proxy
  {
    $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
  }
  else
  {
    $ip=$_SERVER['REMOTE_ADDR'];
  }
  return $ip;
}