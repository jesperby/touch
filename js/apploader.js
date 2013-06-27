define(['jquery', 'underscore', 'backbone', 'router', 'chrome', 'jqm'],function($, _, Backbone, Router, Chrome) {
  'use strict';
  
  function appnamesToUris(appnames) {
    var appuris = [];
    for(var i = 0, l = appnames.length; i<l; i++) {
      appuris[i] = 'apps/'+appnames[i]+'/app';
    }
    return appuris;
  }
  
  function parseAppList(applist) {
    var appnames = [];
    for(var section in applist) {
      for(var appname in applist[section]) {      
        if(applist[section][appname].preload) {
          appnames.push(appname);
        }
      }
    }
    return appnames;
  }
  
  function loadApps(applist, cb) {
    cb = cb || function(){};
    applist = applist || [];
    var appnames = parseAppList(applist);
    var appuris = appnamesToUris(appnames);
    require(appuris, function() {
      var app, loaded = {};
      for (var i = 0; i < appnames.length; i++) {
        app = arguments[i];
        app.init && app.init(require.toUrl(appuris[i].split('/app').join('')).split('.js').join(''));
        loaded[appnames[i]] = app;
      }      
      cb(loaded);
    });
  }
  
  function init() {
    events();
    require(['json!available-apps.php'], function (AvailableApps) {
      loadApps(AvailableApps, function(loaded){
        var router = new Router();
        router.extend(loaded, function() {
          Backbone.history.start();
        });
      });
    });
  }
  
  $.mobile.defaultPageTransition = 'none';
  
  function events() {
    
    $(document).on('click', 'a', function(event) {
      var $this = $(this);

      if($this.attr('data-transition')) {
        $.mobile.changePage.defaults.transition = $this.attr('data-transition');
      } else {
        $.mobile.changePage.defaults.transition = 'none';
      }

      if($this.attr('data-direction')) {
        $.mobile.changePage.defaults.reverse = $this.attr('data-direction') == 'reverse';
      } else {
        $.mobile.changePage.defaults.reverse = false;
      }

      if($this.attr('data-rel') === 'back') {
        window.history.back();
        // Backbone.history.back();  
        return false;
      }
    });
  }
  

  return{
    initialize:init
  }
});

