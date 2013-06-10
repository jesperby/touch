<!DOCTYPE html> 
<html> 
  <head> 
    <title>Malmö Stad</title> 
    <meta name="viewport" content="width=device-width, initial-scale=1"/> 
    <meta http-equiv="Access-Control-Allow-Origin" content="*"/>    
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
    <link rel="apple-touch-icon" href="images/mstadlogo.png"/>
    <meta name="apple-mobile-web-app-capable" content="no" /> <!-- needed for flickering during transitions-->
    <link rel="stylesheet" href="css/jquery.mobile.custom-1.3.0.css" />
    <link rel="stylesheet" href="css/jquery.mobile.structure-1.3.0.min.css" />
    <script type="text/JavaScript" src="js/lib/require/require-2.0.6.js"></script>

    <link rel="stylesheet" href="css/style.css" />
    <script>
      require.config({
        paths: {
          "main": "js/main"
        }
      });
      require(["main"]);
    </script> 
    <noscript>Du behöver aktivera Javascript i din webbläsare för att använda denna tjänst.</noscript>   
  </head> 
  <body></body>
</html>
