Touch
=====

Web based touch interface to selected services

Setup
=====

## Config

Copy and edit the following files from this code base (do __not__ check in config files in the repository):
  * `config.example.php` to `config.php`
  * `js/config.example.js` to `js/config.js`

## Dependencies 

Lib paths are specified in files js/main.js, js/build.js and index.php, where used lib names must be changed accordingly. The app has been tested with the lib versions given below.

Create directory `lib` in home directory and add the following:
* [Swift Mailer](http://swiftmailer.org) - v4.3.0

Create directory `js/lib` and add the following:
* [Jquery](http://jquery.com) - v1.9.1
* [Jquery Validate Plugin](http://jqueryvalidation.org) - v1.11.0
* [Jquery Mobile](http://jquerymobile.com) - v1.3.0
* [Backbone](http://backbonejs.org) - v0.9.10
* [Backbone Paginator](https://github.com/addyosmani/backbone.paginator) - v0.15
* [Underscore](http://underscorejs.org) - v1.4.4

Create directory `js/lib/require` and add the following:
* [Require](http://requirejs.org) - v2.0.6

In the same directory, `js/lib/require`, add the following [require plugins](https://github.com/millermedeiros/requirejs-plugins):
* [async](https://github.com/millermedeiros/requirejs-plugins/tree/master/src) - v0.1.1 
* [json](https://github.com/millermedeiros/requirejs-plugins/tree/master/src) - v0.3.1 
* [noext](https://github.com/millermedeiros/requirejs-plugins/tree/master/src) - v0.3.1 
* [text](https://github.com/millermedeiros/requirejs-plugins/tree/master/src) - v2.0.5

License
=======

Released under AGPL version 3.






