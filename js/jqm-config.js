define(['jquery', 'jqm'], function($){
  'use strict';
  // Configure jqm for use with Backbone

  $.mobile.loader.prototype.options.text = "laddar";
  $.mobile.loader.prototype.options.textVisible = false;
  $.mobile.loader.prototype.options.theme = "c";
  $.mobile.loader.prototype.options.html = "";
    
  $.mobile.ajaxEnabled = false;
  $.mobile.linkBindingEnabled = false;
  $.mobile.hashListeningEnabled = false;
  $.mobile.pushStateEnabled = false;
  
  // Remove page from DOM when it's being replaced
  
  $(document).on("pagehide", "div[data-role='page']", function (event, ui) {
    $(event.currentTarget).remove();
  });
});



